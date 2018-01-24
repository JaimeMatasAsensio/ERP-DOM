"use strict";
/*Documento para crear las distintas funciones que cargaran datos desde Store */
init();
var Store = StoreHouse.getInstance();
var IdMainCont = document.getElementById("main-cont");
var BtnRemoveChilds = document.getElementById("removeChilds");
BtnRemoveChilds.addEventListener("click", clearMainCont);
function initPopulate(){

  var divCab = document.createElement("div");
  divCab.setAttribute("id","cabecera");
  divCab.className = "row";
  IdMainCont.appendChild(divCab);

  var h2Cab = document.createElement("h2");
  h2Cab.setAttribute("id","titleStore");
  h2Cab.className = "col-md-12";
  h2Cab.appendChild(document.createTextNode(Store.nombre));
  divCab.appendChild(h2Cab);

  var divTiendas = document.createElement("div");
  divTiendas.setAttribute("id","tiendas");
  divTiendas.className = "row";
  divTiendas.style.borderBottom = "1px solid black";
  divTiendas.style.borderTop = "1px solid black";
  divTiendas.style.margin = "10px 0px";
  divTiendas.style.padding = "5px 0px";

  IdMainCont.appendChild(divTiendas);

  var shopsIte = Store.shopIte;
  var shop = shopsIte.next();
  var index = 1;
  while(!shop.done){
    var divTienda = document.createElement("div");
    divTienda.className = "col-sm-4 text-center";
    divTienda.style.minHeight = "200px";
    divTiendas.appendChild(divTienda);

    var h3Tienda = document.createElement("h3");
    h3Tienda.setAttribute("id","titleShop"+index);
    h3Tienda.appendChild(document.createTextNode(shop.value.nombre));
    divTienda.appendChild(h3Tienda);
    
    var catIte = shop.value.categoryIte;
    var category = catIte.next();
    while(!category.done){
      var pCategory = document.createElement("p");
      pCategory.appendChild(document.createTextNode(category.value.titulo));
      divTienda.appendChild(pCategory);
      category = catIte.next();
    }
    
    var BtnVerTienda = document.createElement("button");
    BtnVerTienda.setAttribute("id","showShop"+index);
    BtnVerTienda.className = "btn btn-success";
    BtnVerTienda.appendChild(document.createTextNode("Ver Tienda"));

    divTienda.appendChild(BtnVerTienda);

    BtnVerTienda.addEventListener("click",clearMainCont);
    BtnVerTienda.addEventListener("click",shopPopulate(shop.value));

    index++;
    shop = shopsIte.next();
  }

}

function shopPopulate(shop){
  
  return function(){
    
    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);
  
    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(shop.nombre));
    divCab.appendChild(h2Cab);
  
    //Detalles de la tienda y sus productos
  
    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);
  
    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";
    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));

    BtnAtras.addEventListener("click",initPopulate);
  };

}


function clearMainCont(){
  var allChilds = IdMainCont.children;
  console.log("Hijos del contenido inicial: " + allChilds.length)
  for (let i = 0; i <= allChilds.length; i++) {
    IdMainCont.removeChild(allChilds[i]);
  }
}

initPopulate();



/*
<div id="cabecera" class="row">
  <h2 id="titleStore">StoreMancha</h2>
</div>
<div id="tiendas"class="row">
  <div class="col-sm-4 text-center">
    <h3 id="titleShop1">Tienda1</h3>
    <ul>
      <li>tienda1.Categoria1</li>
    </ul>
    <button class="btn btn-success" id="showShop1">Ver Tienda</button>
  </div>
  <div class="col-sm-4 text-center">
    <h3 id="titleShop2">Tienda3</h3>
    <button class="btn btn-success" id="showShop2">Ver Tienda</button>
  </div>
  <div class="col-sm-4 text-center">
    <h3 id="titleShop3">Tienda3</h3>
    <button class="btn btn-success" id="showShop3"><span class="glyphicon glyphicon-chevron-left"></span> Ver Tienda</button>
  </div>
</div>
*/
