import { useState, useEffect } from 'react';
import axios from 'axios';

const useGet = (url) =>{

    const [results, setResults] = useState([]);

    useEffect(()=>{
        const fetchResults = async () => {
            const res = await axios.get(url);
            // const res = await axios.get('/api/products');
            setResults(res.data);
        }
        fetchResults();
    }, [url])

    return { results }
}

export default useGet;