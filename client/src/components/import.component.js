import React, { Component } from 'react';
import { ExcelRenderer } from '../ExcelRenderer';

import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { connect } from "react-redux";
import { setPublicContent } from "../actions/content";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Поле является обязательным!
      </div>
    );
  }
};

class Import extends Component {

  constructor(props) {
    super(props); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeTablename = this.onChangeTablename.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      tablename: '',
      data: null,
      loading: false
    }
  }

  onChangeFile(event) {
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

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(setPublicContent(this.state.tablename, this.state.data))
        .then(() => {
          history.push("/user");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { message } = this.props;

    return (
        <div className="importXLS col-md-12">
          <Form
            onSubmit={this.handleSubmit}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
            <input
                type="file"
                className="form-control"
                name="fileXLS"
                onChange={this.onChangeFile}
                ref={this.fileInput}
              />
            </div>
            {
              message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )
            }
            {!!this.props.render(this.state.data) && (
            <div className="form-group">
              <Input
                type="text"
                name="tablename"
                className="form-control"
                value={this.state.tablename}
                onChange={this.onChangeTablename}
                placeholder="Название таблицы"
                validations={[required]}
              />
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Загрузить данные</span>
              </button>
            </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
          {
            this.props.render(this.state.data)
          }
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };
}

export default connect(mapStateToProps)(Import);