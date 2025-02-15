import { Inventory } from '../models/Associations.js';

class InventoryRepository {

    // CREATE

    async createInventory(data) {
        try {
            const res = await Inventory.create(data);
            return res;
        } catch (err) {
            console.log('CREATE Inventory error: ', err);
            throw Error('There was an error creating Inventory');
        }
    }

    // READ

    async getInventory() {
        try {
            const res = await Inventory.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Inventory Error: ', err);
            throw Error('There was an error getting inventory');
        }
    }

    async getInventoryById(id) {
        try {
            const res =  await Inventory.findOne({
                where: {
                    id
                }
            });

            if(res === null) {
                return {
                    status: 404
                }
            }

            return res;
        } catch (err) {
            console.log('Get Inventory Error: ', err);
            throw Error('There was an error getting inventory');
        }
    }

    async getByPK(id) {
        return await Inventory.findByPk(id);
    }

    // UPDATE

    async updateInventory(id, data) {
        try {
            const res = await Inventory.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Inventory Error: ', err);
            throw Error('There was an error updating the inventory');
        }
    }

    // DELETE

    async deleteInventoryById(id) {
        try {
            const res = await Inventory.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );
            return {
                status: 200,
                message: `Deleted ${res} Inventory`
            };
        } catch (err) {
            console.log('Delete Inventory Error: ', err);
            throw Error('There was an error deleting the inventory');
        }
    }
}

export default InventoryRepository;