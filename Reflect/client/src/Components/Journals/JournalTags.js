import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardLink, CardTitle, Form, Input, Label, FormGroup, ListGroup, ListGroupItem, Table } from "reactstrap";
import { getJournalById } from "../../Managers/JournalManager";
import { addJournalTag, getAllJournalTags } from "../../Managers/JournalTagManager";
import { getAllTags } from "../../Managers/TagManager";
import { TagAndButton } from "../Tags/Tag"; 
import Beige from "../Beige.png";
import { MdArrowBackIos } from 'react-icons/md'


export const JournalTags = ({}) => {
    const [journal, setJournal] = useState({});
    const [tags, setTags] = useState([]);
    const [journalTags, setJournalTags] = useState([])
    const navigate = useNavigate()

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
            <h1 className="journal_Title">{journal.title}</h1>
            <img className="beige" src={Beige} alt="" />
            
                <div className="back_Icon" onClick={() => navigate(`/journal/${id}`)}> <MdArrowBackIos />
                </div>
        
            <div className="tag_Table">
            <Table>
                    <thead>
                        <tr>
                            {/* <th className="tag_Label">
                                Tags
                            </th> */}
                          
                        </tr>
                    </thead>
                   <div className="tag_Table_item">
                    {tags.map((tag) => (
                        <TagAndButton 
                        tag={tag}
                        journal={journal}
                         />
                    ))}
                    </div>

                </Table>
             
            <button onClick={() => navigate("/tag/newTag")} className="new_Tag_Button">New Tag</button> 
            </div>
        </div>)
}
export default JournalTags;