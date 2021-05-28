// Validation du formulaire
//-----------------------------------------------------------------------------------------------
// Expression de fonction

// Saisie autorisée pour le nom et prenom
const regExPrenomNom = (value) => {
	return /^[\w'\-][^0-9_!¡?÷?¿\\.,+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value)
/*
^ asserts position at start of the string
Match a single character present in the list below [\w'\-]
\w matches any word character (equivalent to [a-zA-Z0-9_])
' matches the character ' literally (case sensitive)
\- matches the character - literally (case sensitive)

Match a single character not present in the list below [^0-9_!¡?÷?¿\\.,+=@#$%ˆ&*(){}|~<>;:[\]]
{2,} matches the previous token between 2 and unlimited times, as many times as possible, giving back as needed (greedy)
0-9 matches a single character in the range between 0 (index 48) and 9 (index 57) (case sensitive)
_!¡?÷?¿ matches a single character in the list _!¡?÷¿ (case sensitive)
\\ matches the character \ literally (case sensitive)
,.+=@#$%ˆ&*(){}|~<>;:[ matches a single character in the list +=@#$%ˆ&*(){}|~<>;:[ (case sensitive)
\] matches the character ] literally (case sensitive)
$ asserts position at the end of the string, or before the line terminator right at the end of the string (if any)
*/
}

// Saisie autorisée pour le nom des villes
const regExVille = (value) => {
	return /^[\w'\-][^0-9_!¡?÷?¿\\.,+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/.test(value)
// caracteres non autorisés [^0-9_!¡?÷?¿\\.,+=@#$%ˆ&*(){}|~<>;:[\]]
}

// Saisie autorisée pour l'adresse'
const regExAdresse = (value) => {
	return /^\d{1,4}\s[a-zA-Z0-9\s,'-]+$/.test(value)
	//\d = chiffre {nombre de repetitions du chiffre de 1 ,(à) 4 fois} \ espace
	// [lettres min/maj chiffres ou \s espace ,virgule 'accent - tiret] = autorisé + (1 fois ou plus)
}

// Saisie autorisée pour l'email
const regExEmail = (value) => {
	return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
/*
^	Commence la recherche de correspondance au début de la chaîne.
[^@\s]+	Correspond à une ou plusieurs occurrences d’un caractère autre que le caractère @ ou l’espace blanc.
@	Correspond à l'arobase (@).
[^@\s]+	Correspond à une ou plusieurs occurrences d’un caractère autre que le caractère @ ou l’espace blanc.
\.	Correspond à un caractère à point unique.
[^@\s]+	Correspond à une ou plusieurs occurrences d’un caractère autre que le caractère @ ou l’espace blanc.
$	Termine la correspondance à la fin de la chaîne.
*/
}

// Fonction pour gérer l'affichage du texte de validation input
function dataChampManquantTexteVide(querySelectorId) {
	document.querySelector(`#${querySelectorId}`).textContent = "";
};

function dataChampManquantTexte(querySelectorId) {
	document.querySelector(`#${querySelectorId}`).textContent = " Merci de bien vouloir remplir ce champ";
};