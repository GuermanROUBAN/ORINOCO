
const local = JSON.parse(localStorage.getItem("articlesPanier"));

if (localStorage.getItem("panier") != null)//si la clé existe
	h6.textContent = `${localStorage.getItem("panier")} tu es sur le point d'acheter un nounours gars`;
