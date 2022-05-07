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
import { getBookChapter, uploadBookChapter } from '../../api/book';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddChapter(props) {
    const {open, handleClose, bookName, refresh, currentHost} =  props;

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
        uploadBookChapter(currentHost, bookName, chapterName, content).finally( () => {
            refresh();
            handleClose();
        });
        
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
    const {currentHost, open, handleClose, currentChapter, bookName, refresh} =  props;

    const [content, setContent] = React.useState("");


    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleEditChapter = () => {
        // TODO handle failure
        uploadBookChapter(currentHost, bookName, currentChapter, content).finally(() => {
            refresh();
            handleClose();
        });
        
    }

    React.useEffect(()=> {
        if(open) {
            getBookChapter(currentHost, bookName, currentChapter).then(res => {
                setContent(res);
            })
        }
        // eslint-disable-next-line
    },[open])

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>Edit chapter</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color: "black", mt: "10px"}}>Chapter: {currentChapter}</DialogContentText>
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