import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import ProductCard from '../../product-card/product-card.component';

import { setMobileView } from '../../../tools/mobileView';

import {
  Content,
  ContentContainer,
  ContentLink,
  MainContainer
} from './component-slideshow.styles';

const ComponentSlideshow = ({ products, categories }) => {
  const amountDisplayed = setMobileView() ? 1 : 3;
  const [ autoPlay, setAutoPlay ] = useState(true);
  const [ productArray, setProductArray ] = useState([]);
  
  useEffect(() => {
    createProductArray();
    if(productArray.length === 1) {
      setAutoPlay(false);
    }
    
  }, []);

  const createProductArray = () => {
    let count = 0;
    let arr = [];
    let obj = { current: [] };

    const productsWithInventory = products.filter(product => product.Inventories[0].quantity !== 0);

    productsWithInventory.forEach((product, index) => {
      let productCategory = '';
      categories.forEach(category => {
        if(category.id === product.categoryId) { 
          return productCategory = category; 
        }
      });
      product.category = productCategory;
      if(count === amountDisplayed) {
        count = 0;
        arr.push(obj);
        obj = { current: [] };
      }
      if(count < amountDisplayed) {
        count = count + 1;
        obj.current.push(product);
        if(productsWithInventory.length === index + 1) {
          arr.push(obj);
        }
      }
    });

    setProductArray(arr);
  }

    return (
      <MainContainer>
        <Slide autoplay={autoPlay} arrows={autoPlay} duration={5000}>
            {productArray.map((productGroup, index)=> (
            <ContentContainer key={index}>
              {productGroup.current.map((product, index) => (
                <ContentLink key={index} href={`/shop/${product.category}/${product.name}`}>
                  <Content>
                      <ProductCard product={product} />
                  </Content>
                </ContentLink>
              ))}
            </ContentContainer>
            ))}
        </Slide>
      </MainContainer>
    )
}

export default ComponentSlideshow;