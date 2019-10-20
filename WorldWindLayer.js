var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

var placemarkLayer = new WorldWind.RenderableLayer();
wwd.addLayer(placemarkLayer);

var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.5,
    WorldWind.OFFSET_FRACTION, 1.0);

placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-yellow.png";

/*First Placemark*/
var KL_position = new WorldWind.Position(3.14, 101.73, 49);
var KL_placemark = new WorldWind.Placemark(KL_position, false, placemarkAttributes);

KL_placemark.label = "Kuala Lumpur \n" +
    "Latitude " + KL_placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Longitude " + KL_placemark.position.longitude.toPrecision(5).toString();
KL_placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(KL_placemark);

/*Second Placemark*/
var NY_position = new WorldWind.Position(40.82, -73.95, 20);
var NY_placemark = new WorldWind.Placemark(NY_position, false, placemarkAttributes);

NY_placemark.label = "New York \n" +
    "Latitude " + NY_placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Longitude " + NY_placemark.position.longitude.toPrecision(5).toString();
NY_placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(NY_placemark);

/*Third Placemark*/
var BJ_position = new WorldWind.Position(39.9, 116.41, 55);
var BJ_placemark = new WorldWind.Placemark(BJ_position, false, placemarkAttributes);

BJ_placemark.label = "Beijing \n" +
    "Latitude " + BJ_placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Longitude " + BJ_placemark.position.longitude.toPrecision(5).toString();
BJ_placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(BJ_placemark);

/*Fourth Placemark*/
var LD_position = new WorldWind.Position(51.54, -0.29,24);
var LD_placemark = new WorldWind.Placemark(LD_position, false, placemarkAttributes);

LD_placemark.label = "London \n" +
    "Latitude " + LD_placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Longitude " + LD_placemark.position.longitude.toPrecision(5).toString();
LD_placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(LD_placemark);

/*Fifth Placemark*/
var AUS_position = new WorldWind.Position(-33.87, 151.2,27);
var AUS_placemark = new WorldWind.Placemark(AUS_position, false, placemarkAttributes);

AUS_placemark.label = "Sydney \n" +
    "Latitude " + AUS_placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Longitude " + AUS_placemark.position.longitude.toPrecision(5).toString();
AUS_placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(AUS_placemark);

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

function changeMap(choice){
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    var layerName = choice;
    window.alert(choice);
    var createLayer = function (xmlDom) {
    var wms = new WorldWind.WmsCapabilities(xmlDom);
    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
    wwd.addLayer(wmsLayer);
    document.getElementById('legend').src='legend/'+choice+'.png';
        
};



var logError = function (jqXhr, text, exception) {
    console.log("There was a failure retrieving the capabilities document: " +
        text +
    " exception: " + exception);
};

$.get(serviceAddress).done(createLayer).fail(logError);

}
