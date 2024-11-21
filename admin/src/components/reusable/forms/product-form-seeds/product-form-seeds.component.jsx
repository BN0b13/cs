import { useContext, useEffect, useState } from 'react';

import Button from '../../button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../../contexts/toast.context';

import Client from '../../../../tools/client';

import {
    ContentContainer,
    Input,
    Label,
    Option,
    Select,
    Textarea,
    Text
} from '../../../../styles/component.styles';

const client = new Client();

const ProductFormSeeds = ({ product = null, category, productType, action, buttonName = 'Add Product' }) => {
    const [ loading, setLoading ] = useState(false);
    const [ productProfiles, setProductProfiles ] = useState([]);
    const [ profileArr, setProfileArr ] = useState([]);

    const [ name, setName ] = useState(product ? product.name : '');
    const [ description, setDescription ] = useState(product ? product.description : '');
    const [ time, setTime ] = useState(product ? product.details.time : '');
    const [ mother, setMother ] = useState(product ? product.details.mother : '');
    const [ father, setFather ] = useState(product ? product.details.father : '');
    const [ inventoryType, setInventoryType ] = useState(product ? product.Inventories[0].type : '');
    const [ size, setSize ] = useState(product ? product.Inventories[0].size : '');
    const [ sizeDescription, setSizeDescription ] = useState(product ? product.Inventories[0].sizeDescription : '');
    const [ price, setPrice ] = useState(product ? 
        { 
            value: product.Inventories[0].price, 
            display: `$${product.Inventories[0].price/100}` 
        } 
        : 
        { 
            value: '', 
            display: '$0.00'
        }
    );
    const [ quantity, setQuantity ] = useState(product ? product.Inventories[0].quantity : '');
    
    const { errorToast } = useContext(ToastContext);

    useEffect(() => {
        const getProductProfiles = async () => {
            setLoading(true);
            const res = await client.getProductProfiles();

            const tempProfileArr = [];

            res.rows.forEach(row => tempProfileArr.push({
                id: row.id,
                name: row.name,
                checked: false
            }));

            setProfileArr(tempProfileArr);

            setProductProfiles(res.rows);
            setLoading(false);
        }

        getProductProfiles();
    }, []);

    const handleProductProfile = (e) => {
        const checkboxId = parseInt(e);

        for(let profile of profileArr) {
            if(profile.id === checkboxId) {
                profile.checked = !profile.checked;
            }
        }
    }

    const handleMoneyInput = (e) => {
        if(e < 0) {
            return
        }

        const value = e/1;
        let display = e === 0 ? '$0.00' : `$${e/100}`;

        if(!display.includes('.')) {
            display = display + '.00';
        }

        if(display.indexOf('.') !== (display.length - 3)) {
            display = display + '0';
        }

        const data = {
            value,
            display: display
        };

        setPrice(data);
    }

    const addProduct = async () => {
        if(name === '' || 
            description === '' ||
            time === '' ||
            mother === '' ||
            father === '' ||
            inventoryType === '' ||
            size === '' ||
            sizeDescription === '' ||
            price === '' ||
            quantity === ''
        ) {
            errorToast('Please fill out all fields.');
            return;
        }

        const profile = [];

        for(let item of profileArr) {
            if(item.checked) {
                profile.push(parseInt(item.id));
            }
        }

        const data = {
            category,
            productType,
            name,
            description,
            time,
            mother,
            father,
            profile,
            inventoryType,
            size,
            sizeDescription,
            price,
            quantity
        };

        await action(data);
    }

    return (
        <ContentContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <Input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    <Textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <Input type='text' name='time' value={time} onChange={(e) => setTime(e.target.value)} placeholder='Time' />
                    <Input type='text' name='mother' value={mother} onChange={(e) => setMother(e.target.value)} placeholder='Mother' />
                    <Input type='text' name='father' value={father} onChange={(e) => setFather(e.target.value)} placeholder='Father' />

                    <ContentContainer>
                        {productProfiles.map((item, index) => (
                            <ContentContainer key={index}>
                                <Input type='checkbox' name={item.name} value={item.id} onChange={e => handleProductProfile(e.target.value)} />
                                <Label>{item.name}</Label>
                            </ContentContainer>
                        ))}
                    </ContentContainer>

                    <Select name='inventoryType' value={inventoryType} onChange={(e) => setInventoryType(e.target.value)}>
                        <Option value={''} disabled> -- Seed Type -- </Option>
                        <Option value={'regular'}>Regular</Option>
                        <Option value={'feminized'}>Feminized</Option>
                    </Select>

                    <Select name='size' value={size} onChange={(e) => setSize(e.target.value)}>
                        <Option value={''} disabled> -- Pack Size -- </Option>
                        <Option value={'Full Pack'}>Full Pack</Option>
                        <Option value={'Half Pack'}>Half Pack</Option>
                    </Select>

                    <Input type='text' value={sizeDescription} onChange={(e) => setSizeDescription(e.target.value)} placeholder='Pack Description: 12 Seeds' />
   
                    <Text>{ price.display }</Text>
                    <Input type='number' value={price.value} onChange={(e) => handleMoneyInput(e.target.value)} placeholder='Price' />

                    <Input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Quantity' />
                    <Button onClick={() => addProduct()}>{ buttonName }</Button>
                </>
            }
        </ContentContainer>
    )
}

export default ProductFormSeeds;