#!/bin/bash


# 2. ELSTAT data
tippecanoe -o trail.pmtiles --maximum-zoom=18 --drop-densest-as-needed --extend-zooms-if-still-dropping \
--generate-ids --force --name "Trail"  PATH.geojson


tippecanoe -o stops.pmtiles --maximum-zoom=16 --minimum-zoom=6 -B  6 --drop-densest-as-needed --extend-zooms-if-still-dropping \
 --generate-ids --force --name "Stops"  STOPS.geojson


static_path=/home/_wasteatlas/frontend/public/map
# Join tiles
tile-join --force -o pindus_trail.pmtiles trail.pmtiles stops.pmtiles


