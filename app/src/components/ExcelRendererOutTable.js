import React from 'react';
import ExcelRendererOutTableItemList from './ExcelRendererOutTableItemList';

export default function ExcelRendererOutTable({ data }) {
    return (
        <table>
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
        </table>
    )
}