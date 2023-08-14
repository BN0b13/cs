import React, { useEffect, useState } from 'react';

import Slideshow from '../../reusable/slideshow/slideshow.component';
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import backSplash from '../../../assets/img/back-splash.png';

import {
  WelcomeContainer,
  WelcomeImageContainer,
  WelcomeOpacity,
  WelcomeSubtitle,
  WelcomeText,
  WelcomeTextContainer,
  WelcomeTitle
} from './welcome.styles';

const client = new Client();

const Welcome = () => {

  const [ images, setImages ] = useState(null);

    useEffect(() => {
        const getImages = async () => {
            const res = await client.getWelcomeImages();

            res.rows.sort((a, b) => a.position - b.position);

            setImages(res.rows);
        }

        getImages();
    }, []);

  return (
    <WelcomeContainer image={backSplash}>
      <WelcomeOpacity>
        <WelcomeImageContainer>
          {!images ?
              <Spinner />
            :
              images.length === 0 ?
                <></>
              :
                <Slideshow images={images} />
          }
        </WelcomeImageContainer>
        <WelcomeTextContainer>
          <WelcomeTitle>Cosmic Strains</WelcomeTitle>
          <WelcomeSubtitle>Collectible Oddities From Out Of This World</WelcomeSubtitle>
          <WelcomeText>Your local source for collectible cannabis seeds. We have an extremely large assortment of F1 lines created with some of the most popular and rarest strains around.</WelcomeText>
        </WelcomeTextContainer>
      </WelcomeOpacity>
    </WelcomeContainer>
  );
};

export default Welcome;