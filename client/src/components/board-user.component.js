import React, { Component, Suspense } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Import from './import.component'

const Table = React.lazy(() => import('./table.component'));

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      access: false
    };
  }
  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data,
          access: true
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Импорт таблицы</strong>
          </h3>
        </header>
        {
          this.state.access ? 
          (<Import render={(data) => (
            !!data && (
              <Suspense fallback={<span className="spinner-border spinner-border"></span>}>
                <Table data={data} />
              </Suspense>
            )
          )} />) : this.state.content
        }
      </div>
    )
  }
}