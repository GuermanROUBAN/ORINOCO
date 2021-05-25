
// ETAPE 1 -
//--------------------------------------------------------------------------------

// On va consulter le panier dans le LS
let localPanier = JSON.parse(localStorage.getItem("panier"))

//console.log(localPanier);
//console.log(typeof localPanier); // Il s'agit d'un Objet avec des Arrays


if (localPanier != null) {//si la clé existe
	showPanier(); //charge la fonction avec le code HTML
}

console.log(panier, 'panier search');


// ETAPE 2 - 
//--------------------------------------------------------------------------------
function showPanier() {

	panier.innerHTML = (// charge le JS dans l'id HTML
		localPanier //prend les infos dans le LS
			// traitement de chaque element de l'array avec une fonction
			.map((teddies, index) => (
				// on demande à la fonction de prendre également en compte l'index pour appliquer dans la fonction supprimer Produit

				// pour écrire du HTML dans JS
				`
					<div class="panier-article">
						<div class="panier-string">
							<div class="panier-string-presentation">
								<img class="panier-img" src="${teddies.imageUrl}" />												
								<h2 class="panier-name">

								${teddies.name}</h2>
								<!--<h2 class="panier-id">${teddies._id}</h2>-->
								<p class="panier-description">

								${teddies.description}</p>
							</div>
						<div class="panier-string-calcul">
								<p class="calcul-price">
								${teddies.price}</p>
								<a href="/html/produits.html?id=${teddies._id}"></a>
								<input type="number" data-id="${teddies._id}" class="qtyOfproduct" value="${teddies.qty}" style="width:40px" min="1">
								<p class="calcul-price-sum">${teddies.price}</p>
								<button id="btnDeletArt" onclick="supprimerProduit(${index})" class="btnDeletArt">Supprimer</button>
							</div>
						</div>
					</div>
				`
			)).join('')//pour eviter les virgules
	);
	// data-id = attribut data de l'input (avec nom id ) permet de saisir la donnée 'teddies'
};


// Recuperation de l'ID

let oursPanier = localStorage.getItem("panier")
let ours = JSON.parse(oursPanier)
let listeIdPanier = [];
if (ours != null) {
	//console.log(ours)
	for (let i = 0; i < ours.length; i++) {
		listeOursPanier = ours[i]
		listeIdPanier.push(listeOursPanier._id)
	}
}


//console.log(listeIdPanier, "listeIdPanier");





// ETAPE 3 - 
//-----------------------------------------------------------------------------------------------

compteurArtictlesPanier();


// ETAPE 4 - CALCUL DES VALEURS DES INPUTS
//-----------------------------------------------------------------------------------------------
// On s'adresse à tous les INPUTS
let inputPanier = document.querySelectorAll('.qtyOfproduct');
//console.log(inputPanier)

// On calcul la quantité des INPUTS
let inputPanierLength = inputPanier.length;
for (let i = 0; i < inputPanierLength; i++) {
	// Pour chaque INPUT on écoute un évenement et on applique la fonction
	inputPanier[i].addEventListener("input", function () {
		let prix = parseInt(this.parentNode.children[0].innerHTML)
		// On recupere le prix
		// this=input; parentNode=div panier-string-calcul; .children[0]=premier enfant liste .innerHTML=on accede à l'inner
		let calculPrix = prix * this.value
		// calcul de la valeur de l'INPUT grâce à la valeur du prix
		this.nextElementSibling.innerHTML = calculPrix + ' €';
		// element suivant de l'INPUT dans notre div affiche la nouvelle valeur de calculPrix

		//LocalStorage UPDATE

		// On Parse pour travailler dans l'objet
		let localStoragePush = JSON.parse(localStorage.getItem('panier'));
		// On appel le LS donne [{Tovar1},{Tovar2}]
		let localStoragePushLength = localStoragePush.length
		// On calcul la quantité des lignes de produits dans le LS
		let idProduit = this.dataset.id //s'appelle comme le nom de l'attibut
		// on lit l'attribut data pour reperer notre produit dans le LS
		console.log(idProduit)

		for (let j = 0; j < localStoragePushLength; j++) {

			if (localStoragePush[j]['_id'] == idProduit) {

				localStoragePush[j]['totalprice'] = calculPrix

				localStoragePush[j]['qty'] = this.value
			}
		}

		// On Stringify l'objet qu'on a modifié
		localStorage.setItem('panier', JSON.stringify(localStoragePush))

		// On execute la fonction d'affichage 
		affichagePrixTotal();

	})
}

// ETAPE 5 - 
//-----------------------------------------------------------------------------------------------
// Affichage du total dans l'panier.html

function affichagePrixTotal() {

	// Nouvel LS 
	let localPanier2 = JSON.parse(localStorage.getItem('panier'))
	// Mise en place d'un compteur
	let compteurPrix = 0;

	// Selection de tous les chapmps prix
	let calPrixTotal = document.querySelectorAll('.calcul-price-sum');
	//console.log(calPrixTotal);

	// Calcul de la longeur du champs prix
	let calPrixTotalLength = calPrixTotal.length;
	for (let i = 0; i < calPrixTotalLength; i++) {
		// Le compteur recupere l'iteration de la variable prix
		compteurPrix += parseInt(localPanier2[i]['totalprice'])
	}
	//console.log(compteurPrix); // affiche le prix total des articles
	document.querySelector('.resultat_panier').innerHTML = compteurPrix;
}

affichagePrixTotal();


// ETAPE 6 - SUPRESSION DE L'ARTICLE


function supprimerProduit(index) {

	console.log("supprimer l'élément numéro", index);

	//suppression produit du LS
	// On parcourt le localPanier
	let newPanier = localPanier.filter(elmt => localPanier.indexOf(elmt) != index);
	//console.log("newPanier", newPanier)
	localStorage.setItem("panier", JSON.stringify(newPanier));
	// on met à jour le LS
	window.location.reload();
}

function supprimerPanier() {
	localStorage.clear();
	window.location.reload();
}


//-----------------------------------------------------------------------------------------------
// ETAPE 7 - FORMULAIRE DE COMMANDE 

// Afficher formulaire HTML

const AfficherFormulaireHTML = () => {
	// selection de l'element du Dom pour le positionnement du formulaire
	const injectionFormulaire = document.querySelector('#formulaire');

	const structureFormulaire = `
	<div id="formulaireCommande" class="formulaireCommande">
	<form action="#" methode="post" enctype="multipart/form-data">
		<fieldset>
			<legend>Merci de bien vouloir remplir notre formulaire</legend>
			<div class="form-group">
				<label for="firstName">Prénom</label> <span id="prenomManquant" class="infoChampManquant"></span> <abbr title="Merci de saisir ici votre prénom">*</abbr>
				<input type="text" id="firstName" name="fistName" value="" class="form-control" required>
			</div>

			<div class="form-group">
				<label for="lastName">Nom</label> <span id="nomManquant" class="infoChampManquant"></span> <abbr title="Merci de saisir ici votre nom">*</abbr>
				<input type="text" id="lastName" name="lastName" class="form-control" required>
			</div>

			<div class="form-group">
				<label for="address">Adresse</label><span id="adresseManquant" class="infoChampManquant"></span><abbr title="Merci de saisir ici votre adresse">*</abbr>
				<input type="text" id="address" name="address" class="form-control" required>
			</div>

			<div class="form-group">
				<label for="city">City</label><span id="villeManquant" class="infoChampManquant"></span><abbr title="Merci de saisir ici votre ville">*</abbr>
				<input type="text" id="city" name="city" class="form-control" required>
			</div>

			<div class="form-group">
				<label for="email">Votre adresse e-mail</label><span id="emailManquant" class="infoChampManquant"></span>
				<abbr title="ex: utilisateur@internet.com">*</abbr>
				<input type="email" id="email" name="email" class="form-control" required />
			</div>

			<div class="btnFinalisationPanier">
				<button id="btnValidationPanier" "class="btnValidationPanier" name="btnValidationPanier">Valider la
					commande</button>
			</div>
		</fieldset>
	</form>
</div>
`;

	// Injection du formulaire
	injectionFormulaire.insertAdjacentHTML("afterend", structureFormulaire);
}

// Affichage du formulaire
AfficherFormulaireHTML();

// Selection du bouton pour envoi du formulaire
const btnEnvoyerFormulaire = document.querySelector("#btnValidationPanier");


//-----------------------------------------------------------------------------------------------
// ETAPE 8 - addEventListener

btnEnvoyerFormulaire.addEventListener("click", (e) => {
	e.preventDefault();

	// Création d'une classe pour fabriquer l'objet dans lequel iront
	// les valuses du formulaire

	class Formulaire {
		constructor() {
			this.firstName = document.querySelector("#firstName").value;
			this.lastName = document.querySelector("#lastName").value;
			this.address = document.querySelector("#address").value;
			this.city = document.querySelector("#city").value;
			this.email = document.querySelector("#email").value;
		}
	}

	// Appel de l'instance de classe Formulaire pour créer l'objet formulaireValues
	const formulaireValues = new Formulaire();

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
		return /^[a-zA-Z0-9\s,'-]*$/.test(value)
	}


	// Saisie autorisée pour l'email
	const regExEmail = (value) => {
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
	}

	/*
	// Fonction pour gérer l'affichage du texte de validation input
	function dataChampManquantTexteVide(querySelectorId) {
		document.querySelector(`#${querySelectorId}`).textContent = "";
	};

	function dataChampManquantTexte(querySelectorId) {
		document.querySelector(`#${querySelectorId}`).textContent = "Merci de remplir ce champ";
	};
	*/

	// Fonctions de control des champs de saisie du formulaire 
	function prenomControl() {
		// controle du prénom
		const lePrenom = formulaireValues.firstName;
		//accepte des MAJ et miuscules entre 3 et 20 caracteres
		if (regExPrenomNom(lePrenom)) {
			//console.log("OK");
			//dataChampManquantTexteVide("prenomManquant");
			return true;
		} else {
			//console.log("KO");
			// affichage message texte dans l'input
			//dataChampManquantTexte("prenomManquant");
			alert(textAlert("Prénom"));
			return false;
		}
	}

	function nomControl() {
		// controle du nom
		const leNom = formulaireValues.lastName;
		//accepte des MAJ et miuscules entre 3 et 20 caracteres
		if (regExPrenomNom(leNom)) {
			//console.log("OK");
			//dataChampManquantTexteVide("nomManquant");
			return true;
		} else {
			//console.log("KO");
			//dataChampManquantTexte("nomManquant");
			alert(textAlert("Nom"));
			return false;
		}
	}

	function adresseControl() {
		// controle de l'adresse
		const lAdresse = formulaireValues.address;
		//accepte des MAJ et miuscules entre 3 et 20 caracteres
		if (regExAdresse(lAdresse)) {
			//console.log("OK");
			//dataChampManquantTexteVide("adresseManquant");
			return true;
		} else {
			//console.log("KO");
			//dataChampManquantTexte("adresseManquant");
			alert(textAlert("Adresse"));
			return false;
		}
	}

	function villeControl() {
		// controle du ville
		const laVille = formulaireValues.city;
		//accepte des MAJ et miuscules entre 3 et 20 caracteres
		if (regExVille(laVille)) {
			//console.log("OK");
			//dataChampManquantTexteVide("villeManquant");
			return true;
		} else {
			//console.log("KO");
			//dataChampManquantTexte("villeManquant");
			alert(textAlert("Ville"));
			return false;
		}
	}

	function emailControl() {
		// controle de l'email
		const lemail = formulaireValues.email;
		//accepte des MAJ et miuscules entre 3 et 20 caracteres
		if (regExEmail(lemail)) {
			//console.log("OK");
			//dataChampManquantTexteVide("emailManquant");
			return true;
		} else {
			//console.log("KO");
			//dataChampManquantTexte("emailManquant");
			alert("L'email n'est pas valide");
			return false;
		}
	};



	// Controle la validité du formulaire avant l'envoi dans le LS
	if (prenomControl() && nomControl() && adresseControl() && villeControl() && emailControl()) {
		// Mettre l'objet "formulaireValues" dans LS
		localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
		//localStorage.setItem("prixTotal", JSON.stringify(compteurPrix));


		// Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
		const aEnvoyer = {
			"products": listeIdPanier,
			"contact": formulaireValues,
		};
		envoieVersServeur(aEnvoyer)
		// 2.l'argument ira chercher la valeur qu'il y a dans la variable
	} else {
		alert("Veilliez bien remplir le formulaire");
	}


})

//-----------------------------------------------------------------------------------------------
// ETAPE 11 - 

function envoieVersServeur(aEnvoyer) {
	// Envoi de l'objet "aEnvoyer" vers le serveur

	// 1.La fonction est hors de l'addEventListener
	// 3.La fonction reprendra la valeur de aEnvoyer et la mettra dans JSON.stringify

	const promise01 = fetch('https://teddies-api.herokuapp.com/api/teddies/order', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		mode: "cors",
		body: JSON.stringify(aEnvoyer),
	})

	// Pour voir le resultat du serveur dans la console.
	promise01.then(async (response) => {
		// si la promesse n'est pas résolu, si rejet, - gestion des erreurs
		try {
			//console.log(response, 'response');

			const contenu = await response.json();
			console.log(contenu, 'contenu de la response'); // renvoi l'ordre de l'id

			if (response.ok) {
				console.log(`Resultat du serceur: ${response.ok}`)

				// récuperation de l'Id du serveur
				console.log("id de la response");
				console.log(contenu.orderId);

				// mettre l'id dans le LS
				localStorage.setItem("responseId", contenu.orderId)

				// Aller vers la page confirmation de la commande
				window.location = "confirmation-commande.html";

			} else {
				console.log(`Response du serveur: ${response.status}`)
				alert(`Problème avec le serveur : erreur ${response.status}`)
			}

		} catch (e) {
			console.log("ERREUR qui vient du catch()")
			console.log(e);
			alert(`ERREUR qui vient du catch ()${e}`);
		}
	})
}

//-----------------------------------------------------------------------------------------------
// ETAPE 10 - Mettre le contenu du local storage dans les champs du formulaire

//Allez chercher la key formulaireValues et la mettre dans une vairable

const dataLocalStorage = localStorage.getItem("formulaireValues");
//console.log(formulaireValues); // formulaireValues is not defined

// Convertir la chaine de caracteres en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//fonction pour remplir les champs du formulaire avec les données du LS

function remplirChampInputDepuisLocalStorage(input) {
	if (dataLocalStorageObjet != null) {
		document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
	}
};
remplirChampInputDepuisLocalStorage("firstName");
remplirChampInputDepuisLocalStorage("lastName");
remplirChampInputDepuisLocalStorage("address");
remplirChampInputDepuisLocalStorage("city");
remplirChampInputDepuisLocalStorage("email");

//console.log(dataLocalStorageObjet);

//-----------------------------------------------------------------------------------------------
// ETAPE  -  