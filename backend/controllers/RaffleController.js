import RaffleRepository from '../repositories/RaffleRepository.js';
import RaffleService from '../services/RaffleService.js';

const raffleRepository = new RaffleRepository();
const raffleService = new RaffleService();

class RaffleController {

    // CREATE

    async create(req, res) {
        try {
            console.log('CREATE Raffle req body: ', req.body);
            const {
                type,
                name,
                description,
                disclaimer,
                entryLimit,
                entryPrice,
                startDate = null,
                options = null,
                productType,
                productName,
                productDescription,
                details,
                profile = null,
                inventoryType,
                size,
                sizeDescription,
                price = null,
                quantity,
                address = null,
                bay = ''
            } = req.body;

            const params = {
                type,
                name,
                description,
                disclaimer,
                entryLimit,
                entryPrice,
                startDate,
                options,
                productType,
                productName,
                productDescription,
                details,
                profile,
                inventoryType,
                size,
                sizeDescription,
                price,
                quantity,
                address,
                bay,
                image: req.files[0]
            };

            const data = await raffleService.create(params);

            res.send({
                message: 'Raffle Created',
                result: data
            });
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating raffle'
            });
        }
    }

    // READ
    
    async getRaffles(req, res) {
        const { 
            search = null, 
            page = 0, 
            size = 10,
            sortKey = 'createdAt',
            sortDirection = 'ASC'
        } = req.query;

        const params = {
            sortKey,
            sortDirection,
            page,
            size
        };

        if(search === null) {
            const data = await raffleRepository.getRaffles(params);
            return res.send(data);
        }

        params.search = search;

        const data = await raffleService.searchRaffles(params);
        res.send(data);
    }

    async getRaffleById(req, res) {
        const { id } = req.params;
        const data = await raffleRepository.getRaffleById(id);
        res.send(data);
    }

    // UPDATE

    async updateRaffle(req, res) {
        const {
            id,
            type = null,
            name = null,
            description = null,
            disclaimer = null,
            entryLimit = null,
            entryPrice = null,
            startDate = null,
            options = null
        } = req.body;

        const params = {
            type,
            name,
            description,
            disclaimer,
            entryLimit,
            entryPrice,
            startDate,
            options,
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await raffleRepository.updateRaffle(id, params);
        res.send(data);
    }

    // DELETE

    async deleteRaffle(req, res) {
        const {
            id
        } = req.body;

        const data = await raffleService.deleteRaffle(id);
        res.send(data);
    }
}

export default RaffleController;