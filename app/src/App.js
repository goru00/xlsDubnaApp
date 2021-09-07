import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import xlsTableComponent from './components/xlsTableComponent';

function App() {
  const [data, setData] = useState();
  return (
    <xlsTableComponent data={data} />
  );
}

export default App;
