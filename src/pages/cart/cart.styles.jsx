import styled from 'styled-components';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const CartPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${backgroundOpacityDark};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;

export const CartPageTitle = styled.h1`
    
`;

export const SubtotalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
`;

export const SubtotalText = styled.h2`
    margin: 20px;
`;

export const CartCollapseButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

export const CartInformation = styled.div`
    display: flex;
    width: 70%;
    padding: 0;
`;

export const CartPageEmpty = styled.h4`
    
`;