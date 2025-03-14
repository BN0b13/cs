import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../../components/reusable/button/button.component';
import Spinner from '../../../components/reusable/spinner/spinner.component';
import UpdateSection from '../../../components/content-management/sections/update-section/update-section.component';

import Client from '../../../tools/client';
import { url } from '../../../config/router';

import {
    BackLink,
    ContentContainer,
    MainContainer,
    MainTitle,
    Text
} from '../../../styles/page.styles';

const client = new Client();

const CMSSection = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ section, setSection ] = useState('');

    useEffect(() => {
        getSection();

        // eslint-disable-next-line
    }, []);

    const getSection = async () => {
        setLoading(true);
        const res = await client.getSectionById(id);

        setSection(res);
        setLoading(false);
    }

    const deleteSection = async () => {
        await client.deleteSection(id);
        window.location = `/content-management/pages/${section.pageId}`;
    }

    const display = () => {
        if(showUpdate) {
            return (<UpdateSection section={section} showUpdate={setShowUpdate} deleteSection={deleteSection} submit={updateSection} />)
        }

        return (
            <ContentContainer>
                <MainTitle>Section: { section.type }</MainTitle>
                <Text>Position: { section.position }</Text>
                {section.metadata && Object.entries(section.metadata).map(([key, value], index) => {
                    const entryKey = String(key).charAt(0).toUpperCase() + String(key).slice(1);
                    return (<Text key={index}>{entryKey}: {value}</Text>);
                })}
                <Button onClick={() => setShowUpdate(true)}>Update Section</Button>
            </ContentContainer>
        )
    }

    const updateSection = async (data) => {
        await client.updateSection(section.id, data);
        await getSection();
        setShowUpdate(false);
    }

    return (
        <MainContainer>
            <BackLink onClick={() => window.location = `/content-management/pages/${section.pageId}`}>
                Back To Page
            </BackLink>
            {loading ?
                <Spinner />
            :
                section.length === 0 ?
                    <MainTitle>No Section to Display</MainTitle>
                :
                    display()
            }
        </MainContainer>
    )
}

export default CMSSection;