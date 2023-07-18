import styled from 'styled-components';


export const SnackbarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 3px;
    padding: 0 5px;
    width: 290px;
    background-color: ${({type}) => (type === 'success' ? '#D4EDD9' : '#F8D7D9')};
    color: ${({type}) => (type === 'success' ? '#145824' : '#731C23')};
    border: solid 1px ${({type}) => (type === 'success' ? '#C3E6CB' : '#F5C6CA')};
    border-radius: 5px;
`;

export const SnackbarHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 290px;
    margin-top: 5px;
    padding-top: 2px;
`;

export const SnackbarMessage = styled.h5`
    margin-top: 0;
`;