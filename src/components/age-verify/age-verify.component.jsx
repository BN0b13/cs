import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './age-verify.styles.scss';

const AgeVerify = ({ ageVerifyTokenName, ageToken }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        if(!ageToken) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [ ageToken ]);

    const ageVerified = () => {
        localStorage.setItem(ageVerifyTokenName, true);
        setShow(false);
    };

    const accessDenied = () => {
        window.history.back();
    }
  
    return (
      <>
  
        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static"
            centered
            dialogClassName="ageVerifyModal"
        >
          <Modal.Header>
            <Modal.Title>Cosmic Strains Age Check</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please verify your age.</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={accessDenied}>
              I am under 21
            </Button>
            <Button variant="success" onClick={ageVerified}>
              I am 21 or older
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default AgeVerify;