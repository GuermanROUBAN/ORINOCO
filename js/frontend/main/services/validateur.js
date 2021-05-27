//-----------------------------------------------------------------------------------------------
// ETAPE 9 - Validation du formulaire
// Expression de fonction

// Message d'alerte en cas de mauvaise saisie dans le formulaire
const textAlert = (value) => {
	return `Attention champs ${value}:  \n - vide (minimum 3 caractères necessaires) \n - comporte des caractères non autorisés (chiffres / symboles)`;
}

// Saisie autorisée pour le nom des villes
const regExPrenomNom = (value) => {
	return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value)
}

// Saisie autorisée pour le nom des villes
const regExVille = (value) => {
	return /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/.test(value)
}

// Saisie autorisée pour l'adresse'
const regExAdresse = (value) => {
	return /^\d{1,4}\s[a-zA-Z0-9\s,'-]+$/.test(value)
	//\d = chiffre {nombre de repetitions du chiffre de 1 ,(à) 4 fois} \ espace
	// [lettres min/maj chiffres ou \s espace ,virgule 'accent - tiret] = autorisé + (1 fois ou plus)
}


// Saisie autorisée pour l'email
const regExEmail = (value) => {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

// Fonction pour gérer l'affichage du texte de validation input
function dataChampManquantTexteVide(querySelectorId) {
	document.querySelector(`#${querySelectorId}`).textContent = "";
};

function dataChampManquantTexte(querySelectorId) {
	document.querySelector(`#${querySelectorId}`).textContent = " Merci de bien vouloir remplir ce champ";
};