import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import TodoApp from "./TodoApp/TodoApp";
import CountriesListApp from "./CountriesListApp/CountriesListApp";
import Country from "./CountriesListApp/Country";
import HomePage from "./HomePage/HomePage";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Toaster />
      <Routes>
        <Route path="/TodoApp" element={<TodoApp />} />
        <Route path="/CountriesListApp" element={<CountriesListApp />} />
        <Route path="/CountriesListApp/:capital" element={<Country />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
