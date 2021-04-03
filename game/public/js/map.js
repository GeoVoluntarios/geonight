import ArcGISMap from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from "https://js.arcgis.com/4.18/@arcgis/core/config.js";
import {distance} from "https://js.arcgis.com/4.18/@arcgis/core/geometry/geometryEngineAsync.js";
import {project} from "https://js.arcgis.com/4.18/@arcgis/core/geometry/projection.js";
import Graphic from "https://js.arcgis.com/4.18/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/GraphicsLayer.js";

// esriConfig.apiKey = "AAPKb2ab4249fa8b48218ea1d3f993d86e30GG1q0cy5ivCIPXKbo-wo-fj3tO-ZFJp0hq7tTriKC-DUaM8vud4GclOQGtSoAq7D";

const map = new ArcGISMap({
    basemap: "topo"
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-3,40],
    zoom: 3
});

var urlParams = new URLSearchParams(window.location.search);

const testNum = urlParams.has('testNum')? parseInt(urlParams.get('testNum')) : 1;
let response = '';

const layer = new FeatureLayer({
    url: "https://services.arcgis.com/Q6ZFRRvMTlsTTFuP/arcgis/rest/services/geonightplaces/FeatureServer",
    definitionExpression: `"Order" = ${testNum}`
});

const query = {
    where: `"Order" = ${testNum}`
}
layer.queryFeatures().then(function(results){
    if(results.features.length < 1){
        console.warn("No existe esa pregunta");
        response = -1;
    }else{
        response = results.features[0];
    }
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

view.on("click", function(event) {
    if(response != -1){
        console.log("event = ", event)
        const evtProjected = project(response.geometry, {wkid:event.mapPoint.spatialReference.wkid})
        const promise = distance(evtProjected, event.mapPoint, "kilometers")
        promise.then(function(res){
            const txtResponse = `
            <br>Respuesta a la pregunta ${testNum}: <br>
            <strong>Distancia a ${response.attributes.Name} -> ${res}km</strong>.<br>
            <a href="${window.location.href.split("?testNum")[0]}?testNum=${testNum + 1}">Ver la pregunta ${testNum+1}</a>
            `;
            console.log(txtResponse);
            document.getElementById('response').innerHTML = txtResponse;

            map.add(layer)
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

            const fullExtent = [response, pointGraphic];
            view.goTo(fullExtent)
            // .then(function () {
            //     // if (!view.extent.contains(fullExtent))
            //     //     view.zoom -= 1;
            // });

            auth0 && auth0.getUser().then(user => {
                console.log("User=", user)
            })


        })
    }
});