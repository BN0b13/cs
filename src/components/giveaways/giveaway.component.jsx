import { useContext, useEffect, useState } from 'react';

import {
    FaDiscord,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaRedditSquare,
    FaTwitter
} from 'react-icons/fa';

import Button from '../reusable/button/button.component';

import { UserContext } from '../../contexts/user.context';

import { api } from "../../config";

import Client from '../../tools/client';

import {
    CompanyContainer,
    CompanyRowContainer,
    GiveawayContainer,
    Logo,
    MainContainer,
    Subtitle,
    Text,
    Title
} from './giveaway.styles';

const client = new Client();

const Giveaway = ({ giveaway }) => {
    const [ loading, setLoading ] = useState(true);
    const [ giveawayEntryStatus, setGiveawayEntryStatus ] = useState(false);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if(currentUser) {
            checkIfUserEnteredInGiveaway()
        }

    }, [ currentUser]);

    const checkIfUserEnteredInGiveaway = async () => {
        setLoading(true);
        const data = {
            giveawayId: giveaway.id
        };

        const res = await client.checkIfUserEnteredGiveaway(data);

        if(res.length > 0) {
            setGiveawayEntryStatus(true);
        }
        console.log('Did user entry in contest already? ', res);
        setLoading(false);
    }

    const confirmEntry = async () => {
        await submitEntry();
    }

    const submitEntry = async () => {
        const data = {
            giveawayId: giveaway.id
        };
        const res = await client.enterIntoGiveaway(data);
        console.log('RES', res);
    }

    return (
        <MainContainer>
            <CompanyRowContainer>
                <CompanyContainer>
                    <Logo src={api + giveaway.Company.logoPath} />
                </CompanyContainer>
                <CompanyContainer>
                    <Text>Company: {giveaway.Company.name}</Text>
                    <Text>Bio: {giveaway.Company.bio}</Text>
                    <Text>URL: {giveaway.Company.url}</Text>
                    <CompanyRowContainer>
                        {giveaway.Company.socials?.discord &&
                            <FaDiscord onClick={() => window.open(giveaway.Company.socials.discord, '_blank')} />
                        }
                        {giveaway.Company.socials?.facebook &&
                            <FaFacebook onClick={() => window.open(giveaway.Company.socials.facebook, '_blank')} />
                        }
                        {giveaway.Company.socials?.instagram &&
                            <FaInstagram onClick={() => window.open(giveaway.Company.socials.instagram, '_blank')} />
                        }
                        {giveaway.Company.socials?.linkedIn &&
                            <FaLinkedin onClick={() => window.open(giveaway.Company.socials.linkedIn, '_blank')} />
                        }
                        {giveaway.Company.socials?.reddit &&
                            <FaRedditSquare onClick={() => window.open(giveaway.Company.socials.reddit, '_blank')} />
                        }
                        {giveaway.Company.socials?.twitter &&
                            <FaTwitter onClick={() => window.open(giveaway.Company.socials.twitter, '_blank')} />
                        }
                    </CompanyRowContainer>
                </CompanyContainer>
            </CompanyRowContainer>
            <GiveawayContainer>
                <Title>{giveaway.name}</Title>
                <Text>{giveaway.description}</Text>
                {giveaway.rules &&
                    <>
                        <Subtitle>Rules</Subtitle>
                        {giveaway.rules.map((rule, index) => {
                            return (
                                <Text key={index}>{index + 1}. {rule.rule}</Text>
                            )
                        })}
                    </>
                }
                <>
                    <Subtitle>Prizes</Subtitle>
                    {giveaway.prizes.map((prize, index) => {
                        return (
                            <Text key={index}>{index + 1}. {prize.prize}</Text>
                        )
                    })}
                </>
            </GiveawayContainer>
            {!giveawayEntryStatus &&
                <Button onClick={() => confirmEntry()}>Enter</Button>
            }
        </MainContainer>
    )
}

export default Giveaway;