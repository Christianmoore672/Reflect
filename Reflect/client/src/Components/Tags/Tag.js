import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, CardFooter, Button, pop} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { addJournalTag, getAllJournalTags } from "../../Managers/JournalTagManager";
import { getAllTags } from "../../Managers/TagManager";
import { BsPlusSquare } from 'react-icons/bs'

export const TagAndButton = ({ tag, journal }) => {

    const navigate = useNavigate();

    const saveJournalTag = () => {
        const newJournalTag = {
            journalId: journal.id,
            tagId: tag.id
        }
        addJournalTag(newJournalTag).then((tag) => {
            navigate(`/journal/${journal.id}`)
        });
    }

    return (
        <Card className="tag_Card">
  
          <CardBody className="tag_card_item">

            <div className="">{tag.name}</div>
            <BsPlusSquare className="more_Button" onClick={()=>{ saveJournalTag(tag) }} />
          
          </CardBody>
        </Card>
    )}
    export default TagAndButton
