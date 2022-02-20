import React from "react";
import { Route, Routes } from "react-router-dom";

import TodoApp from "./TodoApp/TodoApp";
import CountriesListApp from "./CountriesListApp/CountriesListApp";
import Country from "./CountriesListApp/Country";
import HomePage from "./HomePage/HomePage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/TodoApp" element={<TodoApp />} />
        <Route path="/CountriesListApp" element={<CountriesListApp />} />
        <Route path="/CountriesListApp/:capital" element={<Country />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
