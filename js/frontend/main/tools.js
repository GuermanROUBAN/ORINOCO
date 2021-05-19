/*
function cl(a) {
	console.log(a)
}
*/



/*
let carts = document.querySelectorAll(".btnByeArt");


for (let i = 0; i < carts.length; i++){
	carts[i].addEventListener('click', () => {
		cartNumbers();
	})
}	

*/

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem("cartNumbers");
}

function cartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	productNumbers = parseInt(productNumbers);

	if (productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.nav_panier span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers,1');
		document.querySelector('.nav_panier span').textContent = 1;
	}

}


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

function popupConf() {
	if (window.confirm("L'article: " + article_name.textContent + " option: " + "'" + article_option.value + "'" + " a bien été ajouté à votre panier. Appuyez sur OK pour aller au panier ou ANNULER pour revenir à l'acceuil"))
	{
		window.location.href = "panier.html";
	}
	else {
		window.location.href = "/index.html";
	}
}

