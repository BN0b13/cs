import { createContext, useState } from "react";

import {
    searchProducts
} from '../tools/products';

export const SearchContext = createContext({
    searchTerm: '',
    setSearchTerm: () => null,
    page: 0,
    setPage: () => null,
    size: 10,
    setSize: () => null,
    termSearched: '',
    searchResults: [],
    searchForProduct: () => {},
});

export const SearchProvider = ({ children }) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    const [ termSearched, setTermSearched ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    
    const searchForProduct = async (searchTerm, page, size) => {
        setTermSearched(searchTerm);
        const res = await searchProducts(searchTerm, page, size);
        setSearchResults(res);
    }

    const changeProductPagination = async (page, size) => {
        setPage(page);
        setSize(size);
        const res = await searchProducts(searchTerm, page, size);
        setSearchResults(res);
    }
    
    const value = { searchTerm, setSearchTerm, page, setPage, size, setSize, termSearched, setTermSearched, searchResults, setSearchResults, searchForProduct, changeProductPagination };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};