import { SectionImage } from '../models/Associations.js';


export default class ImageService {

    updateImageOrderBulk = async (sectionId, imageOrderArray) => {
        try {
            return await sequelize.transaction(async (t) => {
                for (const image of imageOrderArray) {
                    await SectionImage.update(
                        { order: image.order },
                        { where: { sectionId, imageId: image.imageId }, transaction: t }
                    );
                }
                return { success: true, message: 'Image order updated successfully', sectionId };
            });
        } catch (err) {
            console.error('Bulk Update Image Order Error:', err);
            throw new Error('There was an error updating image order');
        }
    };
    
}