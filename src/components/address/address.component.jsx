import { useState } from 'react';

import {
    AddressContainer,
    AddressInput,
    AddressInputContainer,
    AddressLabel
} from './address.styles';

const Address = ({ user, updateAddress }) => {
    const [ address, setAddress ] = useState(user.address);
    const [ city, setCity ] = useState(user.city);
    const [ state, setState ] = useState(user.state);
    const [ zipCode, setZipCode ] = useState(user.zipCode);

    const handleAddress = (data) => {
        setAddress(data);
        updateAddress({ address: data });
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
        setZipCode(data);
        updateAddress({ zipCode: data });
    }

    return (
        <AddressContainer>
            <AddressInputContainer>
                <AddressLabel>
                    Address:
                    <AddressInput type={'input'} value={address} onChange={(e) => handleAddress(e.target.value)} />
                </AddressLabel>
            </AddressInputContainer>
            <AddressInputContainer>
                <AddressLabel>
                    City:
                    <AddressInput type={'input'} value={city} onChange={(e) => handleCity(e.target.value)} />
                </AddressLabel>
            </AddressInputContainer>
            <AddressInputContainer>
                <AddressLabel>
                    State:
                    <AddressInput type={'input'} value={state} onChange={(e) => handleState(e.target.value)} />
                </AddressLabel>
            </AddressInputContainer>
            <AddressInputContainer>
                <AddressLabel>
                    Zip Code:
                    <AddressInput type={'number'} value={zipCode} onChange={(e) => handleZipCode(e.target.value)} />
                </AddressLabel>
            </AddressInputContainer>
        </AddressContainer>
    )
}

export default Address;