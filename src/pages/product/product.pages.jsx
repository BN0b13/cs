import { React, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import ProductDisplay from '../../components/product-display/product-display.component';

import { SHOP_DATA } from '../../assets/inventory/inventory';

const Product = () => {
    const { product } = useParams();

    const categoriesMap = SHOP_DATA;
    const [strain, setStrain] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        categoriesMap.map(current => current.items.map(
            item => {
            if(item.name === product) {
                setStrain(item);
                setCategory(current.title);
                return item;
            }
            return null;
        }));
    }, [product, categoriesMap]);
    
    return (
        <ProductDisplay category={category} strain={strain} />
    );
};

export default Product;