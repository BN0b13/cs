import { useEffect, useState } from 'react';

import AddRaffle from '../../components/raffle/add-raffle/add-raffle.component';
import RafflesTable from '../../components/reusable/tables/raffles-table/raffles-table.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Pagination from '../../components/reusable/pagination/pagination.component';

import Client from "../../tools/client";

import {
    ContentContainer,
    MainContainer,
    MainTitle,
    Option,
    Select,
    TabContainer,
    TabSelector
} from '../../styles/page.styles';

const client = new Client();

const RafflesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ raffles, setRaffles ] = useState([]);
    const [ rafflesCount, setRafflesCount ] = useState(null);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    const [ search, setSearch ] = useState('');
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if(loadData) {
            getProducts();
            setLoadData(false);
        }
    }, [ loadData ]);

    const getProducts = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        search && (query = query + `&search=${search}`);
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getRaffles(query);
        setRaffles(res.rows);
        setRafflesCount(res.count);
        setLoading(false);
    }

    const changeSize = (data) => {
        setSize(data);
        setPage(0);
        setLoadData(true);
    }

    const changePage = (data) => {
        setPage(data);
        setLoadData(true);
    }

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
    }

    const showCurrentTab = () => {
        if(currentTab === 2) {
            return (
                <AddRaffle />
            )
        }

        return (
            <MainContainer>
                {loading ?
                    <Spinner />
                :
                    <ContentContainer>
                        <MainTitle>Raffles</MainTitle>
                        <SearchBar 
                            search={search}
                            setSearch={setSearch}
                            submitSearch={setLoadData}
                        />
                        <Select value={size} onChange={(e) => changeSize(e.target.value)} maxWidth={'100px'} marginBottom={'20px'}>
                            <Option key={1} value={10}>10</Option>
                            <Option key={2} value={25}>25</Option>
                            <Option key={3} value={50}>50</Option>
                            <Option key={4} value={100}>100</Option>
                        </Select>
                        <RafflesTable 
                            raffles={raffles}
                            sortKey={sortKey}
                            setSortKey={setSortKey}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            reloadTable={setLoadData}
                        />
                        <Pagination
                            count={rafflesCount}
                            size={size}
                            page={page}
                            changePage={changePage}
                        />
                    </ContentContainer>
                }
        
            </MainContainer>
        )
    }

    return (
        <>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Raffles</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Raffle</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </>
    )
}

export default RafflesPage;