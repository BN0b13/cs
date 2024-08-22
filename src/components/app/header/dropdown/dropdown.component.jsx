import { useState } from 'react';

import {
    VscChevronDown,
    VscChevronUp
} from "react-icons/vsc";

import { dropdownMenuItems } from '../../../../assets/menu-items';

import {
    DropdownContainer,
    DropdownText,
    MainContainer,
    TextContainer,
    TitleText
} from './dropdown.styles';

const Dropdown = ({ theme, item }) => {
    const [ showDropdown, setShowDropdown ] = useState(false);

    return (
        <MainContainer>
            <TextContainer onClick={() => setShowDropdown(!showDropdown)}>
                <TitleText theme={theme}>
                    { item.title }
                </TitleText>
                { showDropdown ?
                    <VscChevronUp />
                    :
                    <VscChevronDown />
                }
            </TextContainer>
            <DropdownContainer showDropdown={showDropdown}>
                {dropdownMenuItems.map((item, index) => (
                    <DropdownText key={index} onClick={() => window.location = item.path}>{ item.title }</DropdownText>
                ))}
            </DropdownContainer>
        </MainContainer>
    )
}

export default Dropdown;