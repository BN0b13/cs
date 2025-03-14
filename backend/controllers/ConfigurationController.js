import ConfigurationRepository from '../repositories/ConfigurationRepository.js';

const configurationRepository = new ConfigurationRepository();

class ConfigurationController {

    // READ
    
    async getConfiguration(req, res) {
        const data = await configurationRepository.getConfiguration();
        res.send(data);
    }
    
    async getPublicConfiguration(req, res) {
        // move to service - process to remove non active data
        const data = await configurationRepository.getPublicConfiguration();
        res.send(data);
    }

    // UPDATE

    async updateConfiguration(req, res) {
        const {
            id,
            themeId = null,
            name = null,
            url = null,
            company = null,
            options = null,
            alerts = null
        } = req.body;

        const params = {
            id,
            themeId,
            name,
            url,
            company,
            options,
            alerts
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await configurationRepository.updateConfiguration(id, params);
        res.send(data);
    }
}

export default ConfigurationController;