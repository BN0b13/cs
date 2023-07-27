import * as React from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

import {
    applicationId,
    locationId
} from '../../../config';

const SquarePaymentForm = ({ checkout, buyerData }) => {
    const {
        addressOne,
        addressTwo,
        total,
        city,
        givenName,
        familyName 
    } = buyerData;

    const amount = `${total/100}.00`;
    
    return (
        <PaymentForm
            applicationId={applicationId}
            locationId={locationId}
            cardTokenizeResponseReceived={async (token, buyer) => {
                await checkout({ token, buyer });
            }}
            createVerificationDetails={() => ({
            amount,
            billingContact: {
                addressLines: [ addressOne, addressTwo ],
                familyName,
                givenName,
                countryCode: 'US',
                city,
            },
            currencyCode: 'USD',
            intent: 'CHARGE',
            })}
        >
            <CreditCard />
        </PaymentForm>
    );
};

export default SquarePaymentForm;