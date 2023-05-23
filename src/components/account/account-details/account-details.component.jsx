import React, { useEffect, useState, useContext } from 'react';

import Address from '../../address/address.component';
import Button from '../../button/button.component';
import Snackbar from '../../snackbar/snackbar.component';
import Spinner from '../../spinner/spinner.component';

import Client from '../../../tools/client';
import { setMobileView } from '../../../tools/mobileView';

import {
    AccountDetailsContainer,
    AccountDetailsSubtitle,
    AccountDetailsTitle,
    AccountAddressContainer,
    AddressContainer,
    AccountDetailsInput,
    EmailListInput,
    EmailListLabel,
    UpdateButtonContainer
} from './account-details.styles';

const client = new Client();

const AccountDetails = () => {
    const [ user, setUser ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ phone, setPhone ] = useState(null);
    const [ firstName, setFirstName ] = useState(null);
    const [ lastName, setLastName ] = useState(null);
    const [ emailList, setEmailList ] = useState(null);
    const [ billingAddress, setBillingAddress ] = useState({});
    const [ shippingAddress, setShippingAddress ] = useState({});
    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');

    useEffect(() => {
        const getAccountDetails = async () => {
            const account = await client.getAccount();
            setEmail(account.email);
            setPhone(account.phone);
            setFirstName(account.firstName);
            setLastName(account.lastName);
            setBillingAddress(account.billingAddress);
            setShippingAddress(account.shippingAddress);
            setEmailList(account.emailList);
            setUser(account);
        }

        getAccountDetails();
    }, []);

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
            console.log('Please fill all fields');
            return
        }
        const data = {
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
            emailList
        };

        await client.updateAccount(data);
    }

    return (
        <>
            {!user ?
                <Spinner />
                :
                <AccountDetailsContainer>
                    <AccountDetailsTitle>
                        Account Details
                    </AccountDetailsTitle>
                    <AccountDetailsSubtitle>Email: {email}</AccountDetailsSubtitle>
                    {/* <AccountDetailsSubtitle>Password: </AccountDetailsSubtitle> */}
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
                    <EmailListLabel>
                        <EmailListInput type={'checkbox'} value={emailList} defaultChecked={user.emailList} onClick={() => setEmailList(!emailList)} />
                        Email List
                    </EmailListLabel>
                    <UpdateButtonContainer>
                        <Button onClick={() => updateUserDetails()}>Update</Button>
                    </UpdateButtonContainer>
                </AccountDetailsContainer>
            }
        </>
    );
}

export default AccountDetails;