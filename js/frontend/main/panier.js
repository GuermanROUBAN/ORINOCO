//--------------------------------------------------------------------------------
// On va consulter le panier dans le LS
let localPanier = JSON.parse(localStorage.getItem("panier"))

console.log(localPanier);
console.log(typeof localPanier); // Il s'agit d'un Objet avec des Arrays

if (localPanier != null) {//si la clé existe
	showPanier(); //charge la fonction avec le code HTML
}
//--------------------------------------------------------------------------------
function showPanier () {

	panier.innerHTML = (// charge le JS dans l'id HTML
		localPanier //prend les infos dans le LS
			// traitement de chaque element de l'array avec une fonction
			.map(teddies => (
				// pour écrire du HTML dans JS
				`
					<div class="panier">
						
						</br></br>
						<h3 class="panier-name">${teddies.Nom}</h3>
						<!--<h3 class="panier-id">${teddies.Id}</h3>-->
						</br></br>
						<p class="panier-description">${teddies.Description}</p>
						</br></br>
						<p class="panier-price">${teddies.Prix}</p>
						</br></br>
						<a href="/html/produits.html?id=${teddies._id}">
						<img class="panier-img" width="100" src="${teddies.Photo}" />
						</a>
						<input type="number" value="${teddies.qty}">
					</div>
				
				`
			)).join('')//pour eviter les virgules
	);
};

