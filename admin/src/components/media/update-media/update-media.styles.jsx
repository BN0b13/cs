import styled from "styled-components";

export const MainContainer = styled.div`

`;

export const UpdateMediaDataContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const UpdateMediaContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const ContactInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin: 0 40px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
`;

export const MainTitle = styled.h2`

`;

export const UpdateMediaSelect = styled.select`
    margin: 20px 0;
    width: 150px;
    text-align: center;
`;

export const UpdateMediaOption = styled.option`

`;

export const UpdateMediaInput = styled.input`
    margin: 10px 0;
`;

export const UpdateMediaTextarea = styled.textarea`
    margin: 10px 0;
`;

export const DeleteMediaButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: ${props => props.color};
    border: none;
    border-radius: 2px;
    margin-top: 10px;
    height: 50px;
    width: 100px;

    &:hover {
        color: ${props => props.color};
        background-color: #fff;
        border: ${props => props.color} solid 1px;
    }
`;