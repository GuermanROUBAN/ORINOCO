//-----------------------------------------------------------------------------------------------
// ETAPE 1 - RECUPERATION DE L'ID

const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

console.log("id=", id);

//-----------------------------------------------------------------------------------------------
// ETAPE 2 - API REQUEST

const fetchProduit = async () => {
	donnees = await fetch(`https://teddies-api.herokuapp.com/api/teddies/${id}`)
		.then(res => res.json());
	// structureProduit(donnees);
	//console.log(donnees); // ca m'affiche bien l'Api
	positionProduit.innerHTML = structureProduit(donnees)

};

//fetchProduit(); // ok on a bien recuperé l API
const showProduit = async () => {
	await fetchProduit();
}
showProduit();

//-----------------------------------------------------------------------------------------------
// ETAPE 3 - LE CHARGEMENT DU HTML

function structureProduit(produit, index) {
	let colors = showOptions(produit.colors);
	return `
	<div id="selected_article">
				<h2 class="article_name">Nom du produit:</h2><p><span id="article_name">${produit.name}</span></p>
				<h2 class="article_id">Id du produit:</h2><p><span id="article_id">${produit._id}</span></p>
				<h2 class="article_description">Description du produit:</h2><p><span id="article_description">${produit.description}</span></p>
				<form>
					<label for="article_option"><h3>Choisir la couleur:</h3></label>
					<select name="article_option" id="article_option">
					${colors}
					</select>
				</form>
				<h2 class="article_price" >Prix:</h2><p><span id="article_price">${numberWhitComa(produit.price)} €</span></p>
				<div class="${produit.imageUrl}">
						<img class="article_img" id="article_img" src="${produit.imageUrl}" />
				</div>
			</div>
	`
}
const positionProduit = document.getElementById("selected_article");
//console.log(positionProduit);

//-----------------------------------------------------------------------------------------------
// ETAPE 4 - LA SELECTE BOX
// créer une fonction qui va générer l'ensemble des options, avec ces dernières passées en paramètre

function showOptions(options) {
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

//-----------------------------------------------------------------------------------------------
// ETAPE 5 - AFFICHAGE DU PRIX
// Affichage correct du prix avec la virgule
numberWhitComa = (x) => {
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',')
};

//-----------------------------------------------------------------------------------------------
// ETAPE 6 - CREATION LOCAL STORAGE
//localStorage.setItem("clé","valeur")
//localStorage.getItem("clé")
//localStorage.clear();
//JSON.stringify(object); // transforme un objet en string
//JSON.parse(string); // a l'inverse transforme un string en objet

// Ajout de l'objet produit au click

compteurArtictlesPanier();// controle combien d'articles sont presents dans le panier au chargement de la page

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
		// ajouter un produit dans l'array
		parsedPanier.push(produit);
		// mettre à jour le LS
		localStorage.setItem('panier', JSON.stringify(parsedPanier))
	}

	popupConf();//affiche la fenetre popup (depuis tools.js)
	//compteurArtictlesPanier();//affiche le nombre d'articles dans le panier (depuis tools.js)
}
//-----------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------
// ETAPE 8 - CALCUL COUT TOTAL

