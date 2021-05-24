compteurArtictlesPanier();


// On va consulter le panier dans le LS
//let localPanier = JSON.parse(localStorage.getItem("panier"));

//console.log(localPanier);
//console.log(typeof localPanier); // Il s'agit d'un Objet avec des Arrays

const responseId = localStorage.getItem("responseId");
console.log(`responseId ${responseId }`);