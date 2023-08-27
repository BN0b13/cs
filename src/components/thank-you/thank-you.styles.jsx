import styled from 'styled-components';

export const ThankYouContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.text};
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    max-width: 1000px;
    margin: auto;
    padding: 20px;
`;

export const ThankYouTitle = styled.h1`
    margin-bottom: 0;
`;

export const ThankYouSubtitle = styled.h4`

`;

export const ThankYouText = styled.p`
    max-width: 80%;
`;