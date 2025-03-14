import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import {
    FaDiscord,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaRedditSquare,
    FaTwitter
} from 'react-icons/fa';

import Button from '../reusable/button/button.component';
import ClientModal from '../reusable/client-modal/client-modal.component';
import Countdown from '../reusable/countdown/countdown.component';
import Spinner from '../reusable/spinner/spinner.component';

import { ToastContext } from '../../contexts/toast.context';
import { UserContext } from '../../contexts/user.context';

import { api } from '../../config/router';
import { imageRouter } from '../../config/images';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import {
    RowContainer
} from '../../styles/component.styles';

import {
    CompanyContainer,
    CompanyDetailsContainer,
    CompanyLogoContainer,
    CompanyRowContainer,
    Disclaimer,
    GiveawayButtonContainer,
    GiveawayContainer,
    Logo,
    MainContainer,
    Subtitle,
    Text,
    Title,
    WebsiteLink
} from './giveaway.styles';

const client = new Client();

const Giveaway = ({ giveaway, getGiveaway }) => {
    const [ loading, setLoading ] = useState(true);
    const [ company, setCompany ] = useState('');
    const [ giveawayEntryStatus, setGiveawayEntryStatus ] = useState(false);
    const [ userEntryTime, setUserEntryTime ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    
    const { errorToast } = useContext(ToastContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const getConfig = async () => {
            const res = await client.getConfig();
            setCompany(res.rows[0].company);
        }

        getConfig();
    }, []);

    useEffect(() => {
        if(currentUser) {
            checkIfUserEnteredInGiveaway();
        }
        setLoading(false);
    }, [ currentUser]);

    const checkIfUserEnteredInGiveaway = async () => {
        setLoading(true);
        const data = {
            giveawayId: giveaway.id
        };

        const res = await client.checkIfUserEnteredGiveaway(data);

        if(res.error) {
            setGiveawayEntryStatus(true);
            setUserEntryTime(res.entry[0].enteredAt);
        }

        setLoading(false);
    }

    const confirmEntry = async () => {
        if(!currentUser || currentUser === null) {
            errorToast('Please log in to enter giveaway');
            return
        }

        setShowModal(true);
    }

    const submitEntry = async () => {
        if(!currentUser || currentUser === null) {
            errorToast('Please log in to enter giveaway');
            return
        }

        const data = {
            giveawayId: giveaway.id
        };
        const res = await client.enterIntoGiveaway(data);
        if(res.error) {
            errorToast(res.error);
        } else {
            return await getGiveaway();
        }
    }

    return (
        <MainContainer>
            {loading ?
             <Spinner />
            :
                <>
                    <ClientModal 
                        show={showModal}
                        setShow={setShowModal}
                        title={`Enter ${giveaway.Company.name}'s Giveaway`}
                        message={`While we are excited to present ${giveaway.Company.name}'s giveaway to you, it's important to note that ${giveaway.Company.name} operates independently from ${company.companyName}. ${giveaway.Company.name} is solely responsible for managing this giveaway and distributing its prizes. By participating in this giveaway, you consent to sharing your username and email with ${giveaway.Company.name} and grant ${giveaway.Company.name} permission to contact you.`}
                        action={() => submitEntry()} 
                        actionText={'Enter'}
                    />
                    {giveaway.Company.id !== 1 &&
                        <CompanyContainer>
                            <CompanyLogoContainer>
                                <Logo src={giveaway.Company.logoPath ? api + giveaway.Company.logoPath : (giveaway.Company.id !== 1 ? imageRouter.giveaways.logo.path : imageRouter.logos.logo.path)} alt={giveaway.Company.name} />
                            </CompanyLogoContainer>
                            <CompanyDetailsContainer>
                                <Text margin={'20px 0 0 0'}>{giveaway.Company.name}</Text>
                                <Text>{giveaway.Company.bio}</Text>
                                    <>
                                        {giveaway.Company.url &&
                                            <WebsiteLink href={giveaway.Company.url} target='_blank'>{ giveaway.Company.name }'s Website</WebsiteLink>
                                        }
                                        {giveaway.Company.socials !== null &&
                                            <CompanyRowContainer width={'80%'} margin={'20px 0 10px 0'}>
                                                {giveaway.Company.socials[0]?.discord?.display &&
                                                    <RowContainer onClick={() => window.open(giveaway.Company.socials[0].discord.url, '_blank')} margin={'10px'} cursor={'pointer'}>
                                                        <FaDiscord size={setMobileView() ? '18' : '24'} />
                                                    </RowContainer>
                                                }
                                                {giveaway.Company.socials[0]?.facebook?.display &&
                                                    <RowContainer onClick={() => window.open(giveaway.Company.socials[0].facebook.url, '_blank')} margin={'10px'} cursor={'pointer'}>
                                                        <FaFacebook size={setMobileView() ? '18' : '24'} />
                                                    </RowContainer>
                                                }
                                                {giveaway.Company.socials[0]?.instagram?.display &&
                                                    <RowContainer onClick={() => window.open(giveaway.Company.socials[0].instagram.url, '_blank')} margin={'10px'} cursor={'pointer'}>
                                                        <FaInstagram size={setMobileView() ? '18' : '24'} />
                                                    </RowContainer>
                                                }
                                                {giveaway.Company.socials[0]?.linkedIn?.display &&
                                                    <RowContainer onClick={() => window.open(giveaway.Company.socials[0].linkedIn.url, '_blank')} margin={'10px'} cursor={'pointer'}>
                                                        <FaLinkedin size={setMobileView() ? '18' : '24'} />
                                                    </RowContainer>
                                                }
                                                {giveaway.Company.socials[0]?.reddit?.display &&
                                                    <RowContainer onClick={() => window.open(giveaway.Company.socials[0].reddit.url, '_blank')} margin={'10px'} cursor={'pointer'}>
                                                        <FaRedditSquare size={setMobileView() ? '18' : '24'} />
                                                    </RowContainer>
                                                }
                                                {giveaway.Company.socials[0]?.twitter?.display &&
                                                    <RowContainer onClick={() => window.open(giveaway.Company.socials[0].twitter.url, '_blank')} margin={'10px'} cursor={'pointer'}>
                                                        <FaTwitter size={setMobileView() ? '18' : '24'} />
                                                    </RowContainer>
                                                }
                                            </ CompanyRowContainer>
                                        }
                                    </>
                            </CompanyDetailsContainer>
                        </CompanyContainer>
                    }
                    <GiveawayContainer>
                        <Title>{giveaway.name} - {giveaway.status.toUpperCase()}</Title>
                        {giveaway.type === 'scheduled' &&
                            <>
                                <Text>Giveaway Ends: {dayjs(new Date(parseInt(giveaway.expirationDate))).format('MM/DD/YYYY hh:mm a').toString()}</Text>
                                {giveaway.status !== 'completed' &&
                                    <Countdown countdownDate={parseInt(giveaway.expirationDate)} />
                                }
                            </>
                        }
                        <Text>{giveaway.description}</Text>
                        {giveaway.disclaimer &&
                            <Disclaimer>Disclaimer: { giveaway.disclaimer }</Disclaimer>
                        }
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
                                    <div key={index}>
                                        <Text>{index + 1}. {prize.prizeType === 'credit' ? `$${parseInt(prize.prize)/100} credit on account` : prize.prize} - { prize.prizeWinnerLimit } Winner{ prize.prizeWinnerLimit > 1 ? 's' : ''}</Text>
                                        {giveaway.status === 'completed'&&
                                            giveaway.winners.map((winner, index) => {
                                                if(winner.prize.id === prize.id) {
                                                    return(
                                                        <Text key={index}>{index + 1}. { winner.username }</Text>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })}
                        </>
                        <GiveawayButtonContainer>
                            {(giveawayEntryStatus && userEntryTime) &&
                                <Text>You entered this giveaway at: {dayjs(new Date(parseInt(userEntryTime))).format('MM/DD/YYYY hh:mm a').toString()}</Text>
                            }
                            {giveaway.status === 'completed' &&
                                <Text>Congratulations to everyone who won and good luck next to everyone else! {giveaway.Company.name} will reach out to the winner{ giveaway.winners.length > 1 ? 's' : ''} shortly via the email address associated with their account. Thank you again everyone for entering and have a great day!</Text>
                            }
                            {(!giveawayEntryStatus && giveaway.status === 'active' && giveaway.type !== 'order') &&
                                <Button onClick={() => giveaway.Company.id !== 1 ? confirmEntry() : submitEntry()}>Enter</Button>
                            }
                        </GiveawayButtonContainer>
                    </GiveawayContainer>
                </>
            }
        </MainContainer>
    )
}

export default Giveaway;