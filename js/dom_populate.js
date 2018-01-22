"use strict";
/*Documento para crear las distintas funciones que cargaran datos desde Store */
init();
var Store = StoreHouse.getInstance();

var IdMainCont = document.getElementById("main-cont");
IdMainCont.innerHTML ="<h2>"+Store.nombre+"</h2>";
