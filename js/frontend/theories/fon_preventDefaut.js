/*Ajout du cours (Guerman)

En appelant cette fonction dans votre callback, vous demandez au gestionnaire des événements de ne pas exécuter le comportement par défaut de votre élément (qui est la redirection vers une autre page pour un lien). 
const elt = document.getElementById('mon-lien');    // On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener('click', function(event) {     // On écoute l'événement click, notre callback prend un paramètre que nous avons appelé event ici
event.preventDefault();                         // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
});*/
