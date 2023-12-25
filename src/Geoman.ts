import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import L, {LatLng, LeafletEvent, Polyline} from 'leaflet';

const Geoman = () => {
    const context = useLeafletContext();

    useEffect(() => {
        const leafletContainer = context.map;

        (leafletContainer as typeof context.map).pm.addControls({
            drawMarker: false,
            rotateMode: false,
            dragMode: false,
            editMode: false,
            drawText: false,
        });

        leafletContainer.on("pm:create", (e: LeafletEvent) => {
            if (e.layer && e.layer.pm) {
                const shape = e;

                if (shape.layer instanceof L.Polyline) {
                    const coordinates = shape.layer.getLatLngs(); // Get line coordinates
                    const distance = calculateDistance(coordinates as LatLng[]); // Calculate distance
                    const popupContent = `Distance between points: ${distance.toFixed(2)} meters`;

                    shape.layer.bindPopup(popupContent).openPopup();
                }
            }
        });


        //Added for regular line feature
        leafletContainer.pm.setGlobalOptions({
            hideMiddleMarkers: true // New global option added
        });
        //Added for regular line feature
        leafletContainer.on('pm:drawstart', (event) => {
            const { workingLayer } = event;

            workingLayer.on('pm:vertexadded', () => {
                if ((workingLayer as Polyline).getLatLngs().length >= 2) {
                    leafletContainer.pm.Draw.Line._finishShape();
                }
            });
        });

        const calculateDistance = (coordinates:LatLng[]) => {
            let totalDistance = 0;

            for (let i = 0; i < coordinates.length - 1; i++) {
                const point1 = coordinates[i];
                const point2 = coordinates[i + 1];
                const distance = point1.distanceTo(point2);
                totalDistance += distance;
            }

            return totalDistance;
        };
    }, [context]);

    return null;
};

export default Geoman;
