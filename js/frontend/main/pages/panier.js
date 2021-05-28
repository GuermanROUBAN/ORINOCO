// ETAPE 0 - CONSULTATION DU PANIER
//--------------------------------------------------------------------------------
// On va consulter le panier dans le LS
let localPanier = JSON.parse(localStorage.getItem("panier"))
//console.log(localPanier);
//console.log(typeof localPanier); // Il s'agit d'un Objet avec des Arrays
if (localPanier != null) {//si la clé existe
	chargementPanier(); //charge la fonction avec le code HTML
}
console.log(panier, 'panier search');

// ETAPE 1 - AFFICHAGE DU PANIER
//--------------------------------------------------------------------------------
function chargementPanier() {

	panier.innerHTML = (// charge le JS dans HTML
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

// ETAPE 2 - - CREATION DU SUIVI DU COMPTEUR PANIER
//-----------------------------------------------------------------------------------------------
compteurArtictlesPanier();

// ETAPE 3 - CALCUL DES VALEURS DES INPUTS
//-----------------------------------------------------------------------------------------------
// On s'adresse à tous les INPUTS
let inputPanier = document.querySelectorAll('.qtyOfproduct');
//console.log(inputPanier)

// On calcul la quantité des INPUTS
let inputPanierLength = inputPanier.length;
for (let i = 0; i < inputPanierLength; i++) {
	// Pour chaque INPUT on écoute un évenement et on applique la fonction
	inputPanier[i].addEventListener("input", function calculValeurInput () {
		let prix = parseInt(this.parentNode.children[0].innerHTML)
		// parseInt => string to Integer (à nombre)
		// On recupere le prix
		// this=input; parentNode=div panier-string-calcul; .children[0]=premier enfant liste .innerHTML=on accede à l'inner
		let calculPrix = prix * this.value
		// calcul de la valeur de l'INPUT grâce à la valeur du prix
		this.nextElementSibling.innerHTML = calculPrix + ' €';
		//this = inputPanier[i]
		// element suivant de l'INPUT dans notre div affiche la nouvelle valeur de calculPrix

		//LocalStorage UPDATE
		// On Parse pour travailler dans l'objet
		let localStoragePanierActualise = JSON.parse(localStorage.getItem('panier'));
		// On appel le LS donne [{Tovar1},{Tovar2}]
		let localStoragePanierActualiseLength = localStoragePanierActualise.length
		// On calcul la quantité des lignes de produits dans le LS
		let idProduit = this.dataset.id //s'appelle comme le nom de l'attibut
		// on lit l'attribut data pour reperer notre produit dans le LS
		console.log(idProduit)

		for (let j = 0; j < localStoragePanierActualiseLength; j++) {
			// on calcul la longeur du nouveau actualisé
			if (localStoragePanierActualise[j]['_id'] == idProduit) {
				// id correspond alors 
				localStoragePanierActualise[j]['totalprice'] = calculPrix
				// change prix
				localStoragePanierActualise[j]['qty'] = this.value
				// change qty LS.
				// this.value => valeur dans l'input qty => valeur dans LS
			}
		}

		// On Stringify l'objet qu'on a modifié
		localStorage.setItem('panier', JSON.stringify(localStoragePanierActualise))

		// On execute la fonction d'affichage 
		affichagePrixTotal();

	})
}

// ETAPE 4 - CALCUL DES TOTAUX
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

// ETAPE 5 - SUPRESSION DE L'ARTICLE
//-----------------------------------------------------------------------------------------------
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

// ETAPE 6 - SUPRESSION DE TOUS LES ARTICLES DU PANIER
//-----------------------------------------------------------------------------------------------
function supprimerPanier() {
	localStorage.clear();
	window.location.reload();
}

// ETAPE 7 - FORMULAIRE DE COMMANDE
//-----------------------------------------------------------------------------------------------
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
				<input type="text" id="firstName" name="fistName" value="" class="form-control" placeholder="Jean-Pierre" required>
			</div>

			<div class="form-group">
				<label for="lastName">Nom</label> <span id="nomManquant" class="infoChampManquant"></span> <abbr title="Merci de saisir ici votre nom">*</abbr>
				<input type="text" id="lastName" name="lastName" class="form-control" placeholder="Heureux" required>
			</div>

			<div class="form-group">
				<label for="address">Adresse</label><span id="adresseManquant" class="infoChampManquant"></span><abbr title="Merci de saisir ici votre adresse">*</abbr>
				<input type="text" id="address" name="address" class="form-control" placeholder="1 rue de Paix - 75000" required>
			</div>

			<div class="form-group">
				<label for="city">City</label><span id="villeManquant" class="infoChampManquant"></span><abbr title="Merci de saisir ici votre ville">*</abbr>
				<input type="text" id="city" name="city" class="form-control" placeholder="Paris" required>
			</div>

			<div class="form-group">
				<label for="email">Votre adresse e-mail</label><span id="emailManquant" class="infoChampManquant"></span>
				<abbr title="ex: utilisateur@internet.com">*</abbr>
				<input type="email" id="email" name="email" class="form-control" placeholder="jp.heuxeux@internet.fr" required />
			</div>

			<div class="validation_Panier">
				<button id="btnValidationPanier" class="btnValidationPanier" name="btnValidationPanier">Valider la
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

// ETAPE 8 - Réécuperation des ID des produits dans le panier et enregistement dans la const aEnvoyer l.262
//-----------------------------------------------------------------------------------------------
// Recuperation de l'ID des produits commandés pour l'envoyer au serveur lors de la requete POST
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


// ETAPE 9 - CREATION D'UNE CLASSE
//-----------------------------------------------------------------------------------------------
// Création d'une classe pour fabriquer l'objet dans lequel iront
// les valeurs du formulaire l.252 puis envoyées dans la const aEnvoyer l.261
class Formulaire {
	constructor() {
		this.firstName = document.querySelector("#firstName").value;
		this.lastName = document.querySelector("#lastName").value;
		this.address = document.querySelector("#address").value;
		this.city = document.querySelector("#city").value;
		this.email = document.querySelector("#email").value;
	}
}

// ETAPE 10 - addEventListener
//-----------------------------------------------------------------------------------------------
btnEnvoyerFormulaire.addEventListener("click", (e) => {
	e.preventDefault();
	//console.log(localPanier, "panierTEST");
	if (localPanier != null){
		// variant if N1 => si le panier n'est pas present dans le LS.
		if (localPanier.length != 0) {
			// variante if N2 => si la longeur du panier dans le LS est vide = 0.
			// Appel de l'instance de classe Formulaire pour créer l'objet formulaireValues
			const formulaireValues = new Formulaire();
			
			// Controle la validité du formulaire avant l'envoi dans le LS
			if (regExPrenomNom(formulaireValues.firstName) && (regExPrenomNom(formulaireValues.lastName) && regExAdresse(formulaireValues.address) && regExVille(formulaireValues.city) && regExEmail(formulaireValues.email))) {
				// Mettre l'objet "formulaireValues" dans LS
				localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
				//localStorage.setItem("prixTotal", JSON.stringify(compteurPrix));

				// Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
				const aEnvoyer = {
					"products": listeIdPanier, //L 223
					"contact": formulaireValues, // L 249
				};

				envoieVersServeur(aEnvoyer)
				// 2.l'argument ira chercher la valeur qu'il y a dans la variable
			} else {
				if (regExPrenomNom(formulaireValues.firstName) === false) {
					dataChampManquantTexte("prenomManquant");
				} else {
					dataChampManquantTexteVide("prenomManquant");
				}
				if (regExPrenomNom(formulaireValues.lastName) === false) {
					dataChampManquantTexte("nomManquant");
				} else {
					dataChampManquantTexteVide("nomManquant");
				}
				if (regExAdresse(formulaireValues.address) === false){
					dataChampManquantTexte("adresseManquant");
				}
				else {
					dataChampManquantTexteVide("adresseManquant");
				}
				console.log(regExAdresse(formulaireValues.address),'Adresse')
				if (regExVille(formulaireValues.city) === false) {
					dataChampManquantTexte("villeManquant");
				} else {
					dataChampManquantTexteVide("villeManquant");
				}
				if (regExEmail(formulaireValues.email) === false) {
					dataChampManquantTexte("emailManquant");
				} else {
					dataChampManquantTexteVide("emailManquant");
				}
			}
		} else {
			alert("Aucun article dans le panier");
		}
	}else {
		alert("Aucun article dans le panier");
	}
})

// ETAPE 11 - MISE EN PLACE D'UNE REQUETE POST
//-----------------------------------------------------------------------------------------------
function envoieVersServeur(aEnvoyer) {
	// Envoi de l'objet "aEnvoyer" vers le serveur

	// La fonction est hors de l'addEventListener
	// La fonction reprendra la valeur de aEnvoyer et la mettra dans JSON.stringify

	const commandePanier = fetch('https://teddies-api.herokuapp.com/api/teddies/order', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		mode: "cors",
		body: JSON.stringify(aEnvoyer),
	})

	// Pour voir le resultat du serveur dans la console.
	commandePanier.then(async (response) => {
		// si la promesse n'est pas résolu, si rejet, - gestion des erreurs
		try {
			//console.log(response, 'response');

			const contenu = await response.json();
			console.log(contenu, 'contenu de la response'); // renvoi l'ordre de l'id

			if (response.ok) {
				console.log(`Resultat du serveur: ${response.ok}`)

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
// ETAPE 12 - Mettre le contenu du local storage dans les champs du formulaire
//Allez chercher la key formulaireValues et la mettre dans une vairable

const dataLocalStorage = localStorage.getItem("formulaireValues");
//console.log(formulaireValues); // formulaireValues is not defined

// Convertir la chaine de caracteres en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//fonction pour remplir les champs du formulaire avec les données du LS
function chargementFormDataLs(input) {
	if (dataLocalStorageObjet != null) {
		document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
	}
};
chargementFormDataLs("firstName");
chargementFormDataLs("lastName");
chargementFormDataLs("address");
chargementFormDataLs("city");
chargementFormDataLs("email");

//console.log(dataLocalStorageObjet);

