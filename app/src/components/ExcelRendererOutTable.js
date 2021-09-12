import React from 'react';
import ExcelRendererOutTableItemList from './ExcelRendererOutTableItemList';
import { Table } from 'react-bootstrap';

export default function ExcelRendererOutTable({ data }) {
    return (
        <Table striped bordered hover>
            <thead>
                {
                    !!data && data.rows.map((item, key) => {
                        return !key && <tr key={key}><ExcelRendererOutTableItemList item={item} /></tr>
                    })
                }
            </thead>
            <tbody>
                {
                    !!data && data.rows.map((item, key) => {
                        return key > 0 && <tr key={key}><ExcelRendererOutTableItemList item={item} /></tr>
                    })
                }
            </tbody>
        </Table>
    )
}