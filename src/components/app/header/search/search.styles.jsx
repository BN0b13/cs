import styled from 'styled-components';

import { setMobileView } from '../../../../tools/mobileView';

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: ${setMobileView() ? '170px' : '250px'};
    color: #fff;
`;

export const SearchBar = styled.input`
    margin: 0 5px;
    width: ${setMobileView() ? '150px' : '230px'};
    border-radius: 5px;
`;