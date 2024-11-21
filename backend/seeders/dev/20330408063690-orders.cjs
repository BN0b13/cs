'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Orders' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      userId: 25,
      refId: "CS429-1691194602750",
      products: JSON.stringify([
          {
              quantity: 1,
              productId: 9
          }
      ]),
      total: 7198,
      billingAddress: JSON.stringify({
          city: "Alexandria",
          state: "MN",
          addressOne: "123 Main Street",
          zipCode: "55555",
          lastName: "Johnson",
          firstName: "John"
      }),
      shippingAddress: JSON.stringify({
        city: "Alexandria",
        state: "MN",
        addressOne: "123 Main Street",
        zipCode: "55555",
        lastName: "Johnson",
        firstName: "John"
      }),
      shippingId: 0,
      shippingTotal: 699,
      deliveryInsurance: false,
      deliveryInsuranceTotal: 0,
      couponId: null,
      status: "SHIPPED",
      paid: true,
      paymentLink: "https://cosmicstrains.com",
      fulfilledBy: 1,
      tracking: "999999999999999999",
      notes: null,
      saleId: null,
      paymentType: null,
      credit: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 25,
      refId: "CS429-1691194602750",
      products: JSON.stringify([
          {
            quantity: 1,
            productId: 9
          }
      ]),
      total: 7198,
      billingAddress: JSON.stringify({
          city: "Alexandria",
          state: "MN",
          addressOne: "123 Main Street",
          zipCode: "55555",
          lastName: "Johnson",
          firstName: "John"
      }),
      shippingAddress: JSON.stringify({
        city: "Alexandria",
        state: "MN",
        addressOne: "123 Main Street",
        zipCode: "55555",
        lastName: "Johnson",
        firstName: "John"
      }),
      shippingId: 0,
      shippingTotal: 699,
      deliveryInsurance: false,
      deliveryInsuranceTotal: 0,
      couponId: null,
      status: "NEW",
      paid: false,
      paymentLink: null,
      fulfilledBy: null,
      tracking: null,
      notes: null,
      saleId: null,
      paymentType: null,
      credit: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Orders', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
