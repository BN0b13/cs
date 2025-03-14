import { useContext, useEffect, useState } from 'react';

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ConfigurationContext } from '../../../contexts/configuration.context';
import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';
import { setMobileView } from '../../../tools/mobileView';

import {
    ContentContainer,
    MainContainer,
    RowContainer,
    Text,
    Title,
    WordBreakContainer
} from '../../../styles/component.styles';

const client = new Client();

const AccountDisplay = ({ account, showUpdate }) => {
    const [ activationLink, setActivationLink ] = useState('');
    const [ role, setRole ] = useState(null);

    const { successToast } = useContext(ToastContext);
    const { configuration } = useContext(ConfigurationContext);

    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        if(configuration && (account.status === 'pending' && account.passwordToken)) {
            const subdomain = account.roleId === 4 ? 'www' : 'admin';
            setActivationLink(`https://${subdomain}.${configuration.company.url}/accounts/activate/${account.passwordToken}`);
        }
    }, [ configuration ]);

    const getRoles = async () => {
        const res = await client.getRoles();
        const roleName = res.rows.filter(role => role.id === account.roleId);
        
        setRole(roleName[0].role);
    }

    const copyActivationLinkToClipBoard = () => {
        navigator.clipboard.writeText(activationLink);
        successToast('Copied Activation Link to Clipboard');
    }

    return (
        <MainContainer>
            {!configuration || !role ?
                <Spinner />
            :
                <>
                    <Title>Account</Title>
                    {account.status === 'pending' ?
                        <WordBreakContainer>
                            <Text>Email: { account.email }</Text>
                            <Text>Status: { account.status }</Text>
                            <Text>Activation Link: { activationLink }</Text>
                            <Button onClick={() => copyActivationLinkToClipBoard()}>Copy to Clipboard</Button>
                        </WordBreakContainer>
                    :
                        <>
                            <Text>Username: { account.username ? account.username : 'No Username' }</Text>
                            <Text>Credit ${ account.credit/100 }</Text>
                            <Text>Role: { role }</Text>
                            <Text>Name: { account.firstName } { account.lastName }</Text>
                            <Text>Email: { account.email }</Text>
                            <Text>Phone: { account.phone }</Text>
                            <RowContainer flexDirection={setMobileView() ? 'column' : 'row'}>
                                <ContentContainer>
                                    <Text>Billing Address:</Text>
                                    <Text>
                                        { account.billingAddress.firstName } { account.billingAddress.lastName }
                                    </Text>
                                    <Text>{ account.billingAddress.addressOne }</Text>
                                    {account.billingAddress.addressTwo &&
                                    <Text>{ account.billingAddress.addressTwo }</Text>
                                    }
                                    <Text>{ account.billingAddress.city }</Text>
                                    <Text>{ account.billingAddress.state }</Text>
                                    <Text>{ account.billingAddress.zipCode }</Text>
                                </ContentContainer>
                                <ContentContainer>
                                    <Text>Shipping Address:</Text>
                                    <Text>{ account.shippingAddress.firstName } { account.shippingAddress.lastName }</Text>
                                    <Text>{ account.shippingAddress.addressOne }</Text>
                                    {account.shippingAddress.addressTwo &&
                                    <Text>{ account.shippingAddress.addressTwo }</Text>
                                    }
                                    <Text>{ account.shippingAddress.city }</Text>
                                    <Text>{ account.shippingAddress.state }</Text>
                                    <Text>{ account.shippingAddress.zipCode }</Text>
                                </ContentContainer>
                            </RowContainer>
                            <Text>Status: { account.status }</Text>

                            <Button onClick={() => showUpdate(true)}>Update Account</Button>
                        </>
                    }
                </>
            }
        </MainContainer>
    )
}

export default AccountDisplay;