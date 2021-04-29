
// Recuperation de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);


//methode 1 - pour extraire l'id (facile)
const id = queryString_url_id.slice(4);
console.log(id);


/*
//methode 2 - pour extraire l'id (difficile)
// Il faudra preciser apres ? un nom (id=)
// <a href="/html/produits.html?id=${teddy._id}"></a>
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id"); // nom a preciser dans l'URL pour permettre la recherche
console.log(id);
*/


let donnees;

// ETAPE 1 - API REQUEST
const fetchProduit = async () => {
	donnees = await fetch('http://localhost:3000/api/teddies/' + id)
		.then(res => res.json());
	console.log(donnees); // ca m'affiche bien l'Api
};

fetchProduit(); // ok on a bien recuperé l API



// ETAPE 2 - CREATION D'UN MASQUE- VARIANTE 1

const showProduit = async () => {
	await fetchProduit();
}
showProduit();

const idProduitSelectionneur = fetchProduit.find((element) => element._id === id);
console.log(idProduitSelectionneur);

/*
	results.innerHTML = (
		donnees
			.map(data => (
				// pour écrire du HTML dans JS
				`
					<div class="article-item">	
						<h3 class="article-name">${data.name}</h3>
					</div>
				`
			)).join('')
	);
};


// ça m affiche le name de tous les articles si je rentre par la page produit
// ca ne m affiche pas le name de mon id
*/

//------------------------------------------------------------------------------------------

// ETAPE 2 - CREATION D'UN MASQUE - VARIANTE 2

const positionProduit = document.getElementById("selected_article");
//console.log(positionProduit);

const structureProduit = `

<div id="selected_article">
				<h3 class="article-name">Nom du produit: <span>${showProduit.name}</span></h3>
				<h3 class="article-id">Id du produit: <span>${showProduit._id}</span></h3>
				<h3 class="article-description">Description du produit: <span>${showProduit.description}</span></h3>
				<form>
					<label for="article-option"></label>
					<select name="article-option" id="article-option">
						<option value="option_1">Couleur 1:<span>${showProduit.colors}</span> </option>
						<option value="option_2">Couleur 2:<span>${showProduit.colors}</span></option>
						<option value="option_3">Couleur 3:<span>${showProduit.colors}</span></option>
						<option value="option_3">Couleur 4:<span>${showProduit.colors}</span></option>
					</select>
				</form>
				<h3 class="article-price">Prix: <span>${showProduit.price}</span></h3>
				<div class="${showProduit.imageUrl}">
						<img class="article-img" src="${showProduit.imageUrl}" />
				</div>
			</div>
			<button id="btnByeArt" type="submit" name="btnByeArt">Acheter</button>

`
	;

// injection HTML

positionProduit.innerHTML = structureProduit;