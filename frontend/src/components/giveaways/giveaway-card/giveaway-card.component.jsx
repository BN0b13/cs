import { api } from '../../../config/router';
import { imageRouter } from '../../../config/images';

import {
    GiveawayContainer,
    Footer,
    Name,
    GiveawayImage
} from './giveaway-card.styles';

const GiveawayCard = ({ giveaway }) => {
    const img = giveaway.Company.logoPath ? api + giveaway.Company.logoPath : (giveaway.Company.id !== 1 ? imageRouter.giveaways.logo.path : imageRouter.logos.logo.path);

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