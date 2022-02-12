import React from "react";

interface Props {
  country: {
    countryName: string;
  };
}

const CountriesName = ({ country }: Props) => {
  return (
    <div className="border-b-[0.5px] py-[15px] font-bold text-lg lg:text-xl">
      {country.countryName}
    </div>
  );
};

export default CountriesName;
