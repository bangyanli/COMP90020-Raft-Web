
import "./BookDetail.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Button} from "@mui/material";


const book = {
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


function BookDetail(props) {
    // const {book} = props;

    return(
        <div className="book-body">
            <div>

            </div>
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
                        <Button variant="contained" sx={{mr: "10px"}}>Add Chapter</Button>
                    </div>
                </div>
            </div>
            <div className="chapters">
                <h3>
                    Select a chapter
                </h3>
                {
                    book.chapters.map((chapter) => {

                        return (
                            <div className="each-chapter">
                                <div className="chapter-name">
                                    {chapter.name}
                                </div>
                                <IconButton>
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

            </div>
        </div>
    )
}

export default BookDetail;