import { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

interface Props {
  location: {
    lat: number;
    long: number;
  };
}

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const GoogleMaps = ({ location }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY!,
  });

  //save map in ref if we want to access the map
  const mapRef = useRef<any | null>(null);
  const onLoad = (map: any): void => {
    mapRef.current = map;
  };
  const onUnMount = (): void => {
    mapRef.current = null;
  };

  if (!isLoaded) return <div>Map Loading...</div>;
  return (
    <>
      <GoogleMap
        options={options as google.maps.MapOptions}
        center={{
          lat: location.lat,
          lng: location.long,
        }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnMount}
      />
    </>
  );
};

export default GoogleMaps;
