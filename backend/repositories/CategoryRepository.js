import { Category, Product } from '../models/Associations.js';

class CategoryRepository {

    // READ

    async getCategories({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            const res = await Category.findAndCountAll({
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: (page * size),
            });
            return res;
        } catch (err) {
            console.log('Get Categories Error: ', err);
            throw Error('There was an error getting all categories');
        }
    }

    async getPublicCategories({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            const res = await Category.findAndCountAll({
                where: {
                    status: true
                },
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: (page * size),
            });
            return res;
        } catch (err) {
            console.log('Get Categories Error: ', err);
            throw Error('There was an error getting all categories');
        }
    }

    async getCategoriesByType({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0, type = '' }) {
        try {
            const res = await Category.findAndCountAll({
                where: {
                    type
                },
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: (page * size),
            });
            return res;
        } catch (err) {
            console.log('GET Categories by Type Error: ', err);
            throw Error('There was an error getting all categories by type');
        }
    }

    async getCategoryById(id) {
        try {
            const res = await Category.findAndCountAll({
                where: {
                    id
                },
                include: [
                    {
                        model: Product
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Category by id Messages Error: ', err);
            throw Error('There was an error getting category by id');
        }
    }

    // UPDATE

    async updateCategory(id, data) {
        try {
            const res = await Category.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Category Error: ', err);
            throw Error('There was an error updating the category');
        }
    }

    // DELETE

    async deleteCategory(id) {
        try {
            const res = await Category.destroy({
                where: {
                    id
                }
            });

            return {
                result: res
            }
        } catch (err) {
            console.log('DELETE Category Error: ', err);
            throw Error('There was an error deleting the category');
        }
    }
}

export default CategoryRepository;