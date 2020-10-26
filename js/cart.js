let arrayContenido = [];
const UYU = 40;
let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.15;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let totalAPagar = 0;


function diasDeEnvio() {

    let elements = document.getElementsByName("publicationType");
    let envio;

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    document.getElementById("diasQueDemora").innerHTML = envio
}


function eliminar(i) {
    if (arrayContenido.length > 1) {
        arrayContenido.splice(i, 1);
        showProduct(arrayContenido);

    } else {
        document.getElementById("contenidoCar").innerHTML =
            `           
                        <h3>No hay elementos en el carrito</h3>
                        <br>
                        <br><a class="ml-2" href="categories.html">agrega un artículo al carrito aquí</a>
                        
        `

    }
    calculoTotal()
    
}
// porcentajes

function calcProc() {

    let total = parseInt(document.getElementById("total").innerHTML);
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");


    let comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
    let totalCostToShow = (Math.round(total * comissionPercentage * 100) / 100);

    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
    console.log(total);

    totalAPagar = totalCostToShow + total;
    document.getElementById("total").innerHTML = totalAPagar;
    diasDeEnvio();

}



function calculoTotal() {

    let total = 0;

    let subs = document.getElementsByClassName("subtotal");

    for (let i = 0; i < subs.length; i++) {

        total += parseInt(subs[i].innerHTML);

    }

    document.getElementById("total").innerHTML = total;
    console.log(total);


    calcProc()
}


function calculoSubTotal(costo, i) {

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    let subtotal = cantidad * costo;

    document.getElementById(`subtotalProducts${i}`).innerHTML = subtotal;

    calculoTotal();

}


function showProduct(array) {

    let contenidoCarrito = "";

    for (let i = 0; i < array.length; i++) {

        let productos = array[i];

        if (productos.currency === "UYU") {
            productos.unitCost = productos.unitCost / 40;
        }
        let sub = productos.unitCost * productos.count;

        contenidoCarrito += `
            <tr>

                <td><img src="${productos.src}" width="150px"></td>

                <td class="">${productos.name}</td>

                <td class="">USD ${productos.unitCost}</td>
            
                <td class=""><input style="width: 60px;" onchange="calculoSubTotal(${productos.unitCost}, ${i})" type="number" id="cantidad${i}" value="${productos.count}" min="1"></td>

                <td class=""><span class="subtotal" id="subtotalProducts${i}" style="font-weight: bold;">${sub}</span></td>

                <td class=""><botton class="btn btn-danger" onclick="eliminar(${i})">X</botton></td>
             </tr>
        
        `
        document.getElementById("listado").innerHTML = contenidoCarrito;
    }
    calculoTotal();
}

function selectPago() {

    let pagoSelect = document.getElementsByName("formaPago");

    for (let i = 0; i < pagoSelect.length; i++) {
        if (pagoSelect[i].checked && pagoSelect[i].value == "1") {
            document.getElementById("datosTarjeta").classList.remove("d-none");
            document.getElementById("datosBanco").classList.add("d-none");
        }
        else if (pagoSelect[i].checked && pagoSelect[i].value == "2") {
            document.getElementById("datosTarjeta").classList.add("d-none");
            document.getElementById("datosBanco").classList.remove("d-none");
        }
    }
}


function validacionPago() {

    let numbTarjeta = document.getElementById("numTarjeta").value;
    let titularTarjeta = document.getElementById("titularTarjeta").value;
    let codigoSeguridad = document.getElementById("codigoSeguridad").value;
    let cuenta = document.getElementById("cuenta").value;
    let formaDePago = document.getElementsByName("formaPago")
    let pagoValido = true;

    for (let i = 0; i < formaDePago.length; i++) {
        if (formaDePago[i].checked && formaDePago[i].value == "1") {
            if (numbTarjeta.trim() == "" || titularTarjeta.trim() == "" || codigoSeguridad.trim() == "") {
                pagoValido = false;
            }
            else {
                pagoValido = true;
            }
        }
        else if (formaDePago[i].checked && formaDePago[i].value == "2") {
            if (cuenta.trim() == "") {
                pagoValido = false;
            }
            else {
                pagoValido = true;
            }
        }
    }
    return pagoValido;
}

function completo(){
    window.location = "cover.html"
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(CART_DESAFIO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayContenido = resultObj.data.articles;

            showProduct(arrayContenido);
            
        }

    });

    document.getElementById("goldradio").addEventListener("change", function () {
        comissionPercentage = 0.15;
        calculoTotal();


    });

    document.getElementById("premiumradio").addEventListener("change", function () {
        comissionPercentage = 0.07;
        calculoTotal();

    });

    document.getElementById("standardradio").addEventListener("change", function () {
        comissionPercentage = 0.05;
        calculoTotal();

    });

    // let radiosInput = document.getElementsByName("publicationType");
    // for(let i = 0 ; i< radiosInput.length; i++){
    //     radiosInput[i].addEventListener("change", function (){
    //         calcProc()
    //     })
    // }

    let tipoPago = document.getElementsByName("formaPago");
    for (let i = 0; i < tipoPago.length; i++) {
        tipoPago[i].addEventListener("change", function () {
            selectPago();
        });
    }

    // validacion form

    let form = document.getElementById("needs-validation");

    form.addEventListener("submit", function (e) {

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();

            if (validacionPago()) {

                document.getElementById("btnModal").classList.remove("btn-primary");
                document.getElementById("btnModal").classList.remove("btn-danger");
                document.getElementById("btnModal").classList.add("btn-outline-success");
                document.getElementById("alertError").innerHTML = `
              <br>
              <div class="alert-success alert alert-dismissible show" role="alert">            
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title">Forma de pago completa</h5>
              </div>
              `
            } else {
                e.preventDefault();
                e.stopPropagation();

                document.getElementById("btnModal").classList.remove("btn-primary");
                document.getElementById("btnModal").classList.remove("btn-success");
                document.getElementById("btnModal").classList.add("btn-danger");
                document.getElementById("alertError").innerHTML = `
                <br>
                <div class="alert-danger alert alert-dismissible show" role="alert"><br>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title">Debe complete la forma de pago!</h5><br>
                </div>
                
                 `

            }

        } else {
            if (validacionPago()) {
                document.getElementById("carrito").innerHTML = `
                <br>
                <div class="alert-success alert alert-dismissible show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="completo()";
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title">Se ha confirmado con extio!</h5>
                </div>

                `

            } else {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("btnModal").classList.remove("btn-primary");
                document.getElementById("btnModal").classList.remove("btn-success");
                document.getElementById("btnModal").classList.add("btn-danger");
                document.getElementById("alertError").innerHTML = `
                <br>
                <div class="alert-danger alert alert-dismissible show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title">Debe complete la forma de pago!</h5>
                </div>
                 `
            }


        };
        form.classList.add("was-validated")
    });

});