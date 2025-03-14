import { useEffect, useState } from 'react';

import AddPage from '../../components/content-management/pages/add-page/add-page.component';
import PagesTable from '../../components/reusable/tables/pages-table/pages-table.component';
import Pagination from '../../components/reusable/pagination/pagination.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from "../../tools/client";

import {
    ContentContainer,
    MainContainer,
    Option,
    Select,
    TabContainer,
    TabSelector,
    MainTitle
} from '../../styles/page.styles';

const client = new Client();

const ContentManagementPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const[ pages, setPages ] = useState([]);
    const [ pagesCount, setPagesCount ] = useState(null);

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    const [ search, setSearch ] = useState('');
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    useEffect(() => {
        getPages();
    }, []);

    useEffect(() => {
        if(loadData) {
            getPages();
            setLoadData(false);
        }
    }, [ loadData ]);

    const getPages = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        search && (query = query + `&search=${search}`);
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getPages(query);
        setPages(res.rows);
        setPagesCount(res.count);
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
            return (<AddPage />)
        }

        return (
            <>
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
                <PagesTable
                    pages={pages}
                    sortKey={sortKey}
                    setSortKey={setSortKey}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    reloadTable={setLoadData}
                />
                <Pagination
                    count={pagesCount}
                    size={size}
                    page={page}
                    changePage={changePage}
                />
            </>
        )
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Pages</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Page</TabSelector>
            </TabContainer>
            <ContentContainer>
                {loading ?
                    <Spinner />
                :
                    showCurrentTab()
                }
            </ContentContainer>
        </MainContainer>
    )
}

export default ContentManagementPage;