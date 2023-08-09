// import React from "react";

const baseUrl = '/api/researchTopic';

export const getAllResearchTopics = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addJournal = (singleResearchTopic) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleResearchTopic),
  });
};