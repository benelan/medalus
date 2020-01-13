# Medalus
Hack The Map 4 project by Ben Elan, Biraja Nayak, Kavish Ghime, Jose Banuelos, and Tarun Jaiswal.
We proactively prepare communities to identify environmentally sensitive areas and prime them for success using The Science of Where.

## Desertification
Desertification refers to land degradation caused by climate change and human activity in arid, semi-arid, and dry sub-humid areas. The aim of this application is to map desertification-sensitive areas.  A total of 11 indices that affect desertification processes were identified and analyzed using a geographic information system. The Mediterranean desertification and land use approach (MEDALUS), which has been widely used in the Mediterranean regions due to its simplicity, flexibility and rapid implementation strategy, was applied. 

The Mediterranean desertification and land use (MEDALUS) approach identifies environmentally sensitive areas (ESAs) through the Environmentally Sensitive Area Index (ESAI). The ESAI is implemented by considering several variables, i.e. physical (soil quality), environmental (vegetation quality), climatic (climate quality), and social (management quality) indicators. This index can be used to obtain an in-depth understanding of the parameters causing desertification threats at a certain locations. This approach is simple, robust, widely applicable, acceptable to new indicators and parameters and can be adjusted to several scale levels. 

## Getting Started
To run the web app you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the client folder of the app and type:

```
npm install
npm run build
```

Then, navigate to the server folder and type:

```
npm install
npm run prod
```

The built client application will be served along with the server. If you are not on the Esri internal network, you will need to add the [ArcPy](https://pro.arcgis.com/en/pro-app/arcpy/main/arcgis-pro-arcpy-reference.htm) python path in your Environment Variables. Then make sure the urls in the [map](https://github.com/benelan/medalus/blob/master/client/src/components/EsriMap.js) and [form](https://github.com/benelan/medalus/blob/master/client/src/components/UserInputForm.js) are pointed to the server on your machine instead of mine.

## Data
These are the instructions for if you want to use your own data.

### Data Input
We followed the below model to collect required data to determine environmentally sensitive areas. 
We have considered California as our study area and collected raster sample data accordingly. 

![Medalus Method](https://github.com/benelan/medalus/blob/master/client/public/MEDALUS.jpeg)

Data for soil Depth, Albedo, Texture, drainage and Slope are collected from the webmap https://ess.maps.arcgis.com/home/webmap/viewer.html?webmap=27135181707846b5b405ee615d5a66d1 

Data for climate and precipitation for year 2010 to 2018 collected as Ascii format from http://www.prism.oregonstate.edu/recent/  

Data for vegetation and land cover downloaded for California state from https://nrcs.app.box.com/v/gateway/folder/22222601427 

For Livestock and Grazing the data was downloaded from https://www.sciencebase.gov/catalog/item/5b69f7c3e4b006a11f776ce1 

Population data was downloaded from https://www.worldpop.org/geodata/summary?id=6545 

### Data Processing

In ArcGIS Pro, clip California data using “Clip Raster” geoprocessing tool using California State boundary polygon.  

Example of python command for raster clip is as follows: 

`arcpy.management.Clip("usa_ppp_2020.tif", "-124.409721007 32.5341569920001 -114.131211994 42.0095189850001", r"E:\hackathon_jan2020\ForHackathnon.gdb\ca_population_2020", "States", "-9.999900e+04", "ClippingGeometry", "NO_MAINTAIN_EXTENT") `

Again, using ArcGIS Pro, reclassify individual data to the predetermine classes as per the California area using geoprocessing tool “Reclassify”. Please change the classification parameter and file geodatabase name as per your data and then follow the below steps: 

Classification reference tables is [here](https://github.com/benelan/medalus/blob/master/client/public/Desertfication_Index_tables.xlsx).  Most of the classification ranges are derived from classification method called “Quantile” from ArcGIS pro symbology. All layers from Climate, Livestock and slope, Texture, Depth from Soil are classified using Quantile methods. 

**Data Classification**
Soil data reclassification using the below python command: 

Soil Albedo 

`arcpy.ddd.Reclassify("casoilalbedo", "VALUE", "0 20 1;20 25 2;25 64 3", r"E:\hackathon_jan2020\Final\Soil.gdb\Albedo", "NODATA")` 

Soil Depth 

`arcpy.ddd.Reclassify("casoildepth", "VALUE", "0 26 4;26 46 3;46 81 2;81 300 1", r"E:\hackathon_jan2020\Final\Soil.gdb\Depth", "NODATA")` 

Soil Slope 

`arcpy.ddd.Reclassify("CASlope", "VALUE", "0 6 1;6 18 2;18 35 3;35 90 4", r"E:\hackathon_jan2020\Final\Soil.gdb\Slope", "NODATA")` 
 
Soil Drainage 

`arcpy.ddd.Reclassify("USASoilsDrainageClass_Clip", "Value", "0 1 2;2 3 1;4 6 3", r"E:\hackathon_jan2020\Final\Soil.gdb\Drainage", "NODATA")`

Soil Texture 

`arcpy.ddd.Reclassify("soiltextureCA", "T_USDA_TEX_CLASS", "loam 1;'sandy clay loam' 1;'clay (light)' 3;'sandy loam' 1", r"E:\hackathon_jan2020\Final\Soil.gdb\Texture", "NODATA")` 



Vegetation data reclassification using the below python command: 

Plant Cover 

`arcpy.ddd.Reclassify("nlcd_ca_utm11.tif", "Value", "11 3;12 3;21 1;22 2;23 3;24 3;31 3;41 1;42 1;43 1;52 2;71 1;81 2;82 2;90 2;95 1", r"E:\hackathon_jan2020\Final\Vegetation.gdb\plantCover", "NODATA")` 

Drought Resistance 

`arcpy.ddd.Reclassify("nlcd_ca_utm11.tif", "Value", "11 3;12 3;21 2;22 2;23 3;24 3;31 3;41 2;42 1;43 2;52 2;71 2;81 2;82 1;90 3;95 3", r"E:\hackathon_jan2020\Final\Vegetation.gdb\droughtResistance", "NODATA")` 

Erosion Protection 

`arcpy.ddd.Reclassify("nlcd_ca_utm11.tif", "Value", "11 1;12 1;21 2;22 2;23 2;24 2;31 3;41 1;42 1;43 1;52 2;71 2;81 2;82 1;90 1;95 1", r"E:\hackathon_jan2020\Final\Vegetation.gdb\erosionProtection", "NODATA")` 

 
 
Climate data reclassification using the below python command: 

Precipitation 

`arcpy.ddd.Reclassify("p_cali_2014", "Value", "0 7.690000 3;7.690000 21.800000 2;21.800000 164.140000 1", r"E:\hackathon_jan2020\Final\climate.gdb\Precipitation2018", "NODATA")` 



Livestock data reclassification using the below python command: 

Grazing 

`arcpy.ddd.Reclassify("gra_dist_Clip_1", "VALUE", "0.002820 0.602510 1;0.602510 1.202200 2;1.202200 1.801890 3", r"E:\hackathon_jan2020\Final\Livestock.gdb\grazingPressure", "NODATA")` 

Population 

`arcpy.ddd.Reclassify("ca_population_2020", "VALUE", "0 1;0 14.828471 2;14.828471 1890.630005 3", r"E:\hackathon_jan2020\Final\Livestock.gdb\populationDensity", "NODATA")` 

**Weighted Overlay**

After reclassification, create indexes for all 4 classes as SQI, VQI, CQI and MQI using the “Weighted Overlay” geoprocessing tool. SQI will have all reclassified soil data as input and similarly for the other indexes and respective layers. The sample python command is: 

`out_raster = arcpy.sa.WeightedOverlay(r"('E:\hackathon_jan2020\Final\Soil.gdb\Albedo' 20 'Value' (1 1; 2 2; 3 3; NODATA NODATA); 'E:\hackathon_jan2020\Final\Soil.gdb\Depth' 20 'Value' (1 1; 2 2; 3 3; 4 4; NODATA NODATA); 'E:\hackathon_jan2020\Final\Soil.gdb\Drainage' 20 'Value' (1 1; 2 2; 3 3; NODATA NODATA); 'E:\hackathon_jan2020\Final\Soil.gdb\Slope' 20 'Value' (1 1; 2 2; 3 3; 4 4; NODATA NODATA); 'E:\hackathon_jan2020\Final\Soil.gdb\Texture' 20 'Value' (1 1; 3 3; NODATA NODATA));1 5 1"); out_raster.save(r"E:\hackathon_jan2020\Final\Soil.gdb\SQI")` 

Output raster for all 4 indexes with legends for your reference:
![SQI](https://github.com/benelan/medalus/blob/master/client/public/SQI.PNG)
![CQI](https://github.com/benelan/medalus/blob/master/client/public/CQI.PNG)
![MQI](https://github.com/benelan/medalus/blob/master/client/public/MQI.PNG)
![VQI](https://github.com/benelan/medalus/blob/master/client/public/VQI.PNG)

Then create Environmentally Sensitive Area Index (ESAI) from those 4 indexes created in steps 3 as input using “Weighted Overlay” geoprocessing tool. We created ESAI for 9 years of precipitation data. This data is published to an image service to be rendered by the JavaScript API. The sample python command is: 

`out_raster = arcpy.sa.WeightedOverlay(r"('E:\hackathon_jan2020\Final\climate.gdb\CQI2018' 25 'Value' (1 1; 2 2; 3 3; NODATA NODATA); 'E:\hackathon_jan2020\Final\Livestock.gdb\MQI' 25 'Value' (1 1; 2 2; 3 3; NODATA NODATA); 'E:\hackathon_jan2020\Final\Soil.gdb\SQI' 25 'Value' (1 1; 2 2; 3 3; NODATA NODATA); 'E:\hackathon_jan2020\Final\Vegetation.gdb\VQI' 25 'Value' (2 2; 3 3; NODATA NODATA));1 3 1"); out_raster.save(r"E:\hackathon_jan2020\Final\Desertification.gdb\Desertificate2018")`

Output raster ESAI with legends for your reference:

![ESAI](https://github.com/benelan/medalus/blob/master/client/public/Desertificate2018.PNG)

**Use in Application**

Once the ESAI data is ready, copy the gdb to the [server/models](https://github.com/benelan/medalus/tree/master/server/models) directory. Change the arcpy script in [server/models/python/clip.py](https://github.com/benelan/medalus/blob/master/server/models/python/clip.py) to paths specific to your machine. Then, follow the instructions in Getting Started to get the app up and running. Once the app is running, you can choose a county, ie "Yuba" or "San Diego" and the node server will call the arcpy to do following steps: 

- It will clip final classified raster data as per county selected. 
- Then it will create polygon feature class 
- GeoJSONs are created from that polygon feature class for all the years available in the gdb
- Finally, the GeoJSONs are merged and used as an input for the Time Slider widget to observe data changes during year 2010 to 2018 as per our sample input data for this application. 

 
 ## Reference
 We followed published articles on MEDALUS as per below:
 
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6069148/
https://www.researchgate.net/publication/285161552_An_approach_to_desertification_mapping_using_MEDALUS_methodology_in_Iran
https://www.tandfonline.com/doi/full/10.1080/21580103.2019.1667880

## Built With
* [ArcGIS Desktop](https://www.esri.com/en-us/arcgis/products/arcgis-pro/resources) - Data Processing
* [ArcGIS JavaScript API](https://developers.arcgis.com/javascript/) - Data Visualization
* [esi-loader](https://github.com/Esri/esri-loader) - Esri Module Loader
* [Node](https://nodejs.org/en/) - Backend
* [Express](https://expressjs.com/) - Backend Framework
* [React](https://reactjs.org/) - Frontend Framework
* [Reactstrap](https://reactstrap.github.io/) - Bootstrap for React
* [MobX](https://mobx.js.org/) - State Managment
* [Mobx React](https://github.com/mobxjs/mobx-react) - MobX for React
* [Formik](https://github.com/jaredpalmer/formik) - Forms for React
* [react-scroll](https://github.com/fisshy/react-scroll) - Scroll Animation
* [react-lazy-hero](https://github.com/danistefanovic/react-lazy-hero) - Fancy Picture
* [axios](https://github.com/axios/axios) - REST Requests
* [@mapbox/geojson-merge](https://github.com/mapbox/geojson-merge) - Merge GeoJSONs
