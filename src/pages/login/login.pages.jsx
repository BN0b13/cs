import { useContext } from 'react';

import Login from '../../components/login/login.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
  ContentContainerLight,
  MainContainer
} from '../../styles/page.styles';

const LoginPage = () => {
  const { colors } = useContext(ConfigurationContext);

  return (
    <MainContainer>
      <ContentContainerLight theme={colors} minHeight={true}>
        <Login />
      </ContentContainerLight>
    </MainContainer>
  )
}

export default LoginPage;