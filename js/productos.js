const CLAVE_PRODUCTOS_CARRITO_LS = "ProductosCarrito";

let productoAUX = "";




async function abrirCatalogo() {
  catalogoButton.style.fontSize = "15px";
  await new Promise((resolve) => setTimeout(resolve, 180)); // Delays for 2000 milliseconds (2 seconds)
  catalogoButton.innerText = "VER CATALOGO COMPLETO";
  console.log("CAMBIO A 15px");
}

function cerrarCatalogo() {
  catalogoButton.innerText = "+";
  catalogoButton.style.fontSize = "30px";
  console.log("CAMBIO A 30px");
}

function descargarCatalogo() {
  var link = document.createElement("a");
  link.href = "../pdf/CV_Diego_Scicchitano.pdf";
  link.download = "example.pdf";
  link.click();
  console.log("DESCARGAR");
}

let catalogoButton = document.getElementById("catalogoCompleto");

catalogoButton.style.fontSize = "30px";

catalogoButton.addEventListener("mouseover", abrirCatalogo);

catalogoButton.addEventListener("mouseout", cerrarCatalogo);

catalogoButton.addEventListener("click", descargarCatalogo);



function addProductoLS(producto,cantidad){
  const existingDataString = localStorage.getItem(CLAVE_PRODUCTOS_CARRITO_LS);
  let existingData = {};

  if (existingDataString) {
      existingData = JSON.parse(existingDataString);
  }

  // Step 2: Append new data to the existing data
  const newData = {
    nombre: producto,
    cantidad: cantidad
  };

  // Assuming you want to use an array to store multiple items
  if (!existingData.items) {
      existingData.items = [];
  }

  existingData.items.push(newData);

  // Step 3: Convert back to JSON and store in localStorage
  localStorage.setItem(CLAVE_PRODUCTOS_CARRITO_LS, JSON.stringify(existingData));

}

function seleccionarCantidad(index) {
  const elem = document.getElementById("modal");
  const instance = M.Modal.init(elem);
  const divElement = document.createElement("div");
  divElement.classList = "modal-content";
  elem.appendChild(divElement);

  
  productoAUX = tituloCardElemento[index].innerText;
  

  instance.open();
}

function addCantidad() {
    const inputElement = document.getElementById("inputCantidadProductos");
    addProductoLS(productoAUX,inputElement.value);
}

let solicitarElemento = document.getElementsByClassName("botonSolicitar");

let tituloCardElemento = document.getElementsByClassName("card-title");

console.log(solicitarElemento[0].innerText);

for (let index = 0; index < solicitarElemento.length; index++) {
  solicitarElemento[index].addEventListener(
    "click",
    function () {
      seleccionarCantidad(index);
    },
    false
  );
}

const submitElement = document.getElementById("btnSubmit");

submitElement.addEventListener("click", addCantidad);



/*                             CARRITO                               */


function modalCarrito() {
  const elem = document.getElementById("modalCarrito");
  const instance = M.Modal.init(elem);
  const divElement = document.createElement("div");
  divElement.classList = "modal";
  divElement.innerHTML = ""
  

  instance.open();
}

let carritoElement = document.getElementById("botonCarrito");



carritoElement.addEventListener("click", modalCarrito);