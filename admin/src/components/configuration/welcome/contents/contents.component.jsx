import { useState } from 'react';

import Button from '../../../reusable/button/button.component';

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

const Contents = ({ cms }) => {
    const [ homeActive, setHomeActive ] = useState(cms.home.active ?? false);
    const [ aboutActive, setAboutActive ] = useState(cms.about.active ?? false);
    const [ shopActive, setShopActive ] = useState(cms.shop.active ?? false);

    const submitAppUpdate = async () => {
        const data = {
            cmsConfig: {
                home: {
                    active: homeActive
                },
                about: {
                    active: aboutActive
                },
                shop: {
                    active: shopActive
                },
            }
        };

        const res = await client.updateCMS(data);

        console.log('Update CMS: ', res);
    }

    return (
        <MainContainer>
            <Title>CMS</Title>
            <Label>
                Home Page On:
                <Input type='checkbox' margin={'0'} width={'15px'} checked={homeActive} onChange={() => setHomeActive(!homeActive)} />
            </Label>
            <Label>
                About Page On:
                <Input type='checkbox' margin={'0'} width={'15px'} checked={aboutActive} onChange={() => setAboutActive(!aboutActive)} />
            </Label>
            <Label>
                Shop On:
                <Input type='checkbox' margin={'0'} width={'15px'} checked={shopActive} onChange={() => setShopActive(!shopActive)} />
            </Label>

            <Button onClick={() => submitAppUpdate()}>Update App</Button>
        </MainContainer>
    )
}

export default Contents;