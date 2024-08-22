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
} from './dropdown-mobile.styles';

const DropdownMobile = ({ theme, item }) => {
    const [ showDropdown, setShowDropdown ] = useState(false);

    return (
        <MainContainer>
            <TextContainer onClick={() => setShowDropdown(!showDropdown)}>
                { item.icon }
                <TitleText theme={theme}>
                    { item.title }
                </TitleText>
                { showDropdown ?
                    <VscChevronUp />
                    :
                    <VscChevronDown />
                }
            </TextContainer>
            {showDropdown &&
                <DropdownContainer showDropdown={showDropdown}>
                    {dropdownMenuItems.map((item, index) => (
                        <TextContainer>
                            { item.icon }
                            <DropdownText key={index} onClick={() => window.location = item.path}>{ item.title }</DropdownText>
                        </TextContainer>
                    ))}
                </DropdownContainer>
            }
        </MainContainer>
    )
}

export default DropdownMobile;