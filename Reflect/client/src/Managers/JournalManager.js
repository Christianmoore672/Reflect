import React from "react";

const baseUrl = '/api/journal';

export const getAllJournals = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addJournal = (singleJournal) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleJournal),
  });
};