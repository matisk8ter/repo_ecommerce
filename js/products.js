// nuevo filtro

const ORDER_ASC_BY_PRECIO = "MAYOR";
const ORDER_DESC_BY_PRECIO = "MENOR";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;


function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRECIO) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];


        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

            if (buscar == undefined || category.name.toLowerCase().indexOf(buscar) != -1 || category.description.toLowerCase().indexOf(buscar) != -1) {
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item-action">
                    <div class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                            <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                            </div>
                                <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4>`+ category.name + " - USD " + category.cost + `</h4>
                                    <p> `+ category.description + ` </p>
                                                
                                    </div>
                                    <small class="text-muted">` + category.soldCount + ` artículos</small>
                                    </div>
                
                                </div>
                            </div>
                    </div>
                </a>
                `
            }


        }

        document.getElementById("contenido").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_PRECIO, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRECIO);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_SOLDCOUNT);
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });

    document.getElementById("buscador").addEventListener("input", function(e){

        buscar = document.getElementById("buscador").value.toLowerCase();

        showCategoriesList();
    })

});



