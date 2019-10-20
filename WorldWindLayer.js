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
    var createLayer = function (xmlDom) {
    var wms = new WorldWind.WmsCapabilities(xmlDom);
    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
    wwd.addLayer(wmsLayer);
    document.getElementById('legend').src='legend/'+choice+'.png';
        if(choice == 'MOD_LSTAD_M'){
    document.getElementById('Description').innerHTML='Land surface temperature is how hot or cold the ground feels to the touch. An anomaly is when something is different from average. These maps show where Earth’s surface was warmer or cooler in the daytime than the average temperatures for the same week or month from 2001-2010. So, a land surface temperature anomaly map for May 2002 shows how that month’s average temperature was different from the average temperature for all Mays between 2001 and 2010.';
        }
        if(choice == 'AURA_UVI_CLIM_M'){
            document.getElementById('Description').innerHTML='The UV Index is a measure of the intensity of ultraviolet (UV) rays from the Sun. Some exposure to the Sun’s rays is beneficial as it helps our bodies produce vitamin D. But too much exposure to UV rays can have harmful effects. In the short-term, skin exposed to UV rays can burn. A ‘sunburn’ can happen within minutes or over the course of several hours. Over the long term, UV exposure can result in premature aging, skin cancer, and damage to your eyes. The UV index climatology shows how much UV exposure a person could get on average during each month. The index is a scale of 0 to 16+, with 0 representing minimal UV exposure risk and values higher than 11 posing an extreme risk. To inform people about the risk one can expect from UV rays, the National Weather Service and the U.S. Environmental Protection Agency (EPA) have developed a daily UV Index, which is based partly on this climatology.';
        }
        if(choice == 'AMSRE_SSTAn_M'){
            document.getElementById('Description').innerHTML='Sea surface temperature is the temperature of the top millimeter of the ocean\'s surface. An anomaly is when something is different from normal, or average. A sea surface temperature anomaly is how different the ocean temperature at a particular location at a particular time is from the normal temperatures for that place. For example, a global map of sea surface temperature anomaly for May 2006 would show where the temperatures in May 2006 were warmer, cooler, or the same as other Mays in previous years. Sea surface temperature anomalies can happen as part of normal ocean cycles or they can be a sign of long-term climate change, such as global warming.';
        }
        if(choice == 'MCD12C1_T1'){
            document.getElementById('Description').innerHTML='Maps help us understand where things are. Scientists use satellites to make maps of many different things on Earth to help them understand our world and how our world is changing. Judging by what the land surface looks like, scientists organized Earth into 17 different categories. Some examples of different types of land surface are cities, farm lands, forests, deserts, and so forth. Using satellite observations, scientists mapped where on Earth each of these 17 land surface categories can be found. The different colors on this map show the locations of each type of land surface. Scientists are monitoring how these land cover types change over time.';
        }
        if(choice == 'SEDAC_POP'){
            document.getElementById('Description').innerHTML='This map shows how many people live in different areas on Earth. The map is divided into numerous small boxes, called "grids." Each grid box is about 1 kilometer long by one kilometer wide, and it is color coded to show how many people live there. Lighter areas have fewer people. The red dots scattered across most countries show cities, where many people live in a small area.';
        }
        if(choice == 'MODAL2_M_AER_OD'){
            document.getElementById('Description').innerHTML='Tiny solid and liquid particles suspended in the atmosphere are called aerosols. Examples of aerosols include windblown dust, sea salts, volcanic ash, smoke from fires, and pollution from factories. These particles are important to scientists because they can affect climate, weather, and people\'s health. Aerosols affect climate by scattering sunlight back into space and cooling the surface. Aerosols also help cool Earth in another way -- they act like "seeds" to help form clouds. The particles give water droplets something to cling to as the droplets form and gather in the air to make clouds. Clouds give shade to the surface by reflecting sunlight back into space. People\'s health is affected when they breathe in smoke or pollution particles. Such aerosols in our lungs can cause asthma or cancer of other serious health problems. But scientists do not fully understand all of the ways that aerosols affect Earth\'s environment. To help them in their studies, scientists use satellites to map where there were large amounts of aerosol on a given day, or over a span of days.';
        }

        
};



var logError = function (jqXhr, text, exception) {
    console.log("There was a failure retrieving the capabilities document: " +
        text +
    " exception: " + exception);
};

$.get(serviceAddress).done(createLayer).fail(logError);

}
