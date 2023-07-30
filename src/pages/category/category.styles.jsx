import styled from 'styled-components';

import { Link } from 'react-router-dom';

import {
    textColorLight
} from '../../styles/theme';

export const MainContainer = styled.div`
    
`;

export const ShopLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${textColorLight};
`;

export const CategoryLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${textColorLight};
    margin: auto;
`;

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    column-gap: 20px;
    row-gap: 50px;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const CategoryContainerMobile = styled.div`
    display: grid;
    grid-template-row: repeat(1fr);
    row-gap: 20px;
    padding: 10px;
`;

export const CategoryTitle = styled.h4`
    text-align: start;
    margin-top: 10px;
`;