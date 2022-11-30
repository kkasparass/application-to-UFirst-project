import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { parseLogsData } from "../../utils/parseLogsData";
import { LogsData } from "../Charts/hooks/useChartData";
import { DownloadButton } from "../DownloadButton/DownloadButton";

const ErrorMessage = styled.div`
  color: #e2363f;
`;

const DropZoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  width: 100%;
  border: 4px solid #d4d1d1;
  border-radius: 20px;
  background-color: rgba(220, 245, 242, 0.4);
  color: #dcf5f2;
  outline: none;
  cursor: pointer;
`;

export const FileDropZone = ({
  setData,
  data,
}: {
  data: LogsData | undefined;
  setData: React.Dispatch<React.SetStateAction<LogsData | undefined>>;
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      console.log(file);

      reader.readAsText(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        if (file.type === "text/plain") {
          setData(parseLogsData(reader.result as string));
        } else if (file.type === "application/json") {
          setData(JSON.parse(reader.result as string));
        }
      };
    });
  }, []);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/json": [".json"],
    },
  });

  return (
    <div className="row w-100 mb-5">
      <div className={data ? "col-md-6 mb-4 mb-md-0" : "col-12"}>
        <DropZoneContainer
          {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <p className="m-0">
            Drag and drop a .txt or .json file here with the logs data, or click
            to select the file
          </p>
        </DropZoneContainer>
        {(fileRejections.length > 0 || isDragReject) && (
          <ErrorMessage>Please select only one .txt or .json file</ErrorMessage>
        )}
      </div>
      {data && (
        <div className="col-md-6">
          File selected:
          {acceptedFiles.map((file) => (
            <div key={file.name}>{file.name}</div>
          ))}
          <DownloadButton data={data} />
        </div>
      )}
    </div>
  );
};
