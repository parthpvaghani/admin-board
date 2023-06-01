import React from "react";
import EntryAdd from "./Component/EntryAdd";
import EntryEdit from "./Component/EntryEdit";
import EntriesList from "./Component/EntriesList";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <div className="mt-5">
      <Routes>
        <Route path="/" element={<EntriesList />} />
        <Route path="/add" element={<EntryAdd />} />
        <Route path="/edit/:id" element={<EntryEdit />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
