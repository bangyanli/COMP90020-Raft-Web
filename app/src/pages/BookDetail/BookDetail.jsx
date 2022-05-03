import { useEffect, useState } from "react";
import "./BookDetail.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Button} from "@mui/material";
import {AddChapter, EditChapter} from "../../components/EditChapter/EditChapter";
import { useParams } from "react-router-dom";

import {getBookIndex, getBookInfo} from "../../api/book";



const defaultBook = {
    boodId : 123,
    name : "long long long long long long long long long long bookName ",
    author : "somebody",
    category : "fiction",
    description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla",
    chapters: [
        {
            name: "chapterName"
        },
        {
            name: "chapterName"
        },
        {
            name: "chapterName"
        },
        {
            name: "chapterName"
        },
        {
            name: "chapterName"
        },
        {
            name: "chapterName"
        },
        {
            name: "chapterName"
        },
        {
            name: "chapterName"
        },
        
    ]
}


function BookDetail() {
    const {bookName} = useParams();

    
    const [book, setBook] = useState(defaultBook);
    const [chapters, setChapters] = useState([]);
    

    const [addChapterOpen, setAddChapterOpen] = useState(false);
    const [editChapterOpen, setEditChapterOpen] = useState(false);
    const [currentChapter, setCurrentChapter] = useState({});

    useEffect(()=>{
        getBookInfo(bookName).then(res => {
            console.log(res);
            setBook(res);
        })

        getBookIndex(bookName).then(res => {
            setChapters(res);
        })

    },[bookName])

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
    return(
        <div className="book-body">
            <AddChapter open={addChapterOpen} handleClose={handleAddChapterClose} bookName={bookName}/>
            <EditChapter open={editChapterOpen} handleClose={handleEditChapterClose} bookName={bookName} currentChapter={currentChapter}/>
            <div className="book-header">
                <img alt="a book" src="/book.png" className="book-img"/>
                <div className="book-info">
                    <h1>
                        {book.name}
                    </h1>
                    <h3>
                        Written By: {book.author}
                    </h3>
                    <div>
                        {book.description}
                    </div>
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
                        chapters.map((chapter) => {

                            return (
                                <div className="each-chapter">
                                    <div className="chapter-name">
                                        {chapter}
                                    </div>
                                    <IconButton onClick={handleEditChapterOpen}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
                                    {/* <div className="chapter-operation">
                                        <EditIcon sx={{ color: "gray" }} fontSize="large"/>
                                    </div>
                                    <div className="chapter-operation">
                                        <DeleteIcon fontSize="large"/>
                                    </div> */}
                                    
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