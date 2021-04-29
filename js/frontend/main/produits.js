
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

/*
fetch('http://localhost:3000/api/teddies/'+ id)
	//.then(res => console.log(res))
	.then(res => res.json())
	.then(data=>console.log(data))
*/
/*
const positionProduit  = document.getElementById("nounours");
console.log(positionProduit);
/*
/*
let respose = fetch('http://localhost:3000/api/teddies/' + id)
	.then(res => res.json())
	//.then(data => console.log(data));
*/
//------------------------------------------------------------

const results = document.getElementById('results');

let donnees;

// ETAPE 1 - API REQUEST
const fetchProduit = async () => {
	donnees = await fetch ('http://localhost:3000/api/teddies/'+id)
		.then(res => res.json());
		console.log(produit); // ca m'affiche bien l'Api
};

// fetchProduit(); // ok on a bien recuperé l API

/*
// ETAPE 2 - CREATION D'UN MASQUE

const showProduit = async () => {
	await fetchProduit();

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

showProduit();
// ça m affiche le name de tous les articles si je rentre par la page produit
// ca ne m affiche pas le name de mon id
*/