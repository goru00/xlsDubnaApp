import React, { Component } from 'react';
import _ from 'lodash';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            data: this.props.data,
            pageSize: 10,
            currentPage: 1,
            pageCount: this.props.data ? Math.round((this.props.data.length - 1) / 10) : 0, 
            pages: _.range(1, (this.props.data ? Math.round((this.props.data.length - 1) / 10) : 0) + 1)
        }
    }

    handleChange(e) {
        this.setState({
            currentPage: e,
            pageCount: this.state.data ? Math.round((this.state.data.length - 1) / this.state.pageSize) : 0,
            pages: _.range(1, this.state.pageCount + 1)
        });
    }

    render() {
        return (
            <div className="col-sm">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                        {
                          this.state.data[0].map((head, pos) => {
                            return <td key={pos}>{head}</td>
                          })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                          _(this.state.data)
                            .slice((this.state.currentPage - 1 === 0) ? 0 : (this.state.currentPage - 1) * this.state.pageSize)
                            .take(this.state.pageSize + 1)
                            .value()
                            .map((body, pos) => {
                                return pos > 0 && (<tr key={pos}>
                                {
                                    body.map((elem, k) => {
                                        return <td key={k}>{elem}</td>
                                    })
                                }
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                    {
                        this.state.pages.map((item, index) => {
                            return <li 
                                className={ item === this.state.currentPage ? "page-item active" : "page-item" } 
                                key={index}
                                style={
                                    {
                                        cursor: "pointer"
                                    }
                                }
                            ><p 
                                className="page-link"
                                onClick={() => this.handleChange(item)}
                            >{item}</p></li>
                        })
                    }
                    </ul>
                </nav>
            </div>
        )
    }
}