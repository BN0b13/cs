import { useContext, useEffect, useState } from 'react';

import Spinner from '../../components/reusable/spinner/spinner.component';
import ProductCard from './product-card/product-card.component';

import { SearchContext } from '../../contexts/search.context';

import Client from '../../tools/client';

import {
    ProductCardContainer,
    ProductsContainer,
    Products
} from './products.styles';

const client = new Client();

const ProductsPage = () => {
    
    const { termSearched, searchResults } = useContext(SearchContext);
    
    const [ products, setProducts ] = useState(null);

    useEffect(() => {
        setProducts(searchResults);
    }, [searchResults]);

    return (
        <ProductsContainer>
            {!products ?
                <Spinner />
            :
            <>
                <h2>Search Results For: {termSearched.length > 0 ? termSearched : 'No Current Search'}</h2>
                <Products>
                    {products.length === 0 ? 
                        <h2>No Results</h2>
                    :
                        products.map((product, index) => (
                            <ProductCardContainer key={index} onClick={() => window.location.href = `/shop/${product['Category.name']}/${product.name}`}>
                                <ProductCard product={product} />
                            </ProductCardContainer>
                        )) 
                    }
                </Products>
            </>
                
            }
        </ProductsContainer>
    )
}

export default ProductsPage;