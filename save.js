// App.js - Utilisation des opérations CRUD avec Knex, initialisation de la BDD 
//la base de donnée des

const db_plats = require('./platsModel');
const db_recipes = require('./recipesModel');


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//faudra remplacer par des vrai info les truc 
async function main() {
  const plats = {
    'Quiche Lorraine':{ type_lunch:'déjeuner',taste:'salée',number_people:'4'},
    'Bruschetta aux Tomates et à la Mozzarella':{ type_lunch:'dîner',taste:'salée',number_people:'8'},
    'Mini-Pizzas aux Légumes Grillés':{ type_lunch:'dîner',taste:'salée',number_people:'8'},
    'Tartelettes aux Épinards et à la Feta':{ type_lunch:'déjeuner',taste:'salée',number_people:'4'},
    'Poivrons Farcis au Riz et à la Viande':{ type_lunch:'déjeuner',taste:'salée',number_people:'4'},
    'Salade de Pommes de Terre et de Thon':{ type_lunch:'dîner',taste:'salée',number_people:'4'},
    'Toasts à l\'Avocat et aux Crevettes ':{ type_lunch:'déjeuner',taste:'salée',number_people:'4'},
    'Omelette aux Champignons et au Fromage':{ type_lunch:'dîner',taste:'salée',number_people:'4'},
    
    
  }

  const recipes = {
    'Quiche Lorraine':{ steps:' Ingrédients 1 pâte brisée 200g de lardons fumés100g de gruyère râpé 3 œufs 20cl de crème fraîche 20cl de lait Sel, poivre, muscade Instructions :Préchauffez votre four à 180°C (thermostat 6).Étalez la pâte brisée dans un moule à tarte préalablement beurré et piquez le fond à l aide d une fourchette.Dans une poêle, faites revenir les lardons à feu moyen jusqu à ce qu ils soient dorés. Égouttez-les sur du papier absorbant pour enlever l excès de gras.Répartissez les lard'},
    'Bruschetta aux Tomates et à la Mozzarella':{ steps:'Ingrédients : 4 tranches de pain de campagne2 tomates mûres 1 boule de mozzarella 2 gousses d\'ail Huile d\'olive Basilic frais Sel, poivre Instructions : Préchauffez le four à 200°C. Frottez les tranches de pain avec de l\'ail et arrosez-les d\'huile d\'olive. Coupez les tomates et la mozzarella en tranches. Disposez les tranches de tomates et de mozzarella sur le pain. Assaisonnez avec du sel, du poivre et du basilic. Faites cuire au four pendant environ 10 minutes jusqu\'à ce que la mozzarella soit fondue.'},
    'Mini-Pizzas aux Légumes Grillés':{ steps:'Ingrédients : Mini-pâtes à pizza Sauce tomate Légumes grillés (aubergines, poivrons, courgettes) Fromage râpé Origan séché Huile d\'olive Sel, poivre Instructions : Préchauffez le four à 200°C. Étalez la sauce tomate sur les mini-pâtes à pizza. Disposez les légumes grillés sur la sauce. Saupoudrez de fromage râpé et d\'origan. Ajoutez un filet d\'huile d\'olive, du sel et du poivre. Faites cuire au four pendant environ 10-12 minutes.'},
    'Tartelettes aux Épinards et à la Feta':{ steps:'Ingrédients :Pâte feuilletée 200g d\'épinards frais 100g de feta 2 œufs 20cl de crème fraîche Sel, poivre, muscade Instructions : Préchauffez le four à 180°C. Foncez des moules à tartelettes avec la pâte feuilletée.Faites blanchir les épinards, puis égouttez-les et hachez-les grossièrement.Répartissez les épinards et la feta émiettée dans les fonds de tartelettes.Dans un bol, battez les œufs avec la crème, le sel, le poivre et la muscade.Versez ce mélange sur les épinards et la feta.Enfournez pendant environ 25-30 minutes, jusqu\'à ce que les tartelettes soient dorées.'},
    'Poivrons Farcis au Riz et à la Viande':{ steps: 'Ingrédients : 4 gros poivrons200g de riz cuit250g de viande hachée1 oignon 2 gousses d\'ail 1 boîte de pulpe de tomates Fromage râpé Persil frais Sel, poivre, paprika Huile d\'olive Instructions : Préchauffez le four à 180°C. Coupez le haut des poivrons et retirez les graines. Faites revenir l\'oignon et l\'ail hachés dans une poêle avec un peu d\'huile d\'olive. Ajoutez la viande hachée et faites-la cuire jusqu\'à ce qu\'elle soit dorée. Incorporez le riz cuit, la pulpe de tomates, le persil haché, le sel, le poivre et le paprika. Laissez mijoter pendant quelques minutes. Remplissez les poivrons de ce mélange et saupoudrez de fromage râpé. Disposez les poivrons dans un plat allant au four, ajoutez un peu d\'eau au fond du plat et enfournez pendant environ 30-35 minutes.'},
    'Salade de Pommes de Terre et de Thon':{ steps:'Ingrédients : 500g de pommes de terre 200g de thon en conserve 1 oignon rouge 1 poivron rouge 1 poivron vert 2 œufs durs 4 cuillères à soupe de mayonnaise 2 cuillères à soupe de vinaigre Sel, poivre Persil frais Instructions : Faites cuire les pommes de terre dans de l\'eau bouillante salée jusqu\'à ce qu\'elles soient tendres. Égouttez-les, laissez-les refroidir puis coupez-les en cubes. Émincez l\'oignon rouge et les poivrons en petits dés. Dans un grand saladier, mélangez les pommes de terre, le thon, les poivrons, l\'oignon rouge et les œufs durs coupés en quartiers. Dans un petit bol, préparez la vinaigrette en mélangeant la mayonnaise, le vinaigre, du sel, du poivre et du persil frais haché. Versez la vinaigrette sur la salade et mélangez délicatement pour enrober tous les ingrédients. Réfrigérez pendant au moins une heure avant de servir pour permettre aux saveurs de se mélanger. Juste avant de servir, vous pouvez saupoudrer un peu de persil frais haché sur le dessus pour la décoration.'},
    'Toasts à l\'Avocat et aux Crevettes ':{ steps:'Ingrédients :Tranches de pain de campagne 2 avocats mûrs Crevettes cuites et décortiquées Jus de citron Piment d\'Espelette Sel, poivre Instructions : Faites griller les tranches de pain de campagne. Écrasez la chair des avocats avec du jus de citron, du sel et du poivre. Étalez cette préparation sur les tranches de pain grillé. Disposez quelques crevettes sur chaque toast à l\'avocat. Saupoudrez de piment d\'Espelette pour ajouter un peu de piquant. Servez immédiatement en apéritif ou en entrée.'},
    'Omelette aux Champignons et au Fromage':{ steps:'Ingrédients : 4 œufs Champignons de Paris Fromage râpé (type gruyère) Persil frais Sel, poivre Beurre Instructions : Nettoyez et émincez les champignons. Faites-les revenir dans une poêle avec un peu de beurre jusqu\'à ce qu\'ils soient dorés. Battez les œufs dans un bol, assaisonnez avec du sel, du poivre et du persil frais haché. Versez les œufs battus dans une poêle préchauffée et laissez cuire légèrement. Ajoutez les champignons cuits et saupoudrez de fromage râpé. Laissez cuire jusqu\'à ce que l\'omelette soit bien prise et que le fromage soit fondu. Pliez l\'omelette en deux et servez chaud.'},
  
  }

  for (plat_name in plats) {
    await db_plats.createPlat(plat_name, plats[plat_name].type_lunch, plats[plat_name].taste, plats[plat_name].number_people);
  }

  // Créer les recettes
  for (recipe_name in recipes) {
    await db_recipes.createRecipe(recipe_name, recipes[recipe_name].steps);
  }

  // Read
  const getAllplats = await db_plats.getAllPlats();
  console.log('Tous les plats :', getAllplats);
}

main().catch(err => console.error(err));
