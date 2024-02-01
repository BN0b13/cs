import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

import { api } from '../../config';

import { Link } from 'react-router-dom';

export const ProductDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductDescriptionContainer = styled.div`
  width: ${setMobileView() ? '80vw' : '65vw'};
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: ${setMobileView() ? 'column' : 'row'};
  justify-content: center;
  ${setMobileView() ? 'row-gap: 2vh' : 'column-gap: 10vw'};
  margin: ${setMobileView() ? '' : '10vh 5vh'};
`;

export const CategoryLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.text};
`;

export const ProductButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const FavoriteContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const ProductTitle = styled.h4`
  text-align: start;
  margin-top: 10px;
`;

export const ProductImageDisplay = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
`;

export const ProductInformation = styled.div`
  text-align: left;
  margin: ${setMobileView() ? '5px 5px 30px 5px' : '0'};
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

export const ProductImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
`;