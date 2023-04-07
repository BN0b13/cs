import React from 'react';

import AddressForm from '../address-form/address-form.component';
import Button from '../button/button.component';
import Snackbar from '../snackbar/snackbar.component';
import Spinner from '../spinner/spinner.component';

import { tokenName, api } from '../../config';

import {
  SignUpFormButtonContainer,
  SignUpFormContainer,
  SignUpFormForm,
  SignUpFormInput,
  SignUpFormLabel,
  SignUpFormTitle
} from './sign-up-form.styles';

class SignUpForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
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

  passwordHandler = () => {
    const newPassword = this.state.password;
    const minNumChars = 8;
    const maxNumChars = 30;
    const regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if(newPassword.length < minNumChars || 
      newPassword.length > maxNumChars ||
      !regularExpression.test(newPassword)){
      return false;
    }
    return true;
  }

  checkFields = () => {
    if(!this.state.email.includes('@') || !this.state.email.includes('.')) {
      this.setState({ emailErrVisible: true });
      return false;
    } else {
      this.setState({ emailErrVisible: false });
    }

    const checkPassword = this.passwordHandler();
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
      this.state.address.length === 0 || 
      this.state.city.length === 0 || 
      this.state.state.length === 0 || 
      this.state.zipCode.length === 0 ||
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
      return
    }

    this.setState({ loading: true });
    
    try {
      const body = JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        phone: this.state.phone,
        emailList: this.state.emailList
      });

      const signUp = await fetch(`${api}/users`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });

      const res = await signUp.json();

      if(res.status !== 201) {
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
    if(!this.state.loading) {
      return (
        <Spinner />
      )
    }

    return(
      <SignUpFormContainer>
        <SignUpFormTitle>SIGN UP</SignUpFormTitle>

        <SignUpFormForm>
          <SignUpFormLabel>Email: 
            <SignUpFormInput
              name="email" 
              type="text" 
              value={this.state.email} 
              onChange={this.handleChange}
              required />
          </SignUpFormLabel>
          { this.state.emailErrVisible && 
          <Snackbar msg={this.state.emailErrMsg} show={() => this.setState({ emailErrVisible: false })} />
          }
          <SignUpFormLabel>Password: 
            <SignUpFormInput 
            name="password" 
            type="password" 
            value={this.state.password} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          { this.state.passwordErrVisible && 
          <Snackbar msg={this.state.passwordErrMsg} show={() => this.setState({ passwordErrVisible: false })} />
          }
          <SignUpFormLabel>First Name: 
            <SignUpFormInput 
            name="firstName" 
            type="text" 
            value={this.state.firstName} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>Last Name: 
            <SignUpFormInput 
            name="lastName" 
            type="text" 
            value={this.state.lastName} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <AddressForm 
            address={(address) => this.setState({ address })} 
            city={(city) => this.setState({ city })} 
            state={(state) => this.setState({ state })} 
            zipCode={(zipCode) => this.setState({ zipCode })} 
          />
          <SignUpFormLabel>Phone: 
            <SignUpFormInput 
            name="phone" 
            type="text" 
            value={this.state.phone} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>Email List
            <SignUpFormInput 
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
            <Button onClick={this.props.signUp}>Cancel</Button>
            <Button onClick={this.handleSignUp}>Sign Up</Button>
          </SignUpFormButtonContainer>
        </SignUpFormForm>
      </SignUpFormContainer>
    )
  }
}

export default SignUpForm;