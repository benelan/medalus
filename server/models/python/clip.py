# Created on: 1/11/2020
#  
# Description:
# Based on user input of a county,  
# a final suitability analysis raster is being clipped and then
# converted into a Featureclass
# Two fields (name and year) are added into this feature class and further calculated and then the
# feature class is exported as a GeoJSON
# ---------------------------------------------------------------------------

# importing necesssary modules 
import arcpy
import os
import re
import sys 
from datetime import datetime

# Check out any necessary licenses

# Set overwrite
arcpy.env.overwriteOutput = True

# Set workspsace. This is the master folder location 

# arcpy.env.workspace = r"C:\Users\ben10334\Desktop\medalus\server\models"
# out_folder_path = r"C:\Users\ben10334\Desktop\medalus\server\models"
arcpy.env.workspace = r"C:\Users\jose9489\Desktop\medalus\server\models"
out_folder_path = r"C:\Users\jose9489\Desktop\medalus\server\models"

outgeo_name = "finalDatabase.gdb"
outGeoJSONFolder_name = "geoJSONs"

#checking and creating a filegeodatabase where the clipped rasters and subsequent feature class will be created
if arcpy.Exists("finalDatabase.gdb"):
    print ("The geodatabase for output raster and feature classes exists")
else:
    arcpy.CreateFileGDB_management(out_folder_path, outgeo_name)

# checking and creating a folder in the master folder location to store GeoJSONS
# create folder for geoJSONs 
if arcpy.Exists("geoJSONs"):
    print ("The folder for output GeoJSONs exists")
else:
    arcpy.CreateFolder_management(out_folder_path, outGeoJSONFolder_name)
    

#Set workspsace to a filegeodatabase with the final suitability rasters for each year and the county feature class
#arcpy.env.workspace = r"C:\Users\ben10334\Desktop\medalus\server\models\Hackathon_Medalaus.gdb"
arcpy.env.workspace = r"C:\Users\jose9489\Desktop\medalus\server\models\Hackathon_Medalaus.gdb"
#arcpy.env.workspace = r"../Hackathon_Medalaus.gdb"
print (arcpy.env.workspace)

#This is the place in the script where use input come in for the name of County. This will be triggered by the user selection in the App. At this moment user type it out.
countyName = 'Orange' #sys.argv[1]

print(countyName)
#A function to remove spaces in the county name so that the select layer by attribute does not fail. We had to strip the spaces in name to make sure data is stored correctly in a geodatabase
def removeSpaces (countyName):
    rightName = (re.sub (r'\s+', '', countyName))
    return rightName
    
rightCountyName = removeSpaces(countyName)

#SQL expression for Select Layer by Attribute tool
expression =  "Finalname='" + rightCountyName + "'"
#print (expression)

#Creation of feature layer from Select Layer by Attribute tool
featLayer = arcpy.management.SelectLayerByAttribute("Counties", "NEW_SELECTION", expression, None)
print('featLayer')
#Using os module to get the paths right for outputs
#print("This is outworkspace_path")
out_workspace_path = os.path.dirname(arcpy.env.workspace)
#print(out_workspace_path)

#print("This is outworkspace")
out_workspace = os.path.join(out_workspace_path, outgeo_name)
#print (out_workspace)

#Creating a list of all suitability rasters for each year in the geodatabase for further processing 
rasters = arcpy.ListRasters("*", "ALL")

#looping through all the rasters 
for raster in rasters:
        #print (raster)
        #using arcpy describe to get the name property of raster dataset
        desc = arcpy.Describe(raster)
        #print (desc.name)
        
        #figuring out the year from the raster name
        yName = desc.name[-4:]
        #name of raster 
        finalNameRas = rightCountyName + "_" + yName
        
        #print (finalNameRas)
        #print("This is the final destination of raster")
        #path of raster to be stored in the geodatabase
        finalDestRas = os.path.join(out_workspace, finalNameRas)
        print(finalDestRas)
        
        #clipping the raster based on the user selected/picked county
        arcpy.management.Clip(raster, "-124.40970799437 32.5341521020081 -114.131199635143 42.0095138983309", finalDestRas, featLayer, "-3.402823e+38", "ClippingGeometry", "NO_MAINTAIN_EXTENT")
        print ("raster is done")
        
        #name of feature class
        finalNameFC = rightCountyName + "_" + yName + "FC"
        #print("this is final destination of FC")
        
        #path of feature class to be stored in the geodatabase
        finalDestFC = os.path.join(out_workspace, finalNameFC)
        #print(finalDestFC)
        
        #conversion of raster to polygon
        arcpy.conversion.RasterToPolygon(finalDestRas, finalDestFC, "SIMPLIFY", "Value", "SINGLE_OUTER_PART", None)
        #print ("FC is done")
        
        #adding  two fields Name and Year
        arcpy.management.AddField(finalDestFC, "Name", "TEXT", None, None, None, '', "NULLABLE", "NON_REQUIRED", '')
        arcpy.management.AddField(finalDestFC, "Year", "TEXT", None, None, None, '', "NULLABLE", "NON_REQUIRED", '')
        #print ("Adding Fields is done")
        
        # calculating the two fields using cursor
        with arcpy.da.UpdateCursor(finalDestFC, ["Name", "Year"]) as cursor:
            for row in cursor:
                row [0] = countyName  #name of county in the field
                row [1] = datetime.strptime(yName ,'%Y')    #date in the field 
                cursor.updateRow(row)
        #print ("Calculating Fields is done")
                
        #path of the folder to store the GeoJSONs
        out_workspaceGeo = os.path.join(out_workspace_path, outGeoJSONFolder_name)
        finalDestGeoJson = os.path.join(out_workspaceGeo, finalNameRas)
        
        #converting the feature class to a geojson
        arcpy.conversion.FeaturesToJSON(finalDestFC,  finalDestGeoJson , "NOT_FORMATTED", "NO_Z_VALUES", "NO_M_VALUES", "GEOJSON", "WGS84", "USE_FIELD_NAME")
        #print ("GeoJSON is done")

print ("Finished")
