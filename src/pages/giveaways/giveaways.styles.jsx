import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { setMobileView } from '../../tools/mobileView';

export const MainContainer = styled.div`
    
`;

export const GiveawaysLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${props => props.theme.text};
    margin: auto;
`;

export const GiveawaysActiveContainer = styled.div`
    ${setMobileView() ?
        {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: props => `rgba(${props.theme.backgroundOpacityLight})`,
            color: props => props.theme.textSecondary,
            minHeight: '270px'
        }
    :    
        {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 300px)',
            columnGap: '20px',
            rowGap: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: props => `rgba(${props.theme.backgroundOpacityLight})`,
            color: props => props.theme.textSecondary,
            minHeight: '360px'
        }
}
`;

export const GiveawaysCompletedContainer = styled.div`
    ${setMobileView() ?
        {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: props => `rgba(${props.theme.backgroundOpacityDark})`,
            color: props => props.theme.text,
            minHeight: '270px'
        }
    :
        {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 300px)',
            columnGap: '20px',
            rowGap: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: props => `rgba(${props.theme.backgroundOpacityDark})`,
            color: props => props.theme.text,
            minHeight: '360px'
        }
}
`;

export const GiveawaysMainTitle = styled.h2`
    color: #fff;
    text-align: center;
`;

export const GiveawaysTitle = styled.h4`
    text-align: start;
    margin-top: 10px;
`;