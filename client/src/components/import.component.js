import React, { Component } from 'react';
import { ExcelRenderer } from '../ExcelRenderer';
import Form from 'react-bootstrap/Form';

export default class Import extends Component {

  constructor(props) {
    super(props); 
    this.fileHandler = this.fileHandler.bind(this);
    this.fileInput = React.createRef();
    this.fileForm = React.createRef();
    this.state = {
      tablename: null,
      data: null
    }
  }

  fileHandler(event) {
    event.preventDefault();
    let fileObj = this.fileInput.current.files[0];
    if (fileObj) {
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
    }
  }

  render() {
    return (
      <div className="importXLS">
        <Form.Group 
          controlId="formFile" 
          className="mb-3"
        >
          <Form.Control 
            type="file"
            onChange={this.fileHandler}
            ref={this.fileInput} 
          />
        </Form.Group>
        {
          this.props.render(this.state.data)
        }
      </div>
    );
  }
}