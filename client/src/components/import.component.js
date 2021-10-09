import React, { Component } from 'react';
import XLSX from 'xlsx';

export default class Import extends Component {
  fileHandler(event) {
    function ExcelRenderer(file, callback) {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        var rABS = !!reader.readAsBinaryString;
        reader.onload = function(e) {
          var bstr = e.target.result;
          var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
          var wsname = wb.SheetNames[0];
          var ws = wb.Sheets[wsname];
          var json = XLSX.utils.sheet_to_json(ws, { header: 1 });
          var cols = make_cols(ws["!ref"]);
  
          var data = { rows: json, cols: cols };
  
          resolve(data);
          return callback(null, data);
        };
        if (file && rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
      });
    }
    function make_cols(refstr) {
      var o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
      for (var i = 0; i < C; ++i) {
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
      }
      return o;
    }
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          data: resp.rows
        });
      }
    });
  }
  render() {
    return (
      <div className="importXLS">
        <input
          type="file"
          onChange={(e) => {
            this.fileHandler(e)
          }}
        />
        { !!this.state.data && this.props.render(this.state) }
      </div>
    );
  }
}