import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const CartItemContainer = styled.div`
    display: flex;  
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: ${setMobileView() ? '5px 0' : '30px 0'};
`;

export const MainContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${setMobileView() ? '100%' : '70%'};
`;

export const ImageContainer = styled.div`
    margin: auto;
`;

export const MobileInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const MobileTopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align
    margin: 20px 0;
`;

export const MobileBottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const CartItemText = styled.div`
    margin: ${setMobileView() ? '0 60% 0 10px' : ''};
    font-size: 18px;
`;

export const TotalText = styled.div`
    margin: 0 20px;
    font-size: 18px;
`;

export const CartItemQuantityContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: ${setMobileView() ? '10px auto' : '50px auto'};
`;

export const CartItemTextContainer = styled.div`
    display: flex;
    text-align: center;
    cursor: pointer;
    margin: auto;
`;

export const CartItemQuantityText = styled.div`
    font-size: 18px;
    margin: 0 15px;
`;

export const ProductImage = styled.div`
    margin: 25px auto;
    cursor: pointer;
    
    img {
    width: 100px;
    height: 100px;
    }
`;

export const DeleteProductContainer = styled.div`
    margin-left: ${setMobileView() ? '' : 'auto'};
    width: ${setMobileView() ? '50%' : ''};
`;