wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
wwd.addLayer(placemarkLayer);

var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);

placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

var position = new WorldWind.Position(55.0, -106.0, 100.0);
var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

placemark.label = "Placemark\n" +
    "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Lon " + placemark.position.longitude.toPrecision(5).toString();
placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(placemark);



//var position = new WorldWind.Position(10.0, -125.0, 800000.0);
//var config = {dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'};
//var colladaLoader = new WorldWind.ColladaLoader(position, config);
//
//colladaLoader.load("duck.dae", function (colladaModel) {
//    colladaModel.scale = 9000;
//    modelLayer.addRenderable(colladaModel);
//});


var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
//MODAL2_M_AER_OD
var layerName = "MOD_LSTD_CLIM_M";
function changeMap(choice){
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    layerName = choice;
    window.alert(choice);
    var createLayer = function (xmlDom) {
    var wms = new WorldWind.WmsCapabilities(xmlDom);
    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
    wwd.addLayer(wmsLayer);
};

var logError = function (jqXhr, text, exception) {
    console.log("There was a failure retrieving the capabilities document: " +
        text +
    " exception: " + exception);
};

$.get(serviceAddress).done(createLayer).fail(logError);
}

//var createLayer = function (xmlDom) {
//    var wms = new WorldWind.WmsCapabilities(xmlDom);
//    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
//    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
//    var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
//    wwd.addLayer(wmsLayer);
//};
//
//var logError = function (jqXhr, text, exception) {
//    console.log("There was a failure retrieving the capabilities document: " +
//        text +
//    " exception: " + exception);
//};
//
//$.get(serviceAddress).done(createLayer).fail(logError);



// wwd.addEventListener("mousemove", function (event) {

//     ... // potentially respond to the event

//     if (eventHandled) {
//         event.preventDefault();
//     }
// });

// if (event.defaultPrevented) {
//     return; // return without doing anything
// }
