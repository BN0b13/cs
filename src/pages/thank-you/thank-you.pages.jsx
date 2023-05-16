import React from 'react';

import Button from '../../components/button/button.component';

import {
    ThankYouContainer,
    ThankYouText,
    ThankYouTitle,
    ThankYouSubtitle
} from './thank-you.styles';

const ThankYou = () => {
    const path = window.location.pathname;
    const refId = path.replace('/thankyou/', '');

    if(path === '/thankyou') {
        window.location = '/shop';
    }

    return (
        <ThankYouContainer>
            <ThankYouTitle>Thank You For Your Order!</ThankYouTitle>
            <ThankYouSubtitle>Reference ID: { refId }</ThankYouSubtitle>
            <ThankYouText>Thank you for ordering from Cosmic Strains! You will receive an email shortly with details about your order. You will also receive your tracking number once we have shipped your order.</ThankYouText>
            <Button onClick={() => window.location = '/shop'}>Back to Shop</Button>
        </ThankYouContainer>
    );
}

export default ThankYou;