import { useState } from 'react';
import ReactPlayer from 'react-player';

import AdminModal from '../../../components/reusable/admin-modal/admin-modal.component';
import Button from '../../../components/reusable/button/button.component';
import Spinner from '../../../components/reusable/spinner/spinner.component';

import Client from '../../../tools/client';
import Tools from '../../../tools/tools';

import {
    ContactInfoContainer,
    DeleteMediaButton,
    UpdateMediaDataContainer,
    UpdateMediaContainer,
    ButtonContainer,
    MainTitle,
    UpdateMediaInput,
    UpdateMediaOption,
    UpdateMediaSelect,
    UpdateMediaTextarea
} from './update-media.styles';

const client = new Client();
const tools = new Tools();

const UpdateMedia = ({ media, completeUpdate }) => {
    const [ loading, setLoading ] = useState(false);
    const [ title, setTitle ] = useState(media.title ? media.title : '');
    const [ url, setUrl ] = useState(media.url ? tools.formatYoutubeUrl(media.url) : '');
    const [ position, setPosition ] = useState(media.position ? media.position : '');
    const [ description, setDescription ] = useState(media.description ? media.description : '');
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const submitUpdate = async () => {
        if(title === '') {
            return
        }

        setLoading(true);

        let data = {
            id: media.id,
            title,
            description,
            position: position ? parseInt(position) : 0
        }

        if(media.type === 'youtube' && url === '' ) {
            data.url = url;
            return
        }

        await client.updateMedia(data);
        await completeUpdate();
    }

    const deleteHandler = () => {
        setShowDeleteModal(true);
    }

    const deleteMedia = async () => {
        await client.deleteMedia({ id: media.id });
        window.location.href = '/media';
    }

    return (
        <>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Media'}
                message={`Are you sure you want to delete ${title} forever?`} 
                action={deleteMedia} 
                actionText={'Delete'}
            />
            {loading ?
             <Spinner />
            :
                <>
                    <MainTitle>Update Media</MainTitle>
                    <UpdateMediaContainer>
                        {media.type === 'youtube' &&
                            <>
                                {url &&
                                    <ReactPlayer
                                        url={url}
                                        width='600px'
                                        height='400px'
                                    />
                                }
                                <UpdateMediaInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Reel URL' />
                            </>
                        }
                        <UpdateMediaInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                        <UpdateMediaTextarea rows="5" cols="50" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                        <UpdateMediaInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
                    </UpdateMediaContainer>
                    
                    <ButtonContainer>
                        <Button onClick={async () => await completeUpdate()}>Cancel</Button>
                        <Button onClick={() => submitUpdate()}>Update</Button>
                    </ButtonContainer>
                    <DeleteMediaButton color='red' onClick={() => deleteHandler()}>DELETE</DeleteMediaButton>
                </>
            }
        </>
    )
}

export default UpdateMedia;