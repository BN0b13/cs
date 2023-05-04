import React from 'react';

import { GrClose } from 'react-icons/gr';

import {
  SnackbarContainer,
  SnackbarHeader,
  SnackbarMessage
} from './snackbar.styles';

const Snackbar = ({ msg, type="err", show }) => {

    return (
      <SnackbarContainer type={ type }>
        <SnackbarHeader>
          <GrClose onClick={() => show()} />
        </SnackbarHeader>
        <SnackbarMessage>
          { msg }
        </SnackbarMessage>
      </SnackbarContainer>
    );
}

export default Snackbar;