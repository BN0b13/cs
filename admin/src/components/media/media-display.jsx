import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';

import Button from '../reusable/button/button.component.jsx';

import { api } from '../../config/router.js';
import Client from '../../tools/client.js';
import Tools from '../../tools/tools.js';

import {
    ActivationButton,
    ButtonContainer,
    MainContainer,
    MainTitle,
    ContainerColumn,
    ContainerRow,
    Text
} from './media-display.styles';

import 'react-h5-audio-player/lib/styles.css';

const client = new Client();
const tools = new Tools();

const MediaDisplay = ({ media, getMedia, setShowUpdate, setLoading }) => {

    const changeActivationStatus = async () => {
        setLoading(true);
        await client.changeMediaActivationStatus({ id: media.id });
        await getMedia();
    }

    const mediaPlayer = () => {
        if(media.type === 'audio') {
            const url = api + '/media/audio/' + media.filename;
            console.log('Media Audio URL: ', url);
            return (
                <AudioPlayer
                    src={url}
                    preload="auto"
                    showJumpControls={false} // Hides fast forward & rewind buttons
                    customAdditionalControls={[]} // Removes extra controls
                    customVolumeControls={[]} // Optionally remove volume controls
                    layout="stacked" // Optional: Adjusts layout
                />
            )
        }
        if(media.type === 'video') {
            return (
                <ReactPlayer 
                    url={api + '/media/video/' + media.filename}
                    controls 
                    playing={false} 
                    width="300px" 
                    height="auto" 
                    config={{ file: { attributes: { controls: true } } }} 
                />
            )
        }
        if(media.type === 'youtube') {
            return (
                <ReactPlayer
                    url={media.url}
                    width='600px'
                    height='400px'
                />
            )
        }
    }

    return (
        <MainContainer>
            { mediaPlayer() }

            <MainTitle>Media Title: {media.title}</MainTitle>
            <Text>Description: {media.description}</Text>
            
            <ContainerRow>
                <ContainerColumn>
                    <Text>Type: {media.type}</Text>
                    {media.type === 'youtube' &&
                        <Text>URL: {media.url ? tools.formatYoutubeUrl(media.url) : ''}</Text>
                    }
                    <Text>Position: {media.position}</Text>
                    <Text>Active: {media.active ? 'Yes' : 'No'}</Text>
                </ContainerColumn>
            </ContainerRow>
            
            <ButtonContainer>
                <ActivationButton color={media.active ? 'red' : 'green'} onClick={() => changeActivationStatus()}>{ media.active ? 'DEACTIVATE' : 'ACTIVATE' }</ActivationButton>
                <Button onClick={() => setShowUpdate(true)}>Update</Button>
            </ButtonContainer>
        </MainContainer>
    )
}

export default MediaDisplay;