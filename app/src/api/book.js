

const BASE_URL = process.env.REACT_APP_BASE_URL;


async function getAllBooks() {
    const url = `${BASE_URL}/library`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await fetch(url, requestInit)
    if(response.ok) {
        const res = await response.json();
        return res.data;
    }
}

async function getBookInfo(bookName) {
    const url = `${BASE_URL}/library/book/${bookName}`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await fetch(url, requestInit)
    if(response.ok) {
        const res = await response.json();
        return res.data;
    }
}

async function getBookIndex(bookName) {
    const url = `${BASE_URL}/library/book/${bookName}/index`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await fetch(url, requestInit)
    if(response.ok) {
        const res = await response.json();
        return res.data;
    }
}

async function postBook(bookName, author, category, description) {
    const url = `${BASE_URL}/library/book/${bookName}`;
    const data = new FormData();
    data.append("author", author);
    data.append("category", category);
    data.append("description", description);

    const requestInit = {
        method : "POST",
        body: data
    }
    const response = await fetch(url, requestInit)
    if(response.ok) {
        const res = await response.json();
        return res.data;
    }
}

async function getBookChapter(bookName, chapterName) {
    const url = `${BASE_URL}/library/book/${bookName}/${chapterName}`;
    const requestInit = {
        method : "GET",
        
    }
    const response = await fetch(url, requestInit)
    if(response.ok) {
        const res = await response.json();
        return res.data;
    }
}

async function uploadBookChapter(bookName, chapterName, content) {
    const url = `${BASE_URL}/library/book/${bookName}/${chapterName}`;
    const data = new FormData();
    data.append("file", content);

    const requestInit = {
        method : "POST",
        body: data
    }
    const response = await fetch(url, requestInit)
    if(response.ok) {
        const res = await response.json();
        return res.data;
    }
}

export {
    getAllBooks,
    getBookInfo,
    getBookIndex,
    postBook,
    getBookChapter,
    uploadBookChapter
}