import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import GoogleMaps from "../components/GoogleMaps";
import { motion } from "framer-motion";

interface CountryTypes {
  countryName: string;
  countryOfficialName: string;
  capital: string;
  region: string;
  subregion: string;
  topLevelDomain: string;
  population: number;
  flag: string;
  languages: string;
  coatOfArms: string;
  map: {
    lat: number;
    long: number;
  };
}

const Country: React.FC = () => {
  const { capital } = useParams();
  const [country, setCountry] = useState<CountryTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const getCountry = async () => {
      const response = await axios.get(
        `https://restcountries.com/v3.1/capital/${capital}`
      );
      const countriesResponse = response.data.map((item: any) => {
        return {
          countryName: item.name.common,
          countryOfficialName: item.name.official,
          capital: item.capital,
          region: item.region,
          subregion: item.subregion,
          topLevelDomain: item.tld[0],
          population: item.population,
          flag: item.flags.png,
          languages: Object.values(item.languages)[0],
          coatOfArms: item.coatOfArms.png,
          map: {
            lat: item.latlng[0],
            long: item.latlng[1],
          },
        };
      });
      setCountry(countriesResponse);
      setIsLoading(false);
    };
    getCountry();
  }, [capital]);

  return (
    <div className="xl:py-10 xl:px-14 p-6 min-h-screen bg-slate-100">
      <Link to={"/CountriesListApp"}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#EF4638] pt-2 pb-3 pl-4 pr-6 rounded shadow text-white font-bold tracking-wide"
        >
          &larr; Back
        </motion.button>
      </Link>
      <div className="mt-10">
        {isLoading && (
          <div className="text-center text-xl lg:text-2xl font-bold">
            Loading...
          </div>
        )}
        {!isLoading &&
          country.map((item: CountryTypes, index: number) => (
            <div key={index} className="flex flex-col gap-2 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <img src={item.flag} alt={item.countryName} />
                <div className="text-4xl lg:text-6xl font-extrabold text-gray-900 mt-4">
                  {item.countryName},{" "}
                  <span className="font-light text-2xl lg:text-4xl">
                    {item.capital}
                  </span>
                </div>
                <div className="text-xl font-bold mt-2">
                  {item.countryOfficialName}
                </div>
                <div className="text-md flex items-center gap-3 mt-3 font-light">
                  <span className="font-semibold">Coat Of Arms:</span>
                  {item.coatOfArms ? (
                    <img
                      src={item.coatOfArms}
                      alt="Coat Of Arms"
                      className="w-12"
                    />
                  ) : (
                    "none"
                  )}
                </div>
                <div className="text-md font-light">
                  <span className="font-semibold">Region:</span> {item.region}
                </div>
                <div className="text-md font-light">
                  <span className="font-semibold">Subregion:</span>{" "}
                  {item.subregion}
                </div>
                <div className="text-md font-light">
                  <span className="font-semibold">Languages:</span>{" "}
                  {item.languages}
                </div>
                <div className="text-md font-light">
                  <span className="font-semibold">Population:</span>{" "}
                  {item.population.toLocaleString()}
                </div>
                <div className="text-md font-light">
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {item.topLevelDomain}
                </div>
              </div>
              <div className="w-full h-[800px] xl:h-auto">
                <GoogleMaps location={item.map} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Country;
