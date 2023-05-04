import styled from 'styled-components';

export const MobileDropDownMenuLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  padding: 1em;
`;

export const MobileDropDownMenu = styled.ul`

`;

export const MobileDropDownMenuCloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: .4em .4em 0 0;
  padding: .4em;
`;

export const MobileDropDownMenuContainer = styled.div`
  top: 0;
  right: 0;
  position: absolute;
  background-color: #fff;
  border: .5px black solid;
  border-radius: 2px;
  z-index: 3;
  transform: ${props => props.show ? 'translate(0, 0)' : 'translate(0)'};
  transition: width .5s ease-out;
`;

export const MobileDropDownMenuItem = styled.li`
  list-style-type: none;
  padding: .4em;
`;

export const MobileDropDownMenuOpenContainer = styled.div`
  margin-right: .4em;
`; 