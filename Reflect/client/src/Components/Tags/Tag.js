import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addJournalTag, getAllJournalTags } from "../../Managers/JournalTagManager";
import { getAllTags } from "../../Managers/TagManager";

export const TagAndButton = ({ tag, id, journalTags }) => {

    const navigate = useNavigate();

    const saveJournalTag = () => {
        const newJournalTag = {
            journalId: id,
            tagId: tag.id
        }
        addJournalTag(newJournalTag).then((t) => {
            navigate(`/journal/${id}`)
        });
    }




    return (
                <tbody>
                    <td>{tag.name}</td>
                    <td>
                        {
                        !journalTags.some(x => x.tagId === tag.id)
                        ?
                        <button className="" onClick={() => { saveJournalTag() }}>
                            Add Tag
                        </button>
                        :
                        <></>
                        }
                    </td>
                </tbody>
    )
}