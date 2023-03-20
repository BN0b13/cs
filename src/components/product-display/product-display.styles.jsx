import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const CategoryLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 10vw;
  margin-top: 10vh;
`;

export const ProductMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 2vh;
`;

export const ProductDisplayContainer = styled.div`

`;

export const ProductTitle = styled.h5`
  text-align: start;
  margin-top: 10px;
`;

export const ProductImage = styled.div`
  img {
    width: 300px;
    height: 300px;
    margin: 5px;
    padding: 2px;
  }
`;

export const ProductInformation = styled.div`
  text-align: left;
  margin: 5px;
  padding: 2px
`;

export const ProductText = styled.h3`
  
`;