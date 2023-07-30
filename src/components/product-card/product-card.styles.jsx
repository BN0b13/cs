import styled from 'styled-components';

import { setMobileView, setTabletView } from '../../tools/mobileView';

export const ProductCartContainer = styled.div`
  width: ${setTabletView() ? '100%' : '230px'};
  display: flex;
  flex-direction: column;
  height: ${setMobileView() ? '260px' : '350px'};
  align-items: center;
  position: relative;
  background-color: rgba(0,0,0,.9);
  padding-bottom: 10px;

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  font-size: '18px';
  text-align: center;
  padding: 5px;
`;

export const Name = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
`;

export const Price = styled.div`
  width: 10%;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 90%;
  object-fit: cover;
  margin-bottom: 5px;

  &:hover {
    opacity: 0.8;
  }
`;