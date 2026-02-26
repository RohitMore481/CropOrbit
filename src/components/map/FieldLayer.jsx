import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { useAppContext } from '../../context/AppContext';
import { fieldsData } from './fieldsData';

const FieldLayer = () => {
    const { selectedFields, setSelectedFields } = useAppContext();
    const map = useMap();

    const handleFeatureClick = (e, fieldId) => {
        // Map bounds padding could be added here if we want to zoom to the feature

        setSelectedFields(prev => {
            if (prev.includes(fieldId)) {
                return prev.filter(id => id !== fieldId);
            } else {
                return [...prev, fieldId];
            }
        });
    };

    const styleFeature = (feature) => {
        const isSelected = selectedFields.includes(feature.properties.id);
        return {
            fillColor: isSelected ? 'transparent' : '#ffffff',
            fillOpacity: isSelected ? 0 : 0.1,
            color: isSelected ? '#10b981' : '#ffffff', // agri-green or white
            weight: isSelected ? 3 : 1,
            dashArray: isSelected ? '' : '4',
            className: 'transition-all duration-300'
        };
    };

    const onEachFeature = (feature, layer) => {
        // Tooltip for field name
        layer.bindTooltip(feature.properties.name, {
            permanent: false,
            direction: 'center',
            className: 'bg-slate-900 text-white border-0 px-3 py-1 rounded shadow-lg text-sm font-medium'
        });

        layer.on({
            mouseover: (e) => {
                const lr = e.target;
                if (!selectedFields.includes(feature.properties.id)) {
                    lr.setStyle({
                        fillOpacity: 0.3,
                        color: '#10b981',
                        weight: 2,
                        dashArray: ''
                    });
                }
            },
            mouseout: (e) => {
                const lr = e.target;
                if (!selectedFields.includes(feature.properties.id)) {
                    lr.setStyle({
                        fillOpacity: 0.1,
                        color: '#ffffff',
                        weight: 1,
                        dashArray: '4'
                    });
                }
            },
            click: (e) => handleFeatureClick(e, feature.properties.id)
        });
    };

    // Convert fieldsData array to GeoJSON FeatureCollection dynamically
    const featureCollection = {
        type: 'FeatureCollection',
        features: fieldsData.map(field => ({
            type: 'Feature',
            properties: { id: field.id, name: field.name },
            geometry: {
                type: 'Polygon',
                coordinates: [field.coordinates.map(coord => [coord[1], coord[0]])]
            }
        }))
    };

    // Ensure GeoJSON updates when styles change by keying it with selected field state
    return (
        <GeoJSON
            key={`fields-${selectedFields.join('-')}`}
            data={featureCollection}
            style={styleFeature}
            onEachFeature={onEachFeature}
        />
    );
};

export default FieldLayer;
