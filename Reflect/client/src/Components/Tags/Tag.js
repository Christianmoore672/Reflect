import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, CardFooter, Button, pop} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { addJournalTag, getAllJournalTags } from "../../Managers/JournalTagManager";
import { getAllTags } from "../../Managers/TagManager";

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
        <Card className="m-4">
  
          <CardBody>

            <strong>{tag.name}</strong>
             
          <CardFooter>
            <button className="btn btn-primary" onClick={()=>{ saveJournalTag() }}>
                Assign Tag
            </button> 
            <Button onClick={() => navigate(`/tag/edit/${tag.id}`)}>
                Edit
            </Button>     
          
          </CardFooter> 
          </CardBody>
        </Card>
    )}
    export default TagAndButton


    // return (
    //     <article> 
    //             <div> {tag.name} </div>
    //             <div>
    //                     {
    //                     !journalTags.some(x => x.tagId === tag.id)
    //                     ?
    //                     <button className="" onClick={() => { saveJournalTag() }}>
    //                         Add Tag
    //                     </button>
    //                     :
    //                     <></>
    //                     }
    //             </div>
    //     </article>

                // <tbody>
                //     <tr>
                //     <tr>{tag.name}</tr>
                //     <td>
                //         {
                //         !journalTags.some(x => x.tagId === tag.id)
                //         ?
                //         <button className="" onClick={() => { saveJournalTag() }}>
                //             Add Tag
                //         </button>
                //         :
                //         <></>
                //         }
                //     </td>
                //     </tr>
                // </tbody>

     
//     )
// }