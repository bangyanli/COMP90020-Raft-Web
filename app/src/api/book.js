
import { myFetch } from "./util";

// const BASE_URL = process.env.REACT_APP_BASE_URL;


async function getAllBooks(baseUrl) {
    const url = `${baseUrl}/library`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function getBookInfo(baseUrl, bookName) {
    const url = `${baseUrl}/library/book/${bookName}`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function getBookIndex(baseUrl, bookName) {
    const url = `${baseUrl}/library/book/${bookName}/index`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function postBook(baseUrl, bookName, author, category, description) {
    const url = `${baseUrl}/library/book/${bookName}`;
    const data = new FormData();
    data.append("author", author);
    data.append("category", category);
    data.append("description", description);

    const requestInit = {
        method : "POST",
        body: data
    }
    const response = await myFetch(url, requestInit)
    console.log(response)
    return response;
}

async function getBookChapter(baseUrl, bookName, chapterName) {
    const url = `${baseUrl}/library/book/${bookName}/${chapterName}`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await myFetch(url, requestInit)
    return response;
}

async function uploadBookChapter(baseUrl, bookName, chapterName, content) {
    const url = `${baseUrl}/library/book/${bookName}/${chapterName}`;
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