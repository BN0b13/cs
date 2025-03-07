import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

export const MainTitle = styled.h2`

`;

export const MediaInput = styled.input`
    margin: 20px 0;
    display: ${props => props.display ?? ''};
`;

export const MediaLabel = styled.label`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    margin: 0 5px 0 5px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    }
`;

export const MediaTextarea = styled.textarea`
    margin: 20px 0;
`;

export const MediaSelect = styled.select`
    margin: 20px 0;
    width: 150px;
    text-align: center;
`;

export const MediaOption = styled.option`

`;