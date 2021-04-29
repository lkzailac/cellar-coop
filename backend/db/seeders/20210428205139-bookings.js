'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [{
        size: 'm',
        startDate: '05/12/2021',
        returnDate: '06/12/2021',
        rent: true,
        buy: false,
        itemId: 1,
        userId: 1
      }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Bookings', null, {});

  }
};
