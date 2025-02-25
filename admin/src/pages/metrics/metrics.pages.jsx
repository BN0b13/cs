import { useState } from 'react';

import CustomerMetrics from '../../components/metrics/customer-metrics/customer-metrics.component';
import OrderMetrics from '../../components/metrics/order-metrics/order-metrics.component';
import ViewMetrics from '../../components/metrics/view-metrics/view-metrics.component';

import {
    TabContainer,
    TabSelector
} from './metrics.styles';

const MetricsPage = () => {
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
        setTabThreeActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
        setTabThreeActive(false);
    }

    const activateTabThree = () => {
        setCurrentTab(3);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
            return (
                <CustomerMetrics />
            )
        }

        if(currentTab === 3) {
            return (
                <OrderMetrics />
            )
        }

        return (
            <ViewMetrics />
        )
    }

    return (
        <div>
            {/* <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Views</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Customers</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Orders</TabSelector>
            </TabContainer> */}
            { showCurrentTab() }
        </div>
    )
}

export default MetricsPage;