import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AdminModal from '../../components/reusable/admin-modal/admin-modal.component';
import OrderDisplay from '../../components/order/order-display/order-display.component';
import ProcessOrder from '../../components/order/process-order/process-order.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateOrder from '../../components/order/update-order/update-order.component';

import Client from '../../tools/client';

import {
    ContentContainer,
    MainContainer
} from '../../styles/page.styles';

const client = new Client();

const OrderPage = () => {
    const { refId } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ order, setOrder ] = useState('');
    const [ products, setProducts ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ action, setAction ] = useState('');
    const [ actionText, setActionText ] = useState('');
    const [ showOrderModal, setShowOrderModal ] = useState(false);

    useEffect(() => {
        getOrder();

        // eslint-disable-next-line
    }, []);

    const getOrder = async () => {
        setLoading(true);
        const res = await client.getOrderByRefId(refId);
        let orderProducts = res.products;
        
        for(let product in orderProducts) {
            const res = await client.getProductById(orderProducts[product].productId);
            orderProducts[product].product = res.data;
        }

        const user = await client.getAccountById(res.userId);

        setUser(user);
        setOrder(res);
        setProducts(orderProducts);
        setLoading(false);
    }

    const updateOrder = async (params) => {
        await client.updateOrder(params);
        await getOrder();
        setShowUpdate(false);
    }

    const cancelOrder = async () => {
        await client.cancelOrder(order.id);
        await getOrder();
        setShowUpdate(false);
        setShowOrderModal(false);
    }

    const addInventoryToOrder = async (inventory) => {

    }

    const removeInventoryFromOrder = async (inventory) => {

    }

    const confirmCancelOrder = async () => {
        setTitle('Cancel Order');
        setMessage(`Are you sure you want to cancel order ${order.id}? This will restock all inventory from the order and cannot be undone.`);
        setAction(() => cancelOrder);
        setActionText('Cancel Order');
        setShowOrderModal(true);
    }

    const display = () => {
        if(showUpdate) {
            return ( 
                <UpdateOrder 
                    order={order} 
                    updateOrder={updateOrder} 
                    cancelOrder={confirmCancelOrder} 
                    addInventoryToOrder={addInventoryToOrder} 
                    removeInventoryFromOrder={removeInventoryFromOrder} 
                    showUpdate={setShowUpdate} 
                />
            );
        }

        return (
            <ContentContainer>
                <OrderDisplay user={user} order={order} products={products} showUpdate={setShowUpdate} />
                <ProcessOrder user={user} order={order} getOrder={getOrder}/>
            </ContentContainer>
        );
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showOrderModal}
                setShow={setShowOrderModal}
                title={title} 
                image={''}
                message={message} 
                cancelText={'Back'}
                action={action} 
                actionText={actionText}
            />
            {loading ?
                <Spinner />
            :
                display()
            }
        </MainContainer>
    )
}

export default OrderPage;