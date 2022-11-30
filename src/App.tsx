import { useState } from "react";
import styled from "styled-components";
import { Charts } from "./components/Charts/Charts";
import { LogsData } from "./components/Charts/hooks/useChartData";
import { FileDropZone } from "./components/FileDzopZone/FileDropZone";
import { IntroText } from "./components/IntorText/IntroText";

const AppContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [data, setData] = useState<LogsData>();
  return (
    <AppContainer className="container">
      <IntroText />
      <FileDropZone data={data} setData={setData} />
      {data && <Charts data={data} />}
    </AppContainer>
  );
}

export default App;
