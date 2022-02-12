import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CountriesName from "../components/CountriesName";

interface CountryList {
  countryName: string;
}

const CountryListApp: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [countryList, setCountryList] = useState<CountryList[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [checkUserTyping, setCheckUserTyping] = useState<boolean>(false);
  const typingTimeoutRef: any = useRef();

  useEffect(() => {
    setCheckUserTyping(true);
    const getCountryList = async () => {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      const countriesResponse = response.data.map((item: any) => {
        return { countryName: item.name.common };
      });
      setCountryList(countriesResponse);
      setCheckUserTyping(false);
    };
    getCountryList();
  }, []);

  const handleSearchCountry = async (searchValue: string) => {
    if (searchValue) {
      setCheckUserTyping(true);
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${search}`
        );
        const countriesResponse = response.data.map((item: any) => {
          return { countryName: item.name.common };
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
          return { countryName: item.name.common };
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
    setSearch(value);

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
    <>
      <div className="text-center my-6 text-[#EF4638] text-4xl font-extrabold">
        Country list
      </div>
      <div className="w-1/2 my-0 mx-auto">
        <div className="flex justify-center w-full">
          <div className="border-[1px] border-[#EFEFEF] rounded-lg w-full flex">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Name..."
              onChange={handleChange}
              className="w-full text-xl pl-6 py-3 border-0 rounded-lg focus:outline-none"
            />
            {checkUserTyping && (
              <img src={"/images/arrow.svg"} alt="search" className="mr-5" />
            )}
          </div>
        </div>
        <div className="mt-4">
          {checkUserTyping && (
            <div className="text-center text-2xl font-bold">Loading...</div>
          )}
          {error && !checkUserTyping && (
            <div className="text-center text-2xl font-bold">
              Unavailable Result
            </div>
          )}
          {!error &&
            !checkUserTyping &&
            countryList.map((country: CountryList, index: number) => {
              return <CountriesName key={index} country={country} />;
            })}
        </div>
      </div>
    </>
  );
};

export default CountryListApp;
