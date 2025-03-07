import { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import {
    MainContainer,
    MainTitle,
    MediaOption,
    MediaSelect,
    MediaInput,
    MediaLabel,
    MediaTextarea,
    ContentContainer,
    ButtonContainer
} from './add-media.styles';

import 'react-h5-audio-player/lib/styles.css';

const client = new Client();

const AddMedia = () => {
    const [ loading, setLoading ] = useState(false);
    
    const [ type, setType ] = useState('');
    const [ media, setMedia ] = useState('');
    const [ mediaPreview, setMediaPreview ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ position, setPosition ] = useState('');
    const [ url, setUrl ] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) {
            return setMediaPreview('');
        }
        
        let url = URL.createObjectURL(file);

        if(type === 'audio') {
            const blob = new Blob([file]);
            url = URL.createObjectURL(blob);
        }
        
        setMedia(file);
        setMediaPreview(url);
    }

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const clearMedia = () => {
        setMediaPreview('');
        setMedia('');
    }
    
    const mediaPlayer = () => {
        if(type === 'audio') {
            return (
                <AudioPlayer
                    src={mediaPreview}
                    showJumpControls={false} // Hides fast forward & rewind buttons
                    customAdditionalControls={[]} // Removes extra controls
                    customVolumeControls={[]} // Optionally remove volume controls
                    layout="stacked" // Optional: Adjusts layout
                />
            );
        }

        if(type === 'video') {
            return (
                <ReactPlayer 
                    url={mediaPreview} 
                    controls 
                    playing={false} 
                    width="300px" 
                    height="550px" 
                    config={{ file: { attributes: { controls: true } } }} 
                />
            );
        }

        if(type === 'youtube') {
            return (
                <ReactPlayer
                    url={url}
                    width='600px'
                    height='400px'
                />
            )
        }
    }

    const submitMedia = async () => {
        if(type === 'youtube') {
            if(title === '' || url === '') {
                return
            }
            setLoading(true);

            const data = {
                url,
                title
            };
    
            description && (data.description = description);
            position && (data.position = position);

            await client.postMediaYoutube(data);
            setLoading(false);
            window.location.href = '/media';
        }

        if(media === '' ||
            title === '') {
            return
        }

        setLoading(true);
        let formData = new FormData();

        formData.append('files', media);
        formData.append('title', title);
        formData.append('position', position);

        description && formData.append('description', description);

        if(type === 'audio') {
            await client.postMediaAudio(formData);
        }

        if(type === 'video') {
            await client.postMediaVideo(formData);
        }


        setLoading(false);
        window.location.href = '/media';
    }

    return (
        <MainContainer>
            {loading ?
             <Spinner />
            :
                <ContentContainer>
                    <MainTitle>Add Media</MainTitle>

                    <MediaSelect name='type' onChange={(e) => setType(e.target.value)} defaultValue={0}>
                        <MediaOption value={0} disabled> -- Media Type -- </MediaOption>
                        <MediaOption value={'audio'}>Audio</MediaOption>
                        <MediaOption value={'video'}>Video</MediaOption>
                        <MediaOption value={'youtube'}>Youtube</MediaOption>
                    </MediaSelect>

                    {type !== '' &&
                        <>
                            { mediaPreview !== '' || ( type === 'youtube' && url !== '') ?
                                <>
                                    { mediaPlayer() }

                                    <ButtonContainer>
                                        <Button onClick={() => clearMedia()}>Cancel</Button>
                                    </ButtonContainer>
                                </>
                            :
                                <>
                                    {type === 'audio' &&
                                        <MediaLabel>
                                            Select Audio
                                            <MediaInput display='none' type='file' accept='audio/mpeg, audio/wav, audio/ogg, audio/aac, audio/x-m4a, .m4a' value={media}  onChange={e => handleFileChange(e)} />
                                        </MediaLabel>}
                                    {type === 'video' &&
                                        <MediaLabel>
                                            Select Video
                                            <MediaInput display='none' type='file' accept='video/mp4,video/x-m4v,video/*' value={media} onChange={(e) => handleFileChange(e)} />
                                        </MediaLabel>}
                                </>
                            }

                            <MediaInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title*' />
                            {type === 'youtube' &&
                                <MediaInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL*' />
                            }
                            <MediaTextarea col='50' rows='5' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                            <MediaInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />

                            <ButtonContainer>
                                <Button onClick={() => submitMedia()}>Submit</Button>
                            </ButtonContainer>
                        </>
                    }
                </ContentContainer>
            }

        </MainContainer>
    )
}

export default AddMedia;