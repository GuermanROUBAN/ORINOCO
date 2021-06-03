// ETAPE 0 - RECUPERATION DE L'ID
//-----------------------------------------------------------------------------------------------
const queryString_url_id = window.location.search;
//console.log(queryString_url_id);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
//console.log(id, 'id');	

// ETAPE 2 - API REQUEST
//-----------------------------------------------------------------------------------------------
const fetchProduit = async () => {
	donnees = await fetch(`https://teddies-api.herokuapp.com/api/teddies/${id}`)
		.then(res => res.json());
	// structureProduit(donnees);
	//console.log(donnees); // ca m'affiche bien l'Api

	injectionHtmlProduit.innerHTML = structureHtmlProduit(donnees);
	//on envoi le resultat dans "selected_article"
};
//fetchProduit(); // ok on a bien recuperé l API

const afficheProduit = async() => {
	await fetchProduit();
}
afficheProduit();

// ETAPE 3 - LE CHARGEMENT DU CONTENU HTML
//-----------------------------------------------------------------------------------------------
// Mise en place du HTML qui sera chargé dans produit.html "selected_article"
function structureHtmlProduit(produit) {
	let colors = affichageOptions(produit.colors);
	return `
	<div id="selected_article">
				<h3 class="article_name">Nom du produit:</h3><p><span id="article_name">${produit.name}</span></p>
				<h3 style="display:none" class="article_id">Id du produit:</h3><p style="display:none"><span id="article_id">${produit._id}</span></p>
				<h3 class="article_description">Description du produit:</h3><p><span id="article_description">${produit.description}</span></p>
				<form>
					<label for="article_option"><h3>Choisir la couleur:</h3></label>
					<select name="article_option" id="article_option">
					${colors}
					</select>
				</form>
				<h3 class="article_price" >Prix:</h3><p><span id="article_price">${nombreAvecVirgule(produit.price)} €</span></p>
				<div class="${produit.imageUrl}">
						<img class="article_img" id="article_img" src="${produit.imageUrl}" />
				</div>
			</div>
	`
}
// On selection l'element "selected article"
const injectionHtmlProduit = document.getElementById("selected_article");
//console.log(injectionHtmlProduit);

// ETAPE 4 - LA SELECTE BOX
//-----------------------------------------------------------------------------------------------
// créer une fonction qui va générer l'ensemble des options, avec ces dernières passées en paramètre
function affichageOptions(options) {
	//console.log(options)// déclarer une variable vide qui va contenir le code HTML
	let varHTMLvide = ``;
	// parcourir les couleurs (les options passées en paramètre) via une boucle
	for (let i = 0; i < options.length; i++) {
		let option = + options[i];
		//console.log(options[i]);
		let htmlOption = `<option value="${options[i]}">${options[i]}</option>`;
		//console.log(htmlOption);
		varHTMLvide += htmlOption
	}
	return varHTMLvide;
}

// ETAPE 6 -  - CREATION DU SUIVI DU COMPTEUR PANIER
//-----------------------------------------------------------------------------------------------
compteurArtictlesPanier();// controle combien d'articles sont presents dans le panier au chargement de la page

// ETAPE 5 - CREATION LOCAL STORAGE
//-----------------------------------------------------------------------------------------------
//localStorage.setItem("clé","valeur")
//localStorage.getItem("clé")
//localStorage.clear();
//JSON.stringify(object); // transforme un objet en string
//JSON.parse(string); // a l'inverse transforme un string en objet

// Ajout de l'objet produit au click
btnByeArt.onclick = () => {

	let produit =
	{
		name: article_name.textContent,
		_id: article_id.textContent,
		description: article_description.textContent,
		option: article_option.value,
		price: article_price.textContent,
		totalprice: article_price.textContent,
		imageUrl: article_img.src,
		qty: 1
	}
	
	// Controle si le panier existe dans le LS
	let panier = localStorage.getItem('panier');
	console.log(panier); // donne null

	// Si le panier est null
	if (localStorage.getItem('panier') == null) {
		// recuperer la valeur du tableau panierArray
		let panierArray = [];
		// ajouter un produit dans l'array
		panierArray.push(produit);
		// transformer objet en string
		let panierArrayJSON = JSON.stringify(panierArray);
		// mettre à jour le LS
		localStorage.setItem('panier', panierArrayJSON);
	}
	// Si le panier existe
	else {
		// Prende la valeur du panier LS et parse pour ajouter un nouveau produit
		let parsedPanier = JSON.parse(localStorage.getItem('panier'));
		let flag = false; // On confirme qu'il n'y a pas ca		
		for (let elem of parsedPanier) { // On verifie _id et l'option
			if (elem._id == produit._id && elem.option == produit.option) {
				elem.qty++;	// si identique alors le flag devient true
				flag = true;
				elem.totalprice = (elem.qty * parseInt(elem.price))+' €'; //  string en number
				localStorage.setItem('panier', JSON.stringify(parsedPanier)); // on actualise le panier
			}
		}
		if (flag === false) {
		// ajouter un produit dans l'array
		parsedPanier.push(produit);
		// mettre à jour le LS
		localStorage.setItem('panier', JSON.stringify(parsedPanier))
		}
	}
	popupConf();//affiche la fenetre popup (depuis tools.js)
	//compteurArtictlesPanier();//affiche le nombre d'articles dans le panier (depuis tools.js)
}
