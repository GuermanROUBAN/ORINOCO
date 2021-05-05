
const results = document.getElementById('results');

let teddies;

// ETAPE 1 - API REQUEST
const fetchApi = async () => {
	teddies = await fetch("http://localhost:3000/api/teddies")
		.then(res => res.json());
	//console.log(teddies); // prouve que l'API a bien chargée les données
};

//fetchApi(); // ok on a bien recuperé l API

// ETAPE 2 - CREATION D'UN MASQUE




const showArticles = async () => {
	await fetchApi();

	results.innerHTML = (
		teddies
			.map(teddy => (
				// pour écrire du HTML dans JS
				`
					<div class="article-item">
						
						</br></br>
						<h3 class="article-name">${teddy.name}</h3>
						<!--<h3 class="article-id">${teddy._id}</h3>-->
						</br></br>
						<p class="article-description">${teddy.description}</p>
						</br></br>
						<p class="article-price">${teddy.price +"euros"}</p>
						</br></br>
						<a href="/html/produits.html?id=${teddy._id}">
						<img class="article-img" src="${teddy.imageUrl}" />
						</a>
						</br></br>					
						<div>
						<button id="btnShowArt" class="btnShowArt">Voir le produit</button>
						</div>
						</br></br>
					</div>
				
				`
			)).join('')//pour eviter les virgules
	);
};

showArticles();
