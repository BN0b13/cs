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
    const { searchTerm, setSearchTerm, searchForProduct } = useContext(SearchContext);


    useEffect(() => {
        const urlSearchTerms = window.location.search;
        const urlSearchParams = new URLSearchParams(urlSearchTerms);
        const search = urlSearchParams.get('search');
        if(search) {
            searchForProduct(search);
        }
    }, []);

    const handleKeyDown = e => {
        if(e.key === 'Enter') {
            submitSearch();
        }
    }

    const submitSearch = () => {
        if(searchTerm.length <= 1) return;
        window.location.href = `/products?search=${searchTerm}`;
    }

    return (
        <SearchContainer onKeyDown={(e) => handleKeyDown(e)}>
            <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="search" />
            <VscSearch onClick={() => submitSearch()} style={{ cursor: 'pointer' }} />
        </SearchContainer>
    )
}

export default Search;