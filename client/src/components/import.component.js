import React, { Component } from 'react';
import { ExcelRenderer } from '../ExcelRenderer';

export default class Import extends Component {

  constructor(props) {
    super(props); 
    this.fileHandler = this.fileHandler.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.state = {
      tablename: null,
      data: null
    }
  }

  fileUpload(event) {
    console.log('Загрузка')
  }

  fileHandler(event) {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          tablename: fileObj.name,
          data: resp.rows 
        })
      }
    });
    console.log(fileObj)
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
        {
          !!this.state.data && (<React.Fragment>
            <input
              type="text"
              defaultValue={
                this.state.tablename
              }
            />
            <button
              onClick={(e) => {
                this.fileUpload(e)
              }
              }
            >
              Загрузить
            </button>
            </React.Fragment>
          )
        }
        {
          this.props.render(this.state.data)
        }
      </div>
    );
  }
}