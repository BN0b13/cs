import styled from 'styled-components';

import { Link } from 'react-router-dom';

import {
    textColorLight
} from '../../styles/theme';

export const ShopLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${textColorLight};
`;

export const CategoryLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${textColorLight};
`;

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`;

export const CategoryContainerMobile = styled.div`
    display: grid;
    grid-template-row: repeat(1fr);
    row-gap: 20px;
`;

export const CategoryTitle = styled.h2`
    text-align: start;
    margin: 2vh 0;
`;