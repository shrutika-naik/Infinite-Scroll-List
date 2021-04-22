import {useEffect, useState} from 'react';
import axios from 'axios';

export default function useBookSearch(pageNumber){
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: `http://openlibrary.org/search.json?q=test&page=${pageNumber}`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setBooks(prevBooks => {
                return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
            })
            setHasMore(res.data.docs.length > 0)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber])
    
    return {loading, books, hasMore, error}
}