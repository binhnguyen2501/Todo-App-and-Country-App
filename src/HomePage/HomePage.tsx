import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="text-center my-6 text-[#EF4638] text-4xl font-extrabold">
        <div>Eastplayers Test</div>
      </div>
      <div className="my-0 mx-auto flex flex-col gap-5 w-11/12 lg:w-1/2">
        <div className="p-[12px] flex items-center gap-3 rounded-lg shadow-md">
          <div className="w-[38px] h-[38px] text-md text-[#EF4638] bg-red-100 text-center flex justify-center items-center rounded-full">
            1
          </div>
          <Link to="/TodoApp" className="font-bold text-[#636271] text-md">
            Todo list
          </Link>
        </div>
        <div className="p-[12px] flex items-center gap-3 rounded-lg shadow-md">
          <div className="w-[38px] h-[38px] text-md text-[#EF4638] bg-red-100 text-center flex justify-center items-center rounded-full">
            2
          </div>
          <Link
            to="/CountriesListApp"
            className="font-bold text-[#636271] text-md"
          >
            Country list
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
