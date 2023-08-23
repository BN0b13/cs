import styled from 'styled-components';

import {
    svgColorLight
} from '../../../styles/theme';


export const CartIconContainer = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding-bottom: 5px;
`;

export const Icon = styled.div`
    width: 24px;
    height: 24px;
    ${svgColorLight};
`;

export const ItemCount = styled.span`
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
    padding-bottom: 5px;
`;