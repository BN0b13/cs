import SectionRepository from '../repositories/SectionRepository.js';
import SectionService from '../services/SectionService.js';

const sectionRepository = new SectionRepository();
const sectionService = new SectionService()

class SectionController {

    // CREATE
    async create(req, res) {
        try {
            const {
                pageId,
                userId = 1,
                type,
                content,
                imageId = null,
                position,
                metadata = {},
                title = null,
                subtitle = null,
                paragraph = null,
                linkOne = null,
                linkOnePath = null,
                linkTwo = null,
                linkTwoPath = null
            } = req.body;

            if(title) { metadata.title = title }
            if(subtitle) { metadata.subtitle = subtitle }
            if(paragraph) { metadata.paragraph = paragraph }
            if(linkOne) { metadata.linkOne = linkOne }
            if(linkOnePath) { metadata.linkOnePath = linkOnePath }
            if(linkTwo) { metadata.linkTwo = linkTwo }
            if(linkTwoPath) { metadata.linkTwoPath = linkTwoPath }

            const params = {
                pageId,
                userId,
                type,
                content,
                imageId,
                position,
                metadata,
                image: req.files[0]
            };

            console.log('CREATE Section params: ', params);

            // Remove any undefined or null values
            Object.keys(params).forEach(param => params[param] == null && delete params[param]);

            const data = await sectionService.createSectionAndImage(params);

            res.send(data);
        } catch (err) {
            res.status(500).send({
                err,
                message: 'There was an error creating the section'
            });
        }
    }

    // READ
    async getSections(req, res) {
        try {
            const data = await sectionRepository.getSections();
            res.send(data);
        } catch (err) {
            res.status(500).send({
                err,
                message: 'There was an error fetching sections'
            });
        }
    }

    async getSectionById(req, res) {
        try {
          const { id } = req.params;
          const data = await sectionRepository.getSectionById(id);
          if (!data) return res.status(404).json({ message: 'Section not found' });
          return res.json(data);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }

    async getSectionsByType(req, res) {
        try {
            const { type } = req.params;
            const data = await sectionRepository.getSectionsByType(type);
            res.send(data);
        } catch (err) {
            res.status(500).send({
                err,
                message: 'There was an error fetching sections by type'
            });
        }
    }

    // Update
    async updateSectionById(req, res) {
        try {
            const { id } = req.params;
            const {
                pageId,
                userId,
                type,
                url,
                title,
                isActive,
                position,
                metadata
            } = req.body;
    
            const params = {
                pageId,
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
            const sectionExists = await sectionRepository.getSectionById(id);
            if (!sectionExists) {
                return res.status(404).json({ message: 'Section not found' });
            }
    
            const updatedSection = await sectionRepository.updateSection(id, params);
    
            res.json({
                message: 'Section updated successfully',
                data: updatedSection
            });
        } catch (err) {
            console.error('Update Section Error:', err);
            res.status(500).json({ message: 'There was an error updating the section', error: err.message });
        }
    }
    
    // Delete
    async deleteSectionById(req, res) {
        const { id } = req.params;

        console.log('DELETE id: ', id);

        const data = await sectionService.deleteSection(id);
        res.send(data);
    }
}

export default SectionController;