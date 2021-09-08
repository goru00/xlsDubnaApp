import { useState } from "react";
import XLSInputComponent from "./components/XLSInputComponent";
import XLSTableComponent from "./components/XLSTableComponent";
import XLSX from 'node-xlsx';
import fs from 'fs';
function App() {
  const [data, setData] = useState([
    {id: null, title: null}
  ]);
  function createTable(file) 
  {
    const workSheetsFromBuffer = XLSX.parse(fs.readFileSync(file.name));
    console.log(workSheetsFromBuffer);
  }
  return (
    <div className="wrapper">
      <XLSTableComponent data={data} /> 
      <XLSInputComponent createTable={createTable} />
    </div>
  )
}

export default App;
