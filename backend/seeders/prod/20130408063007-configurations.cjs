'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Configurations' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      themeId: 1,
      name: 'public',
      url: 'cosmicstrains.com',
      company: JSON.stringify({
        name: 'Cosmic Strains',
        phoneActive: false,
        phone: null,
        phoneExt: null,
        emailActive: false,
        email: 'sales@cosmicstrains.com',
        addressActive: false,
        address: {
          addressOne: '3400 Cottage Way',
          addressTwo: 'Ste G2 #18240',
          city: 'Sacramento',
          state: 'CA',
          zipCode: 95825
        },
        socials: {
          discord: {
            url: 'https://discord.gg/fva4pKdeVg',
            active: true
          },
          facebook: {
              url: '',
              active: false
          },
          instagram: {
              url: 'https://www.instagram.com/cosmicstrainsofficial',
              active: true
          },
          linkedin: {
              url: '',
              active: false
          },
          reddit: {
              url: 'https://www.reddit.com/r/cosmicstrains',
              active: true
          },
          twitter: {
              url: '',
              active: false
          },
          youtube: {
              url: '',
              active: false
          }
        }
      }),
      options: JSON.stringify({
        customerService: {
          customerServiceOn: false,
          customerServicePhone: null,
          customerServicePhoneExt: null,
          customerServiceEmail: 'sales@cosmicstrains.com'
        },
        shipping: {
          standard: {
            description: 'Standard 5-7 business days',
            price: 699
          }
        },
        deliveryInsurance: {
          deliveryInsuranceOn: true,
          deliveryInsuranceAmount: 799,
          deliveryInsuranceDescription: ''
        },
        ageVerify: {
          ageVerifyOn: true,
          ageVerifyAgeLimit: 21
        },
        restrictedUsernames: ['cosmicstrains', 'cosmic_strains', 'cosmic-strains', 'cscollectibles']
      }),
      alerts: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
