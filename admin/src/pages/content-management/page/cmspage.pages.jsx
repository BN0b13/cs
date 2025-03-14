import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddSection from '../../../components/content-management/sections/add-section/add-section.component';
import Sections from '../../../components/reusable/tables/sections-table/sections-table.component';
import Spinner from '../../../components/reusable/spinner/spinner.component';

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

const CMSPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ page, setPage ] = useState('');

    useEffect(() => {
        getPage();

        // eslint-disable-next-line
    }, []);

    const getPage = async () => {
        setLoading(true);
        const res = await client.getPageById(id);

        console.log('GET page by id res: ', res);

        setPage(res);

        setLoading(false);
    }

    return (
        <MainContainer>
            <BackLink onClick={() => window.location.href = `${url}/content-management`}>
                Back To Content Management
            </BackLink>
            {loading ?
                <Spinner />
            :
                page.length === 0 ?
                    <MainTitle>No Page to Display</MainTitle>
                :
                    <ContentContainer>
                        <MainTitle>Page: { page.title }</MainTitle>
                        <Text>Type: { page.type }</Text>
                        <Text>Type: { page.url }</Text>

                        <AddSection pageId={page.id} getPage={getPage} />
                        <ContentContainer>
                            <Sections sections={page.Sections} />
                        </ContentContainer>
                    </ContentContainer>
            }
        </MainContainer>
    )
}

export default CMSPage;