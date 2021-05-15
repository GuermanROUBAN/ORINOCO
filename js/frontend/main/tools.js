/*
function cl(a) {
	console.log(a)
}
*/

function comptArtPanier () {
let localPanier = JSON.parse(localStorage.getItem("panier"));
let artDansPanier = localPanier.length;
console.log(artDansPanier);
console.log(typeof artDansPanier);
document.querySelector('.nav_panier span').textContent = artDansPanier;

}