import { useContext, useState } from 'react';

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';

import {
    AddImgInput,
    AddImgLabel,
    AddImgPreviewEmpty,
    AddImgPreview,
    ContentContainer,
    MainContainer,
    Text
} from '../../../styles/component.styles';

const client = new Client();

const AddCompanyLogo = ({ id, getCompany }) => {
    const [ loading, setLoading ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    
    const { errorToast } = useContext(ToastContext);

    const cancelImage = () => {
        setImage('');
        setImagePreview('');
        setFileInput('');
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const createLogo = async () => {
        setLoading(true);
        if(image === '') {
            errorToast('Please select a logo to submit.');
            setLoading(false);
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('id', id);

        await client.addCompanyLogo(formData);

        cancelImage();

        await getCompany();
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <ContentContainer>
                    {imagePreview ?
                        <>
                            <AddImgPreview src={imagePreview} />
                            <MainContainer direction={'row'}>
                                <Button onClick={() => cancelImage()}>Cancel</Button>
                                <Button onClick={() => createLogo()}>Save</Button>  
                            </MainContainer>
                        </>
                    :
                        <>
                            <AddImgPreviewEmpty>
                                <Text>No Company Logo</Text>
                            </AddImgPreviewEmpty>
                            <AddImgLabel>
                                Add Logo
                                <AddImgInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
                            </AddImgLabel>
                        </>
                    }
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default AddCompanyLogo;