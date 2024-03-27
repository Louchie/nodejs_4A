// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createPlat(name, type_lunch, taste, number_people) {
  return await knex('plats').insert({ name, type_lunch, taste, number_people });
}

// Read
async function getAllPlats() {
  return await knex.select().from('plats');
}

async function getPlatById(id) {
  return await knex('plats').where({ id }).first();
}

// Update
async function updatePlat(id, type_lunch) {
  return await knex('plats').where({ id }).update({ type_lunch });
}

// Delete
async function deletPlat(id) {
  return await knex('plats').where({ id }).del();
}

module.exports = {
  createPlat,
  getAllPlats,
  getPlatById,
  updatePlat,
  deletPlat
};

// npm install knex sqlite3