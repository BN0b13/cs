import Button from '../../reusable/button/button.component';

import backgroundImage from '../../../assets/img/close.png';
import logo from '../../../assets/img/logo.png';

import {
    AboutContainer,
    AboutImage,
    AboutOpacity,
    AboutText,
    AboutTextContainer,
    AboutTitle
} from './about.styles';

const About = () => {

    return (
        <AboutContainer image={backgroundImage}>
            <AboutOpacity>
                <AboutTextContainer>
                    <AboutImage src={logo} width='200' height='200' />
                    <AboutTitle>About Us</AboutTitle>
                    <AboutText>Our mission is to create the most stable and potent genetics around. Our journey will result in more F1's than we can ever get to which means our customers end up with strains no one else has. We pride ourselves in our collection of the rarest and most sought after strains. Please join us on our journey and browse our shop. You never know what you will come across.</AboutText>
                </AboutTextContainer>
                <Button onClick={() => window.location.href = '/shop'}>Shop Now</Button>
            </AboutOpacity>
        </AboutContainer>
    )
}

export default About;