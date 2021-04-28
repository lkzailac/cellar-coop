'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [{
        size: 'm',
        startDate: '2038-01-19 03:14:07 UTC',
        returnDate: '2021-01-19 03:14:07 UTC',
        rent: true,
        buy: false,
        price_USD: 24,
        itemId: 1,
        userId: 1
      }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Bookings', null, {});

  }
};
