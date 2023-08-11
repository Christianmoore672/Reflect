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

export const getUserTags = (id) => {
  return fetch(`${baseUrl}/GetUserTags/${id}`).then((res) => res.json());
};

export const getTagById =(id) => {
return fetch (`${baseUrl}/${id}`).then((res)=> res.json())
};

export const deleteTag = (id) => {
return fetch(`/api/tag/${id}`, {
  method: "DELETE",
})
  .then(() => getAllTags())
};

export const editTag = (tag) => {
return fetch(`/api/tag/${tag.Id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(tag)
}).then(() => getAllTags())
}