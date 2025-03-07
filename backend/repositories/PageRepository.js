import { Op } from 'sequelize';

import { Page, Alert, Message } from '../models/Associations.js';

class PageRepository {


    // CREATE

    async create(data) {
        try {
            return await Page.create(data);
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the page');
        }
    }

    // READ

    async killPages() {
        try {
            await Alert.drop();
            await Message.drop();
            return await Page.drop();
        } catch (err) {
            console.log('Kill Pages Error: ', err);
            throw Error('There was an error Killing pages');
        }
    }

    async getPages() {
        try {
            return await Page.findAndCountAll();
        } catch (err) {
            console.log('Get Pages Error: ', err);
            throw Error('There was an error getting pages');
        }
    }

    async getPagesByType(type) {
        console.log('TYPE: ', type);
        try {
            return await Page.findAndCountAll({
                where: {
                    type
                }
            });
        } catch (err) {
            console.log('Get Pages By Type Error: ', err);
            throw Error('There was an error getting pages by type');
        }
    }
}

export default PageRepository;