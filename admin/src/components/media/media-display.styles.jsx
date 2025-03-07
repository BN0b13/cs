import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ContainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 50%;
`;

export const ContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 600px;
    margin-top: 40px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;

export const MainTitle = styled.h2`

`;

export const BackText = styled.h4`
    text-align: start;
    cursor: pointer;
`;

export const Text = styled.h4`
    margin: 6px;
    padding: 4px;
`;

export const ActivationButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: ${props => props.color};
    border: none;
    border-radius: 2px;
    margin: 20px 0;
    height: 50px;
    width: 100px;

    &:hover {
        color: ${props => props.color};
        background-color: #fff;
        border: ${props => props.color} solid 1px;
    }
`;