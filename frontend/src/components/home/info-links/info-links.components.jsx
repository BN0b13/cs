import Button from '../../reusable/button/button.component';

import {
    MainContainer,
    InfoLinksButton
} from './info-links.styles';

const InfoLinks = () => {

    return (
        <MainContainer>
            <InfoLinksButton onClick={() => window.location.href = '/sign-up'}>Sign Up</InfoLinksButton>
            <InfoLinksButton onClick={() => window.location.href = '/about'}>About Us</InfoLinksButton>
        </MainContainer>
    )
}

export default InfoLinks;