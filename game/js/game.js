import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
// import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import SceneView from "https://js.arcgis.com/4.18/@arcgis/core/views/SceneView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from "https://js.arcgis.com/4.18/@arcgis/core/config.js";
import {distance} from "https://js.arcgis.com/4.18/@arcgis/core/geometry/geometryEngineAsync.js";
import {project} from "https://js.arcgis.com/4.18/@arcgis/core/geometry/projection.js";
import GraphicsLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/GraphicsLayer.js";

const hide = function(selectors){
    document.querySelectorAll(selectors).forEach(elem => {
        elem.classList.add("hidden");
    });
}
const show = function(selectors){
    document.querySelectorAll(selectors).forEach(elem => {
        elem.classList.remove("hidden");
    });
}

let startStatus = null;
const locationResponses = localStorage.getItem('locationResponses')?JSON.parse(localStorage.getItem('locationResponses')) : {};

const tests = [
    [{
        type: "🌎 Hemisferio",
        title: "¿En qué hemisferio se sitúa el lugar a descubrir?",
        clue: "clues/location 1/1.jpg"
    },
    {
        type: "💎 Sustrato geológico",
        title: "¿Qué material geológico conforma el sustrato del lugar?",
        clue: "clues/location 1/2.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "La diversidad de su población",
        clue: "clues/location 1/3.jpg"
    },
    {
        type: "🌳 Recursos naturales",
        title: "¿Qué recursos naturales tiene el entorno?",
        clue: "clues/location 1/4.jpg"
    },
    {
        type: "⚠️ Riesgos",
        title: "¿Cuál es el principal riesgo ambiental en la zona?",
        clue: "clues/location 1/5.jpg"
    },
    {
        type: "🏞️ Paisaje cultivado",
        title: "El paisaje cultivado está conformado por...",
        clue: "clues/location 1/6.jpg"
    },
    {
        type: "🏙️ Paisaje urbano",
        title: "¿Un paseo por la ciudad?",
        clue: "clues/location 1/7.jpg"
    }],[{
        type: "🌎 Latitud",
        title: "¿En qué zona latitudinal se sitúa la siguiente localización?",
        clue: "clues/location 2/1.jpg"
    },
    {
        type: "🌧 Clima",
        title: "Previsión  horaria de lluvias...",
        clue: "clues/location 2/2.jpg"
    },
    {
        type: "💎 Sustrato geológico",
        title: "Rocas que conforman el sustrato geológico del lugar",
        clue: "clues/location 2/3.jpg"
    },
    {
        type: "🌊 Paisaje submarino",
        title: "A poca profundidad...",
        clue: "clues/location 2/4.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "Influencias culturales en el idioma del lugar...",
        clue: "clues/location 2/5.jpg"
    },
    {
        type: "⚠️ Riesgos",
        title: "Un importante riesgo ambiental en la zona",
        clue: "clues/location 2/6.jpg"
    }],
    [{
        type: "🌎 Hemisferio",
        title: "¿En qué hemisferio se sitúa el lugar a descubrir?",
        clue: "clues/location 3/1.jpg"
    },
    {
        type: "💰 Recursos económicos",
        title: "Y sus recursos económicos",
        clue: "clues/location 3/2.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "Es tierra de cantes de ida y vuelta. Escucha... (activa el 🔊)",
        clue: "https://www.youtube.com/embed/gCMkDUtV16Q?autoplay=1&mute=1&enablejsapi=1"
    },
    {
        type: "🏞️ Paisaje",
        title: "El paisaje del entorno",
        clue: "clues/location 3/4.jpg"
    },
    {
        type: "⚠️ Riesgos",
        title: "Uno de los principales riesgos ambientales de la región es...",
        clue: "clues/location 3/5.jpg"
    }],
    [{
        type: "🌎 Hemisferio y latitud",
        title: "¿En qué hemisferio y latitud se sitúa el lugar a descubrir?",
        clue: "clues/location 4/1.jpg"
    },
    {
        type: "🌧 Clima",
        title: "Efectos del clima en la zona. Escucha... (activa el 🔊)",
        clue: "https://www.youtube.com/embed/Bw0jfmZ8k94?autoplay=1&mute=1&enablejsapi=1"
    },
    {
        type: "👥 Toponímia y Población",
        title: "Un relato descriptivo (lee el siguiente texto y activa el 🔊)",
        clue: "https://www.youtube.com/embed/uB5uflsseQw?autoplay=1&mute=1&enablejsapi=1"
    },
    {
        type: "🌳 Recursos naturales y 💰 económicos",
        title: "Los recursos naturales ayudan a mantener y generar calor",
        clue: "clues/location 4/5.jpg"
    },
    {
        type: "🏞️ Paisaje",
        title: "El paisaje natural está conformado por tres elementos...",
        clue: "clues/location 4/6.jpg"
    },
    {
        type: "📌 Ubicación",
        title: "Un reto para los marineros",
        clue: "clues/location 4/2.jpg"
    }],
    [{
        type: "🌎 Hemisferio",
        title: "¿En qué hemisferio se sitúa el lugar a descubrir?",
        clue: "clues/location 5/1.jpg"
    },
    {
        type: "🌧 Clima",
        title: "El clima en la zona es... (activa el 🔊)",
        clue: "https://www.youtube.com/embed/0OybJ0mS5pw?autoplay=1&mute=1&enablejsapi=1"
    },
    {
        type: "🐻 Fauna",
        title: "Estos animales son casi domésticos en la zona...",
        clue: "clues/location 5/3.jpg"
    },
    {
        type: "🏞️ Paisaje natural",
        title: "¿Un paseo hacia el cabo entre los matorrales?",
        clue: "clues/location 5/4.jpg"
    },
    {
        type: "👥 Población y 💃 Cultura",
        title: "Población y culturas",
        clue: "clues/location 5/5.jpg"
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
            clueEl.src = evt.target.dataset.clue;
            const clueDivEl = document.querySelector("#activeClue div");
            clueDivEl.classList.add("active");
        }else{
            clueEl = document.querySelector("#activeClue iframe");
            clueEl.src = "";
            const clueAEl = document.querySelector("#activeClue a");
            const clueImgEl = document.querySelector("#activeClue img");
            clueImgEl.src = clueAEl.href =  evt.target.dataset.clue;
            clueAEl.classList.add("active");
        }


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
    document.querySelector(".card-flip").classList.add("hidden");
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
    document.querySelector(".card-flip").classList.remove("hidden");
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
    localStorage.setItem('teamMembers', document.getElementById("teamMembers").value);
    localStorage.setItem('startTime', new Date());

    // console.log('user.length=',localStorage.getItem('user').length);
    // console.log('teamName.length=',localStorage.getItem('teamName').length);
    // console.log('teamMembers.length=',localStorage.getItem('teamMembers').length);
    // console.log('startTime.length=',localStorage.getItem('startTime').length);
    resultsTable.applyEdits({
        addFeatures: [
            {
                attributes:{
                    captain: localStorage.getItem('user'),
                    teamName: localStorage.getItem('teamName'),
                    teamMembers: localStorage.getItem('teamMembers'),
                    startTime: localStorage.getItem('startTime')
                }
            }
        ]
    }).then(res => {
        console.log("Equipo registrado!, ID: ", res.addFeatureResults[0].objectId)
        localStorage.setItem('teamObjectId', res.addFeatureResults[0].objectId);
    });
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




const loadFinalResults = function(){

    const end = moment(new Date(localStorage.getItem('endTime')));
    var duration = moment.duration(end.diff(startTime));
    // debugger
    let factor = 1;

    // Logic for old radio button
    // if(localStorage.getItem('testFinal') === "Magallanes"){
    //     factor = 0.8;
    // }

    // Logic for new input text using string similarity
    const testFinal = JSON.parse(localStorage.getItem('testFinal'));
    if(testFinal.isSimilar){
        factor = 0.8;
    }



    const accumulatedError = parseInt(localStorage.getItem('accumulatedError'))
    const teamName = localStorage.getItem('teamName');
    document.getElementById("finalPoints").innerHTML = `
        <h1 style="font-size: 2rem;text-align: center;margin-bottom: 2rem;">
        Enhorabuena equipo ${teamName},
        ¡habéis terminado la partida!
        </h1>
        <iframe src="https://giphy.com/embed/l4q8cJzGdR9J8w3hS" width="" height="" frameborder="0" class="giphy-embed" allowfullscreen="" style="float: right;width: 290px;margin: 0px 0 1rem 1rem;"></iframe>
        <p>En resumen:</p>
        <ul>
        <li>A la hora de localizar las ubicaciones habéis cometido un <strong>error acumulado de: ${(parseInt(accumulatedError))} km</strong></li>
        <li>Habéis tardado: <strong>${parseInt(duration.asSeconds())} segundos</strong></li>
        <li><strong>${factor === 0.8? 'Habéis': 'No habéis'}</strong> acertado la última pregunta</li>
        </ul>
        <p>
        Recordemos la fórmula a aplicar:
        </p>
        <blockquote>
        Penalización = Error acumulado (Distancia en KM) x Tº empleado para la prueba (en segundos) x Factor de
        ponderación (0.8 si se acierta si la última pregunta, 1 sino)
        </blockquote>
        <p>
        Por tanto: Error de localización (${accumulatedError} km) x Tº empleado (${parseInt(duration.asSeconds())} s) x Factor de
        ponderación (${factor}):
        </p>
        <p class="big">
        ${(+parseFloat(parseInt(accumulatedError)) * parseInt(duration.asSeconds()) * factor).toFixed(2)}
        </p>
        <p>
        Recordad, la entrega de premios será el viernes 9 de Abril a las 23:00. Guarda el siguiente enlace...
        </p>
        <p>
        ¡Gracias por participar!, si tenéis ganas de seguir jugando:
        </p>
        <p class="text-center">
        <a href="../" class="btn btn-primary">En la página principal encontraréis más juegos</a> |
        Descargar respuestas (pendiente)
        </p>
    `;
}


const validResponses = [
    "Magallanes",
    "Magayanes",
    "Elcano",
    "La vuelta al mundo",
    "Circunvalación",
    "Circunavegación",
    "Expedición"
];
const inputTxt = document.getElementById("inputTxt");

//Send last question
function responseLastQuestion(e) {
    if (e.preventDefault) e.preventDefault();

    //Stop timer
    clearTimeout(startStatus)

    localStorage.setItem('endTime', new Date());

    // Logic for string similarity

    const inputValue = inputTxt.value.toLocaleLowerCase();

    const testFinal = {
        inputValue,
        validResponses: []
    };
    validResponses.forEach(validStr => {

        validStr = validStr.toLocaleLowerCase()
        const distance = stringSimilarity.compareTwoStrings(validStr, inputValue);
        if (distance >= .8) {
            testFinal.isSimilar = true;
            testFinal.validResponses.push({
                validStr,
                distance: distance.toFixed(2)
            })
        }
    });

    localStorage.setItem('testFinal', JSON.stringify(testFinal));

    resultsTable.applyEdits({
        addFeatures: [
            {
                attributes:{
                    captain: localStorage.getItem('user'),
                    teamName: localStorage.getItem('teamName'),
                    teamMembers: localStorage.getItem('teamMembers'),
                    startTime: localStorage.getItem('startTime'),
                    locationResponses: localStorage.getItem('locationResponses'),
                    accumulatedError: localStorage.getItem('accumulatedError'),
                    endTime: localStorage.getItem('endTime'),
                    testFinal: localStorage.getItem('testFinal')
                }
            }
        ]
    }).then(res => {
        console.log("Datos resgistrados!, id: ", res.addFeatureResults[0].objectId)
    });

    show("#finalResult");
    hide("#finalForm, #content-game");
    loadFinalResults();

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
window.startTimer = function(){
    const end = moment(new Date());
    var duration = moment.duration(end.diff(startTime));
    var h = parseInt(duration.asHours());
    var m = parseInt(duration.asMinutes());
    var s = parseInt(duration.asSeconds())%60;

    document.querySelector("#team-time span").innerText = h+"h "+m+"m "+s+"s";
    startStatus = setTimeout(function(){startTimer()},1000);
}


const selectNextLocation = function(){
    const nextLocation = document.querySelectorAll(`#locations li:not(.deactivate)`)[0];
    if(nextLocation){
        nextLocation.click()
        return true;
    }else{
        console.log("Formulario final")
        return false;
    }
};

const hideLocations = function(){
    hide("#clueText, #activeClue, #locations, #cluesDetails, #viewDiv, #responseBox, #team-data");
}

const showLastQuestion = function(cond){
    if(cond){
        // Show last question
        hide("#game-buttons :not(.hidden)");
        show("#finalForm")
        document.getElementById("viewDiv").classList.remove("active")
    }else{
        // Hide last question
        hide("#finalForm");
    }

};

const showResults = function(){

    show('#finalResult');
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

const tableService = "https://services.arcgis.com/Q6ZFRRvMTlsTTFuP/arcgis/rest/services/Terra_Incognita_public_service/FeatureServer/0";
const resultsTable = new FeatureLayer(tableService)

layer.queryFeatures().then(function(results){

    if(results.features.length < 1){
        console.warn("No se pudieron cargar las respuestas");
    }else{
        window.clueResponse = results.features;
        const numLocalizacionesUI = document.querySelectorAll("#clues > ol").length
        if(numLocalizacionesUI !== results.features.length){
            console.warn("No concididen las localizaciones en la interfaz con las localizaciones en el servicio")
        }
        // console.log("Respuestas cargadas", results.features)

        // debugger
        // Deactivate previous responses (if refresh)
        const keys = Object.keys(locationResponses);

        if(clueResponse.length === keys.length){
            if(!localStorage.getItem('testFinal')){
                hideLocations();
                showLastQuestion(true);
            }else{
                hideLocations();
                loadFinalResults();
                showResults();
            }
        }else{
            keys.forEach(id => {
                document.querySelector(`#locations [data-id="${parseInt(id)}"]`).classList.add("deactivate")
            })
            selectNextLocation();
            show("#locations, #cluesDetails, #game-buttons, #clueText, #activeClue, #team-data")

        }
    }
});



view.on("click", function(event) {

    const activeLocation = document.querySelector("#locations .active").dataset.id;
    document.getElementById("viewDiv").setAttribute("data-location", activeLocation);

    let activeClue = parseInt(document.querySelector("#locations .active").dataset.id)

    if(typeof(clueResponse) === undefined){
        alert("Vuelve a intentarlo en unos segundos")
        return false;
    }

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

            locationResponses[activeClue] = event.mapPoint.toJSON();

            // Save responses to local storage
            localStorage.setItem('locationResponses', JSON.stringify(locationResponses));

            if(accumulatedError === 0 && localStorage.getItem('accumulatedError')){
                accumulatedError = parseInt(localStorage.getItem('accumulatedError'))
            }
            accumulatedError += parseInt(res);
            localStorage.setItem('accumulatedError', accumulatedError);
            const errorEl = document.querySelector("#team-error span");

            if(accumulatedError !== parseInt(res)){
                errorEl.innerText = `${accumulatedError} km (+${parseInt(res)} km)`
            }else{
                errorEl.innerText = `${accumulatedError} km`
            }
            errorEl.classList.add("highlight");
            setTimeout(function(){
                errorEl.classList.toggle("highlight");
            }, 3000)



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
            let moreLocations;
            if(activeEl.nextSibling && !activeEl.classList.contains("deactivate")){
                activeEl.nextSibling.click();
            }else{
                //Buscamos otra no activated
                moreLocations = selectNextLocation()

            }

            if(!moreLocations){
                hideLocations();
                showLastQuestion(true);
            }else{
                document.getElementById("returnToClues").click();
            }



        })
    }

});

document.querySelectorAll(".card-flip > .card").forEach(elem => {
    elem.addEventListener('click', function(evt){
        // debugger
        if(evt.target.nodeName === 'DIV'){
            document.querySelector(".card-flip").classList.toggle("active");
        }
    })
})
