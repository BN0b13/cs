import styled from 'styled-components';

export const AccountSidebarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px; 
`;

export const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    cursor: pointer;

    &:hover {
        background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
        color: ${props => props.theme.textSecondary};
    }
`;

export const AccountSidebarOption = styled.h4`
    font-weight: bold;
`;