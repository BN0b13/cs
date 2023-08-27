import styled from 'styled-components';

export const NavigationContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${props => props.theme.text};
`;

export const NavOptions = styled.div`
    
`;

export const HeaderLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  padding: 1em;
  color: ${props => props.theme.text};
`;

