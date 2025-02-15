import { useEffect, useState } from 'react';

import Client from '../../../../tools/client';

import {
    Input,
    Label,
    MainContainer,
    Subtitle,
    Text,
    Title
} from '../../../../styles/component.styles';

const client = new Client();

const Contents = () => {
    const [ title, setTitle ] = useState('');
    const [ titleOn, setTitleOn ] = useState(false);
    const [ subtitle, setSubtitle ] = useState('');
    const [ subtitleOn, setSubtitleOn ] = useState(false);
    const [ paragraph, setParagraph ] = useState('');
    const [ paragraphOn, setParagraphOn ] = useState(false);

    useEffect(() => {
        getWelcomePages();
    });

    const getWelcomePages = async () => {
        const res = await client.getPagesByType('welcome');
        console.log('GET Welcome Pages by type res: ', res);
    }

    const submit = async () => {
        const data = {
            
        }
    }

    return (
        <MainContainer>
            <Title>Contents</Title>
            <Subtitle>Title: </Subtitle>
            <Subtitle>{title}</Subtitle>
            <Label>
                Title On:
                <Input type='checkbox' margin={'0'} width={'15px'} value={titleOn} onChange={() => setTitleOn(!titleOn)} />
            </Label>
            <Subtitle>Subtitle: </Subtitle>
            <Subtitle>{subtitle}</Subtitle>
            <Label>
                Subtitle On:
                <Input type='checkbox' margin={'0'} width={'15px'} value={subtitleOn} onChange={() => setSubtitleOn(!subtitleOn)} />
            </Label>
            <Text>Paragraph: </Text>
            <Text>{paragraph}</Text>
            <Label>
                Paragraph On:
                <Input type='checkbox' margin={'0'} width={'15px'} value={paragraphOn} onChange={() => setParagraphOn(!paragraphOn)} />
            </Label>
        </MainContainer>
    )
}

export default Contents;