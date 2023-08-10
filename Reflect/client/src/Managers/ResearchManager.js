// import React from "react";

const baseUrl = '/api/researchTopic';

export const getAllResearchTopics = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addResearchTopics = (singleResearchTopic) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleResearchTopic),
  });
};

export const getResearchByUserProfileId = (id) => {
  return fetch(`${baseUrl}/GetUserResearch/${id}`).then((res) => res.json());
};


export const getResearchTopicById =(id) => {
return fetch (`${baseUrl}/${id}`).then((res)=> res.json())
};

export const deleteResearchTopic = (id) => {
return fetch(`/api/research/${id}`, {
  method: "DELETE",
})
  .then(() => getAllResearchTopics())
};

export const editResearchTopic = (researchTopic) => {
console.log(researchTopic)
return fetch(`/api/research/${researchTopic.Id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(researchTopic)
}).then(() => getAllResearchTopics())
}