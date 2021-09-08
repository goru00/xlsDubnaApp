import React from "react";


export default function XLSInputComponent({ createTable })
{

    return (
        <input 
            type="file"
            onChange={
                (event) => {
                    createTable(event.target.files[0]);
                }
            }
        />
    )
}