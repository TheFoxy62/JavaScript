var APIURL = "https://127.0.0.1:8001/api";
var categoriesAPIURL = APIURL + "/categories";

var infoZoneDiv = document.querySelector("#infoZoneDiv");
var createButton = document.querySelector("#createButton");
var editerButton = document.querySelector("#editerButton");
var deleteButton = document.querySelector("#deleteButton");
var selectedCategoryName = document.querySelector("#selectedCategoryName");
var selectedCategory = document.querySelector("#selectedCategory");

/*Création d'une Catégory  POST*/
var createCategory = function (event) {
    var requestBody = {
        "name": categoryName.value
    };
    fetch(categoriesAPIURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(function (response) {
        return response.json()
    })
        .then(function (responseJSON) {
            var resultDiv = document.createElement("div");
            if (responseJSON["@type"] == "hydra:Error") {
                console.log("Une erreur est survenue : " + responseJSON["hydra:description"])
                resultDiv.innerHTML = "Une erreur est survenue";
            }
            else {
                console.log(responseJSON)
                resultDiv.innerHTML = "Catégorie créée";
            }
            document.body.appendChild(resultDiv);
        })
}

/*SelectedCategory GET*/
fetch(categoriesAPIURL, {
    method: 'GET'
})
    .then(response => response.json())

    .then(function (responseJSON) {
        console.log(responseJSON["hydra:member"])
        responseJSON["hydra:member"].forEach(category => {
            let option = document.createElement("option")
            option.value = category['id']
            option.innerHTML = category['name']
            option.id = "option-" + category["id"]
            selectedCategory.appendChild(option)
        });
    });

var selectedCat = function () {
    selectedCategoryName.value = document.querySelector('#option-' + selectedCategory.value).innerHTML
    // console.log(selectedCategory.value.textContent)
}

/*Éditer Catégory PUT*/
var editerCategory = function () {
    var requestParameters = {
        "name": selectedCategoryName.value
    }
    fetch(categoriesAPIURL + "/" + selectedCategory.value, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestParameters)
    })
        .then((response) => {
            if (response.status == 200) {
                infoZoneDiv.textContent = "Modification de la catégorie effectuée";
            } else {
                infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la modification de la catégorie";
            }
        })
}

/*Delete Catégory  DELETE*/
var deleteCategory = function() {
    fetch(categoriesAPIURL + "/" + selectedCategory.value, {
        method: "DELETE",   
    }).then((response) => {
        if(response.status == 204) {
            infoZoneDiv.textContent = "Catégorie supprimée";
        }
        else {
            infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la création de la catégorie";
        }
    })
}

createButton.addEventListener("click", createCategory);
editerButton.addEventListener("click", editerCategory);
deleteButton.addEventListener("click", deleteCategory);
selectedCategory.addEventListener("change", selectedCat);