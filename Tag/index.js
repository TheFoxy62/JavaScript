var APIURL = "https://127.0.0.1:8001/api";
var tagsAPIURL = APIURL + "/tags";

var infoZoneDiv = document.querySelector("#infoZoneDiv");
var editerButton = document.querySelector("#editerButton");
var selectedTagName = document.querySelector("#selectedTagName");
var selectedTag = document.querySelector("#selectedTag");

fetch(tagsAPIURL, { method: 'GET' })
    .then(response => response.json())
    .then(function (responseJSON) {
        console.log(responseJSON["hydra:member"])
        responseJSON["hydra:member"].forEach(tag => {
            let option = document.createElement("option")
            option.value = tag['id']
            option.innerHTML = tag['name']
            option.id = "option-" + tag["id"]
            selectedTag.appendChild(option)
        });
    });
var selectedTa = function () {
    selectedTagName.value = document.querySelector('#option-' + selectedTag.value).innerHTML
}
var editerTag = function () {
    var requestParameters = {
        "name": selectedTagName.value
    }
    fetch(tagsAPIURL + "/" + selectedTag.value, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestParameters)
    })
        .then((response) => {
            if (response.status == 200) {
                infoZoneDiv.textContent = "Modification du tag effectuée";
            } else {
                infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la modification du tag";
            }
        })
}
editerButton.addEventListener("click", editerTag);
selectedTag.addEventListener("change", selectedTa);