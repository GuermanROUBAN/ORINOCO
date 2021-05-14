//--------------------------------------------------------------------------------
// On va consulter le panier dans le LS
let localPanier = JSON.parse(localStorage.getItem("panier"))

console.log(localPanier);
console.log(typeof localPanier); // Il s'agit d'un Objet avec des Arrays

if (localPanier != null) {//si la clé existe
	showPanier(); //charge la fonction avec le code HTML
}
//--------------------------------------------------------------------------------
function showPanier() {

	panier.innerHTML = (// charge le JS dans l'id HTML
		localPanier //prend les infos dans le LS
			// traitement de chaque element de l'array avec une fonction
			.map(teddies => (
				// pour écrire du HTML dans JS
				`
					<div class="panier">

						<div class="panier-string">
							<img class="panier-img" src="${teddies.Photo}" />
						

						
							<h2 class="panier-name">${teddies.Nom}</h2>
		

						<!--
							<h2 class="panier-id">${teddies.Id}</h2>
						-->

						
							<p class="panier-description">${teddies.Description}</p>
					

						
							<p class="panier-price">${teddies.Prix}</p>
					

						
							<a href="/html/produits.html?id=${teddies._id}"></a>
					
						
						
							<input type="number" value="${teddies.qty}">
						

						
							<p class="panier-price-sum">${teddies.Prix}</p>
						
							<button id="btnDeletArt" class="btnDeletArt">Supprimer</button>
						
							</div>
				
				`
			)).join('')//pour eviter les virgules
	);
};

