import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductDisplay from '../../components/product-display/product-display.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

const client = new Client();

const Product = () => {
    const { name } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            const res = await client.getProductByName(name);
            setProduct(res);
        }
        getProduct();
    }, []);
    
    return (
        <>
            {product.length === 0 ? 
                <Spinner />
            :
            <ProductDisplay product={product} />
            }
        </>
    );
};

export default Product;