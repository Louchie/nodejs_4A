// App.js - Utilisation des opérations CRUD avec Knex, initialisation de la BDD 
//la base de donnée des

const db = require('./platsModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  const plats = {
    'captain_morgan': { qty: 10, price: 30},
    'barcadi': { qty: 19, price: 10},
    'old_nick': { qty: 5, price: 30},
  }

  for (plat_name in plats) {
    await db.createplat(plat_name, plats[plat_name].qty, plats[plat_name].price);
  }

  // Read
  const getAllplats = await db.getAllplats();
  console.log('Tous les plats :', getAllplats);
}

main().catch(err => console.error(err));
