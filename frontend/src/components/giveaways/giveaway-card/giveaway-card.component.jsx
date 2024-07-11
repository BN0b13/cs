import { api } from '../../../config';

import friendor from '../../../assets/img/friendor.png';
import logo from '../../../assets/img/logo.png';

import {
    GiveawayContainer,
    Footer,
    Name,
    GiveawayImage
} from './giveaway-card.styles';

const GiveawayCard = ({ giveaway }) => {
    const img = giveaway.Company.logoPath ? api + giveaway.Company.logoPath : (giveaway.Company.id !== 1 ? friendor : logo);

    return (
        <GiveawayContainer onClick={() => window.location = `/giveaways/${giveaway.id}`}>
                <GiveawayImage src={img} alt={giveaway.Company.name} />
            <Footer>
                <Name as='span'>{ giveaway.Company.name }</Name>
            </Footer>
        </GiveawayContainer>
    )
}

export default GiveawayCard;