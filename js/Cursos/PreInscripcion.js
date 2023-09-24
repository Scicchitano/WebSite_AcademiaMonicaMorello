
let botonPre=
document.getElementById("botonPreinscripcion")
botonPre.addEventListener("click", respuestaClick)
function respuestaClick(){
    strProductos = "";
    var nombreValue = document.getElementById('icon_prefix_nombre').value;
    var apellidoValue = document.getElementById('icon_prefix_apellido').value;
    var phoneValue = document.getElementById('icon_telephone_').value;
    var mailValue = document.getElementById('icon_email_').value;
    
    console.log("hola");
    strProductos += `Hola mi nombre es ${apellidoValue}, ${nombreValue} mi numero es ${phoneValue}. Deseo que me envien todo la informacion sobre el curso de APARATOLOGIA a mi correo: ${mailValue}`

    console.log(strProductos);


    let btnPedirElement = document.getElementById("btnPedir");
    btnPedirElement.href = "https://api.whatsapp.com/send?phone=5491139300005&text=" + encodeURIComponent(strProductos);


}



