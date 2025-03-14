import PageRepository from '../repositories/PageRepository.js';
import PageService from '../services/PageService.js';

const pageRepository = new PageRepository();
const pageService = new PageService();

class PageController {

    // CREATE
    async create(req, res) {
        try {
            const {
                userId,
                type,
                url,
                title,
                isActive,
                position,
                metadata
            } = req.body;

            const params = {
                userId,
                type,
                url,
                title,
                isActive,
                position,
                metadata
            };

            // Remove any undefined or null values
            Object.keys(params).forEach(param => params[param] == null && delete params[param]);

            const data = await pageRepository.create(params);

            res.send(data);
        } catch (err) {
            res.status(500).send({
                err,
                message: 'There was an error creating the page'
            });
        }
    }

    // READ
    async getPages(req, res) {
        try {
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
                const data = await pageRepository.getPages(params);
                return res.send(data);
            }
    
            params.search = search;
    
            const data = await pageService.searchPages(params);
            res.send(data);
        } catch (err) {
            res.status(500).send({
                err,
                message: 'There was an error fetching pages'
            });
        }
    }

    async getPageById(req, res) {
        try {
            const { id } = req.params;
            const page = await pageRepository.getPageById(id);
            if (!page) return res.status(404).json({ message: 'Page not found' });
            return res.json(page);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
      }

    async getPagesByType(req, res) {
        try {
            const { type } = req.params;
            const data = await pageRepository.getPagesByType(type);
            res.send(data);
        } catch (err) {
            res.status(500).send({
                err,
                message: 'There was an error fetching pages by type'
            });
        }
    }

    // Update
    async updatePageById(req, res) {
        try {
            const { id } = req.params; // Get ID from URL parameter
            const {
                userId,
                type,
                url,
                title,
                isActive,
                position,
                metadata
            } = req.body;
    
            const params = {
                userId,
                type,
                url,
                title,
                isActive,
                position,
                metadata
            };
    
            // Remove null/undefined values to prevent overriding with null
            Object.keys(params).forEach((key) => params[key] == null && delete params[key]);
    
            // Check if the page exists before updating
            const pageExists = await pageRepository.getPageById(id);
            if (!pageExists) {
                return res.status(404).json({ message: 'Page not found' });
            }
    
            const updatedPage = await pageRepository.updatePage(id, params);
    
            res.json({
                message: 'Page updated successfully',
                data: updatedPage
            });
        } catch (err) {
            console.error('Update Page Error:', err);
            res.status(500).json({ message: 'There was an error updating the page', error: err.message });
        }
    }
    
    // Delete
    async deletePageById(req, res) {
        const { id } = req.params;

        const data = await pageRepository.deletePageById(id);
        res.send(data);
    }
}

export default PageController;