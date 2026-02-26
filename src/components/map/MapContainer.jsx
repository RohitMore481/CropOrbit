import React from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import FieldLayer from './FieldLayer';
import StressOverlay from './StressOverlay';
import Legend from './Legend';

const mapCenter = [38.5449, -121.7405]; // Default center (e.g., Davis, CA)

const MapContainer = () => {
    return (
        <div className="absolute inset-0 z-0">
            <LeafletMap
                center={mapCenter}
                zoom={14}
                maxZoom={18}
                zoomControl={false}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.maxar.com/">Maxar</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maxZoom={18}
                />
                <ZoomControl position="bottomright" />

                <FieldLayer />
                <StressOverlay />
                <Legend />
            </LeafletMap>
        </div>
    );
};

export default MapContainer;
