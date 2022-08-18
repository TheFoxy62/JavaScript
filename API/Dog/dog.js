window.onscroll = function () {
	// On Récupére le nombre de pixels de différence en tre le haut de la page et ce que l'ecran affiche.
	let windowScroll = Math.floor(document.documentElement.scrollTop);
	// On fait référence au bouton permettant de remonter en haut de page.
	let refTopButton = document.getElementById('top-button');
	if (windowScroll >= 10) { // Si on a scrollé de plus de 10 pixels.
		refTopButton.style.visibility = "visible" // On rends le bouton visible.
		refTopButton.style.opacity = "1"; // On rends le bouton opaque pour qu'il apparaisse doucement.
	} else { // Sinon
		refTopButton.style.opacity = "0"; // On réduit l'opacité du bouton à 0.
		refTopButton.style.visibility = "hidden"; // et on le cavhe pour qu'il ne soit plus cliquable.
	}
}

function capitalizeString (string)
{
	let resultStr = ""; // On initialise la string qui sera retournée avec une chaine de caractères vide.
	let stringCopy = string.split(""); // On fait une copie de la string passée en paramètre.
	stringCopy.shift(); // On enlève la première lettre de la copie de string.
	resultStr = string.split("")[0].toUpperCase() + stringCopy.join(""); // On prend le premier caractère de la string en majusucule, puis on concatène les autres lettres venant de la copie.
	return resultStr;

	
}

let imageArr = []; // On initialise notre tableau qui contiendra tous les liens vers les images.

async function loadBreeds () 
{
	const response = await fetch("https://dog.ceo/api/breeds/list/all"); // On récupére les données via l'API

	if (response.ok) { // Si le fetch a fonctionné
		const json = await response.json(); // On transforme ce qu'on a récupéré en JSON
		const message = json.message; // On resupère le message dans le JSON
		// console.log(message);

		const refRaceSelector = document.getElementById("race-selector"); // On trouve la balise select dans le DOM.

		//console.log(Object.keys(message));

		Object.keys(message).forEach((race) => { // On itère toutes les races dans le message
			if (message[race].length === 0) { // Les races sont des tableau, s'il n'y a pas d'élémént dans ce tableau, on peut afficher juste la clé dans une option 
				refRaceSelector.innerHTML += "<option>" + capitalizeString(race) + "</option>";
			} else { // Si on a au moins un element dans le tableau, alors
				Object.keys(message[race]).forEach((subrace) => { // On itère a travers les subrace
					refRaceSelector.innerHTML += "<option>" + capitalizeString(message[race][subrace]) + " " + capitalizeString(race) + "</option>"; // On affiche "race (subrace)" dans une option
					// console.log(race, message[race][subrace]);
				})
			}
		});

	} else {
		console.error("HTTP-Error: " + response.status); // Si le fetch produit une error, on affiche le statut dans la console
	}
}

async function loadImages(e) {
	// L'URL pour acceder a l'API doit etre sur le modèle https://dog.ceo/api/breed/race/subrace/images/random
	let raceInfo;
	// Si on a une value vide, on affecte "affenpischer" car c'est la première race de la liste.
	if (e.value === "") {
		raceInfo = ["affenpinscher"];
	} else { // Sinon on prends la race sélectionnée en minuscule
		raceInfo = e.value.toLowerCase().split(" ");
	}

	// console.log(raceInfo);

	let link = "https://dog.ceo/api/breed/"; // On commence l'URL pour accéder à l'API.
	if (raceInfo.length === 1) // Si on a qu'un seul mot on cherche la race uniquement.
	{
		link += raceInfo[0];
	} else { // Si on en a deux, on cherche avec la subrace.
		link += raceInfo[1] + "/" + raceInfo[0];
	}
	link += "/images"; // On fini l'URL vers l'API.

	const response = await fetch(link); // On récupère les liens vers les images correspondant a la race séléctionnée.
	const refNbSelector = document.getElementById('nb-selector'); // On récupère le selecteur ou l'on choisit le nombre d'images a afficher.
	let count = 1;

	if (response.ok) {
		const json = await response.json();
		const message = json.message;
		refNbSelector.innerHTML = "<option value=\"all\">Toutes</option>"; // On initialise avec la première option qui sert a selectionner toutes les photos.
		// console.log(message);
		// console.log(message.length);
		imageArr = message; // On stocke les URL des images dans notre tableau.
		message.forEach((link) => { // On crée autant de choix que de photos disponibles pour la race selectionnée
			refNbSelector.innerHTML += "<option>" + count + "</option>";
			count++;
		});
		
	}
}

function updateImages () // On affiche les images selon les paramètres que l'on a séléctionné.
{
	const refNbSelector = document.getElementById('nb-selector');
	const refRandomCkbx = document.getElementById('random-tag');
	const refRaceSelector = document.getElementById("race-selector");
	const refImgDiv = document.getElementById('image-container');

	let raceInfo;
	if (refRaceSelector.value === "") {
		raceInfo = ["affenpinscher"];
	} else {
		raceInfo = refRaceSelector.value.toLowerCase().split(" ");
	}

	// On (ré)initialise la zone où l'on affiche les images.
	refImgDiv.innerHTML = "";

	if (refNbSelector.value === "all") { // Si on a choisi d'afficher toutes les images.
		let count = 1;
		imageArr.forEach((link) => {
			refImgDiv.innerHTML += "<img src=\"" + link + "\" alt=\"" + raceInfo + count + "\">";
			count++;
		});
	} else {
		for (let i = 0; i < parseInt(refNbSelector.value); i++) {
			let index = i;
			if (refRandomCkbx.checked) {
				index = Math.floor(Math.random() * imageArr.length);
			}
			refImgDiv.innerHTML += "<img src=\"" + imageArr[index] + "\" alt=\"Image n°" + i + "\">"
		}
	}
}

function loader ()
{
	loadBreeds();
	let refRaceSelector = document.getElementById("race-selector");
	// console.log(refSelector);
	loadImages(refRaceSelector);
}