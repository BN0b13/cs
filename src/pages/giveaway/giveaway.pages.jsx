import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    VscArrowRight
} from "react-icons/vsc";

import Giveaway from '../../components/giveaways/giveaway.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import Client from '../../tools/client';

import {
    BackLink,
    MainContainer,
    MainTitle,
    ContentContainerLight
} from '../../styles/page.styles';

const client = new Client();

const GiveawayPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [giveaway, setGiveaway] = useState('');
    
    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        
        getGiveaway();
    }, []);

    const getGiveaway = async () => {
        setLoading(true);
        const res = await client.getGiveawayById(id);
        
        if(res.error) {
            return window.location = '/giveaways';
        }

        setGiveaway(res);
        setLoading(false);
    }
    
    return (
        <MainContainer theme={colors}>
            <BackLink onClick={() => window.location = '/giveaways'}>Giveaways<VscArrowRight /></BackLink>
            <ContentContainerLight minHeight={true}>
            {loading ?
                <Spinner />
            :
                <>
                    <MainTitle>Giveaway by {giveaway.Company.name}</MainTitle>
                        <Giveaway giveaway={giveaway} />
                </>
            }
            </ContentContainerLight>
        </MainContainer>
    );
};

export default GiveawayPage;