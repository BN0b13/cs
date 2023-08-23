import { useContext, useEffect } from 'react';
import {
    VscSearch
} from 'react-icons/vsc';

import { SearchContext } from '../../../../contexts/search.context';

import {
    SearchContainer,
    SearchBar
} from './search.styles';

const Search = () => {
    const { searchTerm, setSearchTerm, termSearched, searchForProduct } = useContext(SearchContext);

    useEffect(() => {
        if(termSearched.length === 0) {
            const storedSearchTerm = localStorage.getItem('searchTerm');
            if(storedSearchTerm !== null) {
                searchForProduct(storedSearchTerm);
                localStorage.removeItem('searchTerm');
            }
        }
    }, []);

    const handleKeyDown = e => {
        if(e.key === 'Enter') {
            submitSearch();
        }
    }

    const submitSearch = () => {
        if(searchTerm.length <= 1) return;
        searchForProduct(searchTerm);
        if(window.location.pathname !== '/products') {
            localStorage.setItem('searchTerm', searchTerm);
            window.location.href = '/products';
        }
    }

    return (
        <SearchContainer onKeyDown={(e) => handleKeyDown(e)}>
            <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="search" />
            <VscSearch onClick={() => submitSearch()} />
        </SearchContainer>
    )
}

export default Search;