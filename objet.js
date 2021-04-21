// CREATION DES OBJETS


//let userInfo = new Object(); // syntaxe "constuctor objet"

/*
let userInfo = {
	name: "Jean", //clé (id/nom de la valeur de l'objet) + valeur 
	age: 30, // la virgule est necessaire
	"likes js":true, // plusieurs mots indiquer entre ""
}; // syntaxe "ligne objet"

//console.log(userInfo);
//console.log(userInfo.name);
//console.log(userInfo["likes js"]); //pour obtenir le resultat mettre entre [""]
*/

/*
let firstPart = "likes";
let userInfo = {
	name: "Jean",
	age: 30,
	[firstPart + "javascript"]: true,
};

console.log(userInfo["likes javascript"]); // resultat indefined alos qu'il doit etre true?
*/

/*
let firstPart = "likes";
let userInfo = {
	name: "Jean",
	age: 30,
	[firstPart]: true,
};

console.log(userInfo[firstPart]); // donne true

let key = "name";
console.log(userInfo[key]); // grâce au [] affiche le nom Jean
*/

/* à l'interieur d'un objet on peut utiliser les expressions reservés comme let if for...
let userInfo = {
	let: "Jean",
	for: 30,
};

console.log(userInfo.let);
console.log(userInfo.for);
*/

/* on peut aussi utiliser les symboles
let userInfo = {
	0: "Jean",
};

console.log(userInfo[0]);
console.log(userInfo["0"]);
*/


/*
let id = Symbol("id"); 
let userInfo = {
	name: "Jean",
	age: 30,
	[id]: "tonton"
};

console.log(userInfo);

// le symbol n'apparait pas dans un for ... in
 // on peut les utiliser dans symbol.interator, symbol.toPrimitive
*/

/*
let userInfo = {
	name: "Gerusya",
	age: 30,
	address: {
		city: "Volgograd",
		street:"Victoire",
	}
}

console.log(userInfo);
console.log(userInfo.address);//affiche Volgograd, Victoire
console.log(userInfo.address.city); //affiche Volgograd
*/

/*
function makeUserInfo(name, age) {
	return {
		name: name,
		age: age,
		"likes js":true,
	};
}
let user = makeUserInfo("Gerusya", 30);
console.log(user);
*/

// MODIFICATION DES OBJETS

/*
//AJOUTS
let userInfo = {
	name: "Gerusya",
}
console.log(userInfo);

userInfo.age = 30;
console.log(userInfo);

userInfo["likes js"] = true; //si j'ajoute un mot composé
console.log(userInfo);

userInfo.address = { //on ajoute un objet dans un objet
	city: "Volgograd", 
	street: "Freedom",
};
console.log(userInfo);
*/

/*
//SUPPRESSIONS

let userInfo = {
	name: "Gerusya",
	age: 30,
	"likes js":true,
}
console.log(userInfo);

delete userInfo.age;
console.log(userInfo);

delete userInfo["likes js"];
console.log(userInfo);

userInfo.age = 18; // de la meme maniere on peut changer le nom dans une const
console.log(userInfo);
*/

/*
// COPIER UN OBJET

let userInfo = {
	name: "Gerusya",
	age: 30,
//	"likes js":true,
}

console.log(userInfo);

//let user = userInfo; // copie de userInfo
//console.log(user);

//user.age = 18;
//console.log(user); // affiche 18


//autre moyen de faire une copie
//let user2 = Object.assign({}, userInfo); //on crée un objet nouveau vide
//user2.age = 18; //on precise la valeur qui change
//console.log(user2); // la console indique le vieux et le nouveau objet

Object.assign(userInfo, { ['likes js']: true, city: "Antibes" });
console.log(userInfo);
*/

/*
// RECHERCHE DANS OBJET

let userInfo = {
	name: "Gerusya",
	age: 30,// si masqué alors donne vide
}

// moyen 1
if (userInfo.age) {
	console.log(userInfo.age);
}
/*

/*
// moyen 2
let userInfo = {
	name: "Gerusya",
	age: 30,
	//address: {
		city: "Volgograd",
		street:"Victoire",
	//}
}

//console.log(userInfo.address.street); // si valeur cachées donnera une faute
console.log(userInfo?.address?.street); // si valeur cachées donnera un undefined
*/

/*
// moyen 3
let userInfo = {
	name: undefined,
}
if ("name" in userInfo) {
	console.log(userInfo.name);
}
	//utiliser in est utilie si name"undefined". 
	//Car au lieu de determiner undefined comme false(code en erreur), 
	//il definira undefined en true(et affichera le code).
	
*/

/*

//CYCLE FOR...IN

//for (let key in Object) {	
//}
 
let userInfo = {
	name: "Gerusya",
	age: 30,
	address: {
		city: "Volgograd",
		street:"Spasibo Dedu za Pobedu",
	}
}

/*
for (let key in userInfo) {
	//clés
	//console.log(key);
	//valeur des clés
	console.log(userInfo[key])
}
*/

/*
for (let key in userInfo.address) {
	// on va chercher les clés dans les objets de l'objet
	//console.log(key);//affiche le nom de la clés (city, street)
	//la valeur des clés
	console.log(userInfo.address[key]);//affiche la valeur de la clé (Volgograd, Spasibo dedu za Pobedu)
}
*/


/*
// LES METHODES DES OBJETS

let userInfo = {
	name: "Gerusya",
	age: 40,
	address: {
		city: "Volgograd",
		street: "Boulevard Engels",
	},
	//comme propriete on peut très bien avoir une fonction
	
/*
	showInfo: function () {
		console.log(`${userInfo.name}, ${userInfo.age} ans. Ville: ${userInfo.address.city}, ulitsya: ${userInfo.address.street}`);
	}
*/

/*
// Voici une façon de saisie plus rapide
	
showInfo() {
		//console.log(`${userInfo.name}, ${userInfo.age} ans. Ville: ${userInfo.address.city}, Ul: ${userInfo.address.street}`);

		//	Voici une façon de saisie avec .this	

		console.log(`${this.name}, ${this.age} ans. Ville: ${this.address.city}, Ul: ${this.address.street}`);

	}
}
	// Attention .this ira chercher son parent. 
	// Si une foction nouvelle est ajoutée .this n'ira pas chercher plus haut que la nouvelle fonction. 
	// Il y donc aura une erreur.

	let show = () => console.log(`${this.name}, ${this.age} ans. Ville: ${this.address.city}, Ul: ${this.address.street}`);
	// Avec la fonction flechée la fonction ira chercher la propriete au dela de son parent. 
	// Il n'y aura pas d'erreur.

userInfo.showInfo();
*/

/*
// Il est preferable d'utisier une fonction => et .this qu'un user.Info

let userInfo = {
	name: "Gerusya",
	age: 40,
	address: {
		city: "Volgograd",
		street: "Boulevard Engels",
	},
	showInfo: function () {
		console.log(`${this.name}, ${this.age} ans. Ville: ${this.address.city}, Ul: ${this.address.street}`);
		console.log(`${userInfo.name}, ${userInfo.age} ans. Ville: ${userInfo.address.city}, ulitsya: ${userInfo.address.street}`);
	}
}
let user = userInfo;
userInfo = null; // dans ce cas je vais avoir une erreur. userInfo n'existe plus.
user.showInfo(); // showInfo ne vois plus les priorites. Il le voit avec .this
*/


// LES FONCTONS CONSTRUCTORS
// ces fonctions commencent par une Majuscule

function UserInfo(name) {
	//this = {}; On crée un objet vide
	this.name = name;
	this.age = 18;
	
	// return this;
}

console.log(new UserInfo('Mitya'));
console.log(new UserInfo('Chris'));
console.log(new UserInfo('Ludo'));