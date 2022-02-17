import React, { useState, useEffect } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import NavPagination from "../../components/pagination/pagination";
import Table from '../../components/table/table';

import UserService from '../../services/user.service';

const Home = () => {
    const [datas, setDatas] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setLoaded(false);
        UserService.getPublicContent(page, limit)
        .then((res) => {
            const countDocument = res.data.countDocument;
            setDatas(res.data.datas);
            setPages((countDocument > 10) ? Math.ceil(countDocument / 10) : 1)
            setLoaded(true);
        }, err => {
            console.log(err);
        });
    }, [page, limit]);

    return (
        <main>
            <div className="container mt-3">
                <h1>Таблицы</h1>
                <hr />
                {
                    !loaded && <Spinner animation="border" />
                }
                {
                    datas ? (
                        <Accordion>
                            {
                                datas.map((item, index) => {
                                    return (
                                        <Accordion.Item 
                                        key={index} 
                                        eventKey={index}
                                        >
                                            <Accordion.Header
                                                onClick={() => setShow(true) }
                                            >
                                                {item.tablename}
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {
                                                    show && (
                                                        <Table 
                                                            id={item._id}
                                                        />)
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })
                            }
                        </Accordion>
                    ) : <h1>Тут пока ничего нет</h1>
                }
                <NavPagination 
                    pages={pages}
                    page={page}
                    onChangePage={setPage}
                />
            </div>
        </main>
    )
}

export default Home;