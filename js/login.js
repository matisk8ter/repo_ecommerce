//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    BotonSubmit.addEventListener("click", (e) => {
        let usuario = document.getElementById("inputUsuario");
        let password = document.getElementById("inputPassword");
        let BotonSubmit = document.getElementById("BotonSubmit");
        


        var validacion = true;


        if (usuario.value.trim() === "") {
            
            validacion = false;
            
            alert("el usuario no debe tener espacios en blanco");
        }

        if(usuario.value.trim().length < 5){

            validacion = false;

            alert("el usuario debe tener mas de 5 caracteres")
        }
        if(password.value.trim().length < 5){

            validacion = false;

            alert("la contraseña debe tener mas de 5 caracteres")
        }
        

        if (password.value.trim() === "") {
            
            validacion = false;
            
            alert("la contraseña no debe tener espacios en blanco");
        }
        

        if (validacion) {
            localStorage.setItem(
                "User",
                JSON.stringify({ user: usuario.value })
            );
            console.log({ localStorage });
            window.location = "cover.html";
        }

    });
});