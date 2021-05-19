
// ETAPE 1 -
//--------------------------------------------------------------------------------
// On va consulter le panier dans le LS
let localPanier = JSON.parse(localStorage.getItem("panier"))

//console.log(localPanier);
//console.log(typeof localPanier); // Il s'agit d'un Objet avec des Arrays


if (localPanier != null) {//si la clé existe
	showPanier(); //charge la fonction avec le code HTML
}

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
	console.log(calPrixTotal);

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


// ETAPE 9 - SUPRESSION DE L'ARTICLE


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
