import styled from 'styled-components';

export const CartItemContainer = styled.div`
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
`;

export const CartItemText = styled.div`
    font-size: 18px;
`;

export const CartItemQuantityContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 50px auto;
`;

export const CartItemTextContainer = styled.div`
    display: flex;
    margin: auto;
    width: 150px;
    cursor: pointer;
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
    margin-right: 40px;
`;

export const CartItemMobileView = styled.div`
    display: flex;
    flex-direction: column;
    align-text: center;
`;