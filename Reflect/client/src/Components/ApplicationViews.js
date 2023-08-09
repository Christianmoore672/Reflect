import React from "react";
import { Route, Routes } from "react-router-dom";
import JournalList from "./Journals/JournalList";
import Reflect from "./HomePage";
import TagList from "./Tags/TagList";
import ResearchList from "./Research/ResearchList";
import { JournalDetails } from "./Journals/JournalDetails";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Reflect />} />
        <Route path="/journals" element={<JournalList />} />
        <Route path="/journal/details" element={<JournalDetails />} />
        <Route path="/trends" element={<TagList />} />
        <Route path="/research" element={<ResearchList />} />
        {/* <Route path="/research/add" element={<ResearchForm />} /> */}
      </Routes>
   );

}