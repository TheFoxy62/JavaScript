const btn = document.getElementById("btn");
const url = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,racist,sexist,explicit";

async function getJoke() {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        joke(data)
    } catch (e) {
        console.log(e.message)
    }
}
getJoke()

function joke(message) {
    if(message.type != "twopart"){
        document.getElementById("jokeplacerholder").innerHTML = message.joke
    }
    else {
        document.getElementById("jokeplacerholder").innerHTML = message.setup + "<br />" + "réponse : " + message.delivery }
    
    }

btn.addEventListener("click",getJoke);