'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
        name: 'pants',
      },
      {
        name: 'dress',
      },
      {
        name: 'sweater',
      },
      {
        name: 't-shirt',
      },
      {
        name: 'denim',
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Categories', null, {});

  }
};
