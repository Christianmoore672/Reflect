import React from "react";
import { Route, Routes } from "react-router-dom";
import JournalList from "./Journals/JournalList";
import Reflect from "./HomePage";
import TagList from "./Tags/TagList";
import ResearchList from "./Research/ResearchList";
import { JournalDetails } from "./Journals/JournalDetails";
import { JournalForm } from "./Journals/JournalForm";
import { ResearchForm } from "./Research/ResearchForm";
import { JournalEdit } from "./Journals/JournalEdit";
import { ResearchDetails } from "./Research/ResearchDetails";
import { ResearchTopicEdit } from "./Research/ResearchEdit";
import { TagDetails } from "./Tags/TagDetails";
import { TagForm } from "./Tags/TagForm";
import { TagEdit } from "./Tags/TagEdit";
import { JournalTags } from "./Journals/JournalTags";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Reflect />} />
        <Route path="/journals" element={<JournalList />} />
        <Route path="/research" element={<ResearchList />} />
        <Route path="/trends" element={<TagList />} />
        <Route path="/journal/:id" element={<JournalDetails />} />
        <Route path="/research/:id" element={<ResearchDetails />} />
        <Route path="/tag/:id" element={<TagDetails />} />
        <Route path="/journal/add" element={<JournalForm />} />
        <Route path="/research/add" element={<ResearchForm />} />
        <Route path="/tag/add/:id" element={<TagForm />} />
        <Route path="/journal/edit/:id" element={<JournalEdit />} />
        <Route path="/research/edit/:id" element={<ResearchTopicEdit />} />
        <Route path="/tag/edit/:id" element={<TagEdit />} />

        
      <Route path ="/journal/:id/tags" element={<JournalTags />} />
      </Routes>
   );

}