import { useState } from "react";
import { ExcelRenderer } from './ExcelRenderer';
import ExcelRendererOutTable from "./components/ExcelRendererOutTable";
import InputComponent from "./components/InputComponent";
import { Container } from "react-bootstrap";

function App() {
  const [data, setData] = useState('');
  function fileHandler(event) {
    let fileObj = event.target.files[0];
    console.log(fileObj);
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setData({
          cols: resp.cols,
          rows: resp.rows
        })
      }
    });
  }
  return (
    <div className="wrapper">
      <InputComponent fileHandler={fileHandler} />
      <Container>
        <ExcelRendererOutTable data={data} />
      </Container>
    </div>
  )
}

export default App;
