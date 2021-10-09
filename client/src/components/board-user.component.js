import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Table from './table.component';
import Import from './import.component'

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  render() {
    return (
      <div className="container">
      </div>
    )
  }
}