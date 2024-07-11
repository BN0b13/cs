import { useContext } from 'react';

import ContactForm from '../../components/contact-form/contact-form.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
    ContactPageContainer,
    ContactPageTitle
} from './contact.styles';

const ContactPage = () => {
    const { colors } = useContext(ConfigurationContext);

    return (
        <ContactPageContainer theme={colors}>
            <ContactPageTitle>
                Contact Us
            </ContactPageTitle>
            <ContactForm />
        </ContactPageContainer>
    );
};

export default ContactPage;