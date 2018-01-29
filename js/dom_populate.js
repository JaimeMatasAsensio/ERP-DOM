"use strict";
/*Documento para crear las distintas funciones que cargaran datos desde Store */
init();
var Store = StoreHouse.getInstance();
var IdMainCont = document.getElementById("main-cont");
var BtnRemoveChilds = document.getElementById("removeChilds");
BtnRemoveChilds.addEventListener("click", clearMainCont);

function initPopulate()
/*Funcion que inicializa la pagina cargando las tiendas que existen dentro del storehouse */
{

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

function shopPopulate(shop)
/*Funcion para mostrar los productos de una tienda una vez se ha seleccionado una tienda en concreto */
{
  var tienda = shop;
  return function(){
    
    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);
  
    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);
    var infoTienda = document.createElement("p");
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    IdMainCont.appendChild(infoTienda);
    var infoTienda1 = document.createElement("p");
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    IdMainCont.appendChild(infoTienda1);
    var infoTienda2 = document.createElement("p");
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    IdMainCont.appendChild(infoTienda2);
  
    //Detalles de la tienda y sus productos

    var divProductos = document.createElement("div");
    divProductos.setAttribute("id","tiendas");
    divProductos.className = "row";
    divProductos.style.borderBottom = "1px solid black";
    divProductos.style.borderTop = "1px solid black";
    divProductos.style.margin = "10px 0px";
    divProductos.style.padding = "5px 0px";
    IdMainCont.appendChild(divProductos);

    var stockShop = tienda.stockIte;
    var item = stockShop.next();
    while(!item.done){
      var NomPro = document.createElement("h3");
      NomPro.appendChild(document.createTextNode(item.value.producto.nombre));
      divProductos.appendChild(NomPro);

      var detPro = document.createElement("div");
      detPro.className = "row";
      detPro.borderBottom = "1px solid black";
      divProductos.appendChild(detPro);

      var divImg = document.creaateElement("div");
      divImg.className = "col-sm-6";
      detPro.appendChild(divImg);

      var imgPro = document.createElement("img");
      imgPro.setAttribute("src",item.value.producto.imagenes);
      imgPro.style.width = "50%";
      imgPro.style.height = "auto";
      divImg.appendChild(imgPro);
      
      var divInfo = document.createateElement("div");
      divImg.className = "col-sm-6";
      



      item = stockShop.next();
    }
  
    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);
  
    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";
    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);

    BtnAtras.addEventListener("click",clearMainCont);
    BtnAtras.addEventListener("click",initPopulate);
  };

}


function clearMainCont()
/*Funcion para limpiar el contenido de la division con id main-cont */
{
  var allChilds = IdMainCont.children;
  console.log("Hijos del contenido inicial: " + allChilds.length)
  while(allChilds.length > 0) {
    IdMainCont.removeChild(allChilds[0]);
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
