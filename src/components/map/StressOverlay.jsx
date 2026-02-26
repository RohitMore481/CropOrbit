import React, { useMemo } from 'react';
import { Polygon } from 'react-leaflet';
import { useAppContext } from '../../context/AppContext';
import { fieldsData } from './fieldsData';
import { bbox, polygon, intersect, squareGrid } from '@turf/turf';

const getStressColor = (value) => {
    if (value < 0.4) return '#10b981';   // Green
    if (value < 0.7) return '#f59e0b';   // Yellow
    return '#ef4444';                    // Red
};

const StressOverlay = () => {

    const {
        stressResults,
        selectedFields,
        isOverlayVisible,
        fields
    } = useAppContext();

    const overlays = useMemo(() => {

        if (!isOverlayVisible || !stressResults?.fields) return [];

        let gridCells = [];

        selectedFields.forEach(fieldId => {

            const fieldData = stressResults.fields[fieldId];
            if (!fieldData?.stress_matrix) return;

            // 🔹 Get geometry (dynamic OR static)
            const fieldObj =
                fields.find(f => f.id === fieldId) ||
                fieldsData.find(f => f.id === fieldId);

            if (!fieldObj) return;

            let turfCoords;

            // Static field
            if (fieldObj.coordinates) {
                const closed = [...fieldObj.coordinates];
                if (
                    closed[0][0] !== closed[closed.length - 1][0] ||
                    closed[0][1] !== closed[closed.length - 1][1]
                ) {
                    closed.push([...closed[0]]);
                }

                turfCoords = closed.map(c => [c[1], c[0]]); // convert to [lng, lat]
            }

            // Dynamic field (GeoJSON)
            else if (fieldObj.geometry) {
                turfCoords = fieldObj.geometry.coordinates[0];
            }

            if (!turfCoords || turfCoords.length < 4) return;

            let turfPoly;
            try {
                turfPoly = polygon([turfCoords]);
            } catch {
                return;
            }

            const boundingBox = bbox(turfPoly);

            // 🔥 Generate grid in meters (visible cells)
            const grid = squareGrid(
                boundingBox,
                30,                 // 🔥 cell size in meters (adjust 20–50 if needed)
                { units: 'meters' }
            );

            const flatMatrix = fieldData.stress_matrix.flat();
            let cellIndex = 0;

            grid.features.forEach(cell => {

                let clipped;

                try {
                    clipped = intersect(turfPoly, cell);
                } catch {
                    return;
                }

                if (!clipped || !clipped.geometry) return;

                const leafletCoords =
                    clipped.geometry.coordinates[0].map(c => [c[1], c[0]]);

                const stressValue =
                    flatMatrix[cellIndex % flatMatrix.length];

                gridCells.push(
                    <Polygon
                        key={`stress-${fieldId}-${cellIndex}`}
                        positions={leafletCoords}
                        pathOptions={{
                            color: 'transparent',
                            fillColor: getStressColor(stressValue),
                            fillOpacity: 0.75,
                            interactive: false
                        }}
                    />
                );

                cellIndex++;
            });

        });

        return gridCells;

    }, [stressResults, selectedFields, isOverlayVisible, fields]);

    return <>{overlays}</>;
};

export default StressOverlay;