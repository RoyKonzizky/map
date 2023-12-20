import {MapContainer} from 'react-leaflet/MapContainer';
import {TileLayer} from 'react-leaflet/TileLayer';
import {Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import Geoman from "./Geoman.ts";

function App() {

    return (
        <div>
            <MapContainer style={{height: "90vh", width: "90vw"}} center={[51.505, -0.09]} zoom={13}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
                <Geoman/>
            </MapContainer>
        </div>
    )
}

export default App
