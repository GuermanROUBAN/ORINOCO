// FICHIER POUR LES FONCTIONS QUI REVIENNENT REGULIEREMENT DANS LA PROGRAMMATION.

//AFFICHAGE DU PRIX
//-----------------------------------------------------------------------------------------------
// Affichage correct du prix avec la virgule
nombreAvecVirgule = (x) => {
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',')
};

//-----------------------------------------------------------------------------------------------
//COMPTE NOMBRE ARTICLES DANS PANIER
function compteurArtictlesPanier() {
	// On va chercher le LS
	let localPanier = JSON.parse(localStorage.getItem("panier"));
	// On regarde s'il est null ou pas car si null donne une erreur
	if (localPanier != null) {
		// on mesure la longeur de la KEY panier
		let artDansPanier = localPanier.length;
		//console.log(artDansPanier);
		//console.log(typeof artDansPanier);
		//on va envoyer les données dans le nav
		document.querySelector('.nav_panier span').textContent = artDansPanier;
	}
}

//-----------------------------------------------------------------------------------------------
//POPUP DE CONFIRMATION
// Confirme à l'utilisateur que le produit et l'option séléctionnés ont bien été ajouté au panier. 
// Redirige vers la page panier ou bien retourne à la page acceuil.
function popupConf() {
	if (window.confirm("L'article: " + article_name.textContent + " option: " + "'" + article_option.value + "'" + " a bien été ajouté à votre panier. Appuyez sur OK pour aller au panier ou ANNULER pour revenir à l'acceuil"))
	{
		window.location.href = "panier.html";
	}
	else {
		window.location.href = "/index.html";
	}
}

