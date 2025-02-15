import { useContext, useState } from "react";

import AddImage from '../../../reusable/images/add-image/add-image.component';
import Button from "../../../reusable/button/button.component";
import Spinner from "../../../reusable/spinner/spinner.component";

import { ToastContext } from '../../../../contexts/toast.context';

import Client from "../../../../tools/client";

import {
    ImageFileInput,
    MainContainer,
    MainForm,
    MainTitle
} from './import.styles';

const client = new Client();

const ImportWelcomeImage = ({ refreshImages }) => {
    const [ loading, setLoading ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ caption, setCaption ] = useState('');
    const [ link, setLink ] = useState('');
    const [ position, setPosition ] = useState('');
    
    const { errorToast } = useContext(ToastContext);

    const createWelcomeImage = async () => {
        if(image === '') {
            errorToast('Please select an image.');
            return
        }
        setLoading(true);

        let formData = new FormData();

        formData.append('files', image);
        if(caption !== '') {
            formData.append('caption', caption);
        }
        if(link !== '') {
            formData.append('link', link);
        }
        if(position !== '') {
            formData.append('position', position);
        }

        await client.postWelcomeImage(formData);

        setImage('');
        setImagePreview('');
        setCaption('');
        setLink('');
        setPosition('');

        refreshImages();
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <MainTitle>Add New Welcome Image</MainTitle>
                    <MainForm>
                        <AddImage
                            image={image} 
                            setImage={setImage} 
                            imagePreview={imagePreview} 
                            setImagePreview={setImagePreview}
                        />
                        
                        <ImageFileInput type='text' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Caption' />
                        <ImageFileInput type='text' value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link' />
                        <ImageFileInput type='number' value={position} onChange={(e) => setPosition(e.target.value)}  placeholder='Position' />
                    </MainForm>

                    <Button onClick={() => createWelcomeImage()}>Add</Button>
                </>
            }
        </MainContainer>
    )
}

export default ImportWelcomeImage;