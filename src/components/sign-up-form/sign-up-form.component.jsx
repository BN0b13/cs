import React from 'react';

import Address from './address/address.component';
import Button from '../reusable/button/button.component';
import Countdown from '../reusable/countdown/countdown.component';
import Snackbar from '../reusable/snackbar/snackbar.component';
import Spinner from '../reusable/spinner/spinner.component';
import TermsAndConditions from '../reusable/terms-and-conditions/terms-and-conditions.component';

import { passwordValidation } from '../../tools/user.js';

import { tokenName } from '../../config';

import Client from '../../tools/client.js';

import {
  SignUpFormButtonContainer,
  SignUpFormContainer,
  SignUpFormForm,
  SignUpFormInput,
  SignUpFormLabel,
  SignUpFormTitle,
  TermsCheckbox,
  TermsContainer,
  TermsText
} from './sign-up-form.styles';

const client = new Client();

class SignUpForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      billingAddress: {
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        zipCode: '',
      },
      shippingAddress: {
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        zipCode: '',
      },
      phone: '',
      eula: false,
      passwordErrVisible: false,
      passwordErrMsg: 'Password needs to be between 8 and 30 characters long with at least one number and one special character.',
      emailErrVisible: false,
      emailErrMsg: 'Please use a valid email address',
      formErrVisible: false,
      formErrMsg: 'Please complete all fields to submit',
      countdown: '',
      showTermsAndConditions: false
    }
  }

  errorHandler = (errMsg) => {
    this.setState({
      loading: false,
      errVisible: true,
      errMsg
    });
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  handlePhoneChange = e => {
    const { name, value } = e.target;
    const reg = /^\d+$/;
    if(value === '' || (reg.test(value) && value.length <= 10)) {
      this.setState({ [name]: value });
    } else {
        return
    }
  }

  handleKeyDown = e => {
    if(e.key === 'Enter') {
      this.handleSignUp(e);
    }
  }

  updateBillingAddress = (data) => {
    this.setState({
      billingAddress: {
        ...this.state.billingAddress,
        ...data
      }
    });
  }

  checkFields = () => {
    if(!this.state.email.includes('@') || !this.state.email.includes('.')) {
      this.setState({ emailErrVisible: true });
      return false;
    } else {
      this.setState({ emailErrVisible: false });
    }

    const checkPassword = passwordValidation(this.state.password);
    if(!checkPassword) {
      this.setState({ passwordErrVisible: true });
      return false;
    } else {
      this.setState({ passwordErrVisible: false });
    }

    if(this.state.email.length === 0 || 
      this.state.password.length === 0 ||  
      this.state.firstName.length === 0 || 
      this.state.lastName.length === 0 || 
      this.state.billingAddress.addressOne.length === 0 || 
      this.state.billingAddress.city.length === 0 || 
      this.state.billingAddress.state.length === 0 || 
      this.state.billingAddress.zipCode.length === 0 ||
      this.state.phone.length === 0 ||
      this.state.eula === false) {
      this.setState({ formErrVisible: true });
      return false;
    }
    return true;
  }

  setShowTermsAndConditions = () => {
    this.setState({ showTermsAndConditions: !this.state.showTermsAndConditions });
  }

  handleSignUp = async (e) => {
    e.preventDefault();

    const checkFields = this.checkFields();
    if(!checkFields) {
      return
    }

    this.setState({ loading: true });
    
    try {
      const data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        billingAddress: this.state.billingAddress,
        shippingAddress: this.state.billingAddress,
        phone: this.state.phone,
        eula: this.state.eula
      };

      const res = await client.createCustomer(data);

      if(res.err) {
        this.setState({ 
          loading: false,
          formErrVisible: true,
          formErrMsg: res.message,
        });
        return
      }

      if(res && res.token) {
        localStorage.setItem(tokenName, res.token);
        window.location = '/';
      }

    } catch (err) {
      this.errorHandler('There was an error. Please try again');
    }
  }

  releaseDate = () => {
    const today = new Date();
    const releaseDay = new Date(2023, 7, 1);

    if(today.getDate() >= releaseDay.getDate() &&
    today.getMonth() >= releaseDay.getMonth() &&
    today.getFullYear() >= releaseDay.getFullYear()) {
      return true;
    }

    return false;
  }

  render() {
    // if(!this.releaseDate()) {
    //   return (
    //     <Countdown />
    //   )
    // }

    if(this.state.loading) {
      return (
        <Spinner />
      )
    }

    return(
      <SignUpFormContainer>
        <TermsAndConditions show={this.state.showTermsAndConditions} setShow={this.setShowTermsAndConditions} />
        <SignUpFormTitle>SIGN UP</SignUpFormTitle>

        <SignUpFormForm onKeyDown={(e) => this.handleKeyDown(e)}>
          <SignUpFormInput
            name={'email'} 
            type={'email'}
            value={this.state.email} 
            onChange={this.handleChange}
            placeholder={'Email'}
            required
          />
          { this.state.emailErrVisible && 
          <Snackbar msg={this.state.emailErrMsg} show={() => this.setState({ emailErrVisible: false })} />
          }
          <SignUpFormInput 
            name={'password'} 
            type={'password'}
            value={this.state.password} 
            onChange={this.handleChange}
            placeholder={'Password'}
            required
          />
          { this.state.passwordErrVisible && 
          <Snackbar msg={this.state.passwordErrMsg} show={() => this.setState({ passwordErrVisible: false })} />
          } 
          <SignUpFormInput 
            name={'firstName'}
            type={'text'}
            value={this.state.firstName} 
            onChange={this.handleChange}
            placeholder={'First Name'}
            required
          />
          <SignUpFormInput 
            name={'lastName'} 
            type={'text'} 
            value={this.state.lastName} 
            onChange={this.handleChange}
            placeholder={'Last Name'}
            required
          />
          <SignUpFormInput 
            name={'phone'}
            type={'text'}
            value={this.state.phone} 
            onChange={this.handlePhoneChange}
            placeholder={'Phone'}
            required 
          />
          <Address 
            address={this.state.billingAddress}
            updateAddress={(data) => this.updateBillingAddress(data)}
          />
          <TermsContainer>
            <TermsCheckbox type='checkbox' value={this.state.eula} onChange={() => this.setState({ eula: !this.state.eula })} />
            <SignUpFormLabel>I am 21 years of age or older and I accept the <TermsText onClick={() => this.setState({ showTermsAndConditions: true })}pan>Terms and Conditions</TermsText></SignUpFormLabel>
          </TermsContainer>
          
          { this.state.formErrVisible && 
          <Snackbar msg={this.state.formErrMsg} show={() => this.setState({ formErrVisible: false })} />
          }
          <SignUpFormButtonContainer>
            <Button onClick={() => window.location ='/login'}>Cancel</Button>
            <Button onClick={this.handleSignUp}>Sign Up</Button>
          </SignUpFormButtonContainer>
        </SignUpFormForm>
      </SignUpFormContainer>
    )
  }
}

export default SignUpForm;