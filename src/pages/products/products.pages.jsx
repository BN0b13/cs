import { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Spinner from '../../components/reusable/spinner/spinner.component';
import ProductCard from './product-card/product-card.component';

import { SearchContext } from '../../contexts/search.context';

import Client from '../../tools/client';

import {
    ProductCardContainer,
    ProductsContainer,
    Products,
    ProductSubtext,
    ProductText,
    ResultTextContainer,
    ResultText
} from './products.styles';

const client = new Client();

const ProductsPage = () => {
    
    const { termSearched, searchResults } = useContext(SearchContext);
    
    const [ products, setProducts ] = useState(null);

    useEffect(() => {
        if(!window.location.search) {
            getAllProducts();
        }
    }, []);

    useEffect(() => {
        if(termSearched) {
            setProducts(searchResults);
        }
    }, [searchResults]);

    const getAllProducts = async () => {
        const res = await client.getProducts();
        setProducts(res.rows);
    }

    return (
        <ProductsContainer>
            {!products ?
                <Spinner />
            :
            <>
            {!window.location.search ?
                <ProductText>All Seed Products</ProductText>
            :
            <>
                <ProductSubtext onClick={() => window.location.href = '/products'}>Back To Products</ProductSubtext>
                <ProductText>Search Results For: {termSearched.length > 0 ? termSearched : 'No Current Search'}</ProductText>    
            </>
            }
                    {products.length === 0 ? 
                        <ResultTextContainer>
                            <ResultText>No Results</ResultText>
                        </ResultTextContainer>
                    :
                        <Products>
                            {products.map((product, index) => (
                                <ProductCardContainer key={index} onClick={() => window.location.href = `/shop/${product['Category.name'] || product.Category.name}/${product.name}`}>
                                    <ProductCard product={product} />
                                </ProductCardContainer>
                            ))}
                        </Products>
                    }
            </>
                
            }
        </ProductsContainer>
    )
}

export default ProductsPage;