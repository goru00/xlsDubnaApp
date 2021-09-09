import React from 'react';
import ExcelRendererOutTableItem from './ExcelRendererOutTableItem';

export default function ExcelRendererOutTable({ data }) {
    return (
        <table>
            <tbody>
                    {
                        !!data && data.rows.map((item, index) => {
                            return <tr key={index} ><ExcelRendererOutTableItem item={item} /></tr>;
                        })
                    }
            </tbody>
        </table>
    )
}