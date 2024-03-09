import { useState } from 'react';

import Address from '../reusable/address/address.component.jsx';
import Button from '../reusable/button/button.component';
import Spinner from '../reusable/spinner/spinner.component';
import TermsAndConditions from '../reusable/terms-and-conditions/terms-and-conditions.component';
import Toasted from '../reusable/toasted/toasted.component.jsx';

import { tokenName } from '../../config';

import Client from '../../tools/client.js';
import UserTools from '../../tools/user.js';

import {
  Disclaimer,
  SignUpFormButtonContainer,
  SignUpFormContainer,
  SignUpFormForm,
  SignUpFormInput,
  SignUpFormLabel,
  SignUpFormTitle,
  TermsCheckbox,
  TermsContainer,
  TermsText
} from './sign-up.styles';

const client = new Client();
const userTools = new UserTools();

const SignUp = () => {
  const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ billingAddress, setBillingAddress ] = useState({
      addressOne: '',
      addressTwo: '',
      city: '',
      state: '',
      zipCode: ''
    });
    const [ showEmailDisclaimer, setShowEmailDisclaimer ] = useState(false);
    const [ showTermsAndConditions, setShowTermsAndConditions ] = useState(false);
    const [ eulaChecked, setEulaChecked ] = useState(false);
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const updateBillingAddress = (data) => {
        setBillingAddress({
            ...billingAddress,
            ...data
        });
    }

    const handleKeyDown = (e) => {
      if(e.key === 'Enter') {
        submitSignUp(e);
      }
    }

    const submitSignUp = async (e) => {
        e.preventDefault();

        const formattedAddress = {
          firstName,
          lastName,
          addressOne: billingAddress.addressOne,
          addressTwo: billingAddress.addressTwo || '',
          city: billingAddress.city,
          state: billingAddress.state,
          zipCode: billingAddress.zipCode,
        }

        const data = {
            email,
            username,
            password,
            confirmPassword,
            firstName,
            lastName,
            phone,
            billingAddress: formattedAddress,
            shippingAddress: formattedAddress,
            eula: eulaChecked
        }

        const validateData = userTools.validate(data);
        if(!validateData.result) {
          errorToast(validateData.error);
          setLoading(false);
          return
        }

        setLoading(true);

        const res = await client.signUp(data);
        if(res.error) {
          errorToast(res.error);
          setLoading(false);
          return
        } else {
          localStorage.setItem(tokenName, res.token);
          return window.location = '/';
        }
    }

    return (
        <SignUpFormContainer>
          {loading ? 
            <Spinner />
          :
            <>
              <TermsAndConditions show={showTermsAndConditions} setShow={setShowTermsAndConditions} />
              <SignUpFormTitle>SIGN UP</SignUpFormTitle>

              <SignUpFormForm onKeyDown={(e) => handleKeyDown(e)}>
                <SignUpFormInput
                  type='email'
                  name='email'
                  value={email} 
                  onChange={(e) => userTools.handleEmailAddress(e.target.value, setEmail, setShowEmailDisclaimer)}
                  placeholder={'Email'}
                  required
                />
                { showEmailDisclaimer &&
                  <Disclaimer>Please note that accounts created with a Hotmail or Yahoo/Ymail email address may not get the emails from our automated email service. All order information including payment links and tracking can be viewed in your account's Order History. You may not be able to reset your password if you forget it.</Disclaimer>
                }
                <SignUpFormInput
                  type='text'
                  name='username' 
                  value={username} 
                  onChange={(e) => userTools.usernameInputValidation(e.target.value, setUsername)}
                  placeholder={'Username'}
                  required
                />
                <SignUpFormInput 
                  type='password'
                  name='password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={'Password'}
                  required
                />
                <SignUpFormInput 
                  type='password'
                  name='confirmPassword' 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={'Confirm Password'}
                  required
                />
                <SignUpFormInput 
                  type='text'
                  name='firstName'
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={'First Name'}
                  required
                />
                <SignUpFormInput 
                  type='text' 
                  name='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={'Last Name'}
                  required
                />
                <SignUpFormInput 
                  type='text'
                  name='phone'
                  value={phone}
                  onChange={(e) => userTools.phoneInputValidation(e.target.value, setPhone)}
                  placeholder={'Phone'}
                  required 
                />
                <Address 
                  address={billingAddress}
                  updateAddress={(data) => updateBillingAddress(data)}
                  customSelector={'sign-up'}
                  names={false}
                />
                <TermsContainer>
                  <TermsCheckbox type='checkbox' value={eulaChecked} onChange={() => setEulaChecked(!eulaChecked)} />
                  <SignUpFormLabel>I am 21 years of age or older and I accept the <TermsText onClick={() => setShowTermsAndConditions(!showTermsAndConditions)}>Terms and Conditions</TermsText></SignUpFormLabel>
                </TermsContainer>

                <SignUpFormButtonContainer>
                  <Button onClick={() => window.location ='/login'}>Cancel</Button>
                  <Button onClick={(e) => submitSignUp(e)}>Sign Up</Button>
                </SignUpFormButtonContainer>
              </SignUpFormForm>
              <Toasted 
                  message={toastMessage}
                  showToast={showToast}
                  setShowToast={setShowToast}
                  getToasted={getToasted}
                  error={toastError}
              />
            </>
          }
      </SignUpFormContainer>
    )
}

export default SignUp;