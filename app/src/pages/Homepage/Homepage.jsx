import { useEffect, useState } from "react";
import Book from "../../components/Book/Book";
import CreateBook from "../../components/CreateBook/CreateBook";
import { Button } from "@mui/material";
import { getAllBooks, getBookInfo } from "../../api/book";

// Homepage should contain a list of books
function Homepage(props) {
    const {currentHost} = props;
    const [books, setBooks] = useState([]);
    const [createBookOpen, setCreateBookOpen] = useState(false);
    const handleCreateBook = () => {
        setCreateBookOpen(true);
    }

    const handleCloseCreateBook = () => {
        setCreateBookOpen(false);
    }

    const [update, setUpdate] = useState(0);
    const handleUpdate = () => {
        setUpdate(update+1);
    }

    useEffect(() => {
        getAllBooks(currentHost).then(booksName => {
            // console.log(booksName)
            const promises = [];
            booksName.forEach(bookName => {
                promises.push(getBookInfo(currentHost, bookName));
            })
            // console.log(promises);
            Promise.all(promises).then(res => {
                setBooks(res);
            })
        })
    }, [update])
    
    return(
        <div style={{position: "relative"}}>
            <Button variant="outlined" onClick={handleCreateBook} sx={{color: "black", bgcolor: "white", ":hover": {bgcolor: "#70C76D"}, position: "absolute", top: "-80px", right: "120px"}}>
                Upload Book
            </Button>
            
            <div className="books-container" style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", margin: "30px 10% 0 10%"}}>
                {
                    books.map((book, index) => {
                        return (
                            <Book currentHost={currentHost} book={book} key={index}/>
                        )
                    })
                }
            </div>

            <CreateBook currentHost={currentHost} open={createBookOpen} handleClose={handleCloseCreateBook} handleUpdate={handleUpdate}/>
        </div>
    )
}

export default Homepage;