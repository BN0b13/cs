import React, { useState, useEffect } from 'react';

import LoginForm from '../../components/login-form/login-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {
  LoginPageContainer
} from './login.styles';

const LoginPage = () => {
  const [currentPage, setCurrentPage] = useState((<LoginForm />));
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    if(newUser) {
      setCurrentPage(<SignUpForm signUp={() => setNewUser(!newUser)} />);
    }
    if(!newUser) {
      setCurrentPage(<LoginForm signUp={() => setNewUser(!newUser)} />);
    }
  }, [ newUser ]);

  return (
    <LoginPageContainer>
      {currentPage}
    </LoginPageContainer>
  )
}
  


export default LoginPage;