import { useContext } from 'react';

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
                There was an error with your request. Please try again.
            </ErrorPageText>
        </ErrorPageContainer>
    );
};

export default ErrorPage;