import { useState } from 'react';

import Button from '../../reusable/button/button.component';

import { api } from "../../../config";

import Client from "../../../tools/client";

import {
    ImagesContainer,
    ImageFileInput,
    ImagePlaceholder,
    MainContainer,
    MainTitle
} from './category-images.styles';

const client = new Client();

const CategoryImages = ({ category, getCategory }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const addCategoryImage = async () => {
        if(image === '') {
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('id', category.id);

        await client.addCategoryImage(formData);

        setImage('');
        setImagePreview('');
        setFileInput('');
    }

    const deleteCategoryThumbnail = async () => {
        const data = {
            id: category.id
        };

        await client.deleteCategoryThumbnail(data);

        await getCategory();
    }

    return (
        <MainContainer>
            <ImagesContainer>
                {/* <CategoryImage src={} alt={} /> */}
                {category.backSplashPath ?
                <img src={api + category.backSplashPath} alt='back-splash' width='800' height='300' />
                :
                    <h4>No Category Back Splash Image</h4>
                }
                {category.thumbnailPath ?
                    <>
                        <img src={api + category.thumbnailPath} alt='thumbnail' width='200' height='200' />
                        <button onClick={() => deleteCategoryThumbnail()}>Delete Image</button>
                    </>
                :
                    <h4>No Category Thumbnail Image</h4>
                }
            </ImagesContainer>
            {imagePreview ? 
                    <img src={imagePreview} width='200px' height='200px' alt='preview' />    
                :
                <>
                    <ImagePlaceholder />
                    <MainTitle>Add Product Image</MainTitle>
                </>
                }
                <ImageFileInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
            <Button onClick={() => addCategoryImage()}>Add Thumbnail</Button>
        </MainContainer>
    )
}

export default CategoryImages;