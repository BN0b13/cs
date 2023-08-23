import { createContext, useState } from "react";

import {
    searchProducts
} from '../tools/products';

export const SearchContext = createContext({
    searchTerm: '',
    setSearchTerm: () => null,
    termSearched: '',
    searchResults: [],
    searchForProduct: () => {},
});

export const SearchProvider = ({ children }) => {
    const [ searchTerm, setSearchTerm ] = useState([]);
    const [ termSearched, setTermSearched ] = useState([]);
    const [ searchResults, setSearchResults ] = useState([]);
    
    const searchForProduct = async (searchTerm) => {
        setTermSearched(searchTerm);
        const res = await searchProducts(searchTerm);
        setSearchResults(res);
    }
    
    const value = { searchTerm, setSearchTerm, termSearched, setTermSearched, searchResults, setSearchResults, searchForProduct };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};