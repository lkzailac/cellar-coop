'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        email: 'demo@user.com',
        hashedPassword: '$2a$10$9PWF0E2d/euA2185eoZV7.Wj1XIx0ufTX25/5BcgFDRQlGK/50QHK'
      },
      {
        firstName: 'Karianne',
        lastName: 'Aufderhar',
        email: 'Karianne0@email.com',
        hashedPassword: '$2a$10$mQ2uln3rzE3y8sVMqBpsreeR9JTlvazUBxAypair8tEuveDSeQqhi',
        height_in: 88,
        weight_lbs: 123,
        dressSize: 's',
        jeanSize: 4
      },
      {
        firstName: 'Michale',
        lastName: 'Robel',
        email: 'Michale1@email.com',
        hashedPassword: '$2a$10$rHMXgjuKN83zvv7Qb1lEauSwFc1wqEQHukrovkw6LXQ1guqxeL9EG',
        height_in: 64,
        weight_lbs: 109,
        dressSize: 'l',
        jeanSize: 10
      },
      {
        firstName: 'Kenyon',
        lastName: 'Kautzer',
        email: 'Kenyon2@email.com',
        hashedPassword: '$2a$10$rMjherWPk7yIXbC62Efx2emu2VrlXyZ8t5kh5xZ..ockXjA0HnnzK',
        height_in: 68,
        weight_lbs: 125,
        dressSize: 'm',
        jeanSize: 2
      },
      {
        firstName: 'Emmet',
        lastName: 'Bartoletti',
        email: 'Emmet3@email.com',
        hashedPassword: '$2a$10$8GGsMQNJ5xdBvVZjgvSfpO88LIPbhfnXE9pSGYlj2qqzxm61hXDT.',
        height_in: 61,
        weight_lbs: 179,
        dressSize: 's',
        jeanSize: 4
      },
      {
        firstName: 'Geraldine',
        lastName: 'Harber',
        email: 'Geraldine4@email.com',
        hashedPassword: '$2a$10$PLh7r.v5c2ZBd00YIlBJS.CKpwxbPyyITp1DmgYef8KjTetU0murO',
        height_in: 66,
        weight_lbs: 106,
        dressSize: 's',
        jeanSize: 8
      },
      {
        firstName: 'Dominic',
        lastName: 'Hahn',
        email: 'Dominic5@email.com',
        hashedPassword: '$2a$10$rwRGoyD8TfVFVRDmaSPhm.uJn6EL1VpioNMvUrkVR0Otr3r7TsQk6',
        height_in: 42,
        weight_lbs: 216,
        dressSize: 'l',
        jeanSize: 10
      },
      {
        firstName: 'Makenzie',
        lastName: 'Frami',
        email: 'Makenzie6@email.com',
        hashedPassword: '$2a$10$aa9jDrSF6R76uDls8a1WRuEDuFib5JQJGzN9oGUnZtS7eOfDzR/X.',
        height_in: 73,
        weight_lbs: 109,
        dressSize: 's',
        jeanSize: 2
      },
      {
        firstName: 'Easton',
        lastName: 'Schaden',
        email: 'Easton7@email.com',
        hashedPassword: '$2a$10$qcyMsrVB175cozJV4KxaIe433FIPbQv01P8jmggb9aNi86tIPn6KW',
        height_in: 77,
        weight_lbs: 110,
        dressSize: 's',
        jeanSize: 10
      },
      {
        firstName: 'Zula',
        lastName: 'Kreiger',
        email: 'Zula8@email.com',
        hashedPassword: '$2a$10$h0TN0r8DRfvtSk/g5gxvieCb6cMzkElFmjSPha3dPhkciS1nPLhDW',
        height_in: 95,
        weight_lbs: 97,
        dressSize: 's',
        jeanSize: 4
      },
      {
        firstName: 'Candida',
        lastName: 'Ryan',
        email: 'Candida9@email.com',
        hashedPassword: '$2a$10$I3IPLN3O0.bNDj1.JkhLEOuJDZs6PmtoEHpNDGlzi4IoU/fZKVgzC',
        height_in: 52,
        weight_lbs: 276,
        dressSize: 'l',
        jeanSize: 0
      },
      {
        firstName: 'Erika',
        lastName: 'Jones',
        email: 'Erika10@email.com',
        hashedPassword: '$2a$10$iDy6/Nbo3N7r0YR/Au.oD.WsAWKRObZ6GPMj8jcOFTAnC5ZLdYUVm',
        height_in: 50,
        weight_lbs: 153,
        dressSize: 'l',
        jeanSize: 6
      },
      {
        firstName: 'Haleigh',
        lastName: 'Murazik',
        email: 'Haleigh11@email.com',
        hashedPassword: '$2a$10$rRrn7xOtjC1qKOo7AK7ro.HjpGh/dKbQHJXeaevpCD8aLLZdt6qyC',
        height_in: 79,
        weight_lbs: 76,
        dressSize: 's',
        jeanSize: 6
      },
      {
        firstName: 'Jeremy',
        lastName: 'Cronin',
        email: 'Jeremy12@email.com',
        hashedPassword: '$2a$10$WCdFljk8DlzP9DJJzTBA/OLXQQD3Ct6KdwZYnTcJrNsd8G3LcNeni',
        height_in: 64,
        weight_lbs: 170,
        dressSize: 'm',
        jeanSize: 10
      },
      {
        firstName: 'Vaughn',
        lastName: 'Gerhold',
        email: 'Vaughn13@email.com',
        hashedPassword: '$2a$10$BA5AijQ/n/gtdeadKuklSugutrtbe/H085uaUcMRrGiILi592D4s6',
        height_in: 59,
        weight_lbs: 69,
        dressSize: 's',
        jeanSize: 4
      },
      {
        firstName: 'Eloise',
        lastName: 'Douglas',
        email: 'Eloise14@email.com',
        hashedPassword: '$2a$10$w5De6.AIC7eTP3A1XOkkaerHPKJrT46Uy6ASgLhN8W6gRyj0OEabK',
        height_in: 55,
        weight_lbs: 226,
        dressSize: 'l',
        jeanSize: 6
      },
      {
        firstName: 'Karolann',
        lastName: 'McDermott',
        email: 'Karolann15@email.com',
        hashedPassword: '$2a$10$2HnZYw3koITd35kVGa0YfOwJyZ7xduDKDk114VTi4fvAjih.NMWDm',
        height_in: 53,
        weight_lbs: 226,
        dressSize: 'l',
        jeanSize: 0
      },
      {
        firstName: 'Gwendolyn',
        lastName: 'Cruickshank',
        email: 'Gwendolyn16@email.com',
        hashedPassword: '$2a$10$SbKvaxXTugJUggmaQAcP6e/Z845Qo/DI/n95Q9Qb36HG1ENmdWORS',
        height_in: 64,
        weight_lbs: 294,
        dressSize: 'm',
        jeanSize: 2
      },
      {
        firstName: 'Hillary',
        lastName: 'Braun',
        email: 'Hillary17@email.com',
        hashedPassword: '$2a$10$VqxTXOUh.sKsf0AD/szW/uGLkDZC/j9qjnrSc7m60mZ.CWn24JyJS',
        height_in: 65,
        weight_lbs: 80,
        dressSize: 'l',
        jeanSize: 10
      },
      {
        firstName: 'Amani',
        lastName: 'MacGyver',
        email: 'Amani18@email.com',
        hashedPassword: '$2a$10$36uyTtsvbyDceBk9RakuReLpECMPprtVWjmVS7y4PHue1RxiJdu8C',
        height_in: 60,
        weight_lbs: 172,
        dressSize: 'l',
        jeanSize: 6
      },
      {
        firstName: 'Glenna',
        lastName: 'Conn',
        email: 'Glenna19@email.com',
        hashedPassword: '$2a$10$ucYfACeoTjJ1hDMwagFJtOrUbkrgA3tg/JmK2ceoo4y/XDeSOo4mG',
        height_in: 86,
        weight_lbs: 82,
        dressSize: 'l',
        jeanSize: 4
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
