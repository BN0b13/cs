import { api } from '../../../config';

import {
    GiveawayContainer,
    Footer,
    Name,
    GiveawayImage
} from './giveaway-card.styles';

const GiveawayCard = ({ giveaway }) => {
    console.log('Giveaway: ', giveaway);
    const { status } = giveaway;

    return (
        <GiveawayContainer onClick={() => window.location = `/giveaways/${giveaway.id}`}>
                <GiveawayImage src={api + giveaway.Company.logoPath} alt={giveaway.Company.name} />
            <Footer>
                <Name as='span'>{ giveaway.Company.name }</Name>
            </Footer>
        </GiveawayContainer>
    )
}

export default GiveawayCard;