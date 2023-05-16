import React from 'react';

import Address from '../address/address.component';
import Button from '../button/button.component';
import Snackbar from '../snackbar/snackbar.component';
import Spinner from '../spinner/spinner.component';

import { passwordHandler } from '../../tools/user.js';

import { tokenName, api } from '../../config';

import Client from '../../tools/client.js';

import {
  SignUpFormButtonContainer,
  SignUpFormCheckbox,
  SignUpFormContainer,
  SignUpFormForm,
  SignUpFormInput,
  SignUpFormLabel,
  SignUpFormTitle
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
      emailList: false,
      passwordErrVisible: false,
      passwordErrMsg: 'Password needs to be 8 characters in length or more with at least one number and one special character.',
      emailErrVisible: false,
      emailErrMsg: 'Please use a valid email address',
      formErrVisible: false,
      formErrMsg: 'Please complete all fields to submit',
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
    if(name === 'emailList') {
      this.setState({ emailList: !this.state.emailList });
    } else {
      this.setState({ [name]: value });
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

    const checkPassword = passwordHandler(this.state.password);
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
      this.state.phone.length === 0) {
      this.setState({ formErrVisible: true });
      return false;
    }
    return true;
  }

  handleSignUp = async (e) => {
    e.preventDefault();

    const checkFields = this.checkFields();
    if(!checkFields) {
      console.log('Check Fields Failed');
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
        emailList: this.state.emailList
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
        sessionStorage.setItem(tokenName, JSON.stringify(res.data));
        window.location = '/';
      }

    } catch (err) {
      this.errorHandler('There was an error. Please try again');
    }
  }

  render() {
    if(this.state.loading) {
      return (
        <Spinner />
      )
    }

    return(
      <SignUpFormContainer>
        <SignUpFormTitle>SIGN UP</SignUpFormTitle>

        <SignUpFormForm>
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
            onChange={this.handleChange}
            placeholder={'Phone'}
            required 
          />
          <Address 
            address={this.state.billingAddress}
            updateAddress={(data) => this.updateBillingAddress(data)}
          />
          <SignUpFormLabel>Email List 
            <SignUpFormCheckbox 
              name="emailList" 
              type="checkbox" 
              value={this.state.emailList}
              checked={this.state.emailList} 
              onChange={this.handleChange}
              required />
          </SignUpFormLabel>
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