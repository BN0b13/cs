import { React, useState, useEffect } from 'react';
import {
    VscHeartFilled,
    VscHeart
  } from 'react-icons/vsc';

import { useParams } from 'react-router-dom';

import ProductDisplay from '../../components/product-display/product-display.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

const client = new Client();

const Product = () => {
    const { item } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            const res = await client.getProducts();
            const currentProduct = res.rows.filter(data => data.name === item);
            setProduct(currentProduct[0]);
        }
        getProduct();
    }, [item]);
    
    return (
        <>
            {!product ? 
                <Spinner />
            :
            <ProductDisplay product={product} />
            }
        </>
    );
};

export default Product;