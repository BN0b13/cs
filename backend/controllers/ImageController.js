import ImageService from "../services/ImageService.js";

const imageService = new ImageService();

class ImageController {

    updateImageOrderBulk = async (req, res) => {
        const {
            sectionId,
            imageOrderArray
        } = req.body;

        const data = await imageService.updateImageOrderBulk(sectionId, imageOrderArray);
        res.send(data);
    }
}

export default ImageController;