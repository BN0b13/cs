import React, { useEffect, useState } from 'react';

import AppInformation from '../../components/sections/app-information/app-information.component';
import ProductSlideshow from '../../components/sections/product-slideshow/product-slideshow.component';
import AppLinks from '../../components/sections/app-links/app-links.components';
import Spinner from '../../components/reusable/spinner/spinner.component';
import AppSlideshow from '../../components/sections/app-slideshow/app-slideshow.component';

import Client from '../../tools/client';
import { pagesConfig } from '../../config/cms';

import {
    CustomBackground,
    CustomContainer
} from './custom.styles';

const client = new Client();

const CustomPage = ({ page }) => {
    console.log('Custom Page Data: ', page);
    const [ loading, setLoading ] = useState(true);
    const [ products, setProducts ] = useState('');
    const [ categories, setCategories ] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const productsRes = await client.getProducts();
            const categoriesRes = await client.getAllCategories();

            setProducts(productsRes.rows);
            setCategories(categoriesRes.rows);
            setLoading(false);
        }
        if(pagesConfig.shop.active) {
            getProducts();
        } else {
            setLoading(false);
        }
    }, []);

    const display = () => {
        page.Sections.sort((a, b) => a.position - b.position);

        return page.Sections.map((section, index) => {
            switch(section.type){
                case 'app-slideshow':
                    return ( <AppSlideshow key={index} data={section} />);
                case 'app-links':
                    return (<AppLinks key={index} data={section} />);
                case 'product-slideshow':
                    return(pagesConfig.shop.active &&
                        <ProductSlideshow key={index} products={products} categories={categories} />
                    );
                case 'app-information':
                    return(<AppInformation key={index} data={section} />);
                default:
                  break
              }
        });
    }

    return (
        <CustomContainer>
            {loading ?
                <Spinner />
            :
                display()
            }
        </CustomContainer>
    );
};

export default CustomPage;