import { useContext } from 'react';

import Button from '../reusable/button/button.component';
import Invoice from '../reusable/invoice/invoice.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
    ThankYouContainer,
    ThankYouText,
    ThankYouTitle
} from './thank-you.styles';

const ThankYou = () => {
    const { colors } = useContext(ConfigurationContext);

    return (
        <ThankYouContainer theme={colors}>
            <ThankYouTitle>Thank You For Your Order!</ThankYouTitle>
            <ThankYouText>Thank you for ordering from Cosmic Strains. If you have a verified email address with us, you will receive an email with details about your order as well as an email with your order's tracking number once we ship it. The details can always be viewed in your account, under order history. We hope to see you again soon!</ThankYouText>
            <Invoice />
            <Button onClick={() => window.location = '/shop?type=seeds'}>Back to Shop</Button>
        </ThankYouContainer>
    );
}

export default ThankYou;