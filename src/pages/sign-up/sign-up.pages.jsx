import { useContext } from 'react';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
  SignUpPageContainer
} from './sign-up.styles';

const SignUpPage = () => {
  const { colors } = useContext(ConfigurationContext);
  return (
    <SignUpPageContainer theme={colors}>
      <SignUpForm />
    </SignUpPageContainer>
  )
}
  


export default SignUpPage;