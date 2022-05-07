import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookChapter } from "../../api/book";

import "./Chapter.css";


function Chapter(props) {
    const {currentHost} = props
    const {bookName, chapterName} = useParams();

    const [chapter, setChapter] = useState("");

    useEffect(()=>{
        getBookChapter(currentHost, bookName, chapterName).then(res=>{
            setChapter(res);
        })
    },[])



    return(
        <div className="background">
            <div className="paper">
                <h1>
                    {chapterName}
                </h1>
                <p style={{marginTop: "30px"}}>
                    {chapter}
                </p>
            </div>
        </div>
    )
}

export default Chapter;