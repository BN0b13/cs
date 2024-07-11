import { useEffect, useState } from 'react';

import Tools from '../../../tools/tools.js';

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

const tools = new Tools();

const Address = ({ address, updateAddress, customSelector = 'address', names = true }) => {
    const [ firstName, setFirstName ] = useState(address.firstName);
    const [ lastName, setLastName ] = useState(address.lastName);
    const [ addressOne, setAddressOne ] = useState(address.addressOne);
    const [ addressTwo, setAddressTwo ] = useState(address.addressTwo);
    const [ city, setCity ] = useState(address.city);
    const [ state, setState ] = useState(address.state || '');
    const [ zipCode, setZipCode ] = useState(address.zipCode);
    const [ selector, setSelector ] = useState('address');

    useEffect(() => {
        if(!address.state) {
            updateAddress({ state: 'AL' });
        }
        if(customSelector) {
            setSelector(customSelector);
        }
    }, []);

    const handleFirstName = (data) => {
        setFirstName(data);
        updateAddress({ firstName: data });
    }

    const handleLastName = (data) => {
        setLastName(data);
        updateAddress({ lastName: data });
    }

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
        const reg = /^\d+$/;
        if(data === '' || (reg.test(data) && data.length <= 5)) {
            setZipCode(data);
            updateAddress({ zipCode: data });
        } else {
            return
        }
    }

    return (
        <AddressContainer>
            <AddressTopContainer>
                {names &&
                    <>
                        <AddressInput
                            type='text'
                            id={`${selector}-firstName`}
                            name='firstName'
                            value={firstName}
                            onChange={(e) => handleFirstName(e.target.value)}
                            placeholder={'First Name'}
                            required
                        />
                        <AddressInput
                            type='text'
                            id={`${selector}-lastName`}
                            name='lastName'
                            value={lastName}
                            onChange={(e) => handleLastName(e.target.value)}
                            placeholder={'Last Name'}
                            required
                        />
                    </>
                }
                <AddressInput
                    type='text'
                    id={`${selector}-addressOne`}
                    name='addressOne'
                    value={addressOne}
                    onChange={(e) => handleAddressOne(e.target.value)}
                    placeholder={'Address Line One'}
                    required
                />
                <AddressInput
                    type='text'
                    id={`${selector}-addressTwo`}
                    name='addressTwo'
                    value={addressTwo}
                    onChange={(e) => handleAddressTwo(e.target.value)}
                    placeholder={'Address Line Two'}
                />
            </AddressTopContainer>
            <AddressBottomContainer>
                <AddressCityInput
                    type='text'
                    id={`${selector}-city`}
                    name={`${selector}-city`}
                    value={city}
                    onChange={(e) => handleCity(e.target.value)}
                    placeholder={'City'}
                />
                <AddressDropdown
                    id={`${selector}-state`}
                    name='state'
                    value={state}
                    onChange={(e) => handleState(e.target.value)}
                >
                    <AddressDropdownOption key={0} value={''} disabled> -- State -- </AddressDropdownOption>
                    {tools.states.map((state, index) => 
                            <AddressDropdownOption
                                key={index + 1}
                                id={state.abbreviation}
                                value={state.abbreviation}
                            >
                                { state.abbreviation }
                            </AddressDropdownOption>
                    )}
                </AddressDropdown>
                <AddressZipCodeInput
                    type='text'
                    id={`${selector}-zipCode`}
                    name='zipCode'
                    value={zipCode}
                    onChange={(e) => handleZipCode(e.target.value)}
                    placeholder={'Zip Code'}
                />
            </AddressBottomContainer>
        </AddressContainer>
    )
}

export default Address;