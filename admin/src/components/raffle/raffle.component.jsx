import Button from '../reusable/button/button.component';

import {
    MainContainer,
    Subtitle,
    Title
} from '../../styles/component.styles';

const Raffle = ({ raffle, showUpdate }) => {

    return (
        <MainContainer>
            <Title>Raffle: { raffle.name }</Title>
            <Subtitle>Description: { raffle.description }</Subtitle>

            <Button onClick={() => showUpdate(true)}>Update Raffle</Button>
        </MainContainer>
    )
}

export default Raffle;