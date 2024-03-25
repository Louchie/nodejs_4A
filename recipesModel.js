// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createPlat(name, quantity, price) {
  return await knex('recipes').insert({ name, type_lunch, taste, number_people });
}

// Read
async function getAllrecipes() {
  return await knex.select().from('recipes');
}

async function getPlatById(id) {
  return await knex('recipes').where({ id }).first();
}

// Update
async function updatePlat(id, type_lunch) {
  return await knex('recipes').where({ id }).update({ type_lunch });
}

// Delete
async function deletPlat(id) {
  return await knex('recipes').where({ id }).del();
}

module.exports = {
  createPlat,
  getAllRecipes,
  getPlatById,
  updatePlat,
  deletPlat
};

// npm install knex sqlite3