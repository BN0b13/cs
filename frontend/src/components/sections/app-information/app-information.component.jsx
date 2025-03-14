import { useContext } from 'react';

import Button from '../../reusable/button/button.component';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import { imageRouter } from '../../../config/images';

import {
    AboutContainer,
    AboutImage,
    AboutOpacity,
    AboutText,
    AboutTextContainer,
    AboutTitle
} from './app-information.styles';

const AppInformation = ({ data }) => {
    console.log('App Information data: ', data);
    const { colors } = useContext(ConfigurationContext);

    return (
        <AboutContainer theme={colors} image={imageRouter.welcome.shop.background.path}>
            <AboutOpacity theme={colors}>
                    <AboutImage src={imageRouter.welcome.shop.profile.path} />
                <AboutTextContainer theme={colors}>
                    {data?.metadata?.title && <AboutTitle>{ data.metadata.title }</AboutTitle>}
                    {data?.metadata?.paragraph && <AboutText>{ data.metadata.paragraph }</AboutText>}
                    <AboutText>All our freebies are UNRELEASED STRAINS — exclusive gems from the cannabis galaxy!</AboutText>
                </AboutTextContainer>
                <Button onClick={() => window.location.href = '/shop?type=seeds'}>Shop Now</Button>
            </AboutOpacity>
        </AboutContainer>
    )
}

export default AppInformation;