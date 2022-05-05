import { useEffect, useState } from "react";
import Book from "../../components/Book/Book";
import CreateBook from "../../components/CreateBook/CreateBook";
import { Button } from "@mui/material";
import { getAllBooks, getBookInfo } from "../../api/book";


// const books = [
//     {
//         boodId : 123,
//         name : "long long long long long long long long long long bookName ",
//         author : "somebody",
//         category : "fiction",
//         description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla",
//     },
//     {
//         boodId : 123,
//         name : "bookName",
//         author : "somebody",
//         category : "fiction",
//         description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabl",
//     },
//     {
//         boodId : 123,
//         name : "long long long long long long long long long long bookName ",
//         author : "somebody",
//         category : "fiction",
//         description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla",
//     },
//     {
//         boodId : 123,
//         name : "bookName",
//         author : "somebody",
//         category : "fiction",
//         description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabl",
//     },
//     {
//         boodId : 123,
//         name : "long long long long long long long long long long bookName ",
//         author : "somebody",
//         category : "fiction",
//         description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla ablabla blablabla blablabla blablabla blablabla blablabla blablabla",
//     },
//     {
//         boodId : 123,
//         name : "bookName",
//         author : "somebody",
//         category : "fiction",
//         description : "blablabla blablabla blablabla blablabla blablabla blablabla blablabl",
//     }
// ]

// Homepage should contain a list of books
function Homepage() {
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
        getAllBooks().then(booksName => {
            console.log(booksName)
            const promises = [];
            booksName.forEach(bookName => {
                promises.push(getBookInfo(bookName));
            })
            console.log(promises);
            Promise.all(promises).then(res => {
                setBooks(res);
            })
        })
    }, [update])
    
    return(
        <div>
            <Button variant="outlined" onClick={handleCreateBook}>
                Create Book
            </Button>
            
            <div className="books-container" style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                {
                    books.map((book, index) => {
                        return (
                            <Book book={book} key={index}/>
                        )
                    })
                }
            </div>

            <CreateBook open={createBookOpen} handleClose={handleCloseCreateBook} handleUpdate={handleUpdate}/>
        </div>
    )
}

export default Homepage;