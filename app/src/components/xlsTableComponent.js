import React from 'react';
import XLSTableItemComponent from './XLSTableItemComponent';
export default function XLSTableComponent(props)
{
    return (
        <table>
            <tbody>
                {
                    props.data.map((item, index) => {
                        return <XLSTableItemComponent data={item} key={item.id} index={index} />
                    })
                }
            </tbody>
        </table>
    )
}