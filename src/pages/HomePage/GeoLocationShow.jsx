import { useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import ReactLeafletSearch from 'react-leaflet-search';
import icon from '../../assets/icons/geolocalisation/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from 'prop-types';

const ZOOM = 20;

const customIcon = L.icon({
  iconUrl: icon,
  iconAnchor: [12, 41],
});

const GeoLocationShow = ({ initialCoords }) => {
  const [search, setSearch] = useState(null);
  const [address, setAddress] = useState('');

  const handleMapClick = async event => {
    const { latlng } = event;
    setSearch(latlng);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
    );
    const data = await response.json();
    setAddress(data.display_name);
  };

  return (
    <div>
      <Map
        onClick={handleMapClick}
        center={initialCoords}
        zoom={ZOOM}
        style={{ height: '400px', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <ReactLeafletSearch
          position="topright"
          showPopup={false}
          provider="OpenStreetMap"
          showMarker={true}
          openSearchOnLoad={true}
          closeResultsOnClick={true}
          providerOptions={{ region: 'np' }}
        />
        <Marker position={initialCoords} icon={customIcon} />
      </Map>
      {search && <h3 className="mb-3 text-gray-300 text-center">Address: {address}</h3>}
    </div>
  );
};

GeoLocationShow.propTypes = {
  initialCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default GeoLocationShow;
