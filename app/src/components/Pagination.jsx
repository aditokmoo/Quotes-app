import { useContext } from 'react'
import AppContext from '../context/AppContext';
// icons
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
//css
import './css/pagination.css'

export const Pagination = () => {
    const { currentPage, total_pages, handlePaginationDown, handlePaginationUp } = useContext(AppContext)

    return (
        <section>
            <div className="container">
                <div className="pagination">
                    <button onClick={handlePaginationDown} disabled={currentPage === 1}><AiFillCaretLeft /></button>
                    <span>{currentPage} of {total_pages}</span>
                    <button onClick={handlePaginationUp} disabled={currentPage === total_pages}><AiFillCaretRight /></button>
                </div>
            </div>
        </section>
    )
}