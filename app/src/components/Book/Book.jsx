
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Book(props) {
    const {book} = props;
    const overflowControl = {
        overflow: "auto", 
        whiteSpace: "nowrap", 
        textOverflow: "ellipsis"
    }


    return(
        <Card sx={{ width: 340, margin: "20px"}}>
            <CardMedia
                component="img"
                height="140"
                image={book.image ? book.image : "/book.png"}
                alt={book.name}
            />
            <CardContent>
                <Typography variant="h5" component="div" sx={overflowControl}>
                    {book.name}
                </Typography>
                <Typography gutterBottom variant="subtitle1" sx={overflowControl}>
                    Written by: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{overflow: "scroll", height: 60}}>
                    {book.description}
                </Typography>
            </CardContent>
            <CardActions sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <Button size="small" onClick={()=>{alert("open book details")}}>Start Reading</Button>
            </CardActions>
        </Card>
    )


}

export default Book;