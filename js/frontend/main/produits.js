
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

console.log("id=", id);

//-----------------------------------------------------------------------------------------------


const positionProduit = document.getElementById("selected_article");
//console.log(positionProduit);

let donnees = [];

// ETAPE 1 - API REQUEST
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

//-------------------------------------------------------
// créer une fonction qui va générer l'ensemble des options, avec ces dernières passées en paramètre
function showOptions(options){
	console.log(options)// déclarer une variable vide qui va contenir le code HTML
	let varHTMLvide = ``;
	// parcourir les couleurs (les options passées en paramètre) via une boucle
	for (let i = 0; i < options.length; i++) {
		let option = + options[i];
		console.log(options[i]);
		let htmlOption = `<option value="${options[i]}">${options[i]}</option>`;
		console.log(htmlOption);
		htmlOption.innerHTML = htmlOption;
	}
	// on récupère la couleur courante via l'index du for qui s'incrémente
	// création d'une variable avec le code HTML d'une option à l'intérieur
	// ajoute dans la variable qui doit contenir le HTML le HTML d'une option, la variable qu'on vient de créer
	// retourne le contenu HTML créé contenant toutes les options HTML, qui sera utilisé dans la fonction de création du HTML
};
function structureProduit(parametre) {
	let initial = showOptions(parametre.colors);
	return `
	<div id="selected_article">
				<h3 class="article-name">Nom du produit: <span>${parametre.name}</span></h3>
				<h3 class="article-id">Id du produit: <span>${parametre._id}</span></h3>
				<h3 class="article-description">Description du produit: <span>${parametre.description}</span></h3>
				<form>
					<label for="article-option">Choisir la couleur</label>
					<select name="article-option" id="article-option">
					${varHTMLvide}
					</select>
				</form>
				<h3 class="article-price">Prix: <span>${numberWhitComa(parametre.price)}</span></h3>
				<div class="${parametre.imageUrl}">
						<img class="article-img" src="${parametre.imageUrl}" />
				</div>
			</div>
			<button id="btnByeArt" type="submit" name="btnByeArt">Acheter</button>
	`
}


// Affichage correct du prix avec la virgule
numberWhitComa = (x) => {
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',') + " EUR TTC"
};


//------------------------------------------------------------------------------------------


