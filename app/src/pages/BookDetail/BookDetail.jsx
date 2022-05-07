import { useEffect, useState } from "react";
import "./BookDetail.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Button} from "@mui/material";
import {AddChapter, EditChapter} from "../../components/EditChapter/EditChapter";
import { useParams, useNavigate } from "react-router-dom";

import {getBookIndex, getBookInfo} from "../../api/book";



const defaultBook = {
    boodId : 123,
    name : " ",
    author : "",
    category : "",
    description : "",
}


function BookDetail(props) {
    const {currentHost} = props
    const navigate = useNavigate();
    const {bookName} = useParams();
    const [update, setUpdate] = useState(0);

    const refresh = () => {
        setUpdate(update+1);
    }

    
    const [book, setBook] = useState(defaultBook);
    const [chapters, setChapters] = useState([]);
    

    const [addChapterOpen, setAddChapterOpen] = useState(false);
    const [editChapterOpen, setEditChapterOpen] = useState(false);
    const [currentChapter, setCurrentChapter] = useState("");

    useEffect(()=>{
        getBookInfo(currentHost, bookName).then(res => {
            setBook(res);
        })

        getBookIndex(currentHost, bookName).then(res => {
            setChapters(res);
        })

    },[bookName, update])

    const handleAddChapterClose = ()=> {
        setAddChapterOpen(false)
    }

    const handleEditChapterOpen = (chapter) => {
        setCurrentChapter(chapter)
        setEditChapterOpen(true);
        
    }

    const handleEditChapterClose = () => {
        setEditChapterOpen(false);
    }

    const handleClickChapter = (chapter) => {
        navigate(chapter);
    }
    return(
        <div className="book-body">
            <AddChapter currentHost={currentHost} open={addChapterOpen} handleClose={handleAddChapterClose} bookName={bookName} refresh={refresh}/>
            <EditChapter currentHost={currentHost} open={editChapterOpen} handleClose={handleEditChapterClose} bookName={bookName} currentChapter={currentChapter} refresh={refresh}/>
            <div className="book-header">
                <img alt="a book" src="/book.png" className="book-img"/>
                <div className="book-info">
                    <h1>
                        {book.name}
                    </h1>
                    <h3>
                        Written By: {book.author}
                    </h3>
                    <p>
                        {book.description}
                    </p>
                    <div className="book-actions">
                        <Button variant="contained" sx={{mr: "10px"}} onClick={()=>{setAddChapterOpen(true)}} >Add Chapter</Button>
                    </div>
                </div>
            </div>
            {
                chapters.length > 0 ? 
                <div className="chapters">
                    <h3>
                        Select a chapter
                    </h3>
                    {
                        chapters.filter(chapter => chapter !== "info.json").map((chapter) => {

                            return (
                                <div className="each-chapter">
                                    <div className="chapter-name" onClick={() => {handleClickChapter(chapter)}}>
                                        {chapter}
                                    </div>
                                    <IconButton onClick={()=>{handleEditChapterOpen(chapter)}}>
                                        <EditIcon/>
                                    </IconButton>
                                </div>
                                
                            )
                        })
                    }
                </div> :
            <div></div>
            }
            
        </div>
    )
}

export default BookDetail;