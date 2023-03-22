import React from 'react';

import Button from '../button/button.component';

import { tokenName, api } from '../../assets/config';

import {
  SignUpFormButtonContainer,
  SignUpFormContainer,
  SignUpFormForm,
  SignUpFormErrorContainer,
  SignUpFormInput,
  SignUpFormLabel,
  SignUpFormTitle
} from './sign-up-form.styles';

class SignUpForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      errorVisible: false,
      errorMsg: 'There was an error. Please try again.',
    }
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  checkFields = () => {
    if(this.state.username.length > 0 && this.state.password.length > 0 && this.state.recaptcha) {
      return true
    }
    return false
  }

  handleSignUp = async (e) => {
    e.preventDefault();

    const checkFields = this.checkFields();
    if(!checkFields){
      this.setState({
        errorVisible: true,
        errorMsg: 'Please fill out all fields.',
      });
      return
    }

    if(!this.state.email.includes('@')) {
      this.setState({
        errorVisible: true,
        errorMsg: 'Please include a complete email address',
      });
      return
    }

    this.setState({ loading: true });
    
    try {
      const signUp = await fetch(`${api}/api/users`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          username: this.state.username.toLowerCase(),
          password: this.state.password,
          email: this.state.email
        }) // body data type must match "Content-Type" header
      });

      const res = await signUp.json();

      if(res.status !== 201) {
        this.setState({ 
          loading: false,
          errorVisible: true,
          errorMsg: res.message,
        });
        return
      }

      if(res && res.token) {
        localStorage.setItem(tokenName, res.token);
        sessionStorage.setItem(tokenName, JSON.stringify(res.data));
        window.location = '/';
      }

    } catch (err) {
      this.setState({ 
        loading: false,
        errorVisible: true,
        errorMsg: 'There was an error. Please try again.',
      });
    }
  }

  render() {
    if(this.state.loading) {
      return (
        <SignUpFormContainer>
          <SignUpFormTitle>LOADING...</SignUpFormTitle>
        </SignUpFormContainer>
      )
    }

    return(
      <SignUpFormContainer>
        <SignUpFormTitle>SIGN UP</SignUpFormTitle>

        <SignUpFormForm>
          <SignUpFormLabel>Username: 
            <SignUpFormInput 
            name="username" 
            type="text" 
            value={this.state.username} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>Password: 
            <SignUpFormInput 
            name="password" 
            type="password" 
            value={this.state.password} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
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
          <SignUpFormLabel>Email: 
            <SignUpFormInput
            name="email" 
            type="text" 
            value={this.state.email} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>Address: 
            <SignUpFormInput 
            name="address" 
            type="text" 
            value={this.state.address} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>City: 
            <SignUpFormInput 
            name="city" 
            type="text" 
            value={this.state.city} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>State: 
            <SignUpFormInput 
            name="state" 
            type="text" 
            value={this.state.state} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>Zip Code: 
            <SignUpFormInput 
            name="zipCode" 
            type="text" 
            value={this.state.zipCode} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          <SignUpFormLabel>Phone: 
            <SignUpFormInput 
            name="phone" 
            type="text" 
            value={this.state.phone} 
            onChange={this.handleChange}
            required />
          </SignUpFormLabel>
          { this.state.errorVisible && 
          <SignUpFormErrorContainer onClose={() => this.setState({ errorVisible: false })}>
            {this.state.errorMsg}
          </SignUpFormErrorContainer>
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