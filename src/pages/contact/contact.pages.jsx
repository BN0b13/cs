import React, { useState } from 'react';

import ContactForm from '../../components/contact-form/contact-form.component';
import ThankYou from '../../components/thank-you/thank-you.component';

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