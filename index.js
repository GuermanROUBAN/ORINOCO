
// Le fetch retourne une promesse et getArticles doit attendre.
// On donne await à getArticles.
// Await ne peut se trouver que dans une fonction asynchrone.
// On transforme donc en fonction asynchrone.

(async function () { // fonction auto appelée
		const articles = await getArticles()

		for (article of articles) {
			//on va prendre un article de la liste des articles 
			displayArticle(article)
			 // qui va afficher tous les articles
		}
	}) ()

// Fonction qui va recuperer les articles
function getArticles() {
	return fetch("http://localhost:3000/api/teddies")
		.then(function (httpBodyResponse) {
			// on recoit la reponse body qu'on transforme grace à Json pour l'afficher en JS
			return httpBodyResponse.json()
			//on fait un return pour recuperer dans le .then suivant
		})
		.then(function (articles) {
			//on recupere .jason soit nos articles
			return articles
		})
		.catch(function (error) {
			// on fait un .catch pour verifier que le serveur fonctionne et que fetch arrive à destination. 
			alert(error)
		})
}


function displayArticle(article) {
	const templateElt = document.getElementById("templateArticle")
	//on a crée un element template
	//on va le recuperer, le cloner et l'ajouter
	const cloneElt = document.importNode(templateElt.content, true)
	// commande pour créer un clone.
	// on transforme en const cloneElt
	cloneElt.getElementById("name").textContent = article.name
	cloneElt.getElementById("description").textContent = article.description
	cloneElt.getElementById("price").textContent = article.price
	cloneElt.getElementById("imageUrl").texteContent = article.imageUrl
	
	document.getElementById("main").appendChild(cloneElt)
}
