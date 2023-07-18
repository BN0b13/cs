import React, { useEffect, useState } from 'react';

import Slideshow from '../reusable/slideshow/slideshow.component';
import Spinner from '../reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
  WelcomeContainer,
  WelcomeParagraph,
  WelcomeText
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
    <WelcomeContainer>
      {!images ?
          <Spinner />
        :
          images.length === 0 ?
            <></>
          :
            <Slideshow images={images} />
      }
        <WelcomeText>Preparing to launch August 2023</WelcomeText>
        <WelcomeParagraph>Welcome to Cosmic Strains! Your local source for collectible oddities and merchandise. Clothing store coming soon!</WelcomeParagraph>
    </WelcomeContainer>
  );
};

export default Welcome;