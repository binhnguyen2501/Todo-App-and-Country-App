import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CountriesName from "../components/CountriesName";

interface CountryListTypes {
  countryName: string;
  capital: string;
}

const CountriesListApp: React.FC = () => {
  const [countryList, setCountryList] = useState<CountryListTypes[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [checkUserTyping, setCheckUserTyping] = useState<boolean>(false);
  const typingTimeoutRef: any = useRef();

  useEffect(() => {
    setCheckUserTyping(true);
    const getCountriesList = async () => {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      const countriesResponse = response.data.map((item: any) => {
        return { countryName: item.name.common, capital: item.capital };
      });
      setCountryList(countriesResponse);
      setCheckUserTyping(false);
    };
    getCountriesList();
  }, []);

  const handleSearchCountry = async (searchValue: string) => {
    if (searchValue) {
      setCheckUserTyping(true);
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchValue}`
        );
        const countriesResponse = response.data.map((item: any) => {
          return { countryName: item.name.common, capital: item.capital };
        });
        setCheckUserTyping(false);
        setCountryList(countriesResponse);
        setError(false);
      } catch (e) {
        console.error("e", e);
        setError(true);
        setCheckUserTyping(false);
      }
    } else {
      setCheckUserTyping(true);
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        const countriesResponse = response.data.map((item: any) => {
          return { countryName: item.name.common, capital: item.capital };
        });
        setCheckUserTyping(false);
        setCountryList(countriesResponse);
        setError(false);
      } catch (e) {
        console.error("e", e);
        setError(true);
        setCheckUserTyping(false);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      handleSearchCountry(value);
    }, 700);
  };

  useEffect(() => {
    setCheckUserTyping(true);
  }, [typingTimeoutRef.current]);

  return (
    <React.Fragment>
      <div className="text-center my-6 text-[#EF4638] text-4xl font-extrabold">
        Where in the world?
      </div>
      <div className="my-0 mx-auto w-11/12 lg:w-1/2">
        <div className="flex justify-center w-full">
          <div className="border-[1px] border-[#EFEFEF] rounded-lg w-full flex">
            <input
              type="text"
              name="search"
              placeholder="Name..."
              onChange={handleChange}
              className="w-full text-lg lg:text-xl pl-6 py-3 border-0 rounded-lg focus:outline-none"
            />
            {checkUserTyping && (
              <img src={"/images/arrow.svg"} alt="search" className="mr-5" />
            )}
          </div>
        </div>
        <div className="mt-4">
          {checkUserTyping && (
            <div className="text-center text-xl lg:text-2xl font-bold">
              Loading...
            </div>
          )}
          {error && !checkUserTyping && (
            <div className="text-center text-xl lg:text-2xl font-bold">
              Unavailable Result
            </div>
          )}
          {!error &&
            !checkUserTyping &&
            countryList.map((country: CountryListTypes, index: number) => (
              <Link to={`/CountriesListApp/${country.capital}`} key={index}>
                <CountriesName country={country} />
              </Link>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CountriesListApp;
