import { useContext } from 'react';

import Button from '../../components/reusable/button/button.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import logo from '../../assets/img/logo.png';

import {
    AboutPageContainer,
    AboutPageImage,
    AboutPageText,
    AboutPageTextBold,
    AboutPageTitle,
    ButtonContainer,
    ContentContainer,
    ContentTextContainer
} from './about.styles';

const AboutPage = () => {
    const { colors } = useContext(ConfigurationContext);

    return (
        <AboutPageContainer theme={colors}>
            <ContentContainer>
                <AboutPageImage src={logo} />
                <AboutPageTitle>About Cosmic Strains</AboutPageTitle>
                <ContentTextContainer topContainer={true}>
                    <AboutPageText><AboutPageTextBold>OUR MISSION</AboutPageTextBold> at Cosmic Strains transcends mere cultivation—it's about crafting the most stable, potent cannabis genetics imaginable. This cosmic journey is an ongoing odyssey, resulting in an ever-expanding constellation of F1 cannabis strains. More than just strains, they are a piece of our living history, a testament to our relentless pursuit of perfection. Our journey begins with mother plants subjected to rigorous tests for yield, structure, potency, resin production, and aroma, ensuring only the finest genetics make it to your collection.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageText><AboutPageTextBold>OUR PROMISE</AboutPageTextBold> is unwavering: you'll always find our coveted full pack F1 seeds priced at just $64.99. Each pack contains 12 regular seeds, born from our tireless efforts to unite the very best genetics under one celestial roof.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageText><AboutPageTextBold>OUR GENETICS</AboutPageTextBold> consist of an intricate tapestry of rare classics and contemporary legends, an homage to our roots and an embrace of the future. From cherished old-school strains like Sour Diesel and OG Kush to the rarest modern marvels like Sugar Cane and Blueberry Muffin, we've curated a selection that reflects the essence of cannabis culture.</AboutPageText>
                    <AboutPageTextBold>- Quality is everything -</AboutPageTextBold>
                </ContentTextContainer>
            </ContentContainer>
            <ButtonContainer>
                <Button onClick={() => window.location.href = '/shop?type=seeds'}>SHOP NOW</Button>
            </ButtonContainer>
        </AboutPageContainer>
    );
};

export default AboutPage;