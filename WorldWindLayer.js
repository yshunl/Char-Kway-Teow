var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));



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
