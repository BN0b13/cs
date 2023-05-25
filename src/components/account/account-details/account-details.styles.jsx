import styled from 'styled-components';

export const AccountDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AccountDetailsTitle = styled.h2`
    text-align: center;
`;

export const AccountDetailsSubtitle = styled.h4`
    text-align: center;
`;

export const AccountDetailsData = styled.p`
    text-align: center;
`;

export const AccountAddressContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.setMobileView ? 'column' : 'row'};
    justify-content: center;
    align-items: center;
`;

export const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const UpdateButtonContainer = styled.div`
    width: 150px;
    margin: 20px auto;
`;

export const AccountDetailsInput = styled.input`
    width: 300px;
    margin: 5px 0;
    padding: 3px;
`;