document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".collapsible");
  //var instances = M.Collapsible.init(elems);

  var instances = M.Collapsible.init(elems, {
    onOpenStart: function (el) {
      console.log("Collapsible opened:", el);
      let cardElement = document.getElementsByClassName("cardProductos");
      for (let i = 0; i < cardElement.length; i++) {
        cardElement[i].style.height = "720px";
      }
    },
    onCloseStart: function (el) {
      console.log("Collapsible closed:", el);
      let cardElement = document.getElementsByClassName("cardProductos");
      for (let i = 0; i < cardElement.length; i++) {
        cardElement[i].style.height = "670px";
      }
    },
  });
});

// Or with jQuery

$(document).ready(function () {
  $(".collapsible").collapsible();
  console.log("HOLA");
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("botonPreInscripcion");
  var instances = M.Modal.init(elems);
});

// Or with jQuery

$(document).ready(function () {
  $("botonPreInscripcion").modal();
});
