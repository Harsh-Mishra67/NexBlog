import{useState,useEffect,useContext} from 'react';
import { Box, styled, FormControl, InputBase, Button,TextareaAutosize} from "@mui/material";
import {AddCircle as Add, Description} from '@mui/icons-material';
import { categories } from "../../constants/data";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
const Image = styled('img')({
    maxWidth: '100%', // Ensure the image doesn't exceed its container width
    maxHeight: '50vh', // Limit the image height to 50% of the viewport height
    objectFit: 'cover', // Maintain aspect ratio and cover the entire container
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginTop: '80px',
    marginBottom:'20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
});

const Container = styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}));
const StyleFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;

`;
const InputTextField = styled(InputBase)`
    font-weight: 600;
    font-family: 'Bell MT', serif;
    flex: 1;
    margin: 0 30px;
    font-size: 22px;
    padding: 10px;
    border: 1px solid #ccc; // Adding border
    border-radius: 4px;
`;
const TextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    font-style: italic;
    background-color: #ECE68C;
    border: 2px solid #070002;  // Define the border and set its color
    border-radius: 6px;
`;


const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}



const Update = ()=>{

    const[post,setPost]=useState(initialPost);
    const handleChange = (e) =>{
        setPost({...post,[e.target.name]: e.target.value});
    }
    const updateBlogPost = async()=>{
        let response=await API.updatePost(post);
        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
    }

    const {account}= useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();
    const {id}=useParams();

    const url = post.picture?post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const[file,setFile]=useState('');

    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])
    useEffect(() => {
        const getImage = async() =>{
            if(file){
                const data=new FormData();
                data.append("name",file.name);
                data.append("file",file);

                // API Call
                const response=await API.uploadFile(data);
                // post.picture='response.data';
                setPost({ ...post, picture: response.data });

            }
        };
        getImage();
        post.categories=location.search?.split('=')[1] ||'All' ;
        post.username = account.username;
        // setPost(prevPost => ({
        //     ...prevPost,
        //     categories: location.search?.split('=')[1] || 'All',
        //     username: account.username
        // }));

    },[file])
    return(
        <Container>
            <Image src={url} alt="Upload Image of type jpg or png" />

            <StyleFormControl>
                <label htmlFor= "fileInput">
                    <Add fontSize="large" color="action"/>
                </label>
                <input 
                    type="file"
                    id="fileInput"
                    style={{ display: 'none'}}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField placeholder="Title" value={post.title}onChange={(e)=>handleChange(e)} name="title" />
                <Button variant="contained" onClick={()=>updateBlogPost()}>Update</Button>


            </StyleFormControl>
            <TextArea
                minRows={10}
                placeholder="Write your blog...."
                onChange={(e)=>handleChange(e)} 
                name="description"
                value={post.description}
            />
        </Container>
    );
};
export default Update;