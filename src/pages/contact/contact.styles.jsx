import styled from 'styled-components';

import {
    backgroundOpacityLight,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const ContactPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${backgroundOpacityLight};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;
export const ContactPageTitle = styled.h1`
    margin: 5px;
    padding: 3px;
`;