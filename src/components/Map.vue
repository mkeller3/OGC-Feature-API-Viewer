<template>
  <div id="map" style="height: 70vh"></div>
</template>

<script>
import maplibregl from 'maplibre-gl'; 
import bbox from '@turf/bbox';

export default {
    name: 'BaseMap',
    props: ['geojson'],
    data: () => ({
        map: undefined
    }),
    mounted(){
        const that = this;

        console.log(that.geojson)

        this.map = new maplibregl.Map({
            container: 'map',
            style: {
                'version': 8,
                'sources': {
                    'raster-tiles': {
                        'type': 'raster',
                        'tiles': [
                            'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                        ],
                        'tileSize': 256,
                        'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                },
                'layers': [
                    {
                        'id': 'simple-tiles',
                        'type': 'raster',
                        'source': 'raster-tiles',
                        'minzoom': 0,
                        'maxzoom': 22
                    }
                ]
            },
            center: [-95, 40],
            zoom: 2
        });

        this.map.addControl(new maplibregl.NavigationControl());
        this.map.addControl(new maplibregl.ScaleControl());

        this.map.on('load', function () {
            that.map.addSource('geojson', {
                'type': 'geojson',
                'data': that.geojson
            
            });
            let bounding_box = bbox(that.geojson)
            that.map.fitBounds(bounding_box,{
                maxZoom: 15
            });
            let geometry = ""
            let geomType = ""
            if(that.geojson.geometry){
                geometry = that.geojson.geometry.type
            }else{
                geometry = that.geojson.features[0].geometry.type
            }
            if(geometry.toLowerCase().includes('polygon')){
                geomType = 'polygon'
            }
            else if(geometry.toLowerCase().includes('line')){
                geomType = 'line'
            }
            else {
                geomType = 'point'
            }

            if(geomType === 'polygon'){
                that.map.addLayer({
                    'id': 'geojson',
                    'type': 'fill',
                    'source': 'geojson',
                    'layout': {},
                    'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.8
                    }
                });
            }
            else if(geomType === 'line'){
                that.map.addLayer({
                    'id': 'geojson',
                    'type': 'line',
                    'source': 'geojson',
                    'layout': {},
                    'paint': {
                        'line-color': '#088'
                    }
                });
            }
            else {
                that.map.addLayer({
                    'id': 'geojson',
                    'type': 'circle',
                    'source': 'geojson',
                    'layout': {},
                    'paint': {
                        'circle-color': '#088'
                    }
                });
            }
        });
    }
}
</script>

<style>

</style>