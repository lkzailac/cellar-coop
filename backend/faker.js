const faker = require('faker');
const bcrypt = require('bcryptjs');

//fake Users
const randomDressSize = function() {
    let num = Math.floor(Math.random() * 3);
    if(num === 0) return 's'
    if(num === 1) return 'm'
    if(num=== 2) return 'l'
};

const randomJeanSize = function() {
    let num =Math.floor(Math.random() * 6)
    return num * 2;
};

function randomHeight(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function randomWeight(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


const createUsers = async function() {
    let userArray = [
        {
            firstName: 'Demo',
            email: 'demo@user.com',
            hashedPassword: bcrypt.hashSync('password')
        }
    ]

    for (let i = 0; i < 20; i++) {
      let user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: null,
        hashedPassword: bcrypt.hashSync('password'),
        height_in: randomHeight(36, 96),
        weight_lbs: randomWeight(50, 300),
        dressSize: randomDressSize(),
        jeanSize: randomJeanSize(),
      }
      let name = await user.firstName;
      user.email = `${name}${i}@email.com`;
      userArray.push(user)
    }
    console.log('userArray', userArray)
    return userArray;
}
createUsers();
