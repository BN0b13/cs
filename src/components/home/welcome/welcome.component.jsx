import { useContext, useEffect, useState } from 'react';

import Slideshow from '../../reusable/slideshow/slideshow.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ConfigurationContext } from '../../../contexts/configuration.context';

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

  const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        const getImages = async () => {
            const res = await client.getWelcomeImages();

            res.rows.sort((a, b) => a.position - b.position);

            setImages(res.rows);
        }

        getImages();
    }, []);

  return (
    <WelcomeContainer theme={colors} image={backSplash}>
      <WelcomeOpacity theme={colors}>
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
        <WelcomeTextContainer theme={colors}>
          <WelcomeTitle>Cosmic Strains</WelcomeTitle>
          <WelcomeSubtitle>Collectible Oddities From Out Of This World</WelcomeSubtitle>
          <WelcomeText>Welcome to Cosmic Strains, your portal to the extraordinary world of F1 cannabis strains. At Cosmic Strains, we're not just growers; we're celestial breeders crafting unique and unparalleled F1 hybrids that defy the ordinary. Our cosmic laboratory blends carefully selected genetics to birth strains that are nothing short of collectible marvels. Each seed is a piece of the universe, a unique expression of nature's wonder, and an opportunity to elevate your cultivation game. Join us on a journey beyond the mundane, and explore the uncharted cosmos of F1 strains at Cosmic Strains.</WelcomeText>
        </WelcomeTextContainer>
      </WelcomeOpacity>
    </WelcomeContainer>
  );
};

export default Welcome;