import { useContext } from 'react';

import SignUp from '../../components/sign-up/sign-up.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
  ContentContainerDark,
  MainContainer
} from '../../styles/page.styles';

const SignUpPage = () => {
  const { colors } = useContext(ConfigurationContext);
  return (
    <MainContainer>
      <ContentContainerDark theme={colors} minHeight={true}>
        <SignUp />
      </ContentContainerDark>
    </MainContainer>
  )
}
  


export default SignUpPage;