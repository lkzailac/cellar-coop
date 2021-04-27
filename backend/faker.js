const faker = require('faker');
const bcrypt = require('bcryptjs');

/////Fake Users
// const randomDressSize = function() {
//     let num = Math.floor(Math.random() * 3);
//     if(num === 0) return 's'
//     if(num === 1) return 'm'
//     if(num=== 2) return 'l'
// };

// const randomJeanSize = function() {
//     let num =Math.floor(Math.random() * 6)
//     return num * 2;
// };

// function randomHeight(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min);
// }

// function randomWeight(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min);
// }


// const createUsers = async function() {
//     let userArray = [
//         {
//             firstName: 'Demo',
//             email: 'demo@user.com',
//             hashedPassword: bcrypt.hashSync('password')
//         }
//     ]

//     for (let i = 0; i < 20; i++) {
//       let user = {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         email: null,
//         hashedPassword: bcrypt.hashSync('password'),
//         height_in: randomHeight(36, 96),
//         weight_lbs: randomWeight(50, 300),
//         dressSize: randomDressSize(),
//         jeanSize: randomJeanSize(),
//       }
//       let name = await user.firstName;
//       user.email = `${name}${i}@email.com`;
//       userArray.push(user)
//     }
//     console.log('userArray', userArray)
//     return userArray;
// }
// createUsers();

////// Fake Items
function randomNum() {
    let num = Math.trunc(Math.random() * 100)
    return num;
}

function randomDesigner() {
    return Math.floor(Math.random() * 20) + 1;
}



const createItems = async function() {
    let itemsArray = [];

    for (let i = 0; i < 20; i++) {
        let item = {
            photo: 'url',
            description: faker.lorem.paragraph(),
            originalPrice_USD: randomNum() + 100,
            priceToRent_USD: null,
            priceToBuy_USD: null,
            sizeSInventory: randomNum(),
            sizeMInventory: randomNum(),
            sizeLInventory: randomNum(),
            designerId: randomDesigner(),
            categoryId: "categoty"
        }

        let rent = await item.originalPrice_USD;
        // console.log('rent', Math.ceil(rent / 7))
        // let rent = await item.originalPrice_USD ;
        item.priceToRent_USD = Math.ceil(rent / 7);
        // console.log(await item.priceToRent_USD);
        let buy = await item.priceToRent_USD;
        item.priceToBuy_USD = buy + 10;
        itemsArray.push(item)
    }
    console.log(itemsArray)
    return itemsArray;
}

createItems()
