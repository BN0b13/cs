import styled from 'styled-components';

export const CollapsibleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const CollapsibleButton = styled.button`
    background-color: #777;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    border-bottom: 1px solid darkgrey;
`;

export const CollapsibleContentContainer = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    padding: 0 18px;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    width: 100%;
`;