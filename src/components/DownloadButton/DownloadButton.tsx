import { useMemo } from "react";
import styled from "styled-components";
import { LogsData } from "../Charts/hooks/useChartData";

const DownloadButtonWrapper = styled.a`
  color: #dcf5f2;
  :hover {
    color: inherit;
  }
`;

export const DownloadButton = ({ data }: { data: LogsData }) => {
  const downloadHref = useMemo(
    () =>
      `data:application/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 4)
      )}`,
    [data]
  );
  return (
    <DownloadButtonWrapper href={downloadHref} download="data.json">
      download Data JSON
    </DownloadButtonWrapper>
  );
};
