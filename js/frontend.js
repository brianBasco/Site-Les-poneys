document.querySelector(".plus")
    .addEventListener("click", plus(this.id));
    
document.querySelector(".moins")
    .addEventListener("click", moins(this.id));

//Afficher le contenu du match
function plus(container) {
    var id = "#" + container;
    document.getElementById(id).style = "height:0px";
}

//Cacher le contenu du match
function moins(container) {
    var id = "#" + container;
    document.getElementById(id).style = "height:intial";
}