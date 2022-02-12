import React from "react";
import { Route, Routes } from "react-router-dom";

import TodoApp from "./TodoApp/TodoApp";
import CountryListApp from "./CountryListApp/CountryListApp";
import HomePage from "./HomePage/HomePage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/TodoApp" element={<TodoApp />} />
        <Route path="/CountryListApp" element={<CountryListApp />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
