import { useState } from "react";
import Book from "../../components/Book/Book";
import CreateBook from "../../components/CreateBook/CreateBook";
import { Button } from "@mui/material";


const books = [
    {
        boodId : 123,
        name : "long long long long long long long long long long bookName ",
        author : "somebody",
        category : "fiction",
        description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla",
    },
    {
        boodId : 123,
        name : "bookName",
        author : "somebody",
        category : "fiction",
        description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabl",
    },
    {
        boodId : 123,
        name : "long long long long long long long long long long bookName ",
        author : "somebody",
        category : "fiction",
        description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla",
    },
    {
        boodId : 123,
        name : "bookName",
        author : "somebody",
        category : "fiction",
        description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabl",
    },
    {
        boodId : 123,
        name : "long long long long long long long long long long bookName ",
        author : "somebody",
        category : "fiction",
        description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla",
    },
    {
        boodId : 123,
        name : "bookName",
        author : "somebody",
        category : "fiction",
        description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabl",
    }
]

// Homepage should contain a list of books
function Homepage() {
    const [createBookOpen, setCreateBookOpen] = useState(false);
    const handleCreateBook = () => {
        setCreateBookOpen(true);
    }

    const handleCloseCreateBook = () => {
        setCreateBookOpen(false);
    }
    
    return(
        <div>
            <Button variant="outlined" onClick={handleCreateBook}>
                Create Book
            </Button>
            
            <div className="books-container" style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                {
                    books.map(book => {
                        return (
                            <Book book={book}/>
                        )
                    })
                }
            </div>

            <CreateBook open={createBookOpen} handleClose={handleCloseCreateBook} />
        </div>
    )
}

export default Homepage;