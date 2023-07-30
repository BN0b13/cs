import React from 'react';

import Button from '../../components/reusable/button/button.component';

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
    return (
        <AboutPageContainer>
            <ContentContainer>
                <AboutPageImage src={logo} />
                <AboutPageTitle>About Cosmic Strains</AboutPageTitle>
                <ContentTextContainer topContainer={true}>
                    <AboutPageText><AboutPageTextBold>OUR MISSION</AboutPageTextBold> at Cosmic Strains is to create the most stable and potent genetics around. This journey will take time and result in a large number of F1 cannabis strains. More than we could ever get to which means our customers are able to collect a piece of our history with never before grown strains. All mother plants have been thoroughly grown and tested for yield, structure, potency, resin production and aroma. Our goal is to eventually make our own F4 cannabis strains and we know how important it is to start with a wide pool of strains.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageText><AboutPageTextBold>OUR PROMISE</AboutPageTextBold> is to always offer our collectible full pack F1 seeds at $64.99. Our full pack collectibles contain 12 regular seeds from our lab, where we work night and day to bring together the best genetics.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageText><AboutPageTextBold>OUR GENETICS</AboutPageTextBold> are a mixture of some of the rarest and most popular strains around. While we completely love the new strains other breeders are coming out with, we also will always hold an affinity in our hearts for where we came from. That means we sought out seeds from legitimate, old school strains such as Sour Diesel, SFVOG, Train Wreck, Purple Haze, Super Silver Haze, Super Lemon Haze, OG Kush, or containing Skunk, Big Bud, Black Widow (known as White Widow in the 90’s) and many more. And as for where we are now? We have also painstakingly pursued getting some of the rarest modern strains such as Pineapple Express, Bruce Banner and Ghost Train Haze, Sugar Cane, Blueberry Muffin or containing Ghost OG, Wedding Cake, Dosidos, Stardawg, Face Off OG and many more. Over the last few years, we have worked hard to refine the strains that we offer. If it doesn’t live up to our standards, it gets chopped down, no exceptions.</AboutPageText>
                    <AboutPageTextBold>- Quality is everything -</AboutPageTextBold>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageText><AboutPageTextBold>OUR PLAN</AboutPageTextBold> is to approach this launching of F4 strains meticulously and carefully. We will be working with fruity, gassy, chemy, og, sours, cookies, diesels, hazes…basically any category of terpene that gets people moving. This will take time and so we have planned out our phases to represent different milestones reached during this trek.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageTextBold>PHASE 0</AboutPageTextBold>
                    <AboutPageText>Phase 0 will last until some time in 2025. During which we will be launching a number of different and interesting lines. Each line will represent one of the terpene or plant characteristics we are after.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageTextBold>PHASE 1</AboutPageTextBold>
                    <AboutPageText>Phase 1 will start with a pause in new lines as we gear up to start working on what we have created thus far. There will most likely be shifting in the mother strains that have been previously available as we make room to let our own strains flourish. Once we are satisfied with what we have chosen, Phase 1 will take on a similar run to the previous phase where new lines will become available.</AboutPageText>
                </ContentTextContainer>
                <ContentTextContainer>
                    <AboutPageTextBold>PHASE 2</AboutPageTextBold>
                    <AboutPageText>Phase 2 will be the longest phase, but will come with the most rewards. During this phase we will begin the exciting journey of creating our own stable F4 lines. Once the F4 lines have been created, Cosmic Strains will offer these collectible seeds on a consistent basis.</AboutPageText>
                </ContentTextContainer>
            </ContentContainer>
            <ButtonContainer>
                <Button onClick={() => window.location.href = '/shop'}>SHOP NOW</Button>
            </ButtonContainer>
        </AboutPageContainer>
    );
};

export default AboutPage;