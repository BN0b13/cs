import { useContext, useEffect, useState } from 'react';

import ProductSlideshow from '../product-slideshow/product-slideshow.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import { imageRouter } from '../../../config/images';

import {
  WelcomeContainer,
  WelcomeImageContainer,
  WelcomeOpacity,
  WelcomeSubtitle,
  WelcomeText,
  WelcomeTextContainer,
  WelcomeTitle
} from './app-slideshow.styles';

const AppSlideshow = ({ data }) => {
  const [ images, setImages ] = useState([]);

  const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
      if(data.metadata.images) {
        data.metadata.images.sort((a, b) => a.position - b.position);
        setImages(data.metadata.images);
      }
    }, []);

  return (
    <WelcomeContainer theme={colors} image={imageRouter.welcome.welcome.background}>
      <WelcomeOpacity theme={colors}>
        <WelcomeImageContainer>
          {images.length > 0 && <ProductSlideshow images={images} />}
        </WelcomeImageContainer>
        <WelcomeTextContainer theme={colors}>
          {data.metadata.title && <WelcomeTitle>{ data.metadata.title }</WelcomeTitle>}
          {data.metadata.subtitle && <WelcomeSubtitle>{ data.metadata.subtitle }</WelcomeSubtitle>}
          {data.metadata.paragraph && <WelcomeText>{ data.metadata.paragraph }</WelcomeText>}
        </WelcomeTextContainer>
      </WelcomeOpacity>
    </WelcomeContainer>
  );
};

export default AppSlideshow;