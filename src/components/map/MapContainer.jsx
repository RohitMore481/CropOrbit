import { MapContainer as LeafletMap, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import FieldLayer from "./FieldLayer";
import StressOverlay from "./StressOverlay";
import Legend from "./Legend";
import { useAppContext } from "../../context/AppContext";

export default function MapContainer() {

  const {
    setFields,
    setSelectedFields,
    selectedFields,
    stressResults
  } = useAppContext();

  return (
    <div className="flex-1 relative h-full">
      <LeafletMap
        center={[21.1458, 79.0882]}
        zoom={15}
        scrollWheelZoom={true}
        zoomAnimation={true}
        zoomAnimationThreshold={4}
        className="h-full w-full"
      >

        {/* Satellite Layer */}
        <TileLayer
          attribution='&copy; Esri &mdash; Source: Esri, Maxar'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Drawing Layer */}
        <FeatureGroup>
            <EditControl
                position="topright"
                draw={{
                rectangle: false,
                polygon: true,
                circle: false,
                polyline: false,
                marker: false,
                circlemarker: false
                }}
                edit={{
                edit: false,
                remove: true
                }}
                onCreated={(e) => {
                    const layer = e.layer;
                    const geoJson = layer.toGeoJSON();
                  
                    const newFieldId = `field_${Date.now()}`;
                  
                    const newField = {
                      id: newFieldId,
                      name: "User Field",
                      geometry: geoJson.geometry
                    };
                  
                    // 🔥 Add to React state
                    setFields(prev => [...prev, newField]);
                    setSelectedFields(prev => [...prev, newFieldId]);
                  
                    // 🔥 REMOVE the layer from FeatureGroup immediately
                    e.layer.remove();
                }}
                onDeleted={(e) => {
                    e.layers.eachLayer((layer) => {
                      const geoJson = layer.toGeoJSON();
                  
                      setFields(prev =>
                        prev.filter(field =>
                          JSON.stringify(field.geometry) !== JSON.stringify(geoJson.geometry)
                        )
                      );
                  
                      setSelectedFields(prev =>
                        prev.filter(id =>
                          fields.find(f =>
                            f.id === id &&
                            JSON.stringify(f.geometry) !== JSON.stringify(geoJson.geometry)
                          )
                        )
                      );
                  
                      setStressResults(prev => {
                        return {
                          ...prev,
                          fields: {}
                        };
                      });
                    });
                  }}
            />
        </FeatureGroup>

        {/* Static Fields */}
       

        {/* Stress Overlay */}
        <StressOverlay
            selectedFields={selectedFields}
            stressResults={stressResults}
        />
     <FieldLayer />
        <Legend />

      </LeafletMap>
    </div>
  );
}