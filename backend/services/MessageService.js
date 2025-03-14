import { Message, User } from '../models/Associations.js';

export default class MessageService {

    async getUserSentMessages(id) {
        try {
            const res = await User.findByPk(id, {
                include: [{ model: Message, as: 'SentMessages' }],
              });
            return res;
        } catch (err) {
            console.log('Get Message by id Error: ', err);
            throw Error('There was an error getting the message by id');
        }
    }

    async getUserRecievedMessages(id) {
        try {
            const res = await User.findByPk(id, {
                include: [{ model: Message, as: 'ReceivedMessages' }],
              });
            return res;
        } catch (err) {
            console.log('Get Message by id Error: ', err);
            throw Error('There was an error getting the message by id');
        }
    }
}