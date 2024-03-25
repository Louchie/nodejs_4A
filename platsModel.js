// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createPlats(name, quantity, price) {
  return await knex('plats').insert({ name, type_lunch, taste, number_people });
}

// Read
async function getAllPlats() {
  return await knex.select().from('plats');
}

async function getPlatsById(id) {
  return await knex('plats').where({ id }).first();
}

// Update
async function updateBoisson(id, type_lunch) {
  return await knex('plats').where({ id }).update({ type_lunch });
}

// Delete
async function deletPlats(id) {
  return await knex('plats').where({ id }).del();
}

module.exports = {
  createPlats,
  getAllPlats,
  getPlatsById,
  updateBoisson,
  deletPlats
};

// npm install knex sqlite3