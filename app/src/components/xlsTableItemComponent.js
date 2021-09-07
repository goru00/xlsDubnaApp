import React from "react";

export default function xlsTableItemComponent({ data, index }) {
    return (
        <tr>
            <td>{data.index}</td>
            <td>{data.title}</td>
        </tr>
    );
}