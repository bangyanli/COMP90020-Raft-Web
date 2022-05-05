import * as React from 'react';
import { useState } from "react";
import './CreateBook.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import InputField from "../Common/InputField";

import { postBook } from '../../api/book';


// Reference: https://codesandbox.io/s/cgeml1?file=/demo.js

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CreateBook(props) {
    const {open, handleClose, handleUpdate} =  props;

    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookCategory, setBookCategory] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    // const [bookContent, setBookContent] = useState("");

    const handleSubmit = () => {
        postBook(bookName, bookAuthor, bookCategory, bookDescription).then(res => {
            handleClose();
            handleUpdate();
        });
        // TODO: Format data from state and submit request to backend
    }

    return(
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar sx={{bgcolor: "#2196F3"}}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Create a new Book
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                    Create
                </Button>
            </Toolbar>
        </AppBar>
        <div className="book-form">
            <InputField label="Name" name="name" valueState={bookName} setValueState={setBookName} />
            <InputField label="Author" name="author" valueState={bookAuthor} setValueState={setBookAuthor} />
            <InputField label="Category" name="category" valueState={bookCategory} setValueState={setBookCategory} />
            <InputField label="Description" name="description" valueState={bookDescription} setValueState={setBookDescription} style={{ width: "80%", height:"40vh" }} textarea={true} />
            {/* <InputField label="Content" name="content" valueState={bookContent} setValueState={setBookContent} style={{ width: "100%", height:"20em" }} textarea={true} /> */}
        </div>
      </Dialog>
    )
}

export default CreateBook;