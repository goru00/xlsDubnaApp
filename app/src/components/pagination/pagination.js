import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import _ from "lodash";

const NavPagination = ({pages, page, onChangePage}) => {
    const [currentPage, setCurrentPage] = useState(page);
    return (
        <>
            <div className="container mt-3">
                <Pagination>
                    {
                        (pages > 1) ? (
                            _.range(pages).map((item, index) => {
                                return (
                                    <Pagination.Item
                                        key={index}
                                        active={index + 1 === currentPage}
                                        onClick={(e) => {
                                            setCurrentPage(index + 1)
                                            onChangePage(e.target.text)
                                        }}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                )
                            })
                        ) : <div></div>
                    }
                </Pagination>
            </div>
        </>
    )
}

export default NavPagination;