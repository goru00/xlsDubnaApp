import { useState } from "react";
import { ExcelRenderer } from './ExcelRenderer';
import ExcelRendererOutTable from "./components/ExcelRendererOutTable";
import InputComponent from "./components/InputComponent";
import Pagination from './components/Pagination';
import { Container } from "react-bootstrap";
import _ from "lodash";

function App() {
  const [data, setData] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const pageCount = data ? Math.ceil((data.rows.length - 1) / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  function fileHandler(event) {
    let fileObj = event.target.files[0];
    setCurrentPage(1);
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
      <Container>
        <InputComponent 
          fileHandler={fileHandler} 
        />
        <ExcelRendererOutTable 
          thead={_(data.rows).slice(0).take(1).value()}
          tbody={_(data.rows).slice((currentPage - 1 === 0) ? 0 : (currentPage - 1) * pageSize).take(pageSize).value()} 
        />
        <Pagination 
          pages={pages} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </div>
  )
}

export default App;
