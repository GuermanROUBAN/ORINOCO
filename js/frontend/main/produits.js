
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
	positionProduit.innerHTML = structureProduit(donnees);

};


//fetchProduit(); // ok on a bien recuperé l API
const showProduit = async () => {
await fetchProduit();
}
showProduit();

function structureProduit(parametre) {
	
	return `
	<div id="selected_article">
				<h3 class="article-name">Nom du produit: <span>${parametre.name}</span></h3>
				<h3 class="article-id">Id du produit: <span>${parametre._id}</span></h3>
				<h3 class="article-description">Description du produit: <span>${parametre.description}</span></h3>
				<form>
					<label for="article-option"></label>
					<select name="article-option" id="article-option">
					</select>
				</form>
				<h3 class="article-price">Prix: <span>${numberWhitComa(parametre.price)}</span></h3>
				<div class="${parametre.imageUrl}">
						<img class="article-img" src="${parametre.imageUrl}" />
				</div>
			</div>
			<button id="btnByeArt" type="submit" name="btnByeArt">Acheter</button>
	`;
}

// Affichage correct du prix avec la virgule
function numberWhitComa(x) {
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',') + " EUR TTC"}

//------------------------------------------------------------------------------------------


