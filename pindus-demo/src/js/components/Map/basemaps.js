import { mapboxKey } from "./mapbox";

let basemapOptions = [
    {
        id: 'none',
        label: ' - ',
        tiles: null
    },
    {
        id: 'ktima',
        label: 'Hellenic Cadastre',
        tiles: ["http://gis.ktimanet.gr/wms/wmsopen/wmsserver.aspx?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=jpeg&TRANSPARENT=true&SRS=EPSG:900913&LAYERS=basic&TILED=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}"]
    },
    //{
    //    id: 'bing',
    //    label: 'Bing',
    //    tiles: ["https://ecn.t3.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1"]
    //},
    {
        id: 'toner',
        label: 'Stamen Toner',
        tiles: ["https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png"]
    },
    {
        id: 'osm',
        label: 'OSM',
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]
    },
    {
        id: 'cycle',
        label: 'Thunderforest Cycle',
        tiles: ["https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png"]
        
    },
    {
        id: 'eox-basemap',
        label: 'EOX Sentinel-2',
        tiles: ["https://tiles.maps.eox.at/?&service=WMS&request=GetMap&layers=s2cloudless_3857&styles=&format=image%2Fjpeg&transparent=false&version=1.1.1&tiled=true&dpi=120&map_resolution=120&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}"]
    },
    //{
    //    id: 'esri',
    //    label: 'ESRI Satellite',
    //    tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"]
    //},
    //{
    //    id: 'esri-topo',
    //    label: 'ESRI Topo',
    //    tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"]
    //},
    //{
    //    id: 'esri-terrain',
    //    label: 'ESRI Terrain',
    //    tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"]
    //},
    //{
    //    id: 'esri-dark',
    //    label: 'ESRI Dark',
    //    tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"]
    //},
    {
        id: 'mapbox-satellite',
        label: 'Mapbox Satellite',
        tiles: [`https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=${mapboxKey}`]
    }
]

function removeSource(map, sourceId) {
    if (map.getSource(sourceId)) {
        map.removeSource(sourceId);
    }
}

function removeLayer(map, layerId) {
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
    }
}

function addSource(map, sourceId, tiles) {
    map.addSource(sourceId, {
        type: "raster",
        tiles: tiles,
        tileSize: 256,
    });
}

function addLayer(map, layerId, sourceId) {
    map.addLayer({
        id: layerId,
        type: "raster",
        source: sourceId,
        paint: {},
    }, 'tunnel-minor-case'); // 'water'); (shows water)
}

function addBasemap(map, basemap) {
    basemap = basemapOptions.find(b => b.id === basemap);
    removeLayer(map, 'basemap');
    removeSource(map, 'basemap');

    if (!basemap.tiles) return;
    addSource(map, 'basemap', basemap.tiles);
    addLayer(map, 'basemap', 'basemap');
}


export {addBasemap, basemapOptions}   