import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Listing } from "../../types/models";
import { CMU_CENTER, DEFAULT_MAP_ZOOM, PITTSBURGH_AREA_BOUNDS } from "../../lib/cmuMap";

type Props = {
  listings: Listing[];
  /** When set, highlights one listing (property detail page). */
  activeListingId?: string;
};

/**
 * Campus map: uses Google Maps when `VITE_GOOGLE_MAPS_API_KEY` is set, otherwise a static pin map.
 * Enable **Maps JavaScript API** for your key in Google Cloud Console, and restrict the key by HTTP referrer
 * (e.g. `http://localhost:5173/*`) for class demos.
 */
export function ListingMap({ listings, activeListingId }: Props) {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "").trim();

  return (
    <CampusMapFrame usesGoogle={Boolean(apiKey)}>
      {!apiKey ? (
        <StaticPinMap listings={listings} activeListingId={activeListingId} />
      ) : (
        <GoogleCampusMap apiKey={apiKey} listings={listings} activeListingId={activeListingId} />
      )}
    </CampusMapFrame>
  );
}

function CampusMapFrame({ usesGoogle, children }: { usesGoogle: boolean; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 ring-1 ring-slate-200/60">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-400 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-400 blur-3xl" />
      </div>

      <div className="relative p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-teal-100/90">
              {usesGoogle ? "Google Maps · Pittsburgh / CMU" : "Map preview (add API key)"}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {usesGoogle ? "Explore listings near Carnegie Mellon" : "Offline map — set VITE_GOOGLE_MAPS_API_KEY for live maps"}
            </p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-200">
            {usesGoogle
              ? "Pins match mock listing coordinates around Oakland, Shadyside, and Squirrel Hill."
              : "Create a `.env` file with your browser key to load Google Maps centered on CMU."}
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-white/95 p-3 shadow-soft ring-1 ring-white/30">{children}</div>

        <p className="mt-3 text-xs text-slate-600">
          {usesGoogle
            ? "Tip: click a pin, then “View listing”. Pan/zoom is limited loosely to the Pittsburgh area."
            : "Tip: tap a pin to open the listing. With Google Maps enabled, pins use the same coordinates."}
        </p>
      </div>
    </div>
  );
}

/** Dependency-free map used when no API key is configured (still matches lat/lng in mock data). */
function StaticPinMap({ listings, activeListingId }: Props) {
  if (!listings.length) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-2xl bg-slate-50 p-6 text-sm font-semibold text-slate-600">
        No listings to plot on the map for this filter.
      </div>
    );
  }

  const lats = listings.map((l) => l.lat);
  const lngs = listings.map((l) => l.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const projectPct = (lat: number, lng: number) => {
    const left = ((lng - minLng) / (maxLng - minLng || 1)) * 100;
    const top = ((maxLat - lat) / (maxLat - minLat || 1)) * 100;
    return { leftPct: left, topPct: top };
  };

  return (
    <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl bg-slate-50">
      <svg viewBox="0 0 300 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="0" y="0" width="300" height="180" rx="16" fill="#f8fafc" />
        <path
          d="M20 140 C 70 120, 120 150, 170 110 S 250 90, 285 40"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path d="M40 20 L 40 170" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
        <path d="M260 20 L 260 170" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
        <rect x="115" y="55" width="70" height="46" rx="12" fill="#ccfbf1" stroke="#99f6e4" />
        <text x="150" y="83" textAnchor="middle" fontSize="10" fill="#0f766e" fontWeight="700">
          CMU
        </text>
      </svg>

      <div className="absolute inset-0">
        {listings.map((l) => {
          const { leftPct, topPct } = projectPct(l.lat, l.lng);
          const active = l.id === activeListingId;
          return (
            <Link
              key={l.id}
              to={`/listings/${l.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              title={l.title}
            >
              <span
                className={`inline-flex h-4 w-4 rounded-full ring-2 ring-white shadow-sm ${
                  active ? "bg-teal-900" : "bg-teal-600"
                } ${active ? "scale-125" : "hover:scale-110"} transition-transform`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type GoogleProps = Props & { apiKey: string };

function GoogleCampusMap({ apiKey, listings, activeListingId }: GoogleProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "student-roost-google-maps",
    googleMapsApiKey: apiKey,
    // `marker` library is required for the advanced marker library in newer APIs; basic Marker works without it.
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [openListingId, setOpenListingId] = useState<string | null>(null);

  const mapCenter = useMemo(() => CMU_CENTER, []);

  const onMapLoad = useCallback(
    (m: google.maps.Map) => {
      setMap(m);

      if (listings.length === 0) {
        m.setCenter(CMU_CENTER);
        m.setZoom(DEFAULT_MAP_ZOOM);
        return;
      }

      if (listings.length === 1) {
        m.setCenter({ lat: listings[0].lat, lng: listings[0].lng });
        m.setZoom(16);
        return;
      }

      const bounds = new google.maps.LatLngBounds();
      listings.forEach((l) => bounds.extend({ lat: l.lat, lng: l.lng }));
      // Include CMU so the “campus anchor” stays in frame when listings cluster on one side.
      bounds.extend(CMU_CENTER);
      m.fitBounds(bounds, 56);
    },
    [listings],
  );

  // Auto-open the active listing’s info bubble on the property page.
  useEffect(() => {
    if (!map || !activeListingId) return;
    const exists = listings.some((l) => l.id === activeListingId);
    if (exists) setOpenListingId(activeListingId);
  }, [map, activeListingId, listings]);

  if (loadError) {
    return (
      <div className="flex min-h-[280px] flex-col justify-center gap-2 rounded-2xl bg-rose-50 p-6 text-sm font-semibold text-rose-900 ring-1 ring-rose-200">
        <p>Google Maps failed to load.</p>
        <p className="text-xs font-medium text-rose-800">
          Common fixes: confirm the Maps JavaScript API is enabled, billing is enabled on the Google Cloud project, and
          your API key allows this origin (localhost referrer).
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-slate-50 text-sm font-semibold text-slate-600">
        Loading map…
      </div>
    );
  }

  const infoListing = openListingId ? listings.find((x) => x.id === openListingId) : undefined;

  return (
    <div className="relative h-[min(52vh,420px)] w-full min-h-[280px] overflow-hidden rounded-2xl">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={DEFAULT_MAP_ZOOM}
        onLoad={onMapLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          restriction: {
            latLngBounds: PITTSBURGH_AREA_BOUNDS,
            strictBounds: false,
          },
        }}
      >
        {/* Campus anchor (not a listing). */}
        <Marker
          position={CMU_CENTER}
          title="Carnegie Mellon University (approx.)"
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#0f766e",
            fillOpacity: 0.35,
            strokeColor: "#0f766e",
            strokeWeight: 2,
          }}
          zIndex={1}
        />

        {listings.map((l) => {
          const isActive = l.id === activeListingId;
          return (
            <Marker
              key={l.id}
              position={{ lat: l.lat, lng: l.lng }}
              title={l.title}
              onClick={() => setOpenListingId(l.id)}
              zIndex={isActive ? 30 : 10}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: isActive ? 10 : 8,
                fillColor: isActive ? "#115e59" : "#14b8a6",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          );
        })}

        {infoListing ? (
          <InfoWindow
            position={{ lat: infoListing.lat, lng: infoListing.lng }}
            onCloseClick={() => setOpenListingId(null)}
          >
            <div className="max-w-[220px] p-1 text-slate-900">
              <p className="text-sm font-bold leading-snug">{infoListing.title}</p>
              <p className="mt-1 text-xs font-semibold text-slate-600">
                ${infoListing.priceMonthly}/mo · {infoListing.neighborhood}
              </p>
              <div className="mt-2">
                <Link
                  className="text-xs font-extrabold text-teal-800 hover:text-teal-900"
                  to={`/listings/${infoListing.id}`}
                >
                  View listing →
                </Link>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
