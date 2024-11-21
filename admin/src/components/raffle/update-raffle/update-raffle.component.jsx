import { useState } from 'react';

import Button from '../../reusable/button/button.component';

import {
    Input,
    MainContainer,
    RowContainer,
    Textarea,
    Title
} from '../../../styles/component.styles';

const UpdateRaffle = ({ raffle, submit, deleteRaffle, showUpdate }) => {
    const [ name, setName ] = useState(raffle.name ?? '');
    const [ description, setDescription ] = useState(raffle.description ?? '');

    const updateRaffle = async () => {
        const data = {
            id: raffle.id,
            name,
            description
        }

        await submit(data);
    }

    return (
        <MainContainer>
            <Title>Update Raffle</Title>

            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'Name'} />
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={'Description'} />

            <Button onClick={() => deleteRaffle(true)}>DELETE</Button>
            <RowContainer>
                <Button onClick={() => showUpdate(false)}>Cancel</Button>
                <Button onClick={() => updateRaffle()}>Update</Button>
            </RowContainer>
        </MainContainer>
    )
}

export default UpdateRaffle;