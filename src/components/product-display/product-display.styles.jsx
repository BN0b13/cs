import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

import { api } from '../../config';

import { Link } from 'react-router-dom';

import {
  backgroundOpacityDark,
  bodyHeight,
  textColorLight
} from '../../styles/theme';

export const CategoryLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: ${textColorLight};
`;

export const ProductButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 10vw;
  margin-top: 10vh;
`;

export const SlideshowContainer = styled.div`
  width: ${setMobileView() ? '220px' : '300px'};
`;

export const ProductButtonCount = styled.div`
  display: flex;
  flex-direction: ${setMobileView() ? 'column' : 'row'};
`;

export const ProductCountInput = styled.input`
  width: 20px;
  margin: 10px;
`;

export const ProductMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 2vh;
`;

export const ProductDisplayContainer = styled.div`

`;

export const FavoriteContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const ProductTitle = styled.h4`
  text-align: start;
  margin-top: 10px;
`;

export const ProductImage = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
  padding: 2px;
`;

export const ProductInformation = styled.div`
  text-align: left;
  margin: ${setMobileView() ? '5px 5px 30px 5px' : '5px'};
  padding: 2px
`;

export const ProductQuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${setMobileView() ? '10px 30px 30px 30px' : '0 20px 0 0'};
`;

export const ProductText = styled.h2`
  text-align: center;
`;

export const ProductSubtext = styled.h4`
  
`;

export const ProductDescriptionText = styled.p`
  
`;