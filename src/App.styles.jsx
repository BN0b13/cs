import styled from 'styled-components';

export const BackgroundImageContainer = styled.div`
    background-image: ${props => `url(${props.backgroundImage})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
`;