import styled from 'styled-components';

import {
    backgroundOpacityPages,
    footerHeight,
    textColorLight
} from '../../../styles/theme';

export const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    padding:20px;
    position: static;
    background-color: ${backgroundOpacityPages};
    color: ${textColorLight};
    min-height: ${footerHeight};
`;

export const FooterText = styled.h4`
    
`;