import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const InfoLinksButton = styled.button`
    width: 50%;
    height: ${setMobileView() ? '75px' : '100px'};
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px;
    font-size: ${setMobileView() ? '15px' : '35px'};
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: 1px solid grey;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
    background-color: white;
    color: black;
    border: 1px solid #f4f4f4;
    }
`;