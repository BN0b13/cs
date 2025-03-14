import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRedditSquare,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

import { setMobileView } from '../../../tools/mobileView';

import {
  DisclaimerContainer,
  DisclaimerText,
  FooterContainer,
  FooterText,
  IconContainer,
  MainContainer,
} from './footer.styles';

const Footer = ({ colors, company }) => {

  return (
  <MainContainer theme={colors}>
    <FooterContainer>
      {company?.socials?.discord?.active &&
        <IconContainer onClick={() => window.open(company?.socials?.discord?.url, '_blank')} >
          <FaDiscord size={setMobileView() ? '18' : '28'} />
        </IconContainer>
      }
      {company?.socials?.facebook?.active &&
        <IconContainer onClick={() => window.open(company?.socials?.facebook?.url, '_blank')} >
          <FaFacebook size={setMobileView() ? '18' : '28'} />
        </IconContainer>
      }
      {company?.socials?.instagram?.active &&
        <IconContainer onClick={() => window.open(company?.socials?.instagram?.url, '_blank')} >
          <FaInstagram size={setMobileView() ? '18' : '28'} />
        </IconContainer>
      }
      {company?.socials?.linkedin?.active &&
        <IconContainer onClick={() => window.open(company?.socials?.linkedin?.url, '_blank')} >
          <FaLinkedin size={setMobileView() ? '18' : '28'} />
        </IconContainer>
      }
      {company?.socials?.reddit?.active &&
        <IconContainer onClick={() => window.open(company?.socials?.reddit?.url, '_blank')} >
          <FaRedditSquare size={setMobileView() ? '18' : '28'} />
        </IconContainer>
      }
      {company?.socials?.twitter?.active &&
        <IconContainer onClick={() => window.open(company?.socials?.twitter?.url, '_blank')} >
          <FaTwitter size={setMobileView() ? '18' : '28'} />
        </IconContainer>
      }
      {company?.socials?.youtube?.active &&
        <IconContainer onClick={() => window.open(company?.socials?.youtube?.url, '_blank')} >
          <FaYoutube size={setMobileView() ? '18' : '28'} />
        </IconContainer>
      }
    </FooterContainer>
    <FooterContainer>
      <FooterText>Copyright ©{ new Date().getFullYear() } { company?.name }</FooterText>
    </FooterContainer>
    <DisclaimerContainer>
      <DisclaimerText>Ages 21+ USA only</DisclaimerText>
      <DisclaimerText>All products that appear on this site have 0.03% THC or less and are considered hemp by federal law. Seeds are sold as collectible adult souvenirs only and are not intended for any use that does not comply with local laws. We do not respond to any messages regarding germinating seeds or growing cannabis. Please collect responsibly.</DisclaimerText>
    </DisclaimerContainer>
  </MainContainer>
)};

export default Footer;