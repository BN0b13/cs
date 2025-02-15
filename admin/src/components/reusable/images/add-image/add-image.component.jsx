import {
    AddImgBtn,
    AddImgInput,
    AddImgLabel,
    AddImgPreviewEmpty,
    AddImgPreview,
    ContentContainer,
    MainContainer,
    Text
} from '../../../../styles/component.styles';

const AddImage = ({ image, setImage, imagePreview, setImagePreview }) => {

    const cancelImage = () => {
        setImage('');
        setImagePreview('');
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <MainContainer>
            <ContentContainer>
                {imagePreview ?
                    <>
                        <AddImgPreview src={imagePreview} />
                        <MainContainer direction={'row'}>
                            <AddImgBtn onClick={() => cancelImage()}>Cancel</AddImgBtn>
                        </MainContainer>
                    </>
                :
                    <>
                        <AddImgPreviewEmpty>
                            <Text>No Image Selected</Text>
                        </AddImgPreviewEmpty>
                        <AddImgLabel>
                            Select Image
                            <AddImgInput type="file" accept='image/*' name="files" value={image} onChange={e => handleFileChange(e)} />
                        </AddImgLabel>
                    </>
                }
            </ContentContainer>
        </MainContainer>
    )
}

export default AddImage;