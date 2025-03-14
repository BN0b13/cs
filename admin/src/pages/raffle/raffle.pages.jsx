import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AdminModal from '../../components/reusable/admin-modal/admin-modal.component';
import Raffle from '../../components/raffle/raffle.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateRaffle from '../../components/raffle/update-raffle/update-raffle.component';

import Client from '../../tools/client';

import {
    BackLink,
    ContentContainer,
    MainContainer,
    MainTitle,
    Text
} from '../../styles/page.styles';

const client = new Client();

const RafflePage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ raffle, setRaffle ] = useState(null);

    useEffect(() => {
        getRaffle();
    }, []);

    const getRaffle = async () => {
        setLoading(true);

        const res = await client.getRaffleById(id);

        setRaffle(res);
        setLoading(false);
    }

    const updateRaffle = async (data) => {
        setLoading(true);

        await client.updateRaffle(data);

        await getRaffle();
        setShowUpdate(false);
        setLoading(false);
    }

    const deleteRaffle = async () => {
        setLoading(true);
        const data = {
            id: raffle.id
        };

        await client.deleteRaffle(data);
        
        window.location = '/raffles';
    }

    const display = () => {
        if(showUpdate) {
            return (<UpdateRaffle raffle={raffle} submit={updateRaffle} deleteRaffle={setShowDeleteModal} showUpdate={setShowUpdate} />)
        }

        return (<Raffle raffle={raffle} showUpdate={setShowUpdate} />)
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Raffle'}
                message={'Are you sure you want to delete this raffle forever?'} 
                action={deleteRaffle} 
                actionText={'Delete'}
            />
            {loading ?
                <Spinner />
            :
                raffle === null ?
                    <MainTitle>Raffle Does Not Exist</MainTitle>
                :
                    display()
            }
        </MainContainer>
    )
}

export default RafflePage;