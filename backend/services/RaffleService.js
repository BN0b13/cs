import { sequelize } from "../db.js";

import {
    Category,
    Raffle
} from '../models/Associations.js';

import ProductService from '../services/ProductService.js';

const productService = new ProductService();

export default class RaffleService {

    // CREATE

    create = async (params) => {
        try {
            const {
                type,
                name,
                description,
                disclaimer,
                entryLimit,
                entryPrice,
                startDate,
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
                bay = '',
                image = null
            } = params;

            const getRaffleCategory = await Category.findAndCountAll({
                where: {
                    type: 'raffle'
                }
            });

            let categoryId = getRaffleCategory.rows.length > 0 ? getRaffleCategory.rows[0].id : '';

            if(getRaffleCategory.rows.length === 0) {
                const categoryData = {
                    name: 'Raffle',
                    description: 'Category for all raffles',
                    type: 'raffle',
                    status: true
                };

                const createRaffleCategory = await Category.create(categoryData);
                categoryId = createRaffleCategory.id;
            }

            const productParams = {
                categoryId,
                type: productType,
                name: productName,
                description: productDescription,
                details,
                profile,
                inventoryType,
                size,
                sizeDescription,
                price,
                quantity,
                address,
                bay,
                image
            };

            const createProduct = await productService.createProductAndInventory(productParams);

            console.log('CREATE Raffle Product res: ', createProduct);

            const res = await sequelize.transaction(async (t) => {
                const data = {
                    productId: createProduct.id,
                    type,
                    name,
                    description, 
                    disclaimer,
                    entryLimit,
                    entryPrice,
                    startDate,
                    status: false,
                    options
                };

                return await Raffle.create(data, { transaction: t });
            });
    
            return res;
        } catch (err) {
            console.log('CREATE Raffle error: ', err);
            throw Error('There was an error creating Raffle');
        }
    }

    // READ

    searchRaffles = async ({ search = '', page, size, sortKey, sortDirection }) => {
        try {
            const getCount = await sequelize.query(`
            select *
            from  ${process.env.PG_SCHEMA_NAME}."Raffles" as "Raffle"
            where ("Raffle".name ilike '%${search}%' or "Raffle".description ilike '%${search}%' or "Raffle".winner ilike '%${search}%')
            `);

            const currentPage = page * size;
            const res = await sequelize.query(`
                select "Raffle"."id",
                "Raffle"."type",
                "Raffle"."name",
                "Raffle"."description",
                "Raffle"."details",
                "Raffle"."entries",
                "Raffle"."winner",
                "Raffle"."startDate",
                "Raffle"."completionDate",
                "Raffle"."createdAt",
                "Raffle"."updatedAt",
                from  ${process.env.PG_SCHEMA_NAME}."Raffles" as "Raffle"
                where ("Raffle".name ilike '%${search}%' or "Raffle".description ilike '%${search}%' or "Raffle".winner ilike '%${search}%')
                ORDER BY "Raffle"."${sortKey}" ${sortDirection}
                LIMIT ${size}
                OFFSET ${currentPage}
                `);

            return {
                count: getCount[1].rowCount,
                rows: res[0]
            };
        } catch (err) {
            console.log('Search Raffles Error: ', err);
            throw Error('There was an error searching Raffles');
        }
    }

    // Delete

    async deleteRaffle(id) {
        try {
            const raffle = await Raffle.findOne(
                {
                    where: {
                                id: id
                            }
                }
            );

            if(raffle === null) {
                return {
                    status: 404,
                    message: 'Raffle Does Not Exist'
                }
            }

            const res = await Raffle.destroy({
                where: {
                    id
                }
            });

            await productService.deleteProduct(raffle.dataValues.productId);

            return {
                message: 'Deleted Raffle Successfully',
                res
            };
        } catch (err) {
            console.log('DELETE Raffle Error: ', err);
            throw Error('There was an error deleting the Raffle');
        }
    }
}