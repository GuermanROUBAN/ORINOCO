
// Recuperation de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);


//methode 1 - pour extraire l'id (facile)
const leId = queryString_url_id.slice(1);
console.log(leId);



/*
//methode 2 - pour extraire l'id (difficile)
// Il faudra preciser apres ? un nom (id=)
// <a href="/html/produits.html?id=${teddy._id}"></a>
const urlSearchParams = new urlSearchParams(queryString_url_id);
console.log(urlSearchParams);

const leId = urlSearchParams.get("id"); // nom a preciser dans l'URL pour permettre la recherche
console.log(leId);
*/

console.log(response);
