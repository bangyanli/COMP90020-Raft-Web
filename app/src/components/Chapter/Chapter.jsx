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
        <div>
            <div>
                {bookName}
            </div>
            <p>
                {chapter}
            </p>

        </div>
    )
}

export default Chapter;