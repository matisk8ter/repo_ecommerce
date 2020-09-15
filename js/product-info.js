var categoryProduct = {};
var comentariosArray = [];
var relatedProducts = {};

function showImagesProductos(array) {

    let htmlContentToAppend = "";
    let comentariosParaHtml = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];


        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("imagenesProductInfo").innerHTML = htmlContentToAppend;

    }


    for (let i = 0; i < comentariosArray.length; i++) {
        let puntos = "";
        let comment = comentariosArray[i];

        comentariosParaHtml += comment.user + "  dice : <br><br>"
        comentariosParaHtml += comment.description + "<br><br>"
        comentariosParaHtml += " fecha : " + comment.dateTime + "<br><br>"


        for (let i = 1; i <= comment.score; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }

        comentariosParaHtml += `<div style="text-align: right;">${puntos}</div><hr>`




        document.getElementById("contComent").innerHTML = comentariosParaHtml;

    }


}

function showProductRelated(array) {
    let htmlProductRelated = "";

    for (let item of array) {

        let prodRel = relatedProducts[item];

        htmlProductRelated += `
        <div class="card mr-3" style="width: 250px;">
          <a href="#" class=" custom-card">
            <img class="bd-placeholder-img card-img-top" src="${prodRel.imgSrc}">
            <h3 class="m-3">${prodRel.name}</h3>
            <div class="card-body">
              <p class="card-text">${prodRel.description}</p>
            </div>
          </a>
        </div>
        `;
    }
    document.getElementById("productoRelacionado").innerHTML = htmlProductRelated;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            relatedProducts = resultObj.data;

        }
        showProductRelated(categoryProduct.relatedProducts)

    });


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            comentariosArray = resultObj.data;
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            categoryProduct = resultObj.data;

            let nameProducto = document.getElementById("categoryName");
            let descripcionProductos = document.getElementById("descripcionProductos");
            let costProducto = document.getElementById("costProducto");

            nameProducto.innerHTML = categoryProduct.name;
            descripcionProductos.innerHTML = categoryProduct.description;
            costProducto.innerHTML = categoryProduct.currency + - + categoryProduct.cost



            showImagesProductos(categoryProduct.images, comentariosArray);
        }
    });






    let userLoged = localStorage.getItem("User");
    if (userLoged) {
        document.getElementById("contenido-texto").style = "display: inline-block";
    }

    document.getElementById("botonEnviar").addEventListener('click', () => {

        // fecha
        let now = new Date();
        let tiempo = `${now.getFullYear()} -${now.getMonth() + 1} -${now.getDate()} `;
        tiempo += `${now.getHours()}: ${now.getMinutes()}: ${now.getSeconds()} `;

        let star = document.querySelectorAll(".sr");
        let resultado = "";

        for (let radio of star) {
            if (radio.checked) {
                resultado = radio.value;
            }
        }


        let newComment = {
            score: parseInt(resultado),
            description: document.getElementById("textoComentario").value,
            user: JSON.parse(localStorage.getItem("User")).user,
            dateTime: tiempo
        };

        comentariosArray.push(newComment);

        showImagesProductos(categoryProduct, comentariosArray);
    });



});