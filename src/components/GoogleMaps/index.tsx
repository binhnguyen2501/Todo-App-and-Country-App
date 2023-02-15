import GoogleMapReact from "google-map-react";

interface Props {
  location: {
    lat: number;
    long: number;
  };
}

const GoogleMaps = ({ location }: Props) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY! }}
      defaultCenter={{
        lat: location.lat,
        lng: location.long,
      }}
      defaultZoom={6}
      yesIWantToUseGoogleMapApiInternals
    ></GoogleMapReact>
  );
};

export default GoogleMaps;
