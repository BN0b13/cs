import { useState } from 'react';

import { 
    ContentContainer,
    Input,
    Option,
    RowContainer,
    Select,
    Text
} from "../../../../styles/component.styles";


const UpdateOrderProduct = ({ product }) => {
    const inventories = product.product.Inventories;
    const [ inventoryId, setInventoryId ] = useState(product.inventoryId);
    const [ quantity, setQuantity ] = useState(product.quantity);
    
    return (
        <ContentContainer>
            <RowContainer>
                <ContentContainer margin={'0px 10px'}>
                    <Text>{ product.product.name }</Text>
                </ContentContainer>
                <ContentContainer margin={'0px 10px'}>
                    <Select value={inventoryId} onChange={(e) => setInventoryId(e.target.value)}>
                        {inventories.map((inventory, index) => (
                            <Option key={index} value={inventory.id}>{ inventory.size }</Option>
                        ))}
                    </Select>
                </ContentContainer>
                <ContentContainer margin={'0px 10px'}>
                    <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder={'quantity'} width={'40px'} marginBottom={'0'} />
                </ContentContainer>
            </RowContainer>
        </ContentContainer>
    )
}

export default UpdateOrderProduct;