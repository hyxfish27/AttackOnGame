<template>
    <div
        class="mapContainer-wrap bg-greyF7 border-1 border border-grey rounded-2 p-4"
    >
        <div class="position-relative">
            <div ref="mapContainer" class="mapContainer"></div>
        </div>
    </div>
</template>
<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, onMounted, watch } from 'vue';
import MapIcon from '@/assets/images/event/mapIcon.png';

const props = defineProps({
    locationData: {
        type: Object,
        default: () => ({}),
    },
});

const mapContainer = ref(null);
let map = null;

const initializeMap = () => {
    if (props.locationData.lng && props.locationData.lat) {
        if (!map) {
            map = L.map(mapContainer.value, {
                center: [props.locationData.lat, props.locationData.lng],
                zoom: 16,
            });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                minZoom: 16,
                attribution: 'AttackOnGame',
            }).addTo(map);

            const icon = new L.Icon({
                iconUrl: MapIcon,
                iconSize: [80, 80],
            });
            L.circle([props.locationData.lat, props.locationData.lng], {
                radius: 85,
                color: '#d8c2ce',
                fillColor: '#d8c2ce',
                fillOpacity: 0.2,
                stroke: false,
            }).addTo(map);
            L.marker([props.locationData.lat, props.locationData.lng], {
                icon,
            }).addTo(map);
        } else {
            map.setView([props.locationData.lat, props.locationData.lng], 16);
        }
    }
};

onMounted(() => {
    initializeMap();
});

watch(
    () => props.locationData,
    (newValue, oldValue) => {
        console.log('props.locationData', newValue, oldValue);
        if (newValue.lng && newValue.lat) {
            initializeMap();
        }
    },
    { deep: true, immediate: true }
);
</script>

<style>
.mapContainer-wrap {
    overflow: hidden;
}
.mapContainer {
    height: 300px;
}
</style>
