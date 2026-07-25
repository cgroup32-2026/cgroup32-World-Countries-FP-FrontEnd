import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import { countriesApi } from "../api/countriesApi";
import { listsApi } from "../api/listsApi";
import { useAuth } from "../context/AuthContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function coloredIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="background-color:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.6);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}
const defaultIcon = coloredIcon("#3d6494");
const visitedIcon = coloredIcon("#22c55e");
const wantIcon = coloredIcon("#d68a2d");

export function MapPage() {
  const { isAuthenticated } = useAuth();
  const [countries, setCountries] = useState([]);
  const [savedLookup, setSavedLookup] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const requests = [countriesApi.getAll()];
    if (isAuthenticated) requests.push(listsApi.getMine());

    Promise.all(requests)
      .then(([allCountries, myLists]) => {
        setCountries(allCountries);
        if (myLists) {
          const lookup = {};
          myLists.forEach((entry) => {
            lookup[entry.countryId] = entry.listType;
          });
          setSavedLookup(lookup);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const countriesWithCoords = countries.filter(
    (c) => c.latitude != null && c.longitude != null,
  );

  if (loading)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-amber-50">
        Loading map...
      </main>
    );
  if (error)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-red-300">
        {error}
      </main>
    );

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="font-heading text-5xl text-amber-400">World Map</h1>
          <p className="mt-3 max-w-2xl text-amber-50/70">
            Explore every country on the map. Click a marker for details.
          </p>
        </header>

        {isAuthenticated && (
          <div className="mb-4 flex flex-wrap gap-5 text-sm text-amber-50/70">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#22c55e]" /> Visited
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#d68a2d]" /> Want to
              Visit
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#3d6494]" /> Not saved
            </span>
          </div>
        )}

        <div
          className="overflow-hidden rounded-lg border border-navy-700"
          style={{ height: "600px" }}
        >
          <MapContainer
            center={[20, 0]}
            zoom={2}
            minZoom={2}
            maxBounds={[
              [-90, -180],
              [90, 180],
            ]}
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {countriesWithCoords.map((country) => {
              const listType = savedLookup[country.countryId];
              const icon =
                listType === "Visited"
                  ? visitedIcon
                  : listType === "WantToVisit"
                    ? wantIcon
                    : defaultIcon;
              return (
                <Marker
                  key={country.countryId}
                  position={[country.latitude, country.longitude]}
                  icon={icon}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{country.nameCommon}</p>
                      {country.capital && (
                        <p className="text-xs text-gray-600">
                          Capital: {country.capital}
                        </p>
                      )}
                      <Link
                        to={`/countries/${country.countryId}`}
                        className="text-xs font-semibold text-amber-600 hover:underline"
                      >
                        View details →
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
