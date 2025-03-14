
import {
    MainContainer,
    InfoLinksButton
} from './app-links.styles';

const AppLinks = ({ data }) => {
    console.log('App Links data: ', data);

    return (
        <MainContainer>
                <InfoLinksButton onClick={() => window.location.href = data.metadata.linkOnePath}>{ data.metadata.linkOne }</InfoLinksButton>
                <InfoLinksButton onClick={() => window.location.href = data.metadata.linkTwoPath}>{ data.metadata.linkTwo }</InfoLinksButton>
        </MainContainer>
    )
}

export default AppLinks;