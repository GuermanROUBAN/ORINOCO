//Ajout du cours (Guerman)

/*stopPropagation()
De la même manière que  preventDefault() ,  stopPropagation()  est une fonction de l'objet que votre fonction 
reçoit en paramètre. Son rôle est par contre très différent, car il nous permet d'empêcher la propagation 
de l'événement vers son parent. En effet, lorsqu'un événement est déclenché, il est d'abord reçu par l'élément cible,
mais il est ensuite remonté vers les éléments parents qui sont aussi dans la cible.
Avec  stopPropagation() , vous pouvez ainsi empêcher que d'autres éléments reçoivent l'événement.

elementInterieur.addEventListener('click', function(event) {
    event.stopPropagation();
    elementAvecMessage.innerHTML = "Message de l'élément intérieur";
});*/

