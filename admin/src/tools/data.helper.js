

export default class DataHelper {
    geneticsFormData = (data) => {
        const {
            category,
            productType,
            name,
            description,
            time,
            mother,
            father,
            profile,
            inventoryType,
            size,
            price,
            quantity
        } = data;

        let formData = new FormData();

        formData.append('categoryId', category);
        formData.append('type', productType);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('time', time);
        formData.append('mother', mother);
        formData.append('father', father);
        formData.append('profile', profile);
        formData.append('inventoryType', inventoryType);
        formData.append('size', size);
        formData.append('price', price.value);
        formData.append('quantity', quantity);

        return formData;
    }

    merchandiseFormData = (data) => {
        const {
            category,
            productType,
            name,
            description,
            profile,
            inventoryType,
            size,
            price,
            quantity
        } = data;

        let formData = new FormData();

        formData.append('categoryId', category);
        formData.append('type', productType);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('profile', profile);
        formData.append('inventoryType', inventoryType);
        formData.append('size', size);
        formData.append('price', price.value);
        formData.append('quantity', quantity);

        return formData;
    }
}