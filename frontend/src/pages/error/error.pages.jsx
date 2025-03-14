import { useContext } from 'react';

import Button from '../../components/reusable/button/button.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
    ErrorPageContainer,
    ErrorPageText,
    ErrorPageTitle
} from './error.styles';

const ErrorPage = () => {
    const { colors } = useContext(ConfigurationContext);

    return (
        <ErrorPageContainer theme={colors}>
            <ErrorPageTitle>
                ERROR
            </ErrorPageTitle>
            <ErrorPageText>
                The page you requested does not exist
            </ErrorPageText>

            <Button onClick={() => window.location='/'}>Home</Button>
        </ErrorPageContainer>
    );
};

export default ErrorPage;