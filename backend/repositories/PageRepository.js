import { Image, Page, Section } from '../models/Associations.js';

class PageRepository {

    // CREATE
    async create(data) {
        try {
            return await Page.create(data);
        } catch (err) {
            console.error('Create Page Error:', err);
            throw new Error('There was an error creating the page');
        }
    }

    // READ
    async getPages({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            return await Page.findAndCountAll({
                include: [
                    { 
                        model: Section,
                        order: [['position', 'ASC']], // Ensure sections are ordered
                        include: [
                            { 
                                model: Image, 
                                order: [['position', 'ASC']], // Ensure sections are ordered
                                through: { attributes: [] } // Exclude join table fields from response
                            }
                        ]
                    }
                ],
                order: [[sortKey, sortDirection]],
                limit: size,
                offset: (page * size),
            });
        } catch (err) {
            console.error('Get Pages Error:', err);
            throw new Error('There was an error getting pages');
        }
    }
    

    async getPageById(id) {
        try {
            return await Page.findByPk(id, {
                include: [
                    { 
                        model: Section,
                        order: [['position', 'ASC']], // Ensure sections are ordered
                        include: [
                            { 
                                model: Image, 
                                order: [['position', 'ASC']], // Ensure sections are ordered
                                through: { attributes: [] } // Exclude join table fields from response
                            }
                        ]
                    }
                ]
            });
        } catch (err) {
            console.error('Get Page By ID Error:', err);
            throw new Error('There was an error retrieving the page');
        }
    }
    
    async getPagesByType(type) {
        try {
            return await Page.findAll({
                where: { type },
                include: [{
                    model: Section,
                    order: [['position', 'ASC']]
                }],
                order: [['position', 'ASC']] // Sorts pages by position
            });
        } catch (err) {
            console.error('Get Pages By Type Error:', err);
            throw new Error('There was an error getting pages by type');
        }
    }
    

    // UPDATE

    async updatePage(id, data) {
        try {
            // Ensure the page exists before updating
            const page = await Page.findByPk(id);
            if (!page) return null;
    
            // Update and return the updated page
            await page.update(data);
            return page;
        } catch (err) {
            console.error('Update Page Error:', err);
            throw new Error('There was an error updating the page');
        }
    }
    
    // DELETE

    async deletePageById(id) {
        try {
            const res = await Page.destroy(
                {
                    where: {
                            id
                        }
                }
            );
            return res;
        } catch (err) {
            console.log('Delete Page Error: ', err);
            throw Error('There was an error deleting the page');
        }
    }
}

export default PageRepository;