import { useContext, useState } from 'react';

import { ToastContext } from '../../../../contexts/toast.context';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import Client from '../../../../tools/client';

import { sectionTypes } from '../../../../assets/cms-types.js';

import {
    ContentContainer,
    Input,
    MainContainer,
    Option,
    Select,
    Textarea,
    Title
} from '../../../../styles/component.styles';

const client = new Client();

const AddSection = ({ pageId, getPage }) => {
    const [ loading, setLoading ] = useState(false);
    const [ type, setType ] = useState('');
    const [ content, setContent ] = useState('');

    // Metadata Data
    const [ title, setTitle ] = useState('');
    const [ subtitle, setSubtitle ] = useState('');
    const [ paragraph, setParagraph ] = useState('');
    const [ linkOne, setLinkOne ] = useState('');
    const [ linkOnePath, setLinkOnePath ] = useState('');
    const [ linkTwo, setLinkTwo ] = useState('');
    const [ linkTwoPath, setLinkTwoPath ] = useState('');

    // Image
    const [ image, setImage ] = useState(null);


    const { errorToast, successToast } = useContext(ToastContext);

    const metadataInputs = () => {
        if(type === 'app-slideshow') {
            return (
                <>
                    <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <Input type='text' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder='Subtitle' />
                    <Textarea type='text' value={paragraph} onChange={(e) => setParagraph(e.target.value)} placeholder='Paragraph' />
                </>
            )
        }

        if(type === 'app-links') {
            return (
                <>
                    <Input type='text' value={linkOne} onChange={(e) => setLinkOne(e.target.value)} placeholder='Link One' />
                    <Input type='text' value={linkOnePath} onChange={(e) => setLinkOnePath(e.target.value)} placeholder='Link One Path' />
                    <Input type='text' value={linkTwo} onChange={(e) => setLinkTwo(e.target.value)} placeholder='Link Two' />
                    <Input type='text' value={linkTwoPath} onChange={(e) => setLinkTwoPath(e.target.value)} placeholder='Link Two Path' />
                </>
            )
        }

        if(type === 'app-information') {
            return (
                <>
                    <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <Input type='text' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder='Subtitle' />
                    <Textarea type='text' value={paragraph} onChange={(e) => setParagraph(e.target.value)} placeholder='Paragraph' />
                </>
            )
        }

        return (
            <></>
        )
    }

    const submit = async () => {
        if(type === ''
        ) {
            return errorToast('Please fill out all fields to create Section');
        }
        setLoading(true);

        let formData = new FormData();

        if(image) {
            formData.append('files', image);
        }
        formData.append('pageId', pageId);
        formData.append('type', type);
        formData.append('content', content);
        formData.append('position', 0);
        
        if(type === 'app-slideshow' || type === 'app-information') {
            formData.append('title', title);
            formData.append('subtitle', subtitle);
            formData.append('paragraph', paragraph);
        }
        
        if(type === 'app-links') {
            formData.append('linkOne', linkOne);
            formData.append('linkOnePath', linkOnePath);
            formData.append('linkTwo', linkTwo);
            formData.append('linkTwoPath', linkTwoPath);
        }

        console.log('CREATE Section data: ', formData);
        const res = await client.createSection(formData);
        console.log('Create Section res: ', res);

        await getPage();
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                    <Spinner />
                :
                    <ContentContainer>
                        <Title>Add New Section</Title>
                        
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <Option key={0} value={''} disabled> -- select type -- </Option>
                            {sectionTypes.map((type, index) => (
                                    <Option key={index + 1} value={type.type}>{type.name}</Option>
                            ))}
                        </Select>

                        { metadataInputs() }

                        <Button onClick={() => submit()}>Submit</Button>
                    </ContentContainer>
        }
        </MainContainer>
    )
}

export default AddSection;