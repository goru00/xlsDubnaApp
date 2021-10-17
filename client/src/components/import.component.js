import React, { Component } from 'react';
import { ExcelRenderer } from '../ExcelRenderer';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Import extends Component {

  constructor(props) {
    super(props); 
    this.fileHandler = this.fileHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeTablename = this.onChangeTablename.bind(this);
    this.state = {
      tablename: '',
      data: null,
      loading: false
    }
  }

  onChangeTablename(event) {
    this.setState({
      tablename: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const { dispatch, history } = this.props;
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
            data: resp.rows 
          })
        }
      });
    }
  }

  render() {
    const { message } = this.props;
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
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        {
          !!this.props.render(this.state.data) && (
          <Form onSubmit={this.handleSubmit}>
            <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Control 
                id="inlineFormInputName" 
                placeholder="Название таблицы"
                value={this.state.tablename}
                onChange={this.onChangeTablename}
                required 
              />
            </Col>
            </Row>
            <Row>
            <Col xs="auto">
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
              <span>Загрузить данные</span>
              </button>
            </Col>
            </Row>
          </Form>)
        }
        {
          this.props.render(this.state.data)
        }
      </div>
    );
  }
}