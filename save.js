// App.js - Utilisation des opérations CRUD avec Knex, initialisation de la BDD 
//la base de donnée des

const db = require('./platsModel');
const db = require('./recipesModel');


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//faudra remplacer par des vrai info les truc 
async function main() {
  const plats = {
    'Quiche Lorraine':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Bruschetta aux Tomates et à la Mozzarella':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Mini-Pizzas aux Légumes Grillés':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Tartelettes aux Épinards et à la Feta':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Poivrons Farcis au Riz et à la Viande':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Salade de Pommes de Terre et de Thon':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Toasts à l\'Avocat et aux Crevettes ':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Omelette aux Champignons et au Fromage':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Roulés de Courgettes au Fromage de Chèvre':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Club Sandwich au Poulet et au Bacon':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Gnocchis à la Sauce Tomate et Basilic':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Chili Con Carne avec Riz':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Salade de Pâtes aux Légumes Grillés':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Soupe de Lentilles et Saucisse ':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Sandwich au Saumon Fumé et Fromage Frais':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Salade Caprese':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Crêpes à la Confiture de Fraises':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Gaufres aux Fruits et Crème Chantilly':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Tartelettes aux Fruits de Saison ':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Pancakes aux Myrtilles et Sirop d\'Érable':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Pudding au Pain et aux Raisins Secs':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Brownies aux Noix et au Chocolat ':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Muffins aux Pépites de Chocolat ':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Tarte aux Pommes Maison':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Crumble aux Fruits Rouges ':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Mousse au Chocolat':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Tiramisu':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Cheesecake aux Fruits Rouges ':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Tarte Tatin aux Pommes':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Panna Cotta à la Vanille':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Coulant au Chocolat':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
    'Salade de Fruits Frais':{ type_lunch:'dinner',taste:'salée',number_people:'4'},
  }

  const recepes = {
    'Quiche Lorraine':{ steps:' Ingrédients 1 pâte brisée 200g de lardons fumés100g de gruyère râpé 3 œufs 20cl de crème fraîche 20cl de lait Sel, poivre, muscade Instructions :Préchauffez votre four à 180°C (thermostat 6).Étalez la pâte brisée dans un moule à tarte préalablement beurré et piquez le fond à l aide d une fourchette.Dans une poêle, faites revenir les lardons à feu moyen jusqu à ce qu ils soient dorés. Égouttez-les sur du papier absorbant pour enlever l excès de gras.Répartissez les lard'},
    'Bruschetta aux Tomates et à la Mozzarella':{ steps:'dinner'},
    'Mini-Pizzas aux Légumes Grillés':{ steps:'dinner'},
    'Tartelettes aux Épinards et à la Feta':{ steps:'dinner'},
    'Poivrons Farcis au Riz et à la Viande':{ steps:'dinner'},
    'Salade de Pommes de Terre et de Thon':{ steps:'dinner'},
    'Toasts à l\'Avocat et aux Crevettes ':{ steps:'dinner'},
    'Omelette aux Champignons et au Fromage':{ steps:'dinner'},
    'Roulés de Courgettes au Fromage de Chèvre':{ steps:'dinner'},
    'Club Sandwich au Poulet et au Bacon':{ steps:'dinner'},
    'Gnocchis à la Sauce Tomate et Basilic':{ steps:'dinner'},
    'Chili Con Carne avec Riz':{ steps:'dinner'},
    'Salade de Pâtes aux Légumes Grillés':{ steps:'dinner'},
    'Soupe de Lentilles et Saucisse':{ steps:'dinner'},
    'Sandwich au Saumon Fumé et Fromage Frais':{ steps:'dinner'},
    'Salade Caprese':{ steps:'dinner'},
    'Crêpes à la Confiture de Fraises':{ steps:'dinner'},
    'Gaufres aux Fruits et Crème Chantilly':{ steps:'dinner'},
    'Tartelettes aux Fruits de Saison ':{ steps:'dinner'},
    'Pancakes aux Myrtilles et Sirop d\'Érable':{ steps:'dinner'},
    'Pudding au Pain et aux Raisins Secs':{ steps:'dinner'},
    'Brownies aux Noix et au Chocolat ':{ steps:'dinner'},
    'Muffins aux Pépites de Chocolat ':{ steps:'dinner'},
    'Tarte aux Pommes Maison':{ steps:'dinner'},
    'Crumble aux Fruits Rouges ':{ steps:'dinner'},
    'Mousse au Chocolat':{ steps:'dinner'},
    'Tiramisu':{ steps:'dinner'},
    'Cheesecake aux Fruits Rouges ':{ steps:'dinner'},
    'Tarte Tatin aux Pommes':{ steps:'dinner'},
    'Panna Cotta à la Vanille':{ steps:'dinner'},
    'Coulant au Chocolat':{ steps:'dinner'},
    'Salade de Fruits Frais':{ steps:'dinner'},
  }

  for (plat_name in plats) {
    await db.createplat(plat_name, plats[plat_name].qty, plats[plat_name].price);
  }

  // Read
  const getAllplats = await db.getAllplats();
  console.log('Tous les plats :', getAllplats);
}

main().catch(err => console.error(err));
