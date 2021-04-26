
const results = document.getElementById('results');

let teddies;

// ETAPE 1 - API REQUEST
const fetchApi = async () => {
	teddies = await fetch("http://localhost:3000/api/teddies")
		.then(res =>res.json());
	//console.log(index); // prouve que l'API a bien chargée les données
};

//fetchApi(); // ok on a bien recuperé l API

// ETAPE 2 - CREATION D'UN MASQUE

const showArticles = async() => {
	await fetchApi();

	results.innerHTML = (

		teddies
			.map(teddy => (
				// pour écrire du HTML dans JS
				`
					<div class="article-item">	
						<h3 class="article-name">${teddy.name}</h3>
						<p class="article-description">${teddy.description}</p>
						<p class="article-price">${teddy.price}</p>
						<img class="article-img" src="${teddy.imageUrl}" />
						<div>
						<button id="btnShowArt">Voir le produit</button>
						</div>
					</div>
				`
			)).join('')//pour eviter les virgules
	);
};

showArticles();
