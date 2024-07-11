import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const CartPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
    padding: 0;
`;

export const CartItemsContainer = styled.div`
    margin: 30px 0;
    width: 100%;
`;

export const CartPageTitle = styled.h1`
    
`;

export const SubtotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 90%;
`;

export const SubtotalCountContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SubtotalText = styled.h2`
    margin: 20px;
`;

export const SubtotalMobileText = styled.h4`
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