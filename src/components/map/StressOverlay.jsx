import React, { useMemo } from 'react';
import { useMap, Polygon } from 'react-leaflet';
import { useAppContext } from '../../context/AppContext';
import { fieldsData } from './fieldsData';
import { squareGrid, bbox, intersect, polygon } from '@turf/turf';

const getStressColor = (healthScore) => {
    // Green -> Yellow -> Red
    if (healthScore >= 80) return '#10b981'; // Healthy - agri green
    if (healthScore >= 50) return '#f59e0b'; // Early Stress - amber
    return '#ef4444'; // Severe Stress - red
};

const StressOverlay = () => {
    const { stressResults, selectedFields, isOverlayVisible } = useAppContext();
    const map = useMap();

    const overlays = useMemo(() => {
        if (!isOverlayVisible || !stressResults || !stressResults.fields) return [];

        let allGridCells = [];

        selectedFields.forEach((fieldId) => {
            const fieldData = stressResults.fields[fieldId];
            if (!fieldData || !fieldData.stress_matrix) return;

            // Find polygon coordinates from fieldsData
            const fieldObj = fieldsData.find(f => f.id === fieldId);
            if (!fieldObj) return;

            // Ensure coordinates are closed (first equals last) for Turf
            let coords = [...fieldObj.coordinates];
            if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
                coords.push([...coords[0]]);
            }

            // Note: Turf expects [longitude, latitude] but Leaflet uses [latitude, longitude]
            // We need to flip the coordinates for Turf
            const turfCoords = coords.map(c => [c[1], c[0]]);

            try {
                const turfPoly = polygon([turfCoords]);
                const boundingBox = bbox(turfPoly);

                // Create a 10x10 grid over the bounding box
                const cellSide = Math.max(
                    (boundingBox[2] - boundingBox[0]) / 10,
                    (boundingBox[3] - boundingBox[1]) / 10
                );

                const grid = squareGrid(boundingBox, cellSide, { units: 'degrees' });

                let cellIndex = 0;
                const matrix = fieldData.stress_matrix.flat();

                grid.features.forEach((cell) => {
                    // Check if cell intersects with the field polygon
                    const ix = intersect(turfPoly, cell);
                    if (ix) {
                        // Leaflet needs [lat, lng]
                        const leafletPolys = ix.geometry.coordinates[0].map(c => [c[1], c[0]]);

                        // Assign stress score from the matrix
                        const stressValue = matrix[cellIndex % matrix.length];
                        const colorScore = 100 - (stressValue * 100);

                        allGridCells.push(
                            <Polygon
                                key={`grid-${fieldId}-${cellIndex}`}
                                positions={leafletPolys}
                                pathOptions={{
                                    color: 'transparent',
                                    fillColor: getStressColor(colorScore),
                                    fillOpacity: 0.6,
                                    interactive: false // Let underlying FieldLayer handle clicks
                                }}
                            />
                        );
                        cellIndex++;
                    }
                });

            } catch (err) {
                console.error("Error generating grid for", fieldId, err);
            }
        });

        return allGridCells;
    }, [stressResults, selectedFields, isOverlayVisible]);

    return <>{overlays}</>;
};

export default StressOverlay;
