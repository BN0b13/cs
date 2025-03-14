import { useEffect, useContext, useState } from 'react';

import { ToastContext } from '../../../../contexts/toast.context';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import Client from '../../../../tools/client';

import {
    ContentContainer,
    Input,
    MainContainer,
    Title
} from '../../../../styles/component.styles';

const client = new Client();

const AddPage = () => {
    const [ loading, setLoading ] = useState(false);
    const [ type, setType ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ url, setUrl ] = useState('');


    const { errorToast, successToast } = useContext(ToastContext);

    const submit = async () => {
        if(type === '' ||
            title === '' ||
            url === ''
        ) {
            return errorToast('Please fill out all fields to create Page');
        }
        setLoading(true);

        const data = {
            type,
            title,
            url
        };

        const res = await client.createPage(data);

        window.location = `/content-management/pages/${res.id}`;
    }

    return (
        <MainContainer>
            {loading ?
                    <Spinner />
                :
                    <ContentContainer>
                        <Title>Add New Page</Title>
                        
                        <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                        <Input type='text' value={type} onChange={(e) => setType(e.target.value)} placeholder='Type' />
                        <Input type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL' />

                        <Button onClick={() => submit()}>Submit</Button>
                    </ContentContainer>
        }
        </MainContainer>
    )
}

export default AddPage;