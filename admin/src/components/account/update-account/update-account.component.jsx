import { useContext, useEffect, useState } from 'react';

import Address from '../../reusable/address/address.component';
import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../contexts/toast.context';
import { UserContext } from '../../../contexts/user.context';

import Client from '../../../tools/client';
import { setMobileView } from '../../../tools/mobileView';
import Tools from '../../../tools/tools';

import {
    ContentContainer,
    Input,
    MainContainer,
    Option,
    RowContainer,
    Select,
    Subtitle,
    Title
} from '../../../styles/component.styles';

const client = new Client();
const tools = new Tools();

const UpdateAccount = ({ account, submit, showUpdate }) => {
    const [ loading, setLoading ] = useState(true);
    const [ roleId, setRoleId ] = useState(account.roleId ?? '');
    const [ username, setUsername ] = useState(account.username ?? '');
    const [ email, setEmail ] = useState(account.email ?? '');
    const [ phone, setPhone ] = useState(account.phone ?? '');
    const [ firstName, setFirstName ] = useState(account.firstName ?? '');
    const [ lastName, setLastName ] = useState(account.lastName ?? '');
    const [ billingAddress, setBillingAddress ] = useState(account.billingAddress ?? '');
    const [ shippingAddress, setShippingAddress ] = useState(account.shippingAddress ?? '');
    const [ credit, setCredit ] = useState(account.credit ?? '');
    const [ status, setStatus ] = useState(account.status ?? '');
    
    const [ roles, setRoles ] = useState(null);
    const [ role, setRole ] = useState('');

    const { errorToast } = useContext(ToastContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = async () => {
        setLoading(true);
        const res = await client.getRoles();
        const filteredRoles = res.rows.filter(role => role.id !== 1);
        setRoles(filteredRoles);
        const roleName = res.rows.filter(role => role.id === account.roleId);
        
        setRole(roleName[0].role);
        setRoleId(account.roleId);
        setLoading(false);
    }

    const updateBillingAddress = (data) => {
        setBillingAddress({
            ...billingAddress,
            ...data
        });
    }

    const updateShippingAddress = (data) => {
        setShippingAddress({
            ...shippingAddress,
            ...data
        });
    }

    const submitUpdate = async () => {
        setLoading(true);

        if(roleId === '' ||
            username === '' ||
            firstName === '' ||
            lastName === '' ||
            phone === '' ||
            email === '' ||
            billingAddress === '' ||
            shippingAddress === '' ||
            credit === '' ||
            status === '') {
            errorToast('Please fill out all fields to update account.');
            return
        }

        const params = {
            roleId,
            username,
            firstName,
            lastName,
            phone,
            email,
            billingAddress,
            shippingAddress,
            credit,
            status
        }

        await submit(params);
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <Title>Update Account</Title>

                    <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={'Username'} />
                    {currentUser.roleId === 1 &&
                        <>
                            <Input value={credit} onChange={(e) => tools.nonZeroNumberInput(e.target.value, setCredit)} placeholder={'Credit'} />
                            <Select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                                <Option key={'default'} value={''}>Please Select A Role</Option>
                                {roles &&
                                    roles.map((role, index) => (
                                        <Option key={index} value={role.id}>{ role.role }</Option>
                                    ))}
                            </Select>
                        </>
                    }

                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={'First Name'} />
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={'Last Name'} />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Noble'} />
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={'Phone'} />
                    
                    <RowContainer flexDirection={setMobileView() ? 'column' : 'row'}>
                        <ContentContainer>
                            <Subtitle>Billing Address</Subtitle>
                            <Address address={billingAddress} updateAddress={updateBillingAddress} customSelector={'billingAddress'} />
                        </ContentContainer>
                        <ContentContainer>
                            <Subtitle>Shipping Address</Subtitle>
                            <Address address={shippingAddress} updateAddress={updateShippingAddress} customSelector={'shippingAddress'} />
                        </ContentContainer>
                    </RowContainer>

                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <Option value={''}>Please Select Account Status</Option>
                        <Option value={'active'}>Active</Option>
                        <Option value={'inactive'}>Inactive</Option>
                    </Select>

                    <RowContainer>
                        <Button onClick={() => showUpdate(false)}>Cancel</Button>
                        <Button onClick={() => submitUpdate()}>Confirm</Button>
                    </RowContainer>
                </>
            }
        </MainContainer>
    )
}

export default UpdateAccount;