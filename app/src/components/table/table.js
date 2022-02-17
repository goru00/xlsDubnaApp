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
    useEffect(() => {
        setLoaded(false);
        UserService.getTableById(id, page, limit)
        .then((res) => {
            setData(res.data);
            setLoaded(true);
        }, (err) => {
            console.log(err)
        });
    }, [id])
    return (
        <>
            {
                !loaded && <Spinner animation="border" />
            }
                {
                    data && (
                        <table>
                            <thead>
                                <tr>
                                    {
                                        data.tableHeader.map((item, index) => {
                                            return <td key={index}>{item}</td>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.tableData.map((row, index) => {
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
                            </tbody>
                        </table>
                    )
                }
                <NavPagination pages={pages} page={page} onChangePage={setPage} />
        </>
    )
}

export default Table;