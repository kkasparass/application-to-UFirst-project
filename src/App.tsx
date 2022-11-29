import { Charts } from "./components/Charts";
import styled from "styled-components";

const AppContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <Charts />
    </AppContainer>
  );
}

export default App;
