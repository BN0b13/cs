import { useContext, useState } from 'react';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../../contexts/toast.context';
import { UserContext } from '../../../../contexts/user.context';

import { sectionTypes } from '../../../../assets/cms-types';

import {
    Input,
    MainContainer,
    Option,
    RowContainer,
    Select,
    Textarea,
    Title
} from '../../../../styles/component.styles';

const UpdateSection = ({ section, submit, deleteSection, showUpdate }) => {
    console.log('Update Section: ', section);
    const [ loading, setLoading ] = useState(false);
    const [ type, setType ] = useState(section.type);
    const [ content, setContent ] = useState(section.content);
    const [ position, setPosition ] = useState(section.position);

    // Metadata Data
    const [ title, setTitle ] = useState(section.metadata?.title ?? '');
    const [ subtitle, setSubtitle ] = useState(section.metadata?.subtitle ?? '');
    const [ paragraph, setParagraph ] = useState(section.metadata?.paragraph ?? '');
    const [ linkOne, setLinkOne ] = useState(section.metadata?.linkOne ?? '');
    const [ linkOnePath, setLinkOnePath ] = useState(section.metadata?.linkOnePath ?? '');
    const [ linkTwo, setLinkTwo ] = useState(section.metadata?.linkTwo ?? '');
    const [ linkTwoPath, setLinkTwoPath ] = useState(section.metadata?.linkTwoPath ?? '');
    

    const { errorToast } = useContext(ToastContext);
    const { currentUser } = useContext(UserContext);

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

    const submitUpdate = async () => {
        if(type === '') {
            errorToast('Please fill out all fields to update section.');
            return
        }
        setLoading(true);

        let metadata = {};

        if(type === 'app-slideshow') {
            metadata = {
                title,
                subtitle,
                paragraph
            };
        }

        if(type === 'app-links') {
            metadata = {
                linkOne,
                linkOnePath,
                linkTwo,
                linkTwoPath
            };
        }

        if(type === 'app-information') {
            metadata = {
                title,
                subtitle,
                paragraph
            };
        }

        const data = {
            pageId: section.pageId,
            type,
            content,
            position,
            metadata
        };

        await submit(data);
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <Title>Update Section</Title>

                    <Select value={type} onChange={(e) => setType(e.target.value)}>
                        <Option key={0} value={''} disabled> -- select type -- </Option>
                        {sectionTypes.map((type, index) => (
                                <Option key={index + 1} value={type.type}>{type.name}</Option>
                        ))}
                    </Select>

                    <Input input='number' value={position} onChange={(e) => setPosition(e.target.value)} placeholder='Position' />

                    { metadataInputs() }

                    <RowContainer>
                        <Button onClick={() => showUpdate(false)}>Cancel</Button>
                        <Button onClick={() => submitUpdate()}>Confirm</Button>
                    </RowContainer>
                    <Button onClick={async () => await deleteSection()}>DELETE</Button>
                </>
            }
        </MainContainer>
    )
}

export default UpdateSection;