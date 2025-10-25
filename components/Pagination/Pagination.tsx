
import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"


interface PaginationProps{
    curPage: number
    totalPages: number
    setCurrentPage:(select:number)=>void
}

export default function Pagination({curPage, totalPages, setCurrentPage}:PaginationProps){
    return (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={curPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
        previousLabel="←"
        
        />
    )
}