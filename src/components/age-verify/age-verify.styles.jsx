import styled from 'styled-components';

export const AgeVerifyButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const AgeVerifyAccessButton = styled.button`
    margin: 10px;
    font-size: 20px;
    width: 150px;
    height: 75px;
    padding: 5px;
    background: #5cb85c;
    color: #fff;
    outline: none;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: 0.5s;
`;

export const AgeVerifyDenyButton = styled.button`
    margin: 10px;
    font-size: 20px;
    width: 150px;
    height: 75px;
    padding: 5px;
    background: #d9534f;
    color: #fff;
    outline: none;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: 0.5s;
`;

export const AgeVerifyDiv = styled.div`
    background: #fff;
    padding: 20px;
    text-align: center;
`;

export const AgeVerifyTitle = styled.h1`

`;

export const AgeVerifyText = styled.h4`

`;

export const Modal = styled.div`
    z-index: 1;
    display: ${({show}) => (show ? 'flex' : 'none')} !important;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.5);
`;