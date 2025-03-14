import { useEffect, useState } from 'react';

import AccountDetails from '../../components/accounts/account-details/account-details.component';
import Contents from '../../components/configuration/welcome/contents/contents.component';
import CompanyConfiguration from '../../components/configuration/company-configuration/company-configuration.component';
import CurrentWelcomeImages from '../../components/configuration/welcome/current/current.component';
import ImportWelcomeImage from '../../components/configuration/welcome/import/import.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Theme from '../../components/theme/theme.component';
import UpdateCompanyConfiguration from '../../components/configuration/company-configuration/update-company-configuration/update-company-configuration.component';

import Client from "../../tools/client";

import {
    ConfigurationTitle,
    ContentContainer,
    MainContainer,
    TabContainer,
    TabSelector
} from './configuration.styles';

const client = new Client();

const ConfigurationPage = () => {
    const [ configuration, setConfiguration ] = useState(null);
    const [ cms, setCMS ] = useState(null);
    const [ images, setImages ] = useState([]);
    const [ showUpdateCompanyConfiguration, setShowUpdateCompanyConfiguration ] = useState(false);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);
    const [ tabFourActive, setTabFourActive ] = useState(false);

    useEffect(() => {
        getConfiguration();
        getCMS();
        getWelcomeImages();
    }, []);

    const getConfiguration = async () => {
        const res = await client.getConfiguration();
        setConfiguration(res.rows[0]);
    }

    const getCMS = async () => {
        const res = await client.getCMS();
        console.log('GET CMS res: ', res);
        setCMS(res);
    }

    const getWelcomeImages = async () => {
        const welcomeImages = await client.getWelcomeImages();
        welcomeImages.rows.sort((a, b) => a.position - b.position);

        setImages(welcomeImages.rows);
    }

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
        setTabThreeActive(false);
        setTabFourActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
        setTabThreeActive(false);
        setTabFourActive(false);
    }

    const activateTabThree = () => {
        setCurrentTab(3);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(true);
        setTabFourActive(false);
    }

    const activateTabFour = () => {
        setCurrentTab(4);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(false);
        setTabFourActive(true);
    }

    const showCurrentTab = () => {
        if(currentTab === 2) {
            return (
                <AccountDetails />
            )
        }
        // if(currentTab === 2) {
        //     return (
        //         <h2>About Page Configuration</h2>
        //     )
        // }

        if(currentTab === 3) {
            return (
                <Theme />
            )
        }

        if(currentTab === 4) {
            return (
                <>
                    <CurrentWelcomeImages images={images} refreshImages={getWelcomeImages} />
                    <ConfigurationTitle>Home Page Configuration</ConfigurationTitle>
                    <ImportWelcomeImage refreshImages={getWelcomeImages} />
                    <Contents cms={cms} getCMS={getCMS} />
                </>
            )
        }

        if(showUpdateCompanyConfiguration) {
            return (
                <UpdateCompanyConfiguration id={configuration.id} company={configuration.company} refreshData={getConfiguration} setShowUpdate={setShowUpdateCompanyConfiguration} />
            )
        }

        return (
                <CompanyConfiguration company={configuration.company} setShowUpdate={setShowUpdateCompanyConfiguration} />
        )
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Company Configuration</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Account Configuration</TabSelector>
                {/* <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>About Page</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Theme</TabSelector> */}
                <TabSelector active={tabFourActive} onClick={() => activateTabFour()}>App Configuration</TabSelector>
            </TabContainer>
            <ContentContainer>
                {!configuration || !cms ?
                    <Spinner />
                :
                    showCurrentTab()
                }
            </ContentContainer>
        </MainContainer>
    )
}

export default ConfigurationPage;