import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookChapter } from "../../api/book";

import "./Chapter.css";


function Chapter() {
    const {bookName, chapterName} = useParams();

    const [chapter, setChapter] = useState("");

    useEffect(()=>{
        getBookChapter(bookName, chapterName).then(res=>{
            setChapter(res);
        })
    },[])



    return(
        <div className="background">
            <div className="paper">
                <h1>
                    {bookName}
                </h1>
                <p style={{marginTop: "30px"}}>
                    {chapter}
                </p>
            </div>
        </div>
    )
}

export default Chapter;