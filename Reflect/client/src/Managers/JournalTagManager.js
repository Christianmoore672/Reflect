// const baseUrl = '/api/JournalTag';

// //add a postTag to a post
// export const addJournalTag = (singleJournalTag) => {
//     return fetch(baseUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(singleJournalTag),
//     });
// };

// //get all of the postTags on a post
// export const getAllJournalTags = (id) => {
//     return fetch(`${baseUrl}/${id}`)
//         .then((res) => res.json())
// };