export const IntroText = () => (
  <div className="mb-5">
    <h1>Project overview</h1>
    <h5>
      This project is meant take the logs collected by Laura Bottomley
      (laurab@ee.duke.edu) of Duke University, restructure the data and provide
      a graphical analysis of it.
    </h5>
    <h5>
      You can either select a .txt file version of the logs or an already
      structured .json file to see the graphical analysis.
    </h5>
    <h5>
      If you select a .txt file, please make sure the logs follow these
      criteria:
    </h5>
    There is only one log per line and the log is separated into columns
    following these rules:
    <ol>
      <li>
        host making the request. A hostname when possible, otherwise the
        Internet address if the name could not be looked up.
      </li>
      <li>
        date in the format "[DD:HH:MM:SS]", where DD is either "29" or "30" for
        August 29 or August 30, respectively, and HH:MM:SS is the time of day
        using a 24-hour clock. Times are EDT (four hours behind GMT).
      </li>
      <li>request given in quotes.</li>
      <li>HTTP reply code.</li>
      <li>bytes in the reply.</li>
    </ol>
  </div>
);
