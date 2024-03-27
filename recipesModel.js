// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createRecipe(name, steps) {
    return await knex('recipes').insert({ name, steps});
}

// Read
async function getAllRecipes() {
  return await knex.select().from('recipes');
}

async function getRecipeById(id) {
  return await knex('recipes').where({ id }).first();
}

// Update
async function updateRecipe(id, steps) {
  return await knex('recipes').where({ id }).update({ steps });
   }
   
// Delete
async function deletRecipe(id) {
  return await knex('recipes').where({ id }).del();
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deletRecipe
};

// npm install knex sqlite3