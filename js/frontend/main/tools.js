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
	let localPanier = JSON.parse(localStorage.getItem("panier"));
	if (localPanier!=null) {
		let artDansPanier = localPanier.length;
		console.log(artDansPanier);
		console.log(typeof artDansPanier);
		document.querySelector('.nav_panier span').textContent = artDansPanier;
	}
}

