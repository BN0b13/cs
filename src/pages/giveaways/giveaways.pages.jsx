import { useContext, useState, useEffect } from 'react';

import GiveawayCard from '../../components/giveaways/giveaway-card/giveaway-card.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import {
    GiveawaysActiveContainer,
    GiveawaysCompletedContainer,
    GiveawaysActiveContainerMobile,
    GiveawaysCompletedContainerMobile,
    GiveawaysMainTitle,
    GiveawaysTitle,
} from './giveaways.styles';

import {
    ContentContainer,
    MainContainer,
    MainTitle
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

        console.log('GET giveaways res', res);
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
                setMobileView() ?
                    <>
                        <>
                            <ContentContainer>
                                <GiveawaysActiveContainerMobile theme={colors}>
                                    <GiveawaysTitle>ACTIVE</GiveawaysTitle>
                                    {activeGiveaways &&
                                        activeGiveaways.map((giveaway) => {
                                            return (
                                                <GiveawayCard 
                                                    key={giveaway.id} 
                                                    giveaway={giveaway} 
                                                />
                                            )
                                        })
                                    }
                                </GiveawaysActiveContainerMobile>
                            </ContentContainer>
                            <ContentContainer>
                                <GiveawaysCompletedContainerMobile theme={colors}>
                                    <GiveawaysTitle>COMPLETED</GiveawaysTitle>
                                    {completedGiveaways &&
                                        completedGiveaways.map((giveaway) => {
                                            return (
                                                <GiveawayCard 
                                                    key={giveaway.id} 
                                                    giveaway={giveaway} 
                                                />
                                            )
                                        })
                                    }
                                </GiveawaysCompletedContainerMobile>
                            </ContentContainer>
                        </>
                    </>
                :
                    <>
                        <GiveawaysActiveContainer theme={colors}>
                        <GiveawaysTitle>ACTIVE</GiveawaysTitle>
                            {activeGiveaways &&
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
                            {completedGiveaways &&
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