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
  clearMainCont();

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
  divTiendas.style.borderBottom = "2px solid rgba(3, 33, 55, 1)";
  divTiendas.style.borderTop = "2px solid rgba(3, 33, 55, 1)";
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
    clearMainCont();
    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    //Detalles de la tienda

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.style.textDecoration = "underline";
    h2Cab.style.textDecorationColor = "rgba(3, 33, 55, 1)";
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

    //Detalles de los productos

    var divProductos = document.createElement("div");
    divProductos.setAttribute("id","items");
    divProductos.style.borderBottom = "2px solid rgba(3, 33, 55, 1)";
    divProductos.style.borderTop = "2px solid rgba(3, 33, 55, 1)";
    divProductos.style.margin = "10px 0px";
    divProductos.style.padding = "5px 0px";
    IdMainCont.appendChild(divProductos);

    var stockShop = tienda.stockIte;
    var item = stockShop.next();
    while(!item.done){
      var NomPro = document.createElement("h3");
      NomPro.style.textDecoration = "underline";
      NomPro.style.textDecorationColor = "rgba(3, 33, 55, 1)";
      NomPro.appendChild(document.createTextNode(item.value.producto.nombre));
      divProductos.appendChild(NomPro);

      var detPro = document.createElement("div");
      detPro.className = "row";
      detPro.borderBottom = "1px solid rgba(3, 33, 55, 1)";
      divProductos.appendChild(detPro);

      var divImg = document.createElement("div");
      detPro.appendChild(divImg);
      divImg.className = "col-sm-6 text-center";

      var imgPro = document.createElement("img");
      imgPro.setAttribute("src",item.value.producto.imagenes);
      imgPro.style.width = "50%";
      imgPro.style.height = "auto";
      imgPro.style.padding = "8px";
      imgPro.style.borderBottomLeftRadius = "32px";
      imgPro.style.borderTopRightRadius = "32px";
      divImg.appendChild(imgPro);

      var divInfo = document.createElement("div");
      detPro.appendChild(divInfo);
      divInfo.className = "col-sm-6";
      divInfo.style.borderLeft = "2px solid rgba(3, 33, 55, 1)";
     // console.log( imgPro.offsetHeight + "px");


      var InfoProducto = document.createElement("p");
      InfoProducto.innerHTML = "<b>Nombre: </b>" + item.value.producto.nombre;
      divInfo.appendChild(InfoProducto);

      var InfoProducto1 = document.createElement("p");
      InfoProducto1.innerHTML = "<b>Marca: </b>" + item.value.producto.marca;
      divInfo.appendChild(InfoProducto1);

      var InfoProducto4 = document.createElement("p");
      InfoProducto4.innerHTML = "<b>En Stock: </b>" + item.value.cantidad + " Unidades";
      divInfo.appendChild(InfoProducto4);

      var InfoProducto2 = document.createElement("p");
      InfoProducto2.innerHTML = "<b>Precio + I.V.A: </b>" + item.value.producto.precioConIVA + " €";
      divInfo.appendChild(InfoProducto2);

      var InfoProducto3 = document.createElement("p");
      InfoProducto3.innerHTML = "<b>I.V.A (%): </b>" + item.value.producto.IVA + " %";
      divInfo.appendChild(InfoProducto3);

      var BtnDetalleProducto = document.createElement("button");
      BtnDetalleProducto.className = "btn btn-default";
      BtnDetalleProducto.appendChild(document.createTextNode("Detalles del producto"));
      BtnDetalleProducto.style.marginRight = "5px";
      divInfo.appendChild(BtnDetalleProducto);
      BtnDetalleProducto.addEventListener("click",productShopPopulate(tienda,item.value.producto.IdProduct));

      var BtnVerProducto = document.createElement("button");
      BtnVerProducto.className = "btn btn-success";
      BtnVerProducto.appendChild(document.createTextNode("Ver Producto"));
      divInfo.appendChild(BtnVerProducto);


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


    BtnAtras.addEventListener("click",initPopulate);
  };

}

function productShopPopulate(shop,IdPro){
  var tienda = shop;
  var item = tienda.getProduct(IdPro);
  return function(){
    clearMainCont();
    //console.log(item.producto.toString());
    var divProducto = document.createElement("div");
    divProducto.setAttribute("id","items");
    divProducto.style.borderBottom = "2px solid rgba(3, 33, 55, 1)";
    divProducto.style.borderTop = "2px solid rgba(3, 33, 55, 1)";
    divProducto.style.margin = "10px 0px";
    divProducto.style.padding = "5px 0px";
    IdMainCont.appendChild(divProducto);

    var NomPro = document.createElement("h3");
    NomPro.style.textDecoration = "underline";
    NomPro.style.textDecorationColor = "rgba(3, 33, 55, 1)";
    NomPro.appendChild(document.createTextNode(item.producto.nombre + " en la tienda \"" + tienda.nombre + "\""));
    divProducto.appendChild(NomPro);

    var detPro = document.createElement("div");
    detPro.className = "row";
    detPro.borderBottom = "1px solid rgba(3, 33, 55, 1)";
    divProducto.appendChild(detPro);

    var divImg = document.createElement("div");
    detPro.appendChild(divImg);
    divImg.className = "col-sm-6 text-center";

    var imgPro = document.createElement("img");
    imgPro.setAttribute("src",item.producto.imagenes);
    imgPro.style.width = "100%";
    imgPro.style.height = "auto";
    imgPro.style.padding = "8px";
    imgPro.style.borderBottomLeftRadius = "32px";
    imgPro.style.borderTopRightRadius = "32px";
    divImg.appendChild(imgPro);

    var divInfo = document.createElement("div");
    detPro.appendChild(divInfo);
    divInfo.className = "col-sm-6";
    divInfo.style.borderLeft = "2px solid rgba(3, 33, 55, 1)";

    var InfoProducto = document.createElement("p");
    InfoProducto.innerHTML = "<b>Nombre: </b>" + item.producto.nombre;
    divInfo.appendChild(InfoProducto);

    var InfoProducto1 = document.createElement("p");
    InfoProducto1.innerHTML = "<b>Marca: </b>" + item.producto.marca;
    divInfo.appendChild(InfoProducto1);

    var InfoProducto2 = document.createElement("p");
    InfoProducto2.innerHTML = "<b>En Stock: </b>" + item.cantidad + " Unidades";
    divInfo.appendChild(InfoProducto2);

    var InfoProducto3 = document.createElement("p");
    InfoProducto3.innerHTML = "<b>Precio + I.V.A: </b>" + item.producto.precioConIVA + " €";
    divInfo.appendChild(InfoProducto3);

    var InfoProducto4 = document.createElement("p");
    InfoProducto4.innerHTML = "<b>I.V.A (%): </b>" + item.producto.IVA + " %";
    divInfo.appendChild(InfoProducto4);

    var InfoProducto5 = document.createElement("p");
    InfoProducto5.innerHTML = "<b>Descripcion: </b>" + item.producto.descripcion ;
    divInfo.appendChild(InfoProducto5);

    if(item.producto instanceof Movil){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Camara: </b>" + item.producto.camara ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Ordenador){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>CPU: </b>" + item.producto.cpu ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof VideoConsola){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Numero de Jugadores: </b>" + item.producto.numJugadores ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Portatil: </b>" + item.producto.portatil ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Camara){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Lente: </b>" + item.producto.lente ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
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


    BtnAtras.addEventListener("click",shopPopulate(tienda));
  }

}

function clearMainCont()
/*Funcion para limpiar el contenido de la division con id main-cont */
{
  var allChilds = IdMainCont.children;
  //console.log("Hijos del contenido inicial: " + allChilds.length)
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
