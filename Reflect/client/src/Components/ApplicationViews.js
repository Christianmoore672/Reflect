import React from "react";
import { Route, Routes } from "react-router-dom";
import JournalList from "./Journals/JournalList";
import Reflect from "./HomePage";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Reflect />} />
        <Route path="/journals" element={<JournalList />} />
      </Routes>
   );

}