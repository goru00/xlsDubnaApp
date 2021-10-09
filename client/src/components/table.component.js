import React, { Component } from 'react';
import _ from 'lodash';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            item: this.props.item,
            pagesSize: 10,
            currentPage: 1
        }
    }

    handleChange(e) {
        this.setState({
            currentPage: e.target.value
        });
    }

    render() {
        const pageCount = this.state.item ? Math.round((this.state.item.length - 1) / this.state.pagesSize) : 0;
        const pages = _.range(1, pageCount + 1); 
        console.log(this.state.item)
        return (
            <div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                        {
                          this.state.item[0].map((head, pos) => {
                            return <td key={pos}>{head}</td>
                          })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                          this.state.item.map((body, pos) => {
                            return pos > 0 && (<tr key={pos}>
                              {
                                body.map((elem, k) => {
                                  return <td key={k}>{elem}</td>
                                })
                              }
                            </tr>)
                          })
                        }
                        {
                            console.log(this.state.item)
                        }
                    </tbody>
                </table>
                { 
                    pageCount ? (<nav className="d-flex justify-content-center">
                        <ul className="pagination">
                        {
                            pages.map((item, index) => {
                                return <li 
                                    className={ item === this.state.currentPage ? "page-item active" : "page-item" } 
                                    key={index}
                                    style={
                                        {
                                            cursor: 'pointer'
                                        }
                                    }
                                ><p 
                                    className="page-link"
                                    onClick={(e) => this.handleChange(e)}
                                >{item}</p></li>
                            })
                        }
                        </ul>
                    </nav>) : ""
                }
            </div>
        )
    }
}