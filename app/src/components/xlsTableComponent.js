import React from 'react';
import xlsTableItemComponent from './xlsTableItemComponent';


export default function xlsTableComponent(props) {
    return (
        <table>
            {
                props.data.map((item, index) => {
                    return <xlsTableItemComponent data={item} key={item.id} index={index} />
                })
            }
        </table>
    );
}
