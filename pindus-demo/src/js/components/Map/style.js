
import { layers } from "./layers"


const mapStyle = {
    version: 8,
    glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
    sources: {
      "protomaps": {
        type: "vector",
        url: "pmtiles://https://r2-public.protomaps.com/protomaps-sample-datasets/protomaps-basemap-opensource-20230408.pmtiles",
        attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
      },
      "pindustrail":{
        type: "vector",
        url: "pmtiles://pindus_trail.pmtiles",
        attribution: '<a href="https://terrapindus.gr">Terra Pindus</a>'
      },
      //"terrainSource": {
      //  "url": `mapbox://mapbox.terrain-rgb`,
      //  "type": "raster-dem",
      //  tileSize: 512,
      //  maxzoom: 14,
      //},
    },
    layers: layers
}

export { mapStyle, layers}