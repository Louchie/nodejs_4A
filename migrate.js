// Create table

const knex = require('knex')(require('./knexfile')['development']);

async function createPlatsTable() {
  try {
    const exists = await knex.schema.hasTable('plats');
    if (!exists) {
      await knex.schema.createTable('plats', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('type_lunch');
        table.string('taste');
        table.integer('number_people');
      });
      console.log('La table "plats" a été créée avec succès.');
    } else {
      console.log('La table "plats" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la table "plats" :', error);
  } finally {
    await knex.destroy();
  }
}

async function createRecettesTable() {
  try {
    const exists = await knex.schema.hasTable('recipes');
    if (!exists) {
      await knex.schema.createTable('recipes', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('steps');
      });
      console.log('La table "recettes" a été créée avec succès.');
    } else {
      console.log('La table "recettes" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la table "recettes" :', error);
  } finally {
    await knex.destroy();
  }
}

// Appel des fonctions pour créer les tables
createPlatsTable();
createRecettesTable();
