import React from 'react';

export default function XLSTableItemComponent({ data, index })
{
    return (
        <tr>
            <td>{data.index}</td>
            <td>{data.title}</td>
        </tr>
    )
}