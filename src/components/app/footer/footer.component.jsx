import { useContext } from 'react';

import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRedditSquare,
  FaTwitter
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

  // {giveaway.Company.socials?.discord &&
  //   <FaDiscord onClick={() => window.open(giveaway.Company.socials.discord, '_blank')} />
  // }
  // {giveaway.Company.socials?.facebook &&
  //     <FaFacebook onClick={() => window.open(giveaway.Company.socials.facebook, '_blank')} />
  // }
  // {giveaway.Company.socials?.instagram &&
  //     <FaInstagram onClick={() => window.open(giveaway.Company.socials.instagram, '_blank')} />
  // }
  // {giveaway.Company.socials?.linkedIn &&
  //     <FaLinkedin onClick={() => window.open(giveaway.Company.socials.linkedIn, '_blank')} />
  // }
  // {giveaway.Company.socials?.reddit &&
  //     <FaRedditSquare onClick={() => window.open(giveaway.Company.socials.reddit, '_blank')} />
  // }
  // {giveaway.Company.socials?.twitter &&
  //     <FaTwitter onClick={() => window.open(giveaway.Company.socials.twitter, '_blank')} />
  // }

  return (
  <MainContainer theme={colors}>
    <FooterContainer>
      <IconContainer onClick={() => window.open('https://www.instagram.com/cosmicstrainsofficial', '_blank')} >
        <FaInstagram size={setMobileView() ? '14' : '28'} />
      </IconContainer>
      <IconContainer onClick={() => window.open('https://www.reddit.com/r/cosmicstrains', '_blank')} >
        <FaRedditSquare size={setMobileView() ? '14' : '28'} />
      </IconContainer>
    </FooterContainer>
    <FooterContainer>
      <FooterText>Copyright ©2024 Cosmic Strains</FooterText>
    </FooterContainer>
    <DisclaimerContainer>
      <DisclaimerText>Ages 21+ USA only</DisclaimerText>
      <DisclaimerText>All products that appear on this site have 0.03% THC or less and are considered hemp by federal law. Seeds are sold as collectible adult souvenirs only and are not intended for any use that does not comply with local laws. We do not respond to any messages regarding germinating seeds or growing cannabis. Please collect responsibly.</DisclaimerText>
    </DisclaimerContainer>
  </MainContainer>
)};

export default Footer;