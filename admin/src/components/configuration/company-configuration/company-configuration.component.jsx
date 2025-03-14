import Button from '../../reusable/button/button.component';

import Client from '../../../tools/client';

import { 
    MainContainer,
    Subtitle,
    Text,
    Title
} from "../../../styles/component.styles";

const client = new Client();

const CompanyConfiguration = ({ company, setShowUpdate }) => {

    return (
        <MainContainer>
            <Title>Company Details</Title>
            
            <Text>Name: { company.name }</Text>
            <Text>Email: { company.email }</Text>
            <Text>Phone: { company.phone }</Text>

            <Subtitle>Address</Subtitle>
            <Text>{ company?.address?.addressOne ?? '' }</Text>
            <Text>{ company?.address?.addressTwo ?? '' }</Text>
            <Text>{ company?.address?.city ?? '' }</Text>
            <Text>{ company?.address?.state ?? '' }</Text>
            <Text>{ company?.address?.zipCode ?? '' }</Text>

            <Subtitle>Social Media</Subtitle>
            {company?.socials?.discord?.url && <Text cursor='pointer' onClick={() => window.open(company?.socials?.discord?.url, '_blank')}>Discord: { company.socials.discord.url }</Text>}
            {company?.socials?.facebook?.url && <Text cursor='pointer' onClick={() => window.open(company?.socials?.facebook?.url, '_blank')}>Facebook: { company.socials.facebook.url }</Text>}
            {company?.socials?.instagram?.url && <Text cursor='pointer' onClick={() => window.open(company?.socials?.instagram?.url, '_blank')}>Instagram: { company.socials.instagram.url }</Text>}
            {company?.socials?.linkedin?.url && <Text cursor='pointer' onClick={() => window.open(company?.socials?.linkedin?.url, '_blank')}>LinkedIn: { company.socials.linkedin.url }</Text>}
            {company?.socials?.reddit?.url && <Text cursor='pointer' onClick={() => window.open(company?.socials?.reddit?.url, '_blank')}>Reddit: { company.socials.reddit.url }</Text>}
            {company?.socials?.twitter?.url && <Text cursor='pointer' onClick={() => window.open(company?.socials?.twitter?.url, '_blank')}>Twitter: { company.socials.twitter.url }</Text>}
            {company?.socials?.youtube?.url && <Text cursor='pointer' onClick={() => window.open(company?.socials?.youtube?.url, '_blank')}>Youtube: { company.socials.youtube.url }</Text>}

            <Button onClick={() => setShowUpdate(true)}>Update</Button>
        </MainContainer>
    )
}

export default CompanyConfiguration;