import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MediaDisplay from '../../components/media/media-display';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateMedia from '../../components/media/update-media/update-media.component';

import Client from '../../tools/client';

import {
    BackText,
    MainContainer,
    MainTitle,
} from './media.styles';

const client = new Client();

const MediaPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ media, setMedia ] = useState(true);
    const [ showUpdate, setShowUpdate ] = useState(false);

    useEffect(() => {
        getMedia();
    }, []);

    const getMedia = async () => {
        setLoading(true);
        const res = await client.getMediaById(id);
        console.log('RES: ', res);
        setMedia(res);
        setLoading(false);
    }

    const completeUpdate = async () => {
        await getMedia();
        setShowUpdate(false);
    }

    const display = () => {
        if(showUpdate) {
            return (<UpdateMedia media={media} completeUpdate={completeUpdate} />);
        }

        return (<MediaDisplay media={media} getMedia={getMedia} setShowUpdate={setShowUpdate} setLoading={setLoading} />);
    }

    return (
        <>
            <BackText onClick={() => window.location = '/media'}>Back</BackText>
            <MainContainer>
                {loading ?
                    <Spinner />
                :
                    media ?
                        display()
                    :
                        <MainTitle>No Media To Display</MainTitle>
                }
            </MainContainer>
        </>
    )
}

export default MediaPage;