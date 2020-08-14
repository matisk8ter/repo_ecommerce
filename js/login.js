//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    BotonSubmit.addEventListener("click", (e) => {
        let usuario = document.getElementById("inputUsuario");
        let password = document.getElementById("inputPassword");
        let BotonSubmit = document.getElementById("BotonSubmit");
        let alertaDom = document.getElementById("alertaDom");


        var validacion = true;


        if (usuario.value.trim() === "") {
            usuario.classList.add("invalid");
            validacion = false;
            alertaDom.classList.remove("alertNone");
            alert("el usuario no debe tener espacios en blanco y menos de 5 caracteres");
        }
        else {
            usuario.classList.remove("invalid");
        }


        if (password.value.trim() === "") {
            password.classList.add("invalid");
            validacion = false;
            alertaDom.classList.remove("alertNone");
            alert("la contraseña no debe tener espacios en blanco y menos 5 caracteres");
        }
        else {
            password.classList.remove("invalid");
        }

        if (validacion) {
            localStorage.setItem(
                "User",
                JSON.stringify({ user: usuario })
            );
            console.log({ localStorage });
            window.location = "cover.html";
        }

    });
});