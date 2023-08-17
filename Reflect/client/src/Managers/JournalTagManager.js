
const baseUrl = '/api/JournalTag';

export const addJournalTag = (journalTag) => { 
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journalTag),
    });
  };
  
  
  export const getAllJournalTags = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
  };