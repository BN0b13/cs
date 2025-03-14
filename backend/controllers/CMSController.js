import CMSService from '../services/CMSService.js';

const cmsService = new CMSService();

class CMSController {

    // READ
    
    async getCMSConfiguration(req, res) {
        const data = await cmsService.getCMSConfiguration();
        res.send(data);
    }

    async updateCMSConfiguration(req, res) {
        console.log('UPDATE CMS Hit: ', req.body);
        const {
            cmsConfig = null
        } = req.body;

        if(!cmsConfig) {
            return {
                status: 422
            }
        }

        const params = {
            home: {
                active: cmsConfig.home.active,
            },
            about : {
                active: cmsConfig.about.active
            },
            shop: {
                active: cmsConfig.shop.active
            }
        };

        console.log('PARAMS: ', params);

        const data = cmsService.updateCMSConfiguration(params);
        res.send(data);
    }
}

export default CMSController;