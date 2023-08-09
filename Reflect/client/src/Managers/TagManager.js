// import React from "react";

const baseUrl = '/api/tag';

export const getAllTags = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addTag = (singleTag) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleTag),
  });
};