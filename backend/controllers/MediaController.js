import MediaService from '../services/MediaService.js';

const mediaService = new MediaService();

class MediaController {

    // CREATE

    async createAudio(req, res) {
        try {
            const {
                position = 0,
                title = null,
                description = null,
                details = null
            } = req.body;

            const requiredParams = {
                type: 'audio',
                title,
                position
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${requiredParams[param]} Param`);
                }
            });

            const params = {
                ...requiredParams,
                description,
                details
            }

            const audio = req.files[0];

            const data = await mediaService.createAudio(params, audio);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating audio'
            });
        }
    }

    async createVideo(req, res) {
        try {
            const {
                position = 0,
                title = null,
                description = null,
                details
            } = req.body;

            const requiredParams = {
                type: 'video',
                title,
                position
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${requiredParams[param]} Param`);
                }
            });

            const params = {
                ...requiredParams,
                description,
                details
            }

            const video = req.files[0];

            const data = await mediaService.createVideo(params, video);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating video'
            });
        }
    }

    async createYoutubeUrl(req, res) {
        try {
            const {
                position = 0,
                title = null,
                description = null,
                url = null,
                details
            } = req.body;

            const requiredParams = {
                type: 'youtube',
                title,
                url: `<${url}>`,
                position
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${requiredParams[param]} Param`);
                }
            });

            const params = {
                ...requiredParams,
                description,
                details
            }

            const data = await mediaService.create(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating the Youtube Url'
            });
        }
    }

    // READ
    
    async getMedia(req, res) {
        const data = await mediaService.getMedia();
        res.send(data);
    }

    async getMediaById(req, res) {
        const { id } = req.params;
        const data = await mediaService.getMediaById(id);
        res.send(data);
    }

    async getAudioByFilename(req, res) {
        await mediaService.getAudioByFilename(req, res);
    }

    async getVideoByFilename(req, res) {
        await mediaService.getVideoByFilename(req, res);
    }

    // PATCH

    async activateMedia(req, res) {
        const { id } = req.body;

        const data = await mediaService.activateMedia(id);
        res.send(data);
    }

    async updateMedia(req, res) {
        const {
            id,
            position = null,
            description = null,
            title = null,
            url = null,
            details = null
        } = req.body;

        const params = {
            position,
            description,
            title,
            url: url !== null ? `<${url}>` : null,
            details
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await mediaService.updateMedia(id, params);
        res.send(data);
    }

    // DELETE

    async deleteMediaById(req, res) {
        const {
            id
        } = req.body;

        const data = await mediaService.deleteMediaById(id);
        res.send(data);
    }
}

export default MediaController;