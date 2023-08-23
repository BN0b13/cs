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
  ${setMobileView() ? 
    'row-gap: 10px;'
    :
    'column-gap: 20px;'
    }
`;

export const ProductCardContainer = styled.div`

`;