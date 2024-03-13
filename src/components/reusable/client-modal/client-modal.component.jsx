import React from 'react';

import {
  ModalAccessButton,
  ModalDenyButton,
  ModalButtonDiv,
  ModalDiv,
  ModalInput,
  ModalLabel,
  ModalSubtext,
  ModalTitle,
  ModalText,
  Modal
} from './client-modal.styles';

const ClientModal = ({ 
  show = false, 
  setShow, 
  title = null, 
  image = null,
  input = null,
  inputType = 'text', 
  setInput = () => {},
  inputPlaceholder = '',
  label = null,
  message = '',
  subtext = null,
  action = null, 
  actionText = 'Accept',
  allowCancel = true
}) => {
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      action(input);
    }
  }
  
    return (
      <Modal show={show}>
        <ModalDiv>
          {title &&
            <ModalTitle>{ title }</ModalTitle>
          }
          {image &&
            <img src={image}  width='200px' height='200px' />
          }
          <ModalText>{ message }</ModalText>
          {subtext &&
            <ModalSubtext>{ subtext }</ModalSubtext>
          }
          {input !== null &&
            <div onKeyDown={(e) => handleKeyDown(e)}>
              {/* <ModalLabel> */}
                <ModalInput type={inputType} value={input} onChange={(e) => setInput(e.target.value)} autoComplete='off' placeholder={inputPlaceholder}/>
            </div>
          }
              {/* {label && label}
            </ModalLabel> */}
            
          <ModalButtonDiv>
            {allowCancel &&
              <ModalDenyButton onClick={() => setShow(false)}>
                Cancel
              </ModalDenyButton>
            }
            {action !== null &&
              <ModalAccessButton onClick={() => action(input)}>
                { actionText }
              </ModalAccessButton>
            }
          </ModalButtonDiv>
        </ModalDiv>
      </Modal>
    );
}

export default ClientModal;