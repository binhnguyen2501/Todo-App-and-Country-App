import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="text-center my-6 text-[#EF4638] text-4xl font-extrabold">
        <div>Utility Applications</div>
      </div>
      <div className="my-0 mx-auto flex flex-col gap-5 w-11/12 lg:w-1/2">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link
            to="/TodoApp"
            className="p-[12px] flex items-center gap-3 rounded-lg shadow-md"
          >
            <div className="w-[38px] h-[38px] text-md text-[#EF4638] bg-red-100 text-center flex justify-center items-center rounded-full">
              1
            </div>
            <div className="font-bold text-[#636271] text-md">
              What's the Plan for Today?
            </div>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link
            to="/CountriesListApp"
            className="p-[12px] flex items-center gap-3 rounded-lg shadow-md"
          >
            <div className="w-[38px] h-[38px] text-md text-[#EF4638] bg-red-100 text-center flex justify-center items-center rounded-full">
              2
            </div>
            <div className="font-bold text-[#636271] text-md">
              Where in the world?
            </div>
          </Link>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
