var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db_plats = require('./platsModel');
const db_recipes = require('./recipesModel');

(async function() {
    const plats = await db_plats.getAllPlats();
    const recipes = await db_recipes.getAllRecipes();
    console.log(plats, recipes);

    var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: limdu.classifiers.Winnow.bind(0, { retrain_count: 10 })
    });

    var WordExtractor = function(input, features) {
        input.split(" ").forEach(function(word) {
            features[word]=1;
        });
    };

    var intentClassifier = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    intentClassifier.trainBatch([
        { input: "Je veux un petit déjeuner", output: "petit déjeuner" },
        { input: "Je veux un déjeuner", output: "déjeuner" },
        { input: "Je veux un petit goûter", output: "goûter" },
        { input: "Je veux un petit dîner", output: "dîner" },
    ]);

    var intentClassifiertaste = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    intentClassifiertaste.trainBatch([
        { input: "je veux manger sucré", output: "sucré" },
        { input: "je veux manger salé", output: "salé" },
    ]);

    var intentClassifiernumber = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    intentClassifiernumber.trainBatch([
        { input: "1", output: "2" },
        { input: "2", output: "2" },
        { input: "3", output: "4" },
        { input: "4", output: "4" },
        { input: "5", output: "6" },
        { input: "6", output: "6" },
        { input: "7", output: "8" },
        { input: "8", output: "8" },
    ]);

    console.log('Bonjour');
    const type_lunch_want = prompt("Pouvez-vous me dire quel type de repas vous souhaitez (petit dejeuner, dejeuner, goûter, dinner) si possible ?");
    predicted_response = intentClassifier.classify(type_lunch_want);
    let current_plat = null;
    for (plat of plats) {
        if (plat.name == predicted_response[0]) {
            console.log("Le type de repas est", plat['type_lunch']);
            current_plat = plat;
            break;
        }
    }

    const type_lunch_taste = prompt("Voulez-vous mangez sucré ou salée?");
    predicted_response = intentClassifiertaste.classify(type_lunch_taste);
    let current_plat_taste = null;
    for (plat of plats) {
        if (plat.name == predicted_response[0]) {
            console.log("Le type de repas est", plat['type_lunch']);
            current_plat = plat;
            break;
        }
    }

    const type_lunch_number = prompt("Combien seriez-vous à manger ce plat ?");
    predicted_response = intentClassifiernumber.classify(type_lunch_number);
    let current_plat_number = null;
    for (plat of plats) {
        if (plat.name == predicted_response[0]) {
            console.log("Le type de repas est", plat['type_lunch']);
            current_plat = plat;
            break;
        }
    }
})();
