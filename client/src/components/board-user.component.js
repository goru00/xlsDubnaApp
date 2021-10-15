import React, { Component, Suspense } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Import from './import.component';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                <Form>
                  <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                    <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                    Name
                    </Form.Label>
                    <Form.Control id="inlineFormInputName" placeholder="Jane Doe" />
                  </Col>
                  <Col xs="auto">
                    <Button 
                      type="submit" 
                      className="mb-2"
                    >
                    Submit
                    </Button>
                  </Col>
                  </Row>
                </Form>
                <Table data={data} />
              </Suspense>
            )
          )} />) : this.state.content
        }
      </div>
    )
  }
}