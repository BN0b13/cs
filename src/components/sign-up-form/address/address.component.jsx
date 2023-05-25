import { useEffect, useState } from 'react';

import { states } from '../../../tools/states.js';

import {
    AddressBottomContainer,
    AddressCityInput,
    AddressContainer,
    AddressDropdown,
    AddressDropdownOption,
    AddressInput,
    AddressZipCodeInput,
    AddressTopContainer
} from './address.styles';

const Address = ({ address, updateAddress }) => {
    const [ addressOne, setAddressOne ] = useState(address.addressOne);
    const [ addressTwo, setAddressTwo ] = useState(address.addressTwo);
    const [ city, setCity ] = useState(address.city);
    const [ state, setState ] = useState(address.state);
    const [ zipCode, setZipCode ] = useState(address.zipCode);

    useEffect(() => {
        if(!address.state) {
            updateAddress({ state: 'AL' });
        }
    }, []);

    const handleAddressOne = (data) => {
        setAddressOne(data);
        updateAddress({ addressOne: data });
    }

    const handleAddressTwo = (data) => {
        setAddressTwo(data);
        updateAddress({ addressTwo: data });
    }

    const handleCity = (data) => {
        setCity(data);
        updateAddress({ city: data });
    }

    const handleState = (data) => {
        setState(data);
        updateAddress({ state: data });
    }

    const handleZipCode = (data) => {
        if(data.length > 5) {
            return
        }
        setZipCode(data);
        updateAddress({ zipCode: data });
    }

    return (
        <AddressContainer>
            <AddressTopContainer>
                <AddressInput
                    type={'input'}
                    value={addressOne}
                    onChange={(e) => handleAddressOne(e.target.value)}
                    placeholder={'Address Line One'}
                    required
                />
                <AddressInput
                    type={'input'}
                    value={addressTwo}
                    onChange={(e) => handleAddressTwo(e.target.value)}
                    placeholder={'Address Line Two'}
                />
            </AddressTopContainer>
            <AddressBottomContainer>
                <AddressCityInput
                    type={'input'}
                    value={city}
                    onChange={(e) => handleCity(e.target.value)}
                    placeholder={'City'}
                />
                <AddressDropdown
                    name={'state'}
                    value={state}
                    onChange={(e) => handleState(e.target.value)}
                    placeholder={'State'}
                >
                    {states.map((state, index) => 
                            <AddressDropdownOption
                                key={index}
                                value={state.abbreviation}
                            >
                                { state.abbreviation }
                            </AddressDropdownOption>
                    )}
                </AddressDropdown>
                <AddressZipCodeInput
                    type={'number'}
                    value={zipCode}
                    onChange={(e) => handleZipCode(e.target.value)}
                    placeholder={'Zip Code'}
                />
            </AddressBottomContainer>
        </AddressContainer>
    )
}

export default Address;