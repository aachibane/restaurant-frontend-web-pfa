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
  return (
    <div>
      <Map center={initialCoords} zoom={ZOOM} style={{ height: '400px', width: '100%', zIndex: 1 }}>
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
