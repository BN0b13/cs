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
`;

export const ResultTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100%;
`;

export const ProductCardContainer = styled.div`

`;

export const ProductPaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProductPaginationTextTitle = styled.h4`
  padding: 5px;
`;

export const ProductPaginationText = styled.h4`
  cursor: pointer;
  padding: 5px;
`;

export const ProductText = styled.h2`

`;

export const ProductSizeText = styled.h4`
  margin: 20px 20px 20px 0;
`;

export const ProductSizeSelect = styled.select`
  margin: 20px 0;
`;

export const ProductSizeOption = styled.option`

`;

export const ResultText = styled.h2`
  font-size: 50px;
  background-color: rgba(0,0,0,0.8);
  padding: 20px;
  border-radius: 5px;
`;

export const ProductSubtext = styled.h4`
  cursor: pointer;
`;