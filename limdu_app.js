var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./platsModel');
const db = require('./recipesModel');


(async function() {

	const plats = await db.getAllPlats()
	console.log(plats)
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
		{input: "Je veux boire un barcadi", output: "barcadi"},
		{input: "Je veux boire un barcad", output: "barcadi"},
		{input: "Je veux une boisson de barcadir", output: "barcadi"},
		{input: "J'aime du barcardi", output: "barcadi"},
		{input: "Je veux boire un captain morgan", output: "captain_morgan"},
		{input: "J'aime du captain morgan", output: "captain_morgan"},
		{input: "Je veux boire un old nick", output: "old_nick"},
		{input: "J'aime du old nick", output: "old_nick"},
	]);


	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifierAccept = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifierAccept.trainBatch([
		{input: "Je veux bien cette boisson", output: "oui"},
		{input: "Donne moi !", output: "oui"},
		{input: "je prends", output: "oui"},
		{input: "ok", output: "oui"},
		{input: "je ne prends pas", output: "no"},
		{input: "Non c'est trop chère", output: "non"},
		{input: "Non je veux pas", output: "non"},
		{input: "Non sait pas !", output: "non"},
	]);



	console.log('Bonjour')
	const rhum_want = prompt("Pouvez-vous me dire le rhum que vous souhaitez (Nick, Barcardi, Morgan) possible ?");
	predicted_response = intentClassifier.classify(rhum_want);

	let current_plat = null
	// console.log('predicted_response', predicted_response)
	for (plat of plats) {
		if (plat.name == predicted_response[0]) {
			console.log("La plat", plat['name'], "est de", plat['price'], " EUR")
			current_plat = plat 
			break
		}
	}

	const yesno = prompt(`Souhaitez-vous payer votre ${current_plat.name} ?`);
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

})()