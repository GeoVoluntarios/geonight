import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
// import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import SceneView from "https://js.arcgis.com/4.18/@arcgis/core/views/SceneView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from "https://js.arcgis.com/4.18/@arcgis/core/config.js";
import {distance} from "https://js.arcgis.com/4.18/@arcgis/core/geometry/geometryEngineAsync.js";
import {project} from "https://js.arcgis.com/4.18/@arcgis/core/geometry/projection.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/GraphicsLayer.js";



const tests = [
    [{
        type: "🌎 Hemisferio",
        title: "se encuentra en este hemisferio",
        clue: "clues/location 1/1.jpg"
    },
    {
        type: "💎 Geología",
        title: "el material geológico que conforma el sustrato del lugar",
        clue: "clues/location 1/2.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "y la diversidad de su población",
        clue: "clues/location 1/3.jpg"
    },
    {
        type: "🌳 Recursos naturales",
        title: "los recursos naturales de su entorno",
        clue: "clues/location 1/4.jpg"
    },
    {
        type: "⚠️ Riesgos",
        title: "y su zona sufren principalmente de los siguientes riesgos ambientales",
        clue: "clues/location 1/5.jpg"
    },
    {
        type: "🏞️ Paisaje (natural)",
        title: "su paisaje cultivado está conformado por...",
        clue: "clues/location 1/6.jpg"
    },
    {
        type: "🏙️ Paisaje (humano)",
        title: "y el aspecto de la ciudad",
        clue: "clues/location 1/7.jpg"
    }],[{
        type: "🌎 Hemisferio",
        title: "se encuentra en este hemisferio",
        clue: "clues/location 2/1.jpg"
    },
    {
        type: "🌧 Clima",
        title: "y el clima en la zona, observa la previsión horaria de lluvias",
        clue: "clues/location 2/2.jpg"
    },
    {
        type: "💎 Geología",
        title: "las rocas que conforman el sustrato geológico del lugar",
        clue: "clues/location 2/3.jpg"
    },
    {
        type: "🏞️ Paisaje (natural)",
        title: "y su fondo marino",
        clue: "clues/location 2/4.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "su población y mestizaje. Lee el siguiente texto sobre el idioma y las influencias culturales en el lugar",
        clue: "clues/location 2/5.jpg"
    },
    {
        type: "⚠️ Riesgos",
        title: "y el principal riesgo ambiental en la zona",
        clue: "clues/location 2/6.jpg"
    }],
    [{
        type: "🌎 Hemisferio",
        title: "se encuentra en este hemisferio",
        clue: "clues/location 3/1.jpg"
    },
    {
        type: "💰 Economía",
        title: "y sus recursos económicos",
        clue: "clues/location 3/2.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "su población y cultura",
        clue: "https://www.youtube.com/embed/iywqEfwqYhQ"
    },
    {
        type: "🏞️ Paisaje (natural)",
        title: "el paisaje del entorno",
        clue: "clues/location 3/4.jpg"
    },
    {
        type: "⚠️ Riesgos",
        title: "sus riesgos ambientales",
        clue: "clues/location 3/5.jpg"
    }],
    [{
        type: "🌎 Hemisferio",
        title: "se encuentra en este hemisferio",
        clue: "clues/location 4/1.jpg"
    },
    {
        type: "🌧 Clima",
        title: "característica del clima en la zona...",
        clue: "clues/location 4/2.jpg"
    },
    {
        type: "👥 Toponimia y Población",
        title: "toponímia y población. Lee el siguiente texto",
        clue: "https://www.youtube.com/embed/fRESy0env-U"
    },
    {
        type: "🌳 Recursos naturales y 💰 Economía",
        title: "recursos naturales y economía",
        clue: "clues/location 4/4.jpg"
    },
    {
        type: "🏞️ Paisaje (natural)",
        title: "El paisaje natural está conformado por ….",
        clue: "clues/location 4/5.jpg"
    }],
    [{
        type: "🌎 Hemisferio",
        title: "🌎 ¿En que hemisferio se sitúa el lugar a descubrir?",
        clue: "clues/location 5/1.jpg"
    },
    {
        type: "🌧 Clima",
        title: "El clima en la zona...",
        clue: "https://www.youtube.com/embed/xuAYjP3jcVs"
    },
    {
        type: "🏞️ Paisaje (natural)",
        title: "¿Un paseo por el paisaje natural del entorno?",
        clue: "clues/location 5/3.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "Población y culturas",
        clue: "clues/location 5/4.jpg"
    }]

];

const locationsEl = document.getElementById("locations"),
cluesEl = document.getElementById("clues");



tests.forEach(function(elem, index){

    // Creating question list
    const li = document.createElement("li");

    li.innerHTML = "Localización "+ (index + 1);
    li.setAttribute("data-id", index);
    locationsEl.appendChild(li);
    if(index === 0){
        li.classList.add("active");
    }

    // Printing clues for this question
    var ol = document.createElement("ol");
    ol.id = `clues-location-${index}` ;
    if(index === 0){
        ol.classList.add("active");
    }
    elem.forEach(function(elem, i){

        var li = document.createElement("li");
        if(i === 0){
            li.classList.add("active");
        }
        li.innerHTML = elem.type ;
        li.setAttribute("data-clue", elem.clue);
        li.setAttribute("data-title", elem.title);
        li.setAttribute("data-index", index);
        ol.appendChild(li);
    });

    // var li = document.createElement("li");
    // var btn = document.createElement("button");
    // btn.innerHTML = "Responder"
    // li.appendChild(btn)
    // ol.appendChild(li);


    cluesEl.appendChild(ol);
});

const locations = document.querySelectorAll("#locations li"),
cluesDetailsEl = document.getElementById("cluesDetails");

// Adding dynamic behaviour to locations menu
Array.from(locations).forEach(function(el) {
    el.addEventListener('click', function(evt){
        if(!el.classList.contains("deactivate")){
            const locationsActive = document.querySelector("#locations .active")
            locationsActive.classList.remove("active");
            evt.target.classList.add("active");
            const cluesActive = document.querySelector("#clues ol.active")
            cluesActive.classList.remove("active");
            const newCluesEl = document.querySelector("#clues-location-" + evt.target.dataset.id)
            newCluesEl.classList.add("active");
            newCluesEl.firstChild.click()
            cluesDetailsEl.className = `location-${evt.target.dataset.id}`;
        }
    });
});

const clueText = document.getElementById("clueText");

// Adding dynamic behaviour to clues menu
const clues = document.querySelectorAll("#clues li");
Array.from(clues).forEach(function(el) {
    el.addEventListener('click', function(evt){
        var viewDivEl = document.querySelector("#viewDiv");
        var clueEl;
        var clue = evt.target.dataset.clue;

        let cluesActive = document.querySelector("#clues .active li.active")
        if(cluesActive){
            cluesActive.classList.remove("active");
        }
        evt.target.classList.add("active");

        let activeClueActive = document.querySelector("#activeClue .active")

        if(activeClueActive){
            activeClueActive.classList.remove("active");
        }


        if(clue.indexOf("youtube.com") !== -1){
            clueEl = document.querySelector("#activeClue iframe");
        }else{
            clueEl = document.querySelector("#activeClue img");
        }
        clueEl.src = evt.target.dataset.clue;
        clueEl.classList.add("active");
        if(viewDivEl.classList.contains("active")){
            viewDivEl.classList.remove("active");
        }

        clueText.innerHTML = `
        <small>Sobre la localización ${parseInt(evt.target.dataset.index)+1}:</small><br>
        ${evt.target.dataset.title}
        `;
    });
});

const showMap = () => {
    var viewDivEl = document.querySelector("#viewDiv");
    var responseBoxEl = document.querySelector("#responseBox");


    document.getElementById("activeClue").classList.add("hidden");
    document.getElementById("clueText").classList.add("hidden");
    document.getElementById("locations").classList.add("hidden");
    document.getElementById("cluesDetails").classList.add("hidden");
    document.getElementById("locatePlace").classList.add("hidden");
    document.getElementById("returnToClues").classList.remove("hidden");
    viewDivEl.classList.add("active");
    responseBoxEl.classList.remove("hidden");

    viewDivEl.style.position="relative";
}

const showClues = () => {
    var viewDivEl = document.querySelector("#viewDiv");
    var responseBoxEl = document.querySelector("#responseBox");

    document.getElementById("activeClue").classList.remove("hidden");
    document.getElementById("clueText").classList.remove("hidden");
    document.getElementById("locations").classList.remove("hidden");
    document.getElementById("cluesDetails").classList.remove("hidden");
    document.getElementById("locatePlace").classList.remove("hidden");
    document.getElementById("returnToClues").classList.add("hidden");
    viewDivEl.classList.remove("active");
    responseBoxEl.classList.add("hidden");

    viewDivEl.style.position="absolute";
}

let response = '';

document.getElementById("locatePlace").addEventListener('click', function(evt, obj){
    showMap();


});

document.getElementById("returnToClues").addEventListener('click', function(evt){
    showClues();
});
//Dinamically create color palette style

var seq = palette('mpn65', tests.length);
var style = document.createElement('style');
seq.forEach((color, i) => {

    style.innerHTML += `
    .location-${i} li{ background-color: #${color}; }
    .location-${i} li:not(.active),
    div.location-${i}{ background-color: #${color}80; }

    #locations li:nth-child(${(i+1)}){ background-color: #${color}; }
    `;
})
document.getElementsByTagName('head')[0].appendChild(style);

// var activateFirstClue = function() {

// }
let cluesActive = document.querySelector("#clues .active")
cluesActive.firstChild.click()



//Register team name
function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    localStorage.setItem('teamName', document.getElementById("teamName").value);
    localStorage.setItem('startTime', new Date());
    updateUI()
    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('registerName');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}


//Send last question
function responseLastQuestion(e) {
    if (e.preventDefault) e.preventDefault();



    const end = moment(new Date());
    var duration = moment.duration(end.diff(startTime));
    let factor = 1;
    if(document.querySelector('[name="testFinal"]:checked').value === "Magallanes"){
        factor = 1.2;
    }
    document.getElementById("finalPoints").innerText = 100000000000 - (accumulatedError * duration.asSeconds()) * factor
    document.getElementById("finalResult").classList.remove("hidden");
    document.getElementById("finalForm").classList.add("hidden")


    //100.000 - (Error acumulado (Distancias en KM) x Tº empleado para la prueba (en segundos)) * Factor
    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
}

var form = document.querySelector('#finalForm form');
if (form.attachEvent) {
    form.attachEvent("submit", responseLastQuestion);
} else {
    form.addEventListener("submit", responseLastQuestion);
}

// Timer
var counter = 0;


window.startTimer = function(){
    const end = moment(new Date());
    var duration = moment.duration(end.diff(startTime));
    var h = parseInt(duration.asHours());
    var m = parseInt(duration.asMinutes());
    var s = parseInt(duration.asSeconds())%60;

    document.querySelector("#team-time span").innerText = h+"h "+m+"m "+s+"s";
    setTimeout(function(){startTimer()},1000);
}

/*INIT MAP*/

// esriConfig.apiKey = "AAPKb2ab4249fa8b48218ea1d3f993d86e30GG1q0cy5ivCIPXKbo-wo-fj3tO-ZFJp0hq7tTriKC-DUaM8vud4GclOQGtSoAq7D";

const map = new ArcGISMap({
    basemap: "topo"
});

const view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-3,40],
    zoom: 3
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

const layer = new FeatureLayer({
    url: "https://services.arcgis.com/Q6ZFRRvMTlsTTFuP/arcgis/rest/services/Kayak_mundial/FeatureServer",
});

layer.queryFeatures().then(function(results){

    if(results.features.length < 1){
        console.warn("No se pudieron cargar las respuestas");
    }else{
        window.clueResponse = results.features;
        const numLocalizacionesUI = document.querySelectorAll("#clues > ol").length
        if(numLocalizacionesUI !== results.features.length){
            console.warn("No concididen las localizaciones en la interfaz con las localizaciones en el servicio")
        }
        console.log("Respuestas cargadas", results.features)
    }
});

view.on("click", function(event) {

    const activeLocation = document.querySelector("#locations .active").dataset.id;
    document.getElementById("viewDiv").setAttribute("data-location", activeLocation);

    let activeClue = parseInt(document.querySelector("#locations .active").dataset.id)

    let response = clueResponse.find(el => {
        if(el.attributes.Orden === activeClue){
            console.log("Encontrado! = ", el.toJSON())
        }

        return el.attributes.Orden === activeClue
    });

    console.log("event = ", event)
    if(!response){
        console.error("Faltan los datos de esta localización en la BD");
        return false;

    }

    if(event.mapPoint){
        //Ensure no click on space
        const evtProjected = project(response.geometry, {wkid:event.mapPoint.spatialReference.wkid})
        const promise = distance(evtProjected, event.mapPoint, "kilometers")
        promise.then(function(res){
            const txtResponse = `
            <br>Respuesta a la pregunta ${activeClue}: <br>
            <strong>Distancia a ${response.attributes.Name} -> ${res}km</strong>.<br>
            `;

            accumulatedError += parseInt(res);
            document.querySelector("#team-error span").innerText = accumulatedError + "km"


            console.log(txtResponse);
            // document.getElementById('response').innerHTML = txtResponse;

            // map.add(layer)
            /*
            //Display graphic
            graphicsLayer.removeAll()

            const point = {
                type: "point",
                x: event.mapPoint.x,
                y: event.mapPoint.y,
                spatialReference: { wkid: 102100}
            };

            const simpleMarkerSymbol = {
                type: "simple-marker",
                color: [226, 119, 40],
                outline: {
                    color: [255, 255, 255],
                    width: 1
                }
            };

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });

            graphicsLayer.add(pointGraphic);
            */
            /*

            //Focus to extent
            const fullExtent = [response, pointGraphic];
            view.goTo(fullExtent)
            */

            // .then(function () {
            //     // if (!view.extent.contains(fullExtent))
            //     //     view.zoom -= 1;
            // });

            // auth0 && auth0.getUser().then(user => {
            //     console.log("User=", user)
            // })
            console.log("Save response")
            // debugger
            let activeEl = document.querySelector(`#locations [data-id="${activeClue}"]`);
            activeEl.classList.add("deactivate");
            let locationsCompleted = false;
            if(activeEl.nextSibling && !activeEl.classList.contains("deactivate")){
                activeEl.nextSibling.click();
            }else{
                //Buscamos otra no activated
                const nextLocation = document.querySelectorAll(`#locations li:not(.deactivate)`)[0]
                if(nextLocation){
                    nextLocation.click()
                }else{
                    console.log("Formulario final")
                    locationsCompleted = true
                }

            }

            if(locationsCompleted){
                document.querySelectorAll("#clueText, #activeClue, #locations, #cluesDetails, #viewDiv, #responseBox").forEach(elem => {
                    elem.classList.add("hidden");
                });
                document.querySelector("#game-buttons :not(.hidden)").classList.add("hidden")
                document.getElementById('finalForm').classList.remove("hidden")
                document.getElementById("viewDiv").remove("active")

            }else{
                document.getElementById("returnToClues").click();
            }



        })
    }

});
