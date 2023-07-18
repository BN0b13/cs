import React, { 
  useState, 
  useEffect 
} from 'react';

import {
  AgeVerifyAccessButton,
  AgeVerifyDenyButton,
  AgeVerifyButtonDiv,
  AgeVerifyDiv,
  AgeVerifyTitle,
  AgeVerifyText,
  Modal
} from './age-verify.styles';

import Client from '../../../tools/client';

const client = new Client();

const AgeVerify = ({ ageVerifyTokenName, ageToken, setAgeToken }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      if(ageToken) {
          setShow(false);
      } else {
          setShow(true);
      }
    }, [ ageToken ]);

    const ageVerified = async () => {
      await client.addView();
      sessionStorage.setItem(ageVerifyTokenName, true);
      setAgeToken(sessionStorage.getItem(ageVerifyTokenName));
      setShow(false);
    };

    const accessDenied = () => {
      window.history.back();
    }
  
    return (
      <Modal show={show}>
        <AgeVerifyDiv>
          <AgeVerifyTitle>Cosmic Strains Age Check</AgeVerifyTitle>
          <AgeVerifyText>Please verify your age to enter.</AgeVerifyText>
          <AgeVerifyButtonDiv>
            <AgeVerifyDenyButton onClick={accessDenied}>
              I am under 21
            </AgeVerifyDenyButton>
            <AgeVerifyAccessButton onClick={ageVerified}>
              I am 21 or older
            </AgeVerifyAccessButton>
          </AgeVerifyButtonDiv>
        </AgeVerifyDiv>
      </Modal>
    );
}

export default AgeVerify;