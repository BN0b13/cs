import styled from 'styled-components';

export const CartContainer = styled.div`
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
`;

export const CartText = styled.div`
    font-size: 18px;
`;

export const CartQuantityContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 50px auto;
`;

export const CartTextContainer = styled.div`
    display: flex;
    margin: auto;
    width: 150px;
`;

export const CartQuantityText = styled.div`
    font-size: 18px;
    margin: 0 15px;
`;

export const ProductImage = styled.div`
    margin: 25px auto;

    img {
    width: 100px;
    height: 100px;
    }
`;

export const DeleteProductContainer = styled.div`
    margin-right: 40px;
`;