'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Designers', [
      { name: 'Chanel'},
      { name: 'Donna Karan'},
      { name: 'Old Navy'},
      { name: 'Anthropology'},
      { name: 'Michael Kors'},
      { name: 'Ralph Lauren'},
      { name: 'Versace'},
      { name: 'Vince'},
      { name: 'Jil Sander'},
      { name: 'Scotch & Soda'},
      { name: 'Prada'},
      { name: 'Rag & Bone'},
      { name: 'Represent'},
      { name: 'Off-White'},
      { name: 'Burberry'},
      { name: 'Woolrich'},
      { name: 'Levis'},
      { name: 'Calvin Klein'},
      { name: 'Fred Perry'},
      { name: 'Dear Frances'},], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Designers', null, {});

  }
};
