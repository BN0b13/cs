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
                <ContentTextContainer>
                    <AboutPageText><AboutPageTextBold>OUR PLAN</AboutPageTextBold> to create and curate the universes greatest strains will require time and dedication to supreme quality. If a strain doesn't meet our exacting standards, it simply doesn't make the cut—no exceptions. Quality is not just a goal; it's our guiding star.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageTextBold>PHASE 0</AboutPageTextBold>
                    <AboutPageText>Launching a constellation of diverse and intriguing lines, each representing a unique terpene or plant characteristic. Phase 0 extends until 2025, setting the stage for what lies beyond.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageTextBold>PHASE 1</AboutPageTextBold>
                    <AboutPageText>A moment of reflection and refinement. We pause the creation of new lines to nurture the strains we've birthed. Expect shifts in our mother strains, allowing room for our unique creations to flourish. Once ready, Phase 1 ushers in fresh lines of innovation.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageTextBold>PHASE 2</AboutPageTextBold>
                    <AboutPageText>The zenith of our journey, where patience bears the sweetest fruit. In Phase 2, we embark on the thrilling quest to craft our very own stable F4 lines. These lines represent the culmination of our cosmic dedication, and Cosmic Strains will offer them consistently, elevating your collection to the stars.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageText><AboutPageTextBold>JOIN US</AboutPageTextBold> in this cosmic cultivation odyssey, where genetics meet the infinite. At Cosmic Strains, we're not just collectors; we're cosmic curators, dedicated to nurturing the cannabis genetics of tomorrow. Welcome to the cosmos of Cannabis, where the stars are the limit.</AboutPageText>
                </ContentTextContainer>
            </ContentContainer>
            <ButtonContainer>
                <Button onClick={() => window.location.href = '/shop'}>SHOP NOW</Button>
            </ButtonContainer>
        </AboutPageContainer>
    );
};

export default AboutPage;