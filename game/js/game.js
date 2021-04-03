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
      clueText = document.getElementById("clueText"),
      cluesDetailsEl = document.getElementById("cluesDetails");


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

// Adding dynamic behaviour to locations menu
const locations = document.querySelectorAll("#locations li");
Array.from(locations).forEach(function(el) {
    el.addEventListener('click', function(evt){
        // console.log(evt.target)
        locationsActive = document.querySelector("#locations .active")
        locationsActive.classList.remove("active");
        evt.target.classList.add("active");
        cluesActive = document.querySelector("#clues ol.active")
        cluesActive.classList.remove("active");
        newCluesEl = document.querySelector("#clues-location-" + evt.target.dataset.id)
        newCluesEl.classList.add("active");
        newCluesEl.firstChild.click()
        // cluesEl.className = `location-${evt.target.dataset.id}`;
        // debugger
        cluesDetailsEl.className = `location-${evt.target.dataset.id}`;

        //cluesEl
    });
});

// Adding dynamic behaviour to clues menu
const clues = document.querySelectorAll("#clues li");
Array.from(clues).forEach(function(el) {
    el.addEventListener('click', function(evt){
        var viewDivEl = document.querySelector("#viewDiv");
        var clueEl;
        var clue = evt.target.dataset.clue;

        cluesActive = document.querySelector("#clues .active li.active")
        if(cluesActive){
            cluesActive.classList.remove("active");
        }
        evt.target.classList.add("active");

        activeClueActive = document.querySelector("#activeClue .active")

        if(activeClueActive){
            activeClueActive.classList.remove("active");
        }

        if(clue !== undefined){
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
        }else{
            viewDivEl.classList.add("active");
        }

        clueText.innerHTML = `
            <small>Sobre la localización ${parseInt(evt.target.dataset.index)+1}:</small><br>
            ${evt.target.dataset.title}
        `;
    });
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

cluesActive = document.querySelector("#clues .active")
cluesActive.firstChild.click()

var counter = 0;

function startTime()
{

    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    // add a zero in front of numbers<10
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('txt').innerHTML=h+":"+m+":"+s;
    t=setTimeout(function(){startTime()},500);
}

function checkTime(i)
{
    if (i<10){
        i = "0" + i;
    }
    return i;
}
