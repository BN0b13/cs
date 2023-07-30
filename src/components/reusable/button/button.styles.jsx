import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const BaseButton = styled.button`
min-width: ${setMobileView() ? '135px' : '165px'};
width: auto;
height: 50px;
letter-spacing: 0.5px;
line-height: 50px;
padding: 0 35px 0 35px;
font-size: ${setMobileView() ? '12px' : '15px'};
background-color: black;
color: white;
text-transform: uppercase;
font-family: 'Open Sans Condensed';
font-weight: bolder;
border: 1px solid white;
border-radius: 1px;
cursor: pointer;
display: flex;
justify-content: center;

&:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
}
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;