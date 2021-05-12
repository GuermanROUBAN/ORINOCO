



const local = JSON.parse(localStorage.getItem("produit")); //recuperation


if (local != null)//si la clé existe
panier.textContent = `${local.Nom}`;
panier.textContent = `${local.Id}`;
//panier.textContent = `${local.Option}`