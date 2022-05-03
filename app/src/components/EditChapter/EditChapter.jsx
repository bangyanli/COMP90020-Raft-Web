import * as React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
    Button,
    TextField
} from "@mui/material"
import Slide from '@mui/material/Slide';
import { uploadBookChapter } from '../../api/book';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddChapter(props) {
    const {open, handleClose, bookName} =  props;

    const [chapterName, setChapterName] = React.useState("");
    const [content, setContent] = React.useState("");

    const handleChangeName = (e) => {
        setChapterName(e.target.value);
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleAddChapter = () => {
        // TODO handle failure
        uploadBookChapter(bookName, chapterName, content);
        handleClose();
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>Add chapter</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color: "black"}}>Chapter Name</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    value={chapterName}
                    onChange={handleChangeName}
                    
                />
                <DialogContentText sx={{color: "black", mt: "10px"}}>Content</DialogContentText>
                <TextField
                    fullWidth
                    multiline
                    margin="dense"
                    variant="outlined"
                    placeholder="Enter the content of the chapter"
                    minRows={8}
                    maxRows={8}
                    value={content}
                    onChange={handleChangeContent}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddChapter}>Add Chapter</Button>
            </DialogActions>
        </Dialog>
    )
}

function EditChapter(props) {
    const {open, handleClose, currentChapter, bookName} =  props;

    const [content, setContent] = React.useState("");


    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleEditChapter = () => {
        // TODO handle failure
        uploadBookChapter(bookName, currentChapter, content);
        handleClose();
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>Edit chapter</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color: "black", mt: "10px"}}>New Content</DialogContentText>
                <TextField
                    fullWidth
                    multiline
                    margin="dense"
                    variant="outlined"
                    placeholder="Update the content of the chapter"
                    minRows={8}
                    maxRows={8}
                    value={content}
                    onChange={handleChangeContent}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEditChapter}>Edit Chapter</Button>
            </DialogActions>
        </Dialog>
    )

}

// function Chapter() {

// }

export {
    AddChapter,
    EditChapter
}