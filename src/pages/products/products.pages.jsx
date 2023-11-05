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
    ProductPaginationContainer,
    ProductPaginationText,
    ProductPaginationTextTitle,
    ProductSizeSelect,
    ProductSizeOption,
    ProductSizeText,
    ProductSubtext,
    ProductText,
    ResultTextContainer,
    ResultText
} from './products.styles';

const client = new Client();

const ProductsPage = () => {
    
    const { termSearched, searchResults, size, changeProductPagination } = useContext(SearchContext);
    
    const [ loading, setLoading ] = useState(false);
    const [ products, setProducts ] = useState(null);

    useEffect(() => {
        if(!window.location.search) {
            getAllProducts();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        if(termSearched) {
            setProducts(searchResults.rows);
        }
        setLoading(false);
    }, [searchResults]);

    const getAllProducts = async () => {
        const res = await client.getProducts();
        setProducts(res.rows);
    }

    const changePageSize = async (pageSize) => {
        await changeProductPagination(0, pageSize);
    }

    const changePage = async (currentPage) => {
        await changeProductPagination(currentPage, size);
    }

    const pagination = () => {
        let index = Math.ceil(searchResults.count / size);
        const paginationArray = [];
        for(let i = 0; i < index; i++) {
            paginationArray.push((<ProductPaginationText key={i} onClick={() => changePage(i)}>{i + 1}</ProductPaginationText>))
        }

        return paginationArray;
    }

    return (
        <ProductsContainer>
            {!products || loading ?
                <Spinner />
            :
            <>
            {!window.location.search ?
                <ProductText>All Seed Products</ProductText>
            :
            <>
                <ProductSubtext onClick={() => window.location.href = '/products'}>Back To Products</ProductSubtext>
                <ProductText>Search Results For: {termSearched.length > 0 ? termSearched : 'No Current Search'}</ProductText>
                <ProductPaginationContainer>
                    <ProductSizeText>Results Per Page: </ProductSizeText>
                    <ProductSizeSelect onChange={(e) => changePageSize(e.target.value)}>
                        <ProductSizeOption value={10}>10</ProductSizeOption>
                        <ProductSizeOption value={25}>25</ProductSizeOption>
                    </ProductSizeSelect>
                </ProductPaginationContainer>
            </>
            }
                    {products.length === 0 ? 
                        <ResultTextContainer>
                            <ResultText>No Results</ResultText>
                        </ResultTextContainer>
                    :
                        <>
                            <Products>
                                {products.map((product, index) => (
                                    <ProductCardContainer key={index} onClick={() => window.location.href = `/shop/${product['Category.name'] || product.Category.name}/${product.name}`}>
                                        <ProductCard product={product} />
                                    </ProductCardContainer>
                                ))}
                            </Products>
                            <ProductPaginationContainer>
                                <ProductPaginationTextTitle>Page:</ProductPaginationTextTitle>{ pagination() }
                            </ProductPaginationContainer>
                        </>
                    }
            </>
            
            }
        </ProductsContainer>
    )
}

export default ProductsPage;