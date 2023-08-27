import { useContext } from 'react';

import LoginForm from '../../components/login-form/login-form.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
  LoginPageContainer
} from './login.styles';

const LoginPage = () => {
  const { colors } = useContext(ConfigurationContext);

  return (
    <LoginPageContainer theme={colors}>
      <LoginForm />
    </LoginPageContainer>
  )
}
  


export default LoginPage;