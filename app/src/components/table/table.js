import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import UserService from "../../services/user.service";
import NavPagination from "../pagination/pagination";

function Table({id}) {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loaded, setLoaded] = useState(false);
    console.log("table")
    useEffect(() => {
        UserService.getTableById(id)
        .then((res) => {
            setData(res.data);
        }, (err) => {
            console.log(err)
        })
    }, [id])
    return (
        <>
            {
                !loaded && <Spinner animation="border" />
            }
                {
                    data && (
                        <table>
                            {
                                data.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            {
                                                row.map((col, index) => {
                                                    return (
                                                        <td key={index}>{col}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    )
                }
                <NavPagination pages={pages} page={page} onChangePage={setPage} />
        </>
    )
}

export default Table;