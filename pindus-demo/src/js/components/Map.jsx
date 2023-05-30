import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl/dist/maplibre-gl.js';

import { MapboxLegendControl } from "@watergis/mapbox-gl-legend";
import '@watergis/mapbox-gl-legend/css/styles.css';
import "../../../node_modules/maplibre-gl/dist/maplibre-gl.css"


import { addBasemap } from './Map/basemaps';
import { mapStyle } from './Map/style';
import { legendTargets } from './Map/legend';

import * as pmtiles from "pmtiles";

import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer'
import { mapboxKey } from './Map/mapbox';
const transformRequest = (url, resourceType) => {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, mapboxKey)
  }

  // Do any other transforms you want
  return { url }
}


let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [center, setCenter] = useState({ lng: 21.923, lat: 39.639 });
  const [zoom, setZoom] = useState(5.8);

  const { basemap, terrain, bearing } = props;


  // Functions
  function setTerrain() {
    if (!map.current || !styleLoaded) return

    if (terrain) {
      map.current.setTerrain({
        source: 'terrainSource',
        exaggeration: 1.3
      });
    } else {
      map.current.setTerrain(null)
    }
  }
  function setBasemap() {
    if (!map.current || !styleLoaded) return
    addBasemap(map.current, basemap)
  }
  function addLegend() {
    console.log(`styleLoaded: ${styleLoaded}`)
    if (!map.current || !styleLoaded) return
    // add legend control with checkbox, and it will be shown as default
    map.current.addControl(new MapboxLegendControl(legendTargets, { showDefault: true }), 'bottom-right');
  }

  function addTerrainSource() {
    if (!map.current || !styleLoaded) return

    // Add terrain src
    map.current.addSource('terrainSource', {
      "url": `mapbox://mapbox.terrain-rgb`,
      "type": "raster-dem",
      tileSize: 512,
      maxzoom: 14,
    });
  };

  function addTrail(){
    if (!map.current || !styleLoaded) return
    map.current.addSource('pindustrail', {
      type: "vector",
      url: "pmtiles://pindus_trail.pmtiles",
      attribution: '<a href="https://terrapindus.gr">Terra Pindus</a>'
    });

    map.current.addLayer({
    "id": "trail",
    "type": "line",
    "source": "pindustrail",
    "source-layer": "PATH",
    "paint": {
      "line-color": "orange",
      "line-width": 3
    }
  });

  map.current.addLayer(
    {
      "id": "stops",
      "type": "circle",
      "source": "pindustrail",
      "source-layer": "STOPS",
      "paint": {
        "circle-radius": 6,
        "circle-stroke-width": 2,
        "circle-opacity": 0.8,
        "circle-stroke-color": "white",
        "circle-color": "#081424"
      },
    }
  )

  map.current.addLayer({
    "id": "stops-labels",
    "type": "symbol",
    "source": "pindustrail",
    "source-layer": "STOPS",
    "minzoom": 10,
    "layout": {
      "text-field": "{Name}",
      "text-font": [
        "NotoSans-Bold"
      ],
      "text-variable-anchor": [
        "bottom-left"
      ],
      "text-radial-offset": 0.2,
    },
    "paint": {
      "text-color": "#d97b52",
      "text-halo-color": "white",
      "text-halo-width": 1
    }
  })
  }

  function handleMapClick(e) {
    let latlng = e.lngLat;

    // flyTo provides a smooth transition
    // but depends on the map center, rather than
    // the current camera center
    map.current.flyTo({
      center: latlng,
      zoom: 15,
      speed: 0.5,
      curve: 1,
      pitch: 80
    });
  }

  // Effects
  useEffect(() => {
    setTerrain();
  }, [terrain]);

  useEffect(() => {
    setBasemap();
  }, [basemap]);

  useEffect(() => {
    if (map.current) {
      map.current.setBearing(bearing)
    }
  }, [bearing]);

  useEffect(() => {
    addTerrainSource();
    addTrail();
  }, [styleLoaded]);

  useEffect(() => {
    addLegend();
  }, [legendTargets, styleLoaded]);

  // Initialize Map
  useEffect(() => {
    if (map.current) return
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/pindustrail/cli90nrda00t101qufyz2figk', //mapStyle, //
      center: center,
      zoom: zoom,
      hash: true,
      preferWebGL: true,
      maxPitch: 85,
      bearing: bearing,
      transformRequest
    });


    map.current.addControl(new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }));
    map.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 200,
      unit: 'metric',
    }, 'bottomright'))
    map.current.addControl(
      new maplibregl.TerrainControl({
        source: "terrainSource",
        exaggeration: 1,
      })
    );
    window.map = map.current


    map.current.on('click', function (e) {
      handleMapClick(e)
    });

    map.current.on('idle', () => {
      setStyleLoaded(true);
    });

  }, [basemap, map.current]);




  return (
    <>
      <div ref={mapContainer} id="map" ></div>
    </>
  )
}
export default Map;