import { useEffect, useState } from 'react';

import AddMedia from '../../components/media/add-media/add-media.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle,
    MediasTable,
    MediasTableHeader,
    MediasTableHead,
    MediasTableBody,
    MediasTableRow,
    MediasTableData,
    MediasTitle,
    TabContainer,
    TabSelector
} from './medias.styles';

const client = new Client();

const MediasPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ media, setMedia ] = useState('');

    useEffect(() => {
        getMedia();
    }, []);

    const getMedia = async () => {
        setLoading(true);
        const res = await client.getMedia();
        const sortMediaByType = res.rows.sort((a, b) => a.type.localeCompare(b.type));
        setMedia(sortMediaByType);
        setLoading(false);
    }

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
            return (<AddMedia />);
        }

        return (
            <>
                <MainTitle>Media</MainTitle>
                {loading ? 
                    <Spinner />
                :
                    media ?
                        <MediasTable>
                            <MediasTableHeader>
                                <MediasTableRow>
                                    <MediasTableHead>Type</MediasTableHead>
                                    <MediasTableHead>Title</MediasTableHead>
                                    <MediasTableHead>Position</MediasTableHead>
                                    <MediasTableHead>Active</MediasTableHead>
                                </MediasTableRow>
                            </MediasTableHeader>
                            <MediasTableBody>
                                {media.map((data, index) => (
                                    <MediasTableRow key={index} onClick={() => window.location.href = `/media/${data.id}`}>
                                        <MediasTableData>{data.type}</MediasTableData>
                                        <MediasTableData>{data.title}</MediasTableData>
                                        <MediasTableData>{data.position === 0 ? 'None' : data.position}</MediasTableData>
                                        <MediasTableData>{data.active ? 'Yes' : 'No'}</MediasTableData>
                                    </MediasTableRow>
                                ))}
                            </MediasTableBody>
                        </MediasTable>
                    :
                        <MediasTitle>No Media To Display</MediasTitle>
                }
            </>
        );
    }

    return (
        <MainContainer>
            <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Library</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Media</TabSelector>
                    </TabContainer>
            { showCurrentTab() }
        </MainContainer>
    )
}

export default MediasPage;