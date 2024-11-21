import { useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import ProductFormClones from '../../reusable/forms/product-form-clones/product-form-clones.component';
import ProductFormMerchandise from '../../reusable/forms/product-form-merchandise/product-form-merchandise.component';
import ProductFormSeeds from '../../reusable/forms/product-form-seeds/product-form-seeds.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../contexts/toast.context';

import { productTypes } from '../../../config';

import Client from '../../../tools/client';
import DataHelper from '../../../tools/data.helper';

import {
    ContentContainer,
    Input,
    Label,
    MainContainer,
    Option,
    Select,
    Subtitle,
    Textarea,
    Title
} from '../../../styles/component.styles';

const client = new Client();
const dataHelper = new DataHelper();

const AddRaffle = () => {
    const [ loading, setLoading ] = useState(false);
    const [ productType, setProductType ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ disclaimer, setDisclaimer ] = useState('');
    const [ entryLimit, setEntryLimit ] = useState('');
    const [ entryPrice, setEntryPrice ] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');

    const { errorToast } = useContext(ToastContext);

    const filterStartTime = (date) => {
        const isPastTime = new Date().getTime() > date.getTime();
        return !isPastTime;
    };

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
            return (<ProductFormClones category={null} productType={productType} action={createRaffle} buttonName={'Add Raffle'} />);
        }

        if(productType === 'merchandise') {
            return (<ProductFormMerchandise category={null} productType={productType} action={createRaffle} buttonName={'Add Raffle'} />);
        }
        
        if(productType === 'seeds') {
            return (<ProductFormSeeds category={null} productType={productType} action={createRaffle} buttonName={'Add Raffle'} />);
        }
    }

    const createRaffle = async (params) => {
        if(title === '' ||
            description === '' ||
            entryLimit === '' ||
            entryPrice === ''
        ) {
            errorToast('Please fill out Raffle title, description, entry limit and entry price to create Raffle.')
            return
        }

        setLoading(true);

        let formData;

        if(productType === 'merchandise') {
            formData = dataHelper.merchandiseFormData(params);
        } else {
            formData = dataHelper.geneticsFormData(params);
        }
        
        formData.append('files', image);
        formData.append('title', title);
        formData.set('description', description);
        formData.append('entryLimit', entryLimit);
        formData.append('entryPrice', entryPrice);

        formData.append('productDescription', params.description);

        const res = await client.createRaffle(formData);

        window.location = `/raffles/${res.result.id}`;
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <Title>Add New Raffle</Title>
                    <ContentContainer>
                        <Subtitle>Raffle Details</Subtitle>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'Title'} />
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={'Description'} />
                        <Textarea value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} placeholder={'Disclaimer'} />
                        <Input type={'number'} value={entryLimit} onChange={(e) => setEntryLimit(e.target.value)} placeholder={'Entry Limit'} />
                        <Input type={'number'} value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} placeholder={'Entry Price'} />
                        <>
                            <DatePicker 
                                selected={startDate} 
                                onChange={(e) => setStartDate(e)} 
                                showTimeSelect 
                                timeIntervals={5}
                                minDate={new Date()}
                                filterTime={filterStartTime}
                                placeholderText="Select Start Date and Time"
                            />
                        </>
                        
                        
                        <Subtitle>Select A Product Type:</Subtitle>
                            <Label>Product Type: </Label>
                            <Select value={productType} onChange={(e) => setProductType(e.target.value)}>
                                <Option key={0} value={''} disabled> -- select an option -- </Option>
                                {productTypes.map((type, index) => (
                                        <Option key={index + 1} value={type.type}>{type.name}</Option>
                                ))}
                            </Select>

                        {productType &&
                            <>
                                {imagePreview && <img src={imagePreview} width='100' height='100' alt='preview' />}
                                <Label>Product Image:
                                    <Input type='file' accept='image/*' name='files' onChange={e => handleFileChange(e)} />
                                </Label>

                                { productInputs() }
                            </>
                        }
                    </ContentContainer>
                </>
            }
        </MainContainer>
    )
}

export default AddRaffle;