import React, { Component } from "react";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tablename: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          tablename: response.data.tablename
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
        <ul>
          {
            this.state.tablename && this.state.tablename.forEach((item, index) => {
              return <li>1</li>              
            })
          }
        </ul>
      </div>
    );
  }
}
