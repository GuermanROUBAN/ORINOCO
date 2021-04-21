
const results = document.getElementById('results');

let index;

// ETAPE 1 - API REQUEST
const fetchApi = async () => {
	index = await fetch("http://localhost:3000/api/teddies")
		.then(res =>res.json());
	//console.log(index); // prouve que l'API a bien chargée les données
};

//fetchApi(); // ok on a bien recuperé l API

// ETAPE 2 - CREATION D'UN MASQUE

const showArticles = async() => {
	await fetchApi();

	results.innerHTML = (

		index
			.map(index => (
				// pour écrire du HTML dans JS
				`
					<li class="article-item">	
						<h3 class="article-name">${index.name}</h3>
						<p class="article-description">${index.description}</p>
						<p class="article-price">${index.price}</p>
						<img class="article-img" src="${index.imageUrl}" />
						<div>
						<button id="btnShowArt">Voir le produit</button>
						</div>
					</li>
				`
			)).join('')//pour eviter les virgules
	);
};

showArticles();
