import { useContext, useState, useEffect } from 'react';

import GiveawayCard from '../../components/giveaways/giveaway-card/giveaway-card.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import Client from '../../tools/client';

import {
    GiveawaysActiveContainer,
    GiveawaysCompletedContainer,
    GiveawaysMainTitle,
    GiveawaysTitle,
} from './giveaways.styles';

import {
    MainContainer
} from '../../styles/page.styles';

const client = new Client();

const GiveawaysPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ activeGiveaways, setActiveGiveaways ] = useState('');
    const [ completedGiveaways, setCompletedGiveaways ] = useState('');

    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        getGiveaways();
    }, []);

    const getGiveaways = async () => {
        setLoading(true);
        const res = await client.getGiveaways();

        const activeRes = res.filter(giveaway => giveaway.status === 'active');
        const completedRes = res.filter(giveaway => giveaway.status === 'completed');

        setActiveGiveaways(activeRes);
        setCompletedGiveaways(completedRes)

        setLoading(false);
    }

    return (
        <MainContainer>
            <GiveawaysMainTitle>GIVEAWAYS</GiveawaysMainTitle>
            {loading ?
                <Spinner />
            :
                <>
                    <GiveawaysActiveContainer theme={colors}>
                    <GiveawaysTitle>ACTIVE</GiveawaysTitle>
                        {activeGiveaways.length === 0 ?
                            <GiveawaysTitle>No Active Giveaways</GiveawaysTitle>
                        :
                            activeGiveaways.map((giveaway) => {
                                return (
                                    <GiveawayCard 
                                        key={giveaway.id} 
                                        giveaway={giveaway} 
                                    />
                                )
                            })
                        }
                    </GiveawaysActiveContainer>
                    <GiveawaysCompletedContainer theme={colors}>
                    <GiveawaysTitle>COMPLETED</GiveawaysTitle>
                        {completedGiveaways.length === 0 ?
                            <GiveawaysTitle>No Completed Giveaways</GiveawaysTitle>
                        :
                            completedGiveaways.map((giveaway) => {
                                return (
                                    <GiveawayCard 
                                        key={giveaway.id} 
                                        giveaway={giveaway} 
                                    />
                                )
                            })
                        }
                    </GiveawaysCompletedContainer>
                </>
            }
        </MainContainer>
    )
}

export default GiveawaysPage;