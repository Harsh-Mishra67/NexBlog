import { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    maxWidth: '100%',
    maxHeight: '50vh',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginTop: '80px',
    marginBottom: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
});


const InputTextField = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    font-family: 'Bell MT', serif;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const TextArea = styled(Typography)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    font-style: italic;
    background-color: #ECE68C;
    border: 2px solid #070002;
    border-radius: 6px;
    overflow-wrap: break-word;
`;

const IconContainer = styled(Box)`
    display: flex;
    margin-left: 10px; /* Space between title and icons */
    margin-top:40px;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Author = styled(Box)`
    color: #878787;
    display: flex;
`;

const DetailView = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const url = post.picture ? post.picture : 'https://th.bing.com/th?id=OIP.TRNXjrKQXvevPz7MTXWbtgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        let response = await API.deletePost(post._id);
        if (response.isSuccess) {
            navigate('/');
        }
    };

    return (
        <Container>
            <Image src={url} alt="blog" />
            <Box display="flex" alignItems="center">
                <InputTextField>{post.title}</InputTextField>
                {account.username === post.username && (
                    <IconContainer>
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </IconContainer>
                )}
            </Box>
            <Author>
                <Typography>Author: <Box component="span" style={{ fontWeight: 600 }}>{post.username}</Box></Typography>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <TextArea>{post.description}</TextArea>
            <Comments post={post}/>
        </Container>
    );
}

export default DetailView;
