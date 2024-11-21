import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import ProductCard from '../../product-card/product-card.component';

import { setMobileView, setTabletView } from '../../../tools/mobileView';

import {
  Content,
  ContentContainer,
  ContentLink,
  MainContainer
} from './component-slideshow.styles';

const ComponentSlideshow = ({ products }) => {
  const mainViewAmount = setTabletView() ? 2 : 3;
  const amountDisplayed = setMobileView() ? 1 : mainViewAmount;
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

    const activeProducts = products.filter(product => product.Category.status === true);
    const productsWithInventory = activeProducts.filter(product => product.Inventories[0].quantity !== 0);

    productsWithInventory.forEach((product, index) => {
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
                  <Content key={index}>
                    <ContentLink href={`/shop/${product.Category.type}/${product.Category.name}/${product.name}`}>
                      <ProductCard product={product} />
                    </ContentLink>
                  </Content>
                ))}
            </ContentContainer>
            ))}
        </Slide>
      </MainContainer>
    )
}

export default ComponentSlideshow;