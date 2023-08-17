import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardLink, CardTitle, Form, Input, Label, FormGroup, ListGroup, ListGroupItem, Table } from "reactstrap";
import { getJournalById } from "../../Managers/JournalManager";
import { addJournalTag, getAllJournalTags } from "../../Managers/JournalTagManager";
import { getAllTags } from "../../Managers/TagManager";
import { TagAndButton } from "../Tags/Tag"; 


export const JournalTags = ({}) => {
    const [journal, setJournal] = useState({});
    const [tags, setTags] = useState([]);
    const [journalTags, setJournalTags] = useState([])

    const { id } = useParams();

    const getTags = () => {
        getAllTags().then(tags => setTags(tags));
    };

    const getJournals = () => {
        getJournalById(id).then(journal => setJournal(journal));
    };

    useEffect(() => {
        getTags();
        getJournals();
    }, []);

    // const getTagsForThisJournal = () => {
    //     getAllJournalTags(id).then(allJournalTags => {
    //         setJournalTags(allJournalTags);
    //     } )
    // };

    // useEffect(() => {
    //     getTagsForThisJournal();
    // }, []);

   


    // useEffect(() => {

    //     getJournals();
    // }, []);



    return (
        // <article></article>
        <div className="">
            <h1>{journal.title}</h1>
            
                <CardLink href={`/journal/${id}`}>
                    Go back to Journal
                </CardLink>
        
            <div className="">
            <Table>
                    <thead>
                        <tr>
                            <th>
                                Tags
                            </th>
                          
                        </tr>
                    </thead>
                   
                    {tags.map((tag) => (
                        <TagAndButton 
                        tag={tag}
                        post={journal}
                         />
                    ))}

                </Table>
            </div>
        </div>)
}
export default JournalTags;