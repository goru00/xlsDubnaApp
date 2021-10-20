import React, { Component, Suspense } from "react";
import UserService from "../services/user.service";
import { Accordion } from 'react-bootstrap';
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import Table from './table.component';

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
          this.state.loading ? <span className="spinner-border spinner-border"></span> : 
          ( 
            this.state.data[0] ? (<Accordion>
              {
                this.state.data.map((item, index) => {
                  return (
                  <AccordionItem 
                    eventKey={index}
                    key={index} 
                  >
                    <AccordionHeader>{this.state.tablename[index]}</AccordionHeader>
                    <AccordionBody>
                      <Suspense fallback={<span className="spinner-border spinner-border"></span>}>
                        <Table data={item} />
                      </Suspense>
                    </AccordionBody>
                  </AccordionItem>)
                })
              }
              </Accordion>) : <p className="lead">Пока здесь нет данных</p>
          )
        }
      </div>
    );
  }
}
