
import { myFetch } from "./util";

// const BASE_URL = process.env.REACT_APP_BASE_URL;


async function getAllBooks() {
    const url = `/library`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function getBookInfo(bookName) {
    const url = `/library/book/${bookName}`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function getBookIndex(bookName) {
    const url = `/library/book/${bookName}/index`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function postBook(bookName, author, category, description) {
    const url = `/library/book/${bookName}`;
    const data = new FormData();
    data.append("author", author);
    data.append("category", category);
    data.append("description", description);

    const requestInit = {
        method : "POST",
        body: data
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function getBookChapter(bookName, chapterName) {
    const url = `/library/book/${bookName}/${chapterName}`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function uploadBookChapter(bookName, chapterName, content) {
    const url = `/library/book/${bookName}/${chapterName}`;
    const data = new FormData();
    data.append("file", content);

    const requestInit = {
        method : "POST",
        body: data
    }
    const response = await myFetch(url, requestInit)
    return response;
}

export {
    getAllBooks,
    getBookInfo,
    getBookIndex,
    postBook,
    getBookChapter,
    uploadBookChapter
}