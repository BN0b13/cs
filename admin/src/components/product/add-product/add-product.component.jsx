import { useEffect, useContext, useState } from 'react';

import { ToastContext } from '../../../contexts/toast.context';

import AddImage from '../../reusable/images/add-image/add-image.component';
import ProductFormClones from '../../reusable/forms/product-form-clones/product-form-clones.component';
import ProductFormMerchandise from '../../reusable/forms/product-form-merchandise/product-form-merchandise.component';
import ProductFormSeeds from '../../reusable/forms/product-form-seeds/product-form-seeds.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { categoryTypes } from '../../../assets/shop-types';
import { url } from '../../../config/router';

import Client from '../../../tools/client';
import DataHelper from '../../../tools/data.helper';

import {
    ContentContainer,
    Label,
    MainContainer,
    Option,
    Select,
    Subtitle,
    Text,
    Title
} from '../../../styles/component.styles';

const client = new Client();
const dataHelper = new DataHelper();

const AddProduct = () => {
    const [ loading, setLoading ] = useState(false);
    const [ productType, setProductType ] = useState('');
    const [ categories, setCategories ] = useState([]);
    const [ category, setCategory ] = useState('');
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');

    const { errorToast, successToast } = useContext(ToastContext);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        setLoading(true);
        const res = await client.getAllCategories();
        setCategories(res.rows);
        setLoading(false);
    }

    const changeProductType = (e) => {
        setCategory('');
        setProductType(e);
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            setImage('');
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const productInputs = () => {
        if(productType === 'clones') {
            return (<ProductFormClones category={category} productType={productType} action={createProduct} />);
        }

        if(productType === 'merchandise') {
            return (<ProductFormMerchandise category={category} productType={productType} action={createProduct} />);
        }
        
        if(productType === 'seeds') {
            return (<ProductFormSeeds category={category} productType={productType} action={createProduct} />);
        }
    }

    const createProduct = async (data = null) => {
        // TODO better error handling - should be taken care of at input level
        if(data === null) {
            errorToast('Please fill out all fields.');
            return
        }
        setLoading(true);

        let formData;

        if(productType === 'merchandise') {
            formData = dataHelper.merchandiseFormData(data);
        } else {
            formData = dataHelper.geneticsFormData(data);
        }


        formData.append('files', image);

        const res = await client.createProduct(formData);

        if(res.result) {
            successToast('Product Created Successfully');
            return window.location.href = `${url}/products/${res.result.id}`;
        }
        
        errorToast('There was an error creating product. Please try again.');
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                    <Spinner />
                :
                    <>
                        <Title>Add New Product</Title>
                        <ContentContainer>
                            <Subtitle>Select A Product Type:</Subtitle>
                                <Label>Product Type: </Label>
                                <Select value={productType} onChange={(e) => changeProductType(e.target.value)}>
                                    <Option key={0} value={''} disabled> -- select an option -- </Option>
                                    {categoryTypes.map((type, index) => (
                                            <Option key={index + 1} value={type.type}>{type.name}</Option>
                                    ))}
                                </Select>
                            {productType ?
                                categories.filter(category => category.type === productType).length === 0 ?
                                    <Text>No Categories available matching product type. Please add a category with the desired type to create products</Text>
                                :
                                    <>
                                        <Subtitle>Select A Category</Subtitle>
                                        <Label>Category: </Label>
                                        <Select onChange={(e) => setCategory(e.target.value)} defaultValue={0}>
                                            <Option key={0} value={''}> -- select an option -- </Option>
                                            {categories.map((item, index) => {
                                                if(item.type === productType) {
                                                    return (
                                                        <Option key={index + 1} value={item.id}>{item.name}</Option>
                                                    )
                                                }
                                            })}
                                        </Select>
                                    </>
                            :
                                <></>
                            }
                        </ContentContainer>

                        {category && productType ?
                            <>
                                <AddImage
                                    image={image} 
                                    setImage={setImage} 
                                    imagePreview={imagePreview} 
                                    setImagePreview={setImagePreview}
                                />

                                { productInputs() }
                            </>
                        :
                            <></>
                        }
                    </>
        }
        </MainContainer>
    )
}

export default AddProduct;