import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { useAppContext } from '../../context/AppContext';
import { fieldsData } from './fieldsData';

const FieldLayer = () => {
    const { selectedFields, setSelectedFields, fields } = useAppContext();
    const map = useMap();

    // 🔹 Merge static + dynamic fields
    const combinedFields = [
        ...fieldsData,
        ...fields
    ];

    const handleFeatureClick = (e, fieldId) => {
        const layer = e.target;

        setSelectedFields(prev => {
            if (prev.includes(fieldId)) {
                return prev.filter(id => id !== fieldId);
            } else {
                return [...prev, fieldId];
            }
        });

        map.fitBounds(layer.getBounds(), {
            padding: [40, 40],
            animate: true,
            duration: 0.8
        });
    };

    const styleFeature = (feature) => {
        const isSelected = selectedFields.includes(feature.properties.id);
    
        return {
            fillColor: 'transparent',   // 🔥 No interior fill
            fillOpacity: 0,             // 🔥 Fully transparent
            color: isSelected ? '#10b981' : '#ffffff',
            weight: isSelected ? 3 : 1.5,
            dashArray: isSelected ? '' : '4'
        };
    };

    const onEachFeature = (feature, layer) => {

        layer.bindTooltip(feature.properties.name || "User Field", {
            permanent: false,
            direction: 'center',
            className:
                'bg-slate-900 text-white border-0 px-3 py-1 rounded shadow-lg text-sm font-medium'
        });

        layer.on({
            mouseover: (e) => {
                const lr = e.target;
                if (!selectedFields.includes(feature.properties.id)) {
                    lr.setStyle({
                        fillOpacity: 0.2,
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
                        fillOpacity: 0.05,
                        color: '#ffffff',
                        weight: 1.5,
                        dashArray: '4'
                    });
                }
            },
            click: (e) => handleFeatureClick(e, feature.properties.id)
        });
    };

    // Convert merged fields into GeoJSON
    const featureCollection = {
        type: 'FeatureCollection',
        features: combinedFields.map(field => ({
            type: 'Feature',
            properties: { id: field.id, name: field.name },
            geometry: field.geometry
                ? field.geometry
                : {
                    type: 'Polygon',
                    coordinates: [
                        field.coordinates.map(coord => [coord[1], coord[0]])
                    ]
                }
        }))
    };

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