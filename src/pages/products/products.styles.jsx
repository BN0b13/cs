import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const ProductsContainer = styled.div`
  min-height: 80vh;
  padding: 10px;
  color: #fff;
`;

export const Products = styled.div`
  display: grid;
  ${setMobileView() ? 
    'grid-template-rows: repeat(4, 1fr);'
    :
    'grid-template-columns: repeat(4, 1fr);'
    }
    column-gap: 20px;
    row-gap: 50px;
  text-align: center;
`;

export const ProductCardContainer = styled.div`

`;

export const ProductText = styled.h2`

`;

export const ProductSubtext = styled.h4`
  cursor: pointer;
`;