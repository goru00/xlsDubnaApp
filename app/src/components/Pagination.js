import React from 'react';

export default function PaginationComponent({ pages, currentPage, setCurrentPage }) 
{
    return (
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {
              pages.map((item, index) => {
                return <li 
                    className={ item === currentPage ? "page-item active" : "page-item" } 
                    key={index}
                    ><p 
                    className="page-link"
                    onClick={() => setCurrentPage(item)}
                    >{item}</p></li>
              })
            }
          </ul>
        </nav>
    )
}