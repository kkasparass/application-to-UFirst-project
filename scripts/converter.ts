import { readFile, writeFile } from "fs";

readFile("./epa-http.txt", "ascii", (err, data) => {
  if (err) {
    throw err;
  }

  // Cleaning all non-ascii characters from file and splitting the whole file string into lines of logs
  const lines = data.replace(/[^\x00-\x7F]/g, "").split("\n");
  const formattedLogs = lines
    .filter((line) => line.length !== 0)
    .map((line) => {
      // Cleaning unnecessary symbols from log string and splitting log by it's columns
      const columns = line.replace(/[[\]]/g, "").split(" ");
      const host = columns.shift();

      const dateStrings = columns.shift()?.split(":");
      const day = dateStrings && dateStrings[0];
      const hour = dateStrings && dateStrings[1];
      const minute = dateStrings && dateStrings[2];
      const second = dateStrings && dateStrings[3];

      const documentSize = columns.pop();
      const responseCode = columns.pop();

      let request = {
        method: "UNKNOWN",
        url: "UNKNOWN",
        protocol: "UNKNOWN",
        protocol_version: "UNKNOWN",
      };
      // Request sometimes omits the protocol so it is important to check if it exists
      const requestContainsProtocol = columns.some((word) =>
        word.includes("HTTP")
      );
      if (columns.length >= 3 && requestContainsProtocol) {
        // Setting request method and cleaning the quote that request starts with
        request.method = columns.shift()?.slice(1) ?? "UNKNOWN";

        // Splitting the protocol strings and cleaning the quote that request ends with
        const protocolStrings = columns.pop()?.slice(0, -1).split("/");
        request.protocol = protocolStrings ? protocolStrings[0] : "UNKNOWN";
        request.protocol_version = protocolStrings
          ? protocolStrings[1]
          : "UNKNOWN";

        // Sometimes the request url contains a space. And since we tell different columns apart by a space we pop and shift all of the data beforehand and join the rest of the url.
        request.url = columns.join("");
      } else if (columns.length >= 3 && !requestContainsProtocol) {
        request.method = columns.shift()?.slice(1) ?? "UNKNOWN";
        request.url = columns.join("");
      } else if (columns.length === 2) {
        // If the request portion has only 2 strings we assume that it is the method and the url
        request.method = columns[0].replace('"', "");
        request.url = columns[1].slice(0, -1);
      } else if (columns.length === 1) {
        // If the request portion has only 1 string we assume that it has only the url
        request.url = columns[0].slice(1, -1);
      }

      return {
        host,
        datetime: {
          day,
          hour,
          minute,
          second,
        },
        request,
        response_code: responseCode,
        document_size: documentSize,
      };
    });

  const jsonLogsData = JSON.stringify(formattedLogs, null, 4);

  writeFile("data.json", jsonLogsData, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
});
