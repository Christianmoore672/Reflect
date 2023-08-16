// import React from "react";
//https://localhost:7084/journalTag

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

export const getUserJournals = (id) => {
  return fetch(`${baseUrl}/GetUserJournals/${id}`).then((res) => res.json());
};

// is this written correctly? not getting journal info :(
export const getJournalById =(id) => {
return fetch (`${baseUrl}/${id}`).then((res)=> res.json())
};

export const deleteJournal = (id) => {
return fetch(`/api/journal/${id}`, {
  method: "DELETE",
})
  .then(() => getAllJournals())
};

export const editJournal = (journal) => {
return fetch(`/api/journal/${journal.Id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(journal)
}).then(() => getAllJournals())
}

export const addJournalTag = (journalTag) => { 
  return fetch(`${baseUrl}/journalTag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journalTag),
  });
};
