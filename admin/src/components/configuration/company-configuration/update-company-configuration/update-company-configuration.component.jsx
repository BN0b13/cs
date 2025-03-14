import { useContext, useState } from 'react';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../../contexts/toast.context';

import Client from '../../../../tools/client';

import {
    ContentContainer,
    Input,
    MainContainer,
    Subtitle,
    Title
} from "../../../../styles/component.styles";

const client = new Client();

const UpdateCompanyConfiguration = ({ id, company, refreshData, setShowUpdate }) => {
    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState(company.name ?? '');
    const [ email, setEmail ] = useState(company.email ?? '');
    const [ emailActive, setEmailActive ] = useState(company.emailActive ?? false);
    const [ phone, setPhone ] = useState(company.phone ?? '');
    const [ phoneExt, setPhoneExt ] = useState(company.phoneExt ?? '');
    const [ phoneActive, setPhoneActive ] = useState(company.phoneActive ?? false);
    const [ addressOne, setAddressOne ] = useState(company?.address?.addressOne ?? '');
    const [ addressTwo, setAddressTwo ] = useState(company?.address?.addressTwo ?? '');
    const [ city, setCity ] = useState(company?.address?.city ?? '');
    const [ state, setState ] = useState(company?.address?.state ?? '');
    const [ zipCode, setZipCode ] = useState(company?.address?.zipCode?? '');
    const [ addressActive, setAddressActive ] = useState(company.addressActive ?? false);
    const [ discordUrl, setDiscordUrl ] = useState(company?.socials?.discord?.url ?? '');
    const [ discordActive, setDiscordActive ] = useState(company?.socials?.discord?.active ?? false);
    const [ facebookUrl, setFacebookUrl ] = useState(company?.socials?.facebook?.url ?? '');
    const [ facebookActive, setFacebookActive ] = useState(company?.socials?.facebook?.active ?? false);
    const [ instagramUrl, setInstagramUrl ] = useState(company?.socials?.instagram?.url ?? '');
    const [ instagramActive, setInstagramActive ] = useState(company?.socials?.instagram?.active ?? false);
    const [ linkedinUrl, setLinkedinUrl ] = useState(company?.socials?.linkedin?.url ?? '');
    const [ linkedinActive, setLinkedinActive ] = useState(company?.socials?.linkedin?.active ?? false);
    const [ redditUrl, setRedditUrl ] = useState(company?.socials?.reddit?.url ?? '');
    const [ redditActive, setRedditActive ] = useState(company?.socials?.reddit?.active ?? false);
    const [ twitterUrl, setTwitterUrl ] = useState(company?.socials?.twitter?.url ?? '');
    const [ twitterActive, setTwitterActive ] = useState(company?.socials?.twitter?.active ?? false);
    const [ youtubeUrl, setYoutubeUrl ] = useState(company?.socials?.youtube?.url ?? '');
    const [ youtubeActive, setYoutubeActive ] = useState(company?.socials?.youtube?.active ?? false);

    const { errorToast, successToast } = useContext(ToastContext);

    const submiteUpdate = async () => {
        if(name === '' ||
            email === ''
        ) {
            setLoading(false);
            errorToast('Please fill out all required fields to submit update');
            return
        }
        setLoading(true);

        const company = {
            name,
            email,
            emailActive,
            phone,
            phoneExt,
            phoneActive,
            address: {
                addressOne,
                addressTwo,
                city,
                state,
                zipCode
            },
            addressActive,
            socials: {
                discord: {
                    url: discordUrl,
                    active: discordActive
                },
                facebook: {
                    url: facebookUrl,
                    active: facebookActive
                },
                instagram: {
                    url: instagramUrl,
                    active: instagramActive
                },
                linkedin: {
                    url: linkedinUrl,
                    active: linkedinActive
                },
                reddit: {
                    url: redditUrl,
                    active: redditActive
                },
                twitter: {
                    url: twitterUrl,
                    active: twitterActive
                },
                youtube: {
                    url: youtubeUrl,
                    active: youtubeActive
                },
            }
        }

        const data = {
            id,
            company
        }

        await client.updateConfiguration(data);

        successToast('Company Updated');
        await refreshData();
        setShowUpdate(false);
        setLoading(false)
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <Title>Update Configuration</Title>

                    <Input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name*' />
                    <Input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email*' />
                    <Input type='checkbox' checked={emailActive} onChange={(e) => setEmailActive(!emailActive)} />
                    <Input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' />
                    <Input type='text' value={phoneExt} onChange={(e) => setPhoneExt(e.target.value)} placeholder='Phone Ext' />
                    <Input type='checkbox' checked={phoneActive} onChange={(e) => setPhoneActive(!phoneActive)} />
                    <Subtitle>Address</Subtitle>
                    <Input type='text' value={addressOne} onChange={(e) => setAddressOne(e.target.value)} placeholder='Address One' />
                    <Input type='text' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} placeholder='Address Two' />
                    <Input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
                    <Input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='State' />
                    <Input type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder='Zip Code' />
                    <Input type='checkbox' checked={addressActive} onChange={(e) => setAddressActive(!addressActive)} />
                    <Subtitle>Social Media</Subtitle>
                    <Input type='text' value={discordUrl} onChange={(e) => setDiscordUrl(e.target.value)} placeholder='Discord URL' />
                    <Input type='checkbox' checked={discordActive} onChange={(e) => setDiscordActive(!discordActive)} />
                    <Input type='text' value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder='Facebook URL' />
                    <Input type='checkbox' checked={facebookActive} onChange={(e) => setFacebookActive(!facebookActive)} />
                    <Input type='text' value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder='Instagram URL' />
                    <Input type='checkbox' checked={instagramActive} onChange={(e) => setInstagramActive(!instagramActive)} />
                    <Input type='text' value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder='LinkedIn URL' />
                    <Input type='checkbox' checked={linkedinActive} onChange={(e) => setLinkedinActive(!linkedinActive)} />
                    <Input type='text' value={redditUrl} onChange={(e) => setRedditUrl(e.target.value)} placeholder='Reddit URL' />
                    <Input type='checkbox' checked={redditActive} onChange={(e) => setRedditActive(!redditActive)} />
                    <Input type='text' value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder='Twitter URL' />
                    <Input type='checkbox' checked={twitterActive} onChange={(e) => setTwitterActive(!twitterActive)} />
                    <Input type='text' value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder='YouTube URL' />
                    <Input type='checkbox' checked={youtubeActive} onChange={(e) => setYoutubeActive(!youtubeActive)} />

                    <ContentContainer flexDirection='row'>
                        <Button onClick={() => setShowUpdate(false)}>Cancel</Button>
                        <Button onClick={async () => await submiteUpdate()}>Submit</Button>
                    </ContentContainer>
                </>
            }
        </MainContainer>
    )
}

export default UpdateCompanyConfiguration;