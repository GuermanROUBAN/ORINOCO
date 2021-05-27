

compteurArtictlesPanier();


//On va consulter le panier dans le LS
//let localPanier = JSON.parse(localStorage.getItem("panier"));

//console.log(localPanier);
//console.log(typeof localPanier); // Il s'agit d'un Objet avec des Arrays

let responseId = localStorage.getItem("responseId");
console.log(`responseId ${responseId}`);

// On transforme en massif d'array
let panier2 = JSON.parse(localStorage.getItem('panier'));
console.log(panier2, "panier2")

//mise en place du compteur
let totalPrix = 0;

for (let elem of panier2) {
	totalPrix += parseInt(elem.totalprice)
}
console.log(totalPrix);

// La structure HTML de la page confirmationCommande


// Selection élément du DOM pour le positionnement
let position = document.querySelector("#container_recap_commande");

let structureConfirmationCommande = `
<h2>Félécitations! Vous avez finalisé votre commande ! </h2>
<div class="recapCommande">
	<br>
	<p>Merci d'avoir choisi notre Orinoco</p>
	<br>
	<p>Le numéro de votre commande est le : <span class="gras">${responseId}</span></p>
	<br>
	<p>Le montant de votre commande est de : <span class="gras">${totalPrix}</span> Euro</p>
	<br>
	<p class="gras">Au plaisir de vous revoir.</p>
	<br>
</div>
`;

// Injection HTML
position.insertAdjacentHTML("afterbegin", structureConfirmationCommande);

// Effacer tout le local storage sauf le formulaire
function enleverClesDuLs(key) {
	localStorage.removeItem(key);
}
//enleverClesDuLs("responseId");
//enleverClesDuLs("panier");
