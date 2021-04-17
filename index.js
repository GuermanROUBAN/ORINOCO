main()

async function main() {
	const articles = await getArticles()
	displayArticles(articles)
	console.log(articles)
}

function getArticles() {
	return fetch("http://localhost:3000/api/teddies")
		.then(function (httpBodyResponse) {
			return httpBodyResponse.json()
		})
		.then(function (articles) {
			return articles
		})
		.catch(function (error) {
			alert(error)
		})
}


	function displayArticles() {
		return""
}