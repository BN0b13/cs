import fs from 'fs';
import { Op } from 'sequelize';
import { sequelize } from "../db.js";

import { compressImage } from '../tools/images.js';

import {
    Image,
    Section 
} from '../models/Associations.js';

export default class ServiceService {

    // GET

    getSectionById = async (id) => {
        try {
            return await Section.findByPk(id, {
            include: [
                {
                model: Image,
                order: [['position', 'ASC']], // Ensure sections are ordered
                through: { attributes: [] } // Exclude `SectionImage` join table attributes
                }
            ]
            });
        } catch (err) {
            console.error('Error fetching section:', err);
            throw new Error('Failed to retrieve section');
        }
    }

    // CREATE

    createSectionAndImage = async (params) => {
        const {
            pageId,
            userId,
            type,
            content,
            position,
            metadata,
            image = null // Image object or array of images
        } = params;
    
        console.log('Create Section and Image params: ', params);
    
        try {
            const res = await sequelize.transaction(async (t) => {
                // Step 1: Create Section
                const sectionData = {
                    pageId,
                    userId,
                    type,
                    content,
                    position,
                    metadata
                };
    
                const createdSection = await Section.create(sectionData, { transaction: t });
                console.log('Created Section:', createdSection);
    
                // Step 2: If images are provided, create and link them
                if (image !== null) {
                    const imageIds = [];
    
                    for (const img of Array.isArray(image) ? image : [image]) {
                        console.log('Processing Image:', img);
    
                        const imageFilename = img.filename;
                        const imagePath = `/img/app/${img.filename}`;
    
                        const imageData = {
                            filename: imageFilename,
                            path: imagePath,
                            fileType: img.fileType || 'image' // Defaults to 'image' if fileType is missing
                        };
    
                        const createdImage = await Image.create(imageData, { transaction: t });
                        console.log('Created Image:', createdImage);
    
                        imageIds.push(createdImage.id);
    
                        // Compress Image (assuming you have a function for this)
                        const { path, filename } = img;
                        await compressImage(path, `app/${filename}`);
                    }
    
                    // Step 3: Link Section to Images in SectionImage Table
                    const sectionImageData = imageIds.map(imageId => ({
                        sectionId: createdSection.id,
                        imageId,
                    }));
    
                    await SectionImage.bulkCreate(sectionImageData, { transaction: t });
                    console.log('Linked Section with Images:', sectionImageData);
                }
    
                return createdSection;
            });
    
            return res;
        } catch (err) {
            console.error('Section Create Error:', err);
            throw new Error('There was an error creating the section');
        }
    };    

    addImagesToSection = async (sectionId, imageIds) => {
        try {
          const section = await Section.findByPk(sectionId);
          if (!section) throw new Error('Section not found');
      
          await section.addImages(imageIds);
          return { success: true, message: 'Images linked to section' };
        } catch (err) {
          console.error('Error linking images:', err);
          throw new Error('Failed to link images');
        }
    }

    // DELETE
    
    deleteSection = async (id) => {
        try {
            const section = await Section.findOne({
                where: { id },
                include: [
                    {
                        model: Image,
                        through: { attributes: [] } // Exclude join table data
                    }
                ]
            });
    
            if (!section) {
                throw new Error('Section not found');
            }
    
            const images = section.Images; // Associated images
    
            if (images.length > 0) {
                for (const image of images) {
                    try {
                        // Delete the image from the database
                        await Image.destroy({ where: { id: image.id } });
    
                        // Delete the image files
                        const filePaths = [
                            `./public${image.path}`,
                            `./public${image.path}-mobile.webp`,
                            `./public${image.path}-desktop.webp`
                        ];
    
                        for (const filePath of filePaths) {
                            try {
                                await fs.unlink(filePath);
                                console.log(`Deleted file: ${filePath}`);
                            } catch (fileErr) {
                                if (fileErr.code !== 'ENOENT') {
                                    console.error(`Error deleting file: ${filePath}`, fileErr);
                                }
                            }
                        }
                    } catch (imageErr) {
                        console.error(`Error deleting image with ID ${image.id}:`, imageErr);
                    }
                }
            }
    
            // Delete the section after all images are removed
            const deleteSectionRes = await Section.destroy({ where: { id } });
    
            return {
                success: true,
                message: 'Section and related images deleted successfully',
                deletedSectionId: id
            };
        } catch (err) {
            console.error('DELETE Section Error:', err);
            throw new Error('There was an error deleting the section');
        }
    };
    
}