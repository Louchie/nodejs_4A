var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db_plats = require('./platsModel');
const db_recipes = require('./recipesModel');


(async function() {

	const plats = await db_plats.getAllPlats();
    const recipes = await db_recipes.getAllRecipes()
    console.log(plats, recipes)
	// First, define our base classifier type (a multi-label classifier based on winnow):
	var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
		binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
	});

	// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
	var WordExtractor = function(input, features) {
		input.split(" ").forEach(function(word) {
			features[word]=1;
		});
	};

	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifier = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifier.trainBatch([
		{input: "Je veux un petit déjeuner", output: "petit déjeuner"},
        {input: "Je veux un déjeuner", output: "déjeuner"},
        {input: "Je veux un petit goûter", output: "goûter"},
		{input: "Je veux un petit dîner", output: "dîner"},
    
	]);


	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifiertaste = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifiertaste.trainBatch([
		{input: "je veux manger sucreé", output: "sucré"},
		{input: "je veux manger salé", output: "salée"},
		{input: "je veux manger sale", output: "salée"},
	]);


	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifiernumber = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifiernumber.trainBatch([
		{input: "1", output: 2},
		{input: "2", output: 2},
		{input: "3", output: 4},
		{input: "4", output: 4},
		{input: "5", output: 6},
		{input: "6", output: 6},
		{input: "7", output: 8},
		{input: "8", output: 8},
		
	]);



	console.log('Bonjour')
	const type_lunch_want = prompt("Pouvez-vous me dire quel type de repas vous souhaitez (petit dejeuner, dejeuner, goûter, dinner) si possible ?"); 
	predicted_response1 = intentClassifier.classify(type_lunch_want);

	const type_lunch_taste = prompt("Voulez-vous mangez sucré ou salée?"); 
	predicted_response2 = intentClassifiertaste.classify(type_lunch_taste);

	const type_lunch_number = prompt("Combien seriez-vous à manger ce plat ?"); 
	predicted_response3 = intentClassifiernumber.classify(type_lunch_number);
	let current_plat_number = null

	console.log(predicted_response1,predicted_response2,predicted_response3)

	for (plat of plats) {
		if ((plat.number_people  == predicted_response3[0]) && (plat.taste == predicted_response2[0]) && (plat.type_lunch  == predicted_response1[0])) {
			console.log("je vous conseil de faire à manger un/une ", plat.name)
			current_plat = plat 
			for (recipe of recipes) {
				if (plat.name == recipe.name){
					console.log(recipe.steps)
					break
				}
			}
			break
		}
	}

	

	/*

	

	const yesno = prompt(`Voulez-vous mangez sucré ou salée ${current_plat.name} ?`);
	predicted_response = intentClassifierAccept.classify(yesno);
	if (predicted_response[0] == 'non') {
		console.log('Merci et à la prochaine!')
	}

	if (predicted_response[0] == 'oui') {

		const want_qty = prompt(`Avez-vous besoin de combien de ${current_plat.name} ?`);
		console.log(`Vous voulez ${Number(want_qty)} ${current_plat.name}(s)`)
		plat_from_db = await db.getplatById(current_plat.id)
		if ((plat_from_db.quantity <= 0)) {
			console.log(`Nous n'avons plus de ${plat_from_db.name}!`)
		} else if ((plat_from_db.quantity - Number(want_qty)) <= 0) {
			console.log(`Nous n'avons pas suffisamment de ${plat_from_db.name} pour vous servir!`)
		} else {
			db.updatePlat(current_plat.id, plat_from_db.quantity - Number(want_qty))
			if (Number(want_qty) == 1) {
				console.log('Ok merci prennez votre plat!')
			} else {
				console.log('Ok merci prennez vos plats!')
			}
		}
	}
*/

})()