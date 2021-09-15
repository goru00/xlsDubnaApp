import React from 'react';
import ExcelRendererOutTableItemList from './ExcelRendererOutTableItemList';
import { Table } from 'react-bootstrap';

export default function ExcelRendererOutTable({ thead, tbody }) {
    return (
        <Table striped bordered hover>
            <thead>
                {
                    !!thead && thead.map((item, key) => {
                        return !key && <tr key={key}><ExcelRendererOutTableItemList item={item} /></tr>
                    })
                }
            </thead>
            <tbody>
                {
                    !!tbody && tbody.map((item, key) => {
                        return key > 0 && <tr key={key}><ExcelRendererOutTableItemList item={item} /></tr>
                    })
                }
            </tbody>
        </Table>
    )
}