import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Marker,
  Popup,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CreateAdminPopup, CreateUserPopup } from './Popups';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import FetchedPolygons from '../../FetchedPolygons/FetchedPolygons';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import CreatePolygonForm from '../../CreatePolygonForm/CreatePolygonForm';
import { createPolygon } from '../../api/bierun-api';
import { fetchPolygons } from '../../api/bierun-api';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function PlanMap() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPolygons();
        setPolygons(data);
      } catch (error) {
        console.error('Error fetching polygons from useEffect:', error);
      }
    };

    fetchData();
  }, []);

  const default_color = 'blue';
  const selected_color = 'yellow';

  const mapPosition = [50.09, 19.0929];

  const handlePolygonCreated = (e) => {
    const { layerType, layer } = e;
    layer.bindPopup('hello').openPopup();
    if (layerType === 'polygon') {
      layer.setStyle({ fillColor: default_color, color: default_color });

      layer.on('click', (event) => {
        const popupContent = CreatePolygonForm;
        layer.bindPopup(popupContent).openPopup();
        const form = document.getElementById('createPolygonForm');
        form.addEventListener('submit', async (submitEvent) => {
          submitEvent.preventDefault();
          const formData = new FormData(form);
          const name = formData.get('name');
          const description = formData.get('description');
          const startDate = formData.get('startDate');
          await createPolygon({
            name,
            description,
            startDate,
            coordinates: e.layer.editing.latlngs[0][0],
          });
          layer.closePopup();
        });
      });

      layer.on('popupopen', () => {
        layer.setStyle({ fillColor: selected_color, color: selected_color });
        setSelectedLayer(layer);
      });

      layer.on('popupclose', () => {
        layer.setStyle({ fillColor: default_color, color: default_color });
        setSelectedLayer(null);
      });

      layer.on('contextmenu', () => {
        layer.bindPopup(UserPopup);
        layer.openPopup();
      });
    }
  };

  const handleEditStart = (e) => {
    selectedLayer.editing.enable();
    console.log('test-edit');
  };

  const handleEditClose = (e) => {
    selectedLayer.editing.disable();
    console.log('test-close');
  };

  const EditStartButton = ({ ClickHandler }) => {
    return (
      <button type="submit" onClick={() => ClickHandler}>
        Edytuj
      </button>
    );
  };

  const EditFinishButton = ({ ClickHandler }) => {
    return (
      <button type="submit" onClick={() => ClickHandler}>
        Zakończ edycję
      </button>
    );
  };

  const UserPopup = () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    flushSync(() => {
      root.render(
        <div>
          <p>UserPopup</p>
          <EditStartButton ClickHandler={handleEditStart} />
          <EditFinishButton ClickHandler={handleEditClose} />
        </div>,
      );
    });
    return div.innerHTML;
  };

  const handleSidebarItemClick = (polygon) => {
    setActiveItem(polygon);
    setSelectedLayer(polygon);

    if (mapRef.current && polygon && polygon.coordinates) {
      const coordinates = polygon.coordinates;
      const bounds = coordinates.reduce(
        (acc, { lat, lng }) => acc.extend([lat, lng]),
        L.latLngBounds(),
      );
      mapRef.current.flyToBounds(bounds);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <MapContainer
          ref={mapRef}
          center={mapPosition}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: '100vh' }}
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            minZoom={14}
            maxZoom={20}
          />
          <FeatureGroup>
            <EditControl
              position="topleft"
              draw={{
                polygon: true,
                marker: false,
                circlemarker: false,
                polyline: false,
                circle: false,
                rectangle: false,
              }}
              onCreated={handlePolygonCreated}
            />
            <FetchedPolygons />
          </FeatureGroup>
        </MapContainer>
      </div>
      {/* <div
        style={{
          width: '300px',
          padding: '20px',
          backgroundColor: '#a5d6a7', // To jest kolor zielonkawy nawiązujący do miasta Bieruń
        }}
      >
        <h2>Lista Inwestycji</h2>
        <ul className="list-group">
          {polygons.map((polygon) => (
            <li
              className="list-group-item"
              key={polygon.id || polygon.name}
              onClick={() => handleSidebarItemClick(polygon)}
              style={{
                cursor: 'pointer',
                padding: '8px',
                marginBottom: '4px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e0e0e0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'inherit';
              }}
            >
              {polygon.name}
            </li>
          ))}
        </ul>
      </div> */}
      <div
        className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
        style={{ width: '380px' }}
      >
        <a
          href="/"
          className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
        >
          <span className="fs-5 fw-semibold">Lista inwestycji</span>
        </a>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {polygons.map((polygon, index) => (
            <a
              key={index}
              href="#"
              className={`list-group-item list-group-item-action ${
                activeItem === polygon ? 'active' : ''
              }`}
              onClick={() => handleSidebarItemClick(polygon)}
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1">{polygon.name}</strong>
                <small className="text-muted">{polygon.date}</small>
              </div>
              <div className="col-10 mb-1 small">{polygon.description}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
