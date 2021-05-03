
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

console.log("id=",id);

//-----------------------------------------------------------------------------------------------

const positionProduit = document.getElementById("selected_article");
//console.log(positionProduit);


let donnees = [];

// ETAPE 1 - API REQUEST
const fetchProduit = async () => {
	donnees = await fetch(`http://localhost:3000/api/teddies/${id}`)
		.then(res => res.json());
	
	//console.log(donnees); // ca m'affiche bien l'Api	
	structureProduit(chargement);
};

	
//fetchProduit(); // ok on a bien recuperé l API
const showProduit = async () => {
	await fetchProduit();
}
showProduit();

function structureProduit () {

	let chargement =
		`
	<div id="selected_article">
				<h3 class="article-name">Nom du produit: <span>${donnees.name}</span></h3>
				<h3 class="article-id">Id du produit: <span>${donnees._id}</span></h3>
				<h3 class="article-description">Description du produit: <span>${donnees.description}</span></h3>
				<form>
					<label for="article-option"></label>
					<select name="article-option" id="article-option">
					</select>
				</form>
				<h3 class="article-price">Prix: <span>${donnees.price}</span></h3>
				<div class="${donnees.imageUrl}">
						<img class="article-img" src="${donnees.imageUrl}" />
				</div>
			</div>
			<button id="btnByeArt" type="submit" name="btnByeArt">Acheter</button>
	`
;
}

//------------------------------------------------------------------------------------------


/*
const positionProduit = document.getElementById("selected_article");
console.log(positionProduit);
*/

// injection HTML

positionProduit.innerHTML = structureProduit;