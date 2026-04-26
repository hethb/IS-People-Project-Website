import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Listing } from "../../types/models";
import { CMU_CENTER, DEFAULT_MAP_ZOOM, PITTSBURGH_AREA_BOUNDS } from "../../lib/cmuMap";
import { mapStageHeightClass, type ListingMapLayout } from "../../lib/mapStageLayout";
import { OsCampusMap } from "./OsCampusMap";

export type { ListingMapLayout };

type Props = {
  listings: Listing[];
  /** When set, highlights one listing (property detail page). */
  activeListingId?: string;
  /** `browse`: tall map + dark chrome for the listings split view. */
  layout?: ListingMapLayout;
};

/**
 * Campus map: Google Maps when `VITE_GOOGLE_MAPS_API_KEY` is set; otherwise OpenStreetMap tiles (real map data, no key).
 * For Google: enable **Maps JavaScript API** and restrict the key by HTTP referrer (e.g. `http://localhost:5173/*`).
 */
export function ListingMap({ listings, activeListingId, layout = "default" }: Props) {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "").trim();

  return (
    <CampusMapFrame usesGoogle={Boolean(apiKey)} layout={layout}>
      {!apiKey ? (
        <OsCampusMap listings={listings} activeListingId={activeListingId} layout={layout} />
      ) : (
        <GoogleCampusMap
          apiKey={apiKey}
          listings={listings}
          activeListingId={activeListingId}
          layout={layout}
        />
      )}
    </CampusMapFrame>
  );
}

function CampusMapFrame({
  usesGoogle,
  layout = "default",
  children,
}: {
  usesGoogle: boolean;
  layout?: ListingMapLayout;
  children: React.ReactNode;
}) {
  const browse = layout === "browse";

  const shell = browse
    ? "rounded-lg bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 ring-1 ring-slate-700/70"
    : "rounded-lg bg-gradient-to-br from-courie-brick to-courie-brick-active ring-1 ring-courie-cream-deep/60";

  const eyebrow = browse
    ? usesGoogle
      ? "Map preview · Google Maps"
      : "Map preview · live tiles"
    : usesGoogle
      ? "Google Maps · Pittsburgh / CMU"
      : "OpenStreetMap · Pittsburgh / CMU";

  const title = browse
    ? usesGoogle
      ? "Explore listings near Carnegie Mellon."
      : "Live street map centered on CMU — pins match each listing’s coordinates."
    : usesGoogle
      ? "Explore listings near Carnegie Mellon"
      : "Live street map — listings use real coordinates around campus";

  const aside = browse
    ? usesGoogle
      ? "The map is Google’s basemap only. Red pins are this app’s current listing results (not Google’s businesses). Pan/zoom are loosely limited to Pittsburgh; click a pin, then the listing."
      : "The map is OpenStreetMap. Markers are only the listings in your results (same as the card grid), not random map points. No API key required for tiles."
    : usesGoogle
      ? "Pins match listing coordinates around Oakland, Shadyside, and Squirrel Hill."
      : "Tiles © OpenStreetMap contributors. Set VITE_GOOGLE_MAPS_API_KEY to switch to Google Maps if you prefer.";

  const tip = browse
    ? usesGoogle
      ? "Tip: click a pin, then “View listing”. Same coordinates as the card list."
      : "Tip: tap a marker for a quick summary and link — same pins as in your mock wireframe."
    : usesGoogle
      ? "Tip: click a pin, then “View listing”. Pan/zoom is limited loosely to the Pittsburgh area."
      : "Tip: click a marker for details and a link to the listing. Pan and zoom freely.";

  const innerPad = browse ? "mt-4 rounded-md bg-white p-2 shadow-sm ring-1 ring-slate-200/90 sm:p-2.5" : "mt-4 rounded-lg bg-white/95 p-3 shadow-soft ring-1 ring-white/30";

  return (
    <div className={`relative overflow-hidden ${shell}`}>
      <div className={`absolute inset-0 ${browse ? "opacity-25" : "opacity-30"}`}>
        <div
          className={`absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl ${browse ? "bg-slate-500/30" : "bg-courie-gold/35"}`}
        />
        <div
          className={`absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl ${browse ? "bg-slate-600/25" : "bg-courie-gold/20"}`}
        />
      </div>

      <div className="relative p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p
              className={`text-[11px] font-bold uppercase tracking-widest ${browse ? "text-slate-400" : "text-courie-cream/90"}`}
            >
              {eyebrow}
            </p>
            <p className={`mt-1 text-sm font-semibold leading-snug ${browse ? "text-white" : "text-white"}`}>{title}</p>
          </div>
          <p
            className={`max-w-md text-xs leading-relaxed sm:text-right ${browse ? "text-slate-300" : "text-white/75"}`}
          >
            {aside}
          </p>
        </div>

        <div className={innerPad}>{children}</div>

        <p className={`mt-3 text-xs ${browse ? "text-slate-400" : "text-white/70"}`}>{tip}</p>
      </div>
    </div>
  );
}

type GoogleProps = Props & { apiKey: string };

function GoogleCampusMap({ apiKey, listings, activeListingId, layout }: GoogleProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "scottys-courie-google-maps",
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
      <div className="flex min-h-[280px] flex-col justify-center gap-2 rounded-lg bg-rose-50 p-6 text-sm font-semibold text-rose-900 ring-1 ring-rose-200">
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
      <div className="flex min-h-[280px] items-center justify-center rounded-lg bg-courie-cream text-sm font-semibold text-courie-muted">
        Loading map…
      </div>
    );
  }

  const infoListing = openListingId ? listings.find((x) => x.id === openListingId) : undefined;

  return (
    <div className={mapStageHeightClass(layout)}>
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
            fillColor: "#992D26",
            fillOpacity: 0.35,
            strokeColor: "#992D26",
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
                fillColor: isActive ? "#6b1f1a" : "#992D26",
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
            <div className="max-w-[220px] p-1 text-courie-ink">
              <p className="text-sm font-bold leading-snug">{infoListing.title}</p>
              <p className="mt-1 text-xs font-semibold text-courie-muted">
                ${infoListing.priceMonthly}/mo · {infoListing.neighborhood}
              </p>
              <div className="mt-2">
                <Link
                  className="text-xs font-extrabold text-courie-brick hover:text-courie-brick-hover"
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
