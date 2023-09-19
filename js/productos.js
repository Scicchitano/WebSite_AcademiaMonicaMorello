const CLAVE_PRODUCTOS_CARRITO_LS = "ProductosCarrito";
let productoAUX = "";

/*                 DATOS JSON                    */
/*Funcion para traer datos del JSON (dataProductos). Para completar las card con ese dato(foto, titulo, contenido, acordion)*/
function showData(json) {
  console.log("JSON = " + json);
  console.log(json.length);
  /*Llama a la seccion productos */
  productosSeccionElement = document.getElementById("productosSeccion");
  productosSeccionElement.classList.add("row");
  /*Recorre todos los datos de dataProductos (post) y a su vez dentro del mismo JSON recorre los (items)*/
  json.forEach((post) => {
    console.log(post.categoria);
    post.items.forEach((item) => {
      /*Se crea un div para que cada producto que se agregue me lo cree en una card con los datos del JSON*/
      const newCardElement = document.createElement("div");
      newCardElement.innerHTML = `
      
        <div class="col">
        <div class="card z-depth-4 rounded cardProductos">
        <div class="card-image">
        <img src="${item.photo}">
        </div>
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-content ">
        <p>${item.content}</p>
        </div>
        <ul class="collapsible">
        <li>
                  <div class="collapsible-header propiedades"><i class="material-icons">access_time</i>Duración</div>
                  <div class="collapsible-body propiedadesTexto"><span>${item.beneficios}</span></div>
                  </li>
                  <li>
                  <div class="collapsible-header propiedades"><i class="material-icons">extension</i>Dificultad</div>
                  <div class="collapsible-body propiedadesTexto"><span>${item.modoUso}</span></div>
                  </li>
                  <li>
                  <div class="collapsible-header propiedades"><i class="material-icons">content_paste</i>Modalidad</div>
                  <div class="collapsible-body propiedadesTexto"><span>${item.indicaciones}</span></div>
                  </li>
                  <li>
                  <div class="collapsible-header propiedades"><i class="material-icons">school</i>Contenidos minimos</div>
                  <div class="collapsible-body propiedadesTexto"><span>${item.contraIndicaciones}</span></div>
                  </li>
                  </ul>
                  
                  <a class="waves-effect waves-light btn botonVerMas botonSolicitar">SOLICITAR</a>
    
                  </div>
                  </div>
                  
                  `;
                  /*Una vez que agrego los datos, me lo agrega la seccion productos en forma de tarjeta*/
      productosSeccionElement.appendChild(newCardElement);
    });
  });
}




/* Busca los datos en el JSON (dataproductos), es decir me trae todos los datos de cada card y lo manda al showData*/
async function fetchData() {
  try {
    let jsonData = {};
    fetch("../json/dataProductos.json")
    /*Entra en el THEN cuando es una respuesta exitosa o no*/
      .then((response) => response.json())
      .then((json) => showData(json));
      /*Entra al catch cuando no encuentra datos en el pad del JSON*/
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

// Call the fetchData function to load and display the data
fetchData();






/*Funcion para poder descargar un catalogo con todos los productos*/
async function abrirCatalogo() {
  catalogoButton.style.fontSize = "15px";
  await new Promise((resolve) => setTimeout(resolve, 180)); // Delays for 180 milliseconds
  catalogoButton.innerText = "VER CATALOGO COMPLETO";
  console.log("CAMBIO A 15px");
}
/*Mi signo + tiene un tamaño de 30px y al hacer click me genera un hover con el mensaje "descargar catalogo donde este es mas chico (15px)*/

/*Funcion para que una que se haga click vuelva a el tamaño "original"*/
function cerrarCatalogo() {
  catalogoButton.innerText = "+";
  catalogoButton.style.fontSize = "30px";
  console.log("CAMBIO A 30px");
}
/*Funcion para que cuando se haga click me descargue un .pdf, .doc, etc*/
function descargarCatalogo() {
  var link = document.createElement("a");
  link.href = "../pdf/CV_Diego_Scicchitano.pdf";
  link.download = "example.pdf";
  link.click();
  console.log("DESCARGAR");
}
/*Finalmente llamo a cada funcion para lograr la magia*/
let catalogoButton = document.getElementById("catalogoCompleto");

catalogoButton.style.fontSize = "30px";

catalogoButton.addEventListener("mouseover", abrirCatalogo);

catalogoButton.addEventListener("mouseout", cerrarCatalogo);

catalogoButton.addEventListener("click", descargarCatalogo);





/*Funcion que para cuando se haga click en SOLICITAR se abra un modal con cantidad de productos y lo envies por wps*/
function addProductoLS(producto, cantidad) {
  const existingDataString = localStorage.getItem(CLAVE_PRODUCTOS_CARRITO_LS);
  let existingData = {};

  if (existingDataString) {
    existingData = JSON.parse(existingDataString);
  }

  // NewData me trae los datos de la funcion addProductoLS que posteriormente fueron almacenados en el JSON
  const newData = {
    nombre: producto,
    cantidad: cantidad,
  };

  //
  if (!existingData.items) {
    existingData.items = [];
  }

  existingData.items.push(newData);

 
  localStorage.setItem(
    CLAVE_PRODUCTOS_CARRITO_LS,
    JSON.stringify(existingData)
  );
}
/*Funcion que me abre un modal para seleccionar la cantidad de productos*/
function seleccionarCantidad(index) {
  const elem = document.getElementById("modal");
  const instance = M.Modal.init(elem);

  productoAUX = tituloCardElemento[index].innerText;
  console.log("index = " + index + "producto = " + productoAUX);
  instance.open();
}




function addCantidad() {
  const inputElement = document.getElementById("inputCantidadProductos");
  addProductoLS(productoAUX, inputElement.value);
}



const submitElement = document.getElementById("btnSubmit");
submitElement.addEventListener("click", addCantidad);

/*Toma el boton solicitar de cada tarjeta*/
let solicitarElemento = document.getElementsByClassName("botonSolicitar");

let tituloCardElemento = document.getElementsByClassName("card-title");
/*Me muestra todos los botones desde la posicion 0*/
console.log(solicitarElemento[0].innerText);
console.log(tituloCardElemento[0].innerText);

for (let index = 0; index < solicitarElemento.length; index++) {
  console.log("index = " + index + "titulo = " + tituloCardElemento[index].innerText);
  solicitarElemento[index].addEventListener(
    "click",
    function () {
      seleccionarCantidad(index);
    },
    false
  );
}

/*                             CARRITO                               */


function eliminarProducto(producto) {
  console.log(producto);
  // Obtener los productos almacenados en localStorage
  const productosGuardados =
    JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS_CARRITO_LS)) || [];
/*Te devuelve todos los items actualizados una vez que borro el producto */
  var filtered = productosGuardados.items.filter(function (item) {
    return item.nombre !== producto;
  });

  console.log(filtered);

  productosGuardados.items = filtered;
  localStorage.setItem(
    CLAVE_PRODUCTOS_CARRITO_LS,
    JSON.stringify(productosGuardados)
  );

  updateModalCarrito();
}


/* crea la tabla con el ls actualizado */
function updateModalCarrito() {
  const elem = document.getElementById("modalCarrito");
  const instance = M.Modal.init(elem);

  const divElement = document.createElement("div");
  divElement.classList = "modal";
  const bodyElement = document.getElementById("bodyCarrito");
  bodyElement.innerHTML = "";



  let strProductos = "";

  // Obtener los productos almacenados en localStorage
  const productosGuardados =
    JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS_CARRITO_LS)) || [];

  console.log(productosGuardados);
  // Iterar sobre los productos utilizando forEach
  /*Desde mi JSON tomo los productos para agregarlos al carrito con su respectivo titulo, imagen, etc*/
  productosGuardados.items.forEach((producto) => {
    const newRow = document.createElement("tr");
    bodyElement.appendChild(newRow);

    const newProductElement = document.createElement("td");
    newProductElement.classList = "textoTablaCarrito";
    newProductElement.innerText = producto.nombre;
    newRow.appendChild(newProductElement);

    strProductos += producto.nombre;
    //Nuevamente tomo los datos de JSON pero para la cantidad
    const newCantidadElement = document.createElement("td");
    newCantidadElement.classList = "textoTablaCarrito";
    newCantidadElement.innerText = producto.cantidad;
    newRow.appendChild(newCantidadElement);

//Utilizo strProductos para que cuando se agreguen productos me los coloque debajo, esto tambien se utiliza para wsp y asi el texto se ve prolijo*
    strProductos += " - " + producto.cantidad + "\n";

    console.log(
      `Producto: ${producto.nombre}, Cantidad: $${producto.cantidad}`
    );
    // Aca eliminamos de la lista del carrito productos 
    const newAccionElement = document.createElement("td");
    const botonEliminarElement = document.createElement("button");
    newAccionElement.appendChild(botonEliminarElement);
    botonEliminarElement.classList = "btn waves-effect waves-light";
    botonEliminarElement.addEventListener(
      "click",
      function () {
        /*Funcion que me actualiza la tabla de datos del JSON(y no me incluya el elemento eliminado*/
        eliminarProducto(producto.nombre);
      },
      false
    );
    const iconEliminarElement = document.createElement("i");
    iconEliminarElement.classList = "material-icons";
    iconEliminarElement.innerHTML = "delete";
    botonEliminarElement.appendChild(iconEliminarElement);
    newRow.appendChild(newAccionElement);

  });
  instance.open();
/*Poder configurar la API de wsp para agregar el mensaje que deseo que mande sin necesidad de en cada espacio agregarle %20*/
  console.log("strProductos : " + encodeURIComponent(strProductos));
  let btnPedirElement = document.getElementById("btnPedir");
  btnPedirElement.href = "https://api.whatsapp.com/send?phone=5491164449898&text=" + encodeURIComponent("Hola ! Me gustaria pedir los siguientes productos: \n" + strProductos);
}
let carritoElement = document.getElementById("botonCarrito");
carritoElement.addEventListener("click", updateModalCarrito);




