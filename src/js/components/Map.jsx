import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl/dist/maplibre-gl.js';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import "../../../node_modules/maplibre-gl/dist/maplibre-gl.css"

function Map() {




  const mapContainer = useRef(null);
  const map = useRef(null);
  const [center, setCenter] = useState({ lng: 23.061283454082968, lat: 38.17137059297082 });
  const [zoom, setZoom] = useState(5.8);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: '/map_conf.json',
      center: center,
      zoom: zoom,
      hash: true
    });

    map.current.addControl(new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }));

    map.current.addControl(new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    }));

    map.current.addControl( new maplibregl.ScaleControl({
      maxWidth: 200,
      unit: 'metric',
      }, 'bottomright'))

    map.current.addControl(
      new maplibregl.TerrainControl({
        source: "terrainSource",
        exaggeration: 1,
      })
    );

    // Add event listener for when a user finishes drawing a polygon
    map.current.on('draw.create', (e)=>{updateGeoJSON(e,'Selection created succesfully')});
    map.current.on('draw.update', (e)=>{updateGeoJSON(e,'Selection updated succesfully')});
    map.current.on('draw.delete', (e)=>{updateGeoJSON(e,'Selection deleted succesfully')});


    window.map = map.current

  }, []);





  function updateGeoJSON(e, msg) {
    const data = e.features[0]
    console.log(data)
    toast(msg)
  }







  return (
    <>
      <div ref={mapContainer} id="map"></div>

      <ToastContainer position="bottom-right"
        autoClose={5000}
        theme="colored"
        pauseOnFocusLoss />
    </>
  )

}

export default Map;