import React from 'react';

import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';

import { api } from '../../config';

import {
    ContactFormContainer,
    ContactFormInput,
    ContactFormLabel,
    ContactFormTextArea
} from './contact-form.styles';

class ContactForm extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
        loading: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        hideButton: false,
        errorVisible: false,
        errorMsg: 'There was an error. Please try again.',
        }
    }

    handleChange = e => {
        const { value, name } = e.target;
    
        this.setState({ [name]: value });
      }
    
      checkFields = () => {
        if(this.state.firstName.length > 0 && 
            this.state.lastName.length > 0 && 
            this.state.phone.length > 0 && 
            this.state.email.length > 0 && 
            this.state.message.length > 0) {
          return true
        }
        return false
      }
    
      handleSubmit = async (e) => {
        e.preventDefault();
    
        const checkFields = this.checkFields();
        if(!checkFields){
          this.setState({
            errorVisible: true,
            errorMsg: 'Please complete all fields',
          });
          return
        }
    
        this.setState({ loading: true });
    
        try {
          const contact = await fetch(`${api}/contact`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, same-origin
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              phone: this.state.phone,
              email: this.state.email,
              message: this.state.message,
            })
          });
          
          const res = await contact.json();
          
          if(res.status !== 201) {
            this.setState({ 
              loading: false,
              errorVisible: true,
              errorMsg: res.message,
            });
            return
          }

          this.setState({ 
            loading: false,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            message: '',
            hideButton: true,
            errorVisible: true,
            errorMsg: 'Thank you for your message.',
          });
    
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
        <Spinner />
      )
    }

    return (
        <ContactFormContainer>
            <ContactFormLabel>
                First Name
                <ContactFormInput
                    name="firstName" 
                    type="text" 
                    value={this.state.firstName} 
                    onChange={this.handleChange}
                    required 
                />
            </ContactFormLabel>
            <ContactFormLabel>
                Last Name
                <ContactFormInput
                    name="lastName" 
                    type="text" 
                    value={this.state.lastName} 
                    onChange={this.handleChange}
                    required 
                />
            </ContactFormLabel>
            <ContactFormLabel>
                Phone
                <ContactFormInput 
                    name="phone" 
                    type="tel" 
                    value={this.state.phone} 
                    onChange={this.handleChange}
                    required
                />
            </ContactFormLabel>
            <ContactFormLabel>
                Email
                <ContactFormInput
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    onChange={this.handleChange}
                    required
                />
            </ContactFormLabel>
            <ContactFormLabel>
                <ContactFormTextArea
                    name="message"
                    value={this.state.message} 
                    onChange={this.handleChange}
                    required
                />
            </ContactFormLabel>
            { this.state.errorVisible && 
                <ContactFormContainer onClose={() => this.setState({ errorVisible: false })}>
                {this.state.errorMsg}
                </ContactFormContainer>
            }
            { !this.state.hideButton && 
              <Button onClick={this.handleSubmit}>Submit</Button>
            }
        </ContactFormContainer>
    )
    }
}
  


export default ContactForm;