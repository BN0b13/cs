import React from 'react';

import ContactForm from '../../components/contact-form/contact-form.component';

import {
    ContactPageContainer,
    ContactPageTitle
} from './contact.styles';

const ContactPage = () => {
    return (
        <ContactPageContainer>
            <ContactPageTitle>
                Contact Us
            </ContactPageTitle>
            <ContactForm />
        </ContactPageContainer>
    );
};

export default ContactPage;