//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let ImgValue = document.getElementById("inputImg");
    let boton = document.getElementById("boton");

    let nuevoPerfil = localStorage.getItem("perfil")

    if(nuevoPerfil){
        nuevoPerfil = JSON.parse(nuevoPerfil)

        document.getElementById("nombre").value = nuevoPerfil.name;
        document.getElementById("apellido").value = nuevoPerfil.ape;
        document.getElementById("email").value = nuevoPerfil.email;
        document.getElementById("inputImg").value = nuevoPerfil.avatar;

        if(nuevoPerfil.avatar!= ""){

         document.getElementById("imgSrc").src = nuevoPerfil.avatar;
        }
    }

    boton.addEventListener("click", function () {

        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let email = document.getElementById("email");

        let validacion = true;

        if (nombre.value.trim() === "") {
            validacion = false
        }

        if (apellido.value.trim() === "") {
            validacion = false
        }

        if (email.value.trim() === "") {
            validacion = false
        }

        if (validacion) {

            localStorage.setItem(

                "perfil", JSON.stringify({

                    name: nombre.value,
                    ape : apellido.value,
                    email : email.value,
                    avatar : ImgValue.value
                }) 
 
            );
           
           window.location = "my-profile.html";
        } 

        
    });

});