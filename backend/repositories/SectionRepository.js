import { Section } from '../models/Associations.js';

class SectionRepository {

    // CREATE
    async create(data) {
        try {
            return await Section.create(data);
        } catch (err) {
            console.error('Create Section Error:', err);
            throw new Error('There was an error creating the section');
        }
    }

    // READ
    async getSections() {
        try {
            return await Section.findAll({ order: [['position', 'ASC']] }); // Sorts by position
        } catch (err) {
            console.error('Get Sections Error:', err);
            throw new Error('There was an error getting sections');
        }
    }

    async getSectionById(id) {
        try {
            return await Section.findByPk(id);
        } catch (err) {
            console.error('Get Section By ID Error:', err);
            throw new Error('There was an error retrieving the section');
        }
    }

    async getSectionsByType(type) {
        try {
            return await Section.findAll({
                where: { type },
                order: [['position', 'ASC']] // Sorts by position
            });
        } catch (err) {
            console.error('Get Sections By Type Error:', err);
            throw new Error('There was an error getting sections by type');
        }
    }

    // UPDATE

    async updateSection(id, data) {
        try {
            // Ensure the section exists before updating
            const section = await Section.findByPk(id);
            if (!section) return null;
    
            // Update and return the updated section
            await section.update(data);
            return section;
        } catch (err) {
            console.error('Update Section Error:', err);
            throw new Error('There was an error updating the section');
        }
    }
    
    // DELETE

    async deleteSectionById(id) {
        try {
            const res = await Section.destroy(
                {
                    where: {
                            id
                        }
                }
            );
            return res;
        } catch (err) {
            console.log('Delete Section Error: ', err);
            throw Error('There was an error deleting the section');
        }
    }
}

export default SectionRepository;