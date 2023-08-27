import { useContext } from 'react';

import {
  FaInstagram
} from 'react-icons/fa';
import { setMobileView } from '../../../tools/mobileView';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import {
  DisclaimerContainer,
  DisclaimerText,
  FooterContainer,
  FooterText,
  IconContainer,
  MainContainer,
} from './footer.styles';

const Footer = () => {
  const { colors } = useContext(ConfigurationContext);

  return (
  <MainContainer theme={colors}>
    <IconContainer onClick={() => window.location.href = 'https://www.instagram.com/cosmicstrainsofficial'}>
      <FaInstagram size={setMobileView() ? '14' : '28'} />
    </IconContainer>
    <FooterContainer>
      <FooterText>Copyright ©2023 Cosmic Strains</FooterText>
    </FooterContainer>
    <DisclaimerContainer>
      <DisclaimerText>Ages 21+ USA only</DisclaimerText>
      <DisclaimerText>All products that appear on this site have 0.03% THC or less and are considered hemp by federal law. Seeds are sold as collectible adult souvenirs only and are not intended for any use that does not comply with local laws. We do not respond to any messages regarding germinating seeds or growing cannabis. Please collect responsibly.</DisclaimerText>
    </DisclaimerContainer>
  </MainContainer>
)};

export default Footer;