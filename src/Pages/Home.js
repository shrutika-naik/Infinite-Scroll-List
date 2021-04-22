import React, {useState, useRef, useCallback} from 'react';
import useBookSearch from './useBookSearch';
import './Home.css';

function Home() {
  const [pageNumber, setPageNumber] = useState(1)

  const {books, hasMore, error, loading} = useBookSearch(pageNumber)
    
  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <>
      {books.map((book, index) => {
        if(books.length === index + 1){
          return <div className="containerWP" key={book} ref={lastBookElementRef} >{book}</div>
        }else{
          return <div className="containerWP" key={book} >{book}</div>
        }
      })}
      {loading && <div className="loader"></div>}
      <div>{error && 'Error'}</div>
    </>
  );
}

export default Home;
