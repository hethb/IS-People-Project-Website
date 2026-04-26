import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import type { Listing } from "../../types/models";
import { CMU_CENTER, DEFAULT_MAP_ZOOM } from "../../lib/cmuMap";
import type { ListingMapLayout } from "../../lib/mapStageLayout";
import { mapStageHeightClass } from "../../lib/mapStageLayout";

import "leaflet/dist/leaflet.css";

type Props = {
  listings: Listing[];
  activeListingId?: string;
  layout?: ListingMapLayout;
};

function FitBounds({ listings }: { listings: Listing[] }) {
  const map = useMap();

  useEffect(() => {
    if (listings.length === 0) {
      map.setView([CMU_CENTER.lat, CMU_CENTER.lng], DEFAULT_MAP_ZOOM);
      return;
    }
    if (listings.length === 1) {
      map.setView([listings[0].lat, listings[0].lng], 16);
      return;
    }
    const b = L.latLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
    b.extend([CMU_CENTER.lat, CMU_CENTER.lng]);
    map.fitBounds(b, { padding: [48, 48], maxZoom: 15 });
  }, [map, listings]);

  return null;
}

function ListingPin({ listing, active }: { listing: Listing; active: boolean }) {
  const ref = useRef<L.CircleMarker>(null);

  useEffect(() => {
    if (active) {
      ref.current?.openPopup();
    }
  }, [active]);

  return (
    <CircleMarker
      ref={ref}
      center={[listing.lat, listing.lng]}
      radius={active ? 11 : 9}
      pathOptions={{
        color: "#ffffff",
        weight: 2,
        fillColor: active ? "#6b1f1a" : "#992D26",
        fillOpacity: 1,
      }}
    >
      <Popup>
        <div className="min-w-[180px] text-courie-ink">
          <p className="text-sm font-bold leading-snug">{listing.title}</p>
          <p className="mt-1 text-xs font-semibold text-courie-muted">
            ${listing.priceMonthly}/mo · {listing.neighborhood}
          </p>
          <div className="mt-2">
            <Link
              className="text-xs font-extrabold text-courie-brick hover:text-courie-brick-hover"
              to={`/listings/${listing.id}`}
            >
              View listing →
            </Link>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

/**
 * Real street map (OpenStreetMap tiles) + listing coordinates — no API key required.
 * Attribution is included per OSM guidelines.
 */
export function OsCampusMap({ listings, activeListingId, layout = "default" }: Props) {
  const [mounted, setMounted] = useState(false);
  const browse = layout === "browse";
  const minInner = browse ? "min-h-[300px] lg:min-h-[380px]" : "min-h-[280px]";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600 ${browse ? "min-h-[300px] lg:min-h-[380px]" : "min-h-[280px]"}`}
      >
        Loading map…
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-slate-100 p-6 text-sm font-semibold text-slate-600 ${browse ? "min-h-[240px] lg:min-h-[280px]" : "min-h-[220px]"}`}
      >
        No listings to plot on the map for this filter.
      </div>
    );
  }

  const center: [number, number] = [CMU_CENTER.lat, CMU_CENTER.lng];
  const stage = mapStageHeightClass(layout);

  return (
    <div
      className={`${stage} [&_.leaflet-container]:z-0 [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-container]:font-sans`}
    >
      <MapContainer
        center={center}
        zoom={DEFAULT_MAP_ZOOM}
        className={`h-full w-full ${minInner}`}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds listings={listings} />
        <CircleMarker
          center={[CMU_CENTER.lat, CMU_CENTER.lng]}
          radius={8}
          pathOptions={{ color: "#992D26", fillColor: "#992D26", fillOpacity: 0.28, weight: 2 }}
        >
          <Popup>Carnegie Mellon University (approx.)</Popup>
        </CircleMarker>
        {listings.map((l) => (
          <ListingPin key={l.id} listing={l} active={l.id === activeListingId} />
        ))}
      </MapContainer>
    </div>
  );
}
