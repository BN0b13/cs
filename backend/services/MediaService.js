import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Media } from '../models/Associations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class MediaService {

    // CREATE

    async create(data) {
        try {
            return await Media.create(data);
        } catch(err) {
            console.log('Create Media Error: ', err);
            throw Error('There was an error creating media');
        }
    }

    async createAudio(params, audio) {
        try {
            const data = {
                ...params,
                filename: audio.filename,
                path: `/audio/${audio.filename}`,
                active: false
            };

            const res = await Media.create(data);

            return res;
        } catch(err) {
            console.log('Save Audio To Server Error: ', err);
            throw Error('There was an error creating the audio');
        }
    }

    async createVideo(params, video) {
        try {
            const data = {
                ...params,
                filename: video.filename,
                path: `/video/${video.filename}`,
                active: false
            };

            const res = await Media.create(data);

            return res;
        } catch(err) {
            console.log('Save Video To Server Error: ', err);
            throw Error('There was an error creating the video');
        }
    }

    // READ

    async getMedia() {
        try {
            const res = await Media.findAndCountAll();
            return res;
        } catch (err) {
            console.log('Get Media Error: ', err);
            throw Error('There was an error getting all media');
        }
    }

    async getMediaById(id) {
        try {
            const res = await Media.findOne({
                where: {
                    id
                }
            });
            return res;
        } catch (err) {
            console.log('Get Media by id Error: ', err);
            throw Error('There was an error getting media by id');
        }
    }

    async getAudioByFilename(req, res) {
        try {
            const { filename } = req.params;

            const filePath = path.join(__dirname, '../public/audio/', filename);

            fs.stat(filePath, (err, stats) => {
                if (err || !stats.isFile()) {
                    return res.status(404).send('File not found');
                }

                const range = req.headers.range;
                if (range) {
                    // Handle range requests (partial content for seeking)
                    const [start, end] = range.replace(/bytes=/, "").split("-");
                    const startByte = parseInt(start, 10);
                    const endByte = end ? parseInt(end, 10) : stats.size - 1;
                    const chunkSize = endByte - startByte + 1;

                    res.writeHead(206, {
                        'Content-Range': `bytes ${startByte}-${endByte}/${stats.size}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunkSize,
                        'Content-Type': 'audio/mp4',
                    });

                    return fs.createReadStream(filePath, { start: startByte, end: endByte }).pipe(res);
                }

                // If no range request, serve the full file
                res.writeHead(200, {
                    'Content-Type': 'audio/mp4',
                    'Content-Length': stats.size,
                });

                fs.createReadStream(filePath).pipe(res);
            });

        } catch (err) {
            console.error('Get Audio Error:', err);
            res.status(500).json({ error: 'There was an error retrieving the audio' });
        }
    }

    async getVideoByFilename(req, res) {
        try {
            const { filename } = req.params;

            const filePath = path.join(__dirname, '../public/video/', filename);


            fs.stat(filePath, (err, stats) => {
                if (err || !stats.isFile()) {
                    return res.status(404).send('File not found');
                }

                const range = req.headers.range;
                if (range) {
                    const [start, end] = range.replace(/bytes=/, "").split("-");
                    const startByte = parseInt(start, 10);
                    const endByte = end ? parseInt(end, 10) : stats.size - 1;
                    const chunkSize = endByte - startByte + 1;

                    res.writeHead(206, {
                        'Content-Range': `bytes ${startByte}-${endByte}/${stats.size}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunkSize,
                        'Content-Type': 'video/mp4',
                    });

                    return fs.createReadStream(filePath, { start: startByte, end: endByte }).pipe(res);
                }

                // If no range request, serve the full file
                res.writeHead(200, {
                    'Content-Type': 'video/mp4',
                    'Content-Length': stats.size,
                });

                fs.createReadStream(filePath).pipe(res);
            });

        } catch (err) {
            console.error('Get Video Error:', err);
            res.status(500).json({ error: 'There was an error retrieving the video' });
        }
    }

    // UPDATE 

    async activateMedia(id) {
        try {
            const getReel = await Media.findOne(
                {
                    where: {
                        id
                    }
                }
            );

            const res = await Media.update(
                {
                    active: !getReel.dataValues.active
                },
                {
                    where: {
                                id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Activate/Deactivate Media Error: ', err);
            throw Error('There was an error activating or deactivating the media');
        }
    }

    async updateMedia(id, params) {
        try {
            const res = await Media.update(
                params,
                {
                    where: {
                                id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Media Error: ', err);
            throw Error('There was an error updating the Media');
        }
    }

    // DELETE

    async deleteMediaById(id) {
        try {
            const getReel = await Media.findAndCountAll({
                where: {
                    id
                }
            });
            
            if(getReel.rows[0].path) {
                const mediaPath = getReel.rows[0].path;

                fs.stat(`./public${mediaPath}`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                
                    fs.unlink(`./public${mediaPath}`,function(err){
                        if(err) return console.log('There was an error deleting the Media: ', err);
                        console.log('file deleted successfully');
                    });
                });
            }

            const res = await Media.destroy(
                {
                    where: {
                                id
                            }
                }
            );
            return {
                status: 200,
                res: res
            };
        } catch (err) {
            console.log('DELETE Media Error: ', err);
            throw Error('There was an error deleting the Media');
        }
    }
}