import React from 'react';

function ExcelRendererOutTableItemList({ item }) {
    return (
        <React.Fragment>
            {
                item.map((element, index) => {
                    return <td key={index}>{item[index]}</td>
                })
            }
        </React.Fragment>
    )
}

export default ExcelRendererOutTableItemList;