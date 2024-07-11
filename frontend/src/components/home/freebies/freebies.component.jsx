import { useContext } from 'react';

import Button from '../../reusable/button/button.component';

import backgroundImage from '../../../assets/img/close.webp';
import freebies from '../../../assets/img/blueberry-muffin.webp';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import {
    AboutContainer,
    AboutImage,
    AboutOpacity,
    AboutText,
    AboutTextContainer,
    AboutTitle
} from './freebies.styles';

const Freebies = () => {
    const { colors } = useContext(ConfigurationContext);

    return (
        <AboutContainer theme={colors} image={backgroundImage}>
            <AboutOpacity theme={colors}>
                    <AboutImage src={freebies} />
                <AboutTextContainer theme={colors}>
                    <AboutTitle>- FREEBIES -</AboutTitle>
                    <AboutText>Order a full pack of collectible seeds, and we're gifting you a FREE quarter pack of regular seeds—that's THREE extra seeds with each pack! Elevate your collection with these rare, uncharted strains. Explore the future of cannabis cultivation with Cosmic Strains freebies. And the best part...</AboutText>
                    <AboutText>All our freebies are UNRELEASED STRAINS — exclusive gems from the cannabis galaxy!</AboutText>
                </AboutTextContainer>
                <Button onClick={() => window.location.href = '/shop'}>Shop Now</Button>
            </AboutOpacity>
        </AboutContainer>
    )
}

export default Freebies;