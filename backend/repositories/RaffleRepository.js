import { Product, Raffle } from '../models/Associations.js';

class RoleRepository {

    // READ

    async getRaffles({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            const res = await Raffle.findAndCountAll({
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: (page * size),
            });
            return res;
        } catch (err) {
            console.log('Get Raffles Error: ', err);
            throw Error('There was an error getting all raffles');
        }
    }

    async getRaffleById(id) {
        try {
            const res = await Raffle.findOne({
                where: {
                    id
                },
                include: [
                    { 
                        model: Product
                    },
                ]
            });

            if(res === null) {
                return {
                    status: 404
                }
            }

            return res;
        } catch (err) {
            console.log('Get Raffle by ID Error: ', err);
            throw Error('There was an error getting raffle by id');
        }
    }

    // Update

    updateRaffle = async (id, data) => {
        try {
            const res = await Raffle.update(
                data,
                {
                    where: {
                        id: id
                    }
                }
            );

            return res;
        } catch (err) {
            console.log('Update Raffle Error: ', err);
            throw Error('There was an error updating the Raffle');
        }
    }
}

export default RoleRepository;