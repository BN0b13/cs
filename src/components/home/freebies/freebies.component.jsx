import Button from '../../reusable/button/button.component';

import backgroundImage from '../../../assets/img/close.png';
import freebies from '../../../assets/img/blueberry-muffin.jpg';

import {
    AboutContainer,
    AboutImage,
    AboutOpacity,
    AboutText,
    AboutTextContainer,
    AboutTitle
} from './freebies.styles';

const Freebies = () => {

    return (
        <AboutContainer image={backgroundImage}>
            <AboutOpacity>
                    <AboutImage src={freebies} />
                <AboutTextContainer>
                    <AboutTitle>- FREEBIES -</AboutTitle>
                    <AboutText>Free seeds with every pack of collectible seeds ordered! Here at Cosmic Strains we wanted to make creating your cannabis seed collection as fun as possible. And who doesn't get excited about freebies?! We are offering a free quarter pack of regular seeds with every full pack of seeds purchased. That's 3 additional seeds with every pack! And the best part...</AboutText>
                    <AboutText>All freebies are UNRELEASED STRAINS!</AboutText>
                </AboutTextContainer>
                <Button onClick={() => window.location.href = '/shop'}>Shop Now</Button>
            </AboutOpacity>
        </AboutContainer>
    )
}

export default Freebies;