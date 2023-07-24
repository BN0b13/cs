import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const ProductCartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: ${setMobileView() ? '220px' : '350px'};
  align-items: center;
  position: relative;
  background-color: rgba(0,0,0,.9);
  padding-bottom: 10px;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

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
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: ${ setMobileView() ? '10px' : '18px'};
  text-align: center;
`;

export const Name = styled.div`
  width: 90%;
  margin: auto;
  margin-bottom: 15px;
`;

export const Price = styled.div`
  width: 10%;
`;