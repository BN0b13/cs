import PageRepository from '../repositories/PageRepository.js';

const pageRepository = new PageRepository();

class PageController {

    // CREATE

    async create(req, res) {
        try {
            const {
                type,
                url,
                title,
                titleOn,
                image,
                imageCaption,
                imageOn,
                subtitle,
                subtitleOn,
                paragraph,
                paragraphOn,
                position
            } = req.body;

            const params = {
                type,
                url,
                title,
                titleOn,
                image,
                imageCaption,
                imageOn,
                subtitle,
                subtitleOn,
                paragraph,
                paragraphOn,
                position
            };

            Object.keys(params).forEach(param => params[param] == null && delete params[param]);

            const data = await pageRepository.create(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating page'
            });
        }
    }

    // READ
    
    async killPages(req, res) {
        const data = await pageRepository.killPages();
        res.send(data);
    }
    
    async getPages(req, res) {
        const data = await pageRepository.getPages();
        res.send(data);
    }
    
    async getPagesByType(req, res) {
        const { type } = req.params;
        const data = await pageRepository.getPagesByType(type);
        res.send(data);
    }
}

export default PageController;