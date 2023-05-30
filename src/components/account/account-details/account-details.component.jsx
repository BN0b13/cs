import React, { useEffect, useState, useContext } from 'react';

import Address from '../../address/address.component';
import Button from '../../button/button.component';
import Snackbar from '../../snackbar/snackbar.component';
import Spinner from '../../spinner/spinner.component';

import { UserContext } from '../../../contexts/user.context';

import Client from '../../../tools/client';
import { setMobileView } from '../../../tools/mobileView';

import {
    AccountDetailsContainer,
    AccountDetailsTextContainer,
    AccountEditContainer,
    AccountDetailsSubtitle,
    AccountDetailsInlineTitle,
    AccountDetailsText,
    AccountDetailsTitle,
    AccountAddressContainer,
    AddressContainer,
    AccountDetailsInput,
    TextRowContainer,
    UpdateButtonContainer,
    UpdatePasswordLink
} from './account-details.styles';

const client = new Client();

const AccountDetails = () => {
    const [ showEdit, setShowEdit ] = useState(false);
    const [ email, setEmail ] = useState(null);
    const [ firstName, setFirstName ] = useState(null);
    const [ lastName, setLastName ] = useState(null);
    const [ phone, setPhone ] = useState(null);
    const [ billingAddress, setBillingAddress ] = useState({});
    const [ shippingAddress, setShippingAddress ] = useState({});
    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if(currentUser) {
            setEmail(currentUser.email);
            setPhone(currentUser.phone);
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setBillingAddress(currentUser.billingAddress);
            setShippingAddress(currentUser.shippingAddress);
        }
    }, [ currentUser ]);

    const handleFirstNameChange = (data) => {
        setFirstName(data.target.value);
    }

    const handleLastNameChange = (data) => {
        setLastName(data.target.value);
    }

    const handlePhoneChange = (data) => {
        setPhone(data.target.value);
    }

    const updateBillingAddress = (data) => {
        setBillingAddress({
            ...billingAddress,
            ...data
        });
    }

    const updateShippingAddress = (data) => {
        setShippingAddress({
            ...shippingAddress,
            ...data
        });
    }

    const checkFields = () => {
        if(firstName === '' || 
            lastName === '' || 
            phone === '' ||
            phone.length < 10 ||
            billingAddress.addressOne  === '' ||
            billingAddress.city  === '' ||
            billingAddress.zipCode  === '' ||
            shippingAddress.addressOne === '' ||
            shippingAddress.city === '' ||
            shippingAddress.zipCode === '') {
                setMsgContent('Please fill out all fields to update your account.');
                setMsgType('error');
                setShowMsg(true);
                return false;
        }
        return true;
    }

    const updateUserDetails = async () => {
        if(!checkFields()) {
            return
        }
        const data = {
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress
        };

        await client.updateAccount(data);
        
        window.location = '/account'
    }

    return (
        <>
            {!currentUser ?
                <Spinner />
                :
                showEdit ?
                    <AccountEditContainer>
                        <AccountDetailsTitle>
                            Edit Details
                        </AccountDetailsTitle>
                        <AccountDetailsInput type={'text'} name={'firstName'} value={firstName} onChange={(e) => handleFirstNameChange(e)} placeholder={'First Name'} />
                        <AccountDetailsInput type={'text'} name={'lastName'} value={lastName} onChange={(e) => handleLastNameChange(e)}  placeholder={'Last Name'} />
                        <AccountDetailsInput type={'number'} name={'phone'} value={phone} onChange={(e) => handlePhoneChange(e)} maxLength={10}  placeholder={'Phone'} />
                        <AccountAddressContainer setMobileView={setMobileView()}>
                            <AddressContainer setMobileView={setMobileView()}>
                                <AccountDetailsSubtitle>Billing Address</AccountDetailsSubtitle>
                                <Address address={billingAddress} updateAddress={updateBillingAddress} />
                            </AddressContainer>
                            <AddressContainer setMobileView={setMobileView()}>
                                <AccountDetailsSubtitle>Shipping Address</AccountDetailsSubtitle>
                                <Address address={shippingAddress} updateAddress={updateShippingAddress} />
                            </AddressContainer>
                        </AccountAddressContainer>
                        {showMsg &&
                            <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
                        }
                        <UpdateButtonContainer>
                            <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                            <Button onClick={() => updateUserDetails()}>Update</Button>
                        </UpdateButtonContainer>
                        <UpdatePasswordLink onClick={() => window.location ='/account/update-password'}>Update Password</UpdatePasswordLink>
                    </AccountEditContainer>
                :
                    <AccountDetailsContainer>
                        <AccountDetailsTitle>
                            Account Details
                        </AccountDetailsTitle>
                        <AccountDetailsTextContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Email: </AccountDetailsInlineTitle>
                                <AccountDetailsText>{ email }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>First Name: </AccountDetailsInlineTitle>
                                <AccountDetailsText>{ firstName }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Last Name:</AccountDetailsInlineTitle>
                                <AccountDetailsText>{ lastName }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Phone:</AccountDetailsInlineTitle>
                                <AccountDetailsText>{ phone }</AccountDetailsText>
                            </TextRowContainer>
                            <AccountDetailsSubtitle>Billing Address:</AccountDetailsSubtitle>
                            <AccountDetailsText>{ billingAddress.addressOne }</AccountDetailsText>
                            {billingAddress.addressTwo &&
                                <AccountDetailsText>{ billingAddress.addressTwo }</AccountDetailsText>
                            }
                            <AccountDetailsText>{ billingAddress.city }, { billingAddress.state } { billingAddress.zipCode }</AccountDetailsText>
                            <AccountDetailsSubtitle>Shipping Address:</AccountDetailsSubtitle>
                            <AccountDetailsText>{ shippingAddress.addressOne }</AccountDetailsText>
                            { shippingAddress.addressTwo &&
                                <AccountDetailsText>{ shippingAddress.addressTwo }</AccountDetailsText>
                            }
                            <AccountDetailsText>{ shippingAddress.city }, { shippingAddress.state } { shippingAddress.zipCode }</AccountDetailsText>
                        </AccountDetailsTextContainer>
                        <UpdateButtonContainer>
                            <Button onClick={() => setShowEdit(true)}>Edit Details</Button>
                        </UpdateButtonContainer>
                    </AccountDetailsContainer>
                
            }
        </>
    );
}

export default AccountDetails;