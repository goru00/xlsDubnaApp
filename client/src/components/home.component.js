import React, { Component } from "react";
import UserService from "../services/user.service";
import { Accordion } from 'react-bootstrap';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablename: [],
      data: null,
      loading: true
    };
  }

  componentDidMount() {

    UserService.getPublicContent().then(
      response => {
        this.setState({
          tablename: response.data.tablename,
          data: response.data.data,
          loading: false
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data && 
              error.response.data.tablename) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Таблицы</strong>
          </h3>
        </header>
        {
          (this.state.loading) ? <span className="spinner-border spinner-border"></span> :
          (<Accordion>
          {
            this.state.forEach((item, index) => {
              console.log(item)
            })
          }
          </Accordion>)
        }
      </div>
    );
  }
}
