// A .jsx file is a JavaScript extension file that is commonly used for React applications. 
//JSX stands for JavaScript XML, and it's a syntax extension for JavaScript that allows developers 
// to write HTML-like code within their JavaScript code. This makes it easier to write and understand 
// the structure of React components.

// react learn: https://www.geeksforgeeks.org/react-tutorial/
import {useState,useContext} from 'react';
import {Box,TextField, Button,styled, Typography, FormControl} from "@mui/material";// for css we are using styled component
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';


const Component = styled(Box)`

    // margin-top:280px;
    width: 400px;                   // Set width to 400 pixels.
    margin: auto;                   // Center the component horizontally.
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6); // Apply a box shadow with specified dimensions and color.
    // padding: 20px,0,0;
    & > div {
        margin-top: 64px;         // Add margin from the top to the wrapper div.
    }
`;

// change css of image:
// as img is not part of material ui hence we are writeing it like this
const Image = styled('img')({
    width: '150px',                // Set width of the image to 100 pixels.
    margin: 'auto',                // Center the image horizontally.
    display: 'flex',               //you can learn flexbox from here:: https://www.youtube.com/watch?v=DWk2mndNTHY
    padding: '50px 0 0'            // Apply padding of 50 pixels on the top, and no padding on the sides and bottom.
});


const Wrapper = styled(Box)`
    padding: 20px 25px;                           // Add padding of 25 pixels on the top and bottom, 25 pixels on the left and right.
    // You can learn flexbox from here: https://www.youtube.com/watch?v=DWk2mndNTHY
    display: flex;                                // Set display to flex to enable flexbox layout for the container and its children.
    flex: 1;                                       //to set the flex-grow property to 1, allowing the container to grow and fill available space.
    flex-direction: column;                       // Set the main axis of the flex container to be vertical, arranging flex items in a column.
    // changing css of individual elements using its parent:
    & > div,& > button{
        margin-top:20px;
    }
`;

// as p is not part of material ui hence we are writeing it like this
const Paragraph = styled('p')({
    textAlign:'center', // - Set the text alignment of the paragraph to center.
    color:'#878787',
    marginBottom:'0px',
    fontSize:'16px'
});

// for login :
const LoginButton1 = styled(Button)`
    text-transform: none; // Preserve the original text case without modification.
    background: #228B22; // Set background color to green.
    height: 48px; // Set height to 48 pixels.
    color: #FFFFFF; // Set text color to white.
    border-radius: 4px; // Apply border radius of 4 pixels.
    &:hover {
        background: #008000;
    }
`;

const SignUpButton1=styled(Button)`
    text-transform: none; // Ensure that the text transform remains as it is, without any modifications.
    background: #6495ED;
    color:#FFFFFF;
    height: 48px;
    border-radius: 4px;
    box-shadow: 0px 2px 4px 0px rgb(0 0 0/ 20%);
    &:hover {
        background: #3B5998;
    }
`;
// for create account:
const LoginButton2 = styled(Button)`
    text-transform: none; // Preserve the original text case without modification.
    background: #6495ED; 
    color: #FFFFFF; // Set text color to white.
    height: 48px; // Set height to 48 pixels.
    border-radius: 4px; // Apply border radius of 4 pixels.
    box-shadow: 0px 2px 4px 0px rgb(0 0 0/ 20%);
    &:hover {
        background: #3B5998;
    }
`;

const SignUpButton2=styled(Button)`
    text-transform: none; // Ensure that the text transform remains as it is, without any modifications.
    background: #228B22; // Set background color to green.
    height: 48px;
    color:#FFFFFF;
    border-radius: 4px;
    &:hover {
        background: #008000;
    }
`;

const Error =  styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top: 10px;
    font-weight:600;
`

// making dummy object for storing signup contents:
const SignUpInitialValues = {
    name:'',
    username:'',
    password:''
}
const LoginInitialValues = {
    username:'',
    password:''
}
const Login= ({isUserAuthenticated}) =>{
    const imageURL = 'https://www.aglobalreach.com/wp-content/uploads/2012/07/Web-Content-Blog.jpg';
    // const imageURL = 'https://th.bing.com/th/id/R.10964c7c32e0956d72789b1f380deb58?rik=193g4z3oNldJEg&riu=http%3a%2f%2fblog.marketamerica.com%2fwp-content%2fuploads%2f2013%2f10%2fBlog.jpg&ehk=nFOh%2f38AQlEN%2bo8EdTfRDm16aSlehuqNBe0HMYHQVUQ%3d&risl=1&pid=ImgRaw&r=0';

    const [account,toggleAccount]= useState('login');
    const toggleSignUp=()=>{
        account==='signup'?toggleAccount('login'):toggleAccount('signup');
    }

    const[signup,setSignup]=useState(SignUpInitialValues);
    const onInputChange=(e)=>{
        setSignup({... signup,[e.target.name]: e.target.value});
    }

    const[login,setLogin]=useState(LoginInitialValues);
    const onValueChange = (e) =>{
        setLogin({...login,[e.target.name]: e.target.value});
    }

    const[error,setError]=useState('');

    const{setAccount}= useContext(DataContext);
    const navigate = useNavigate();

    // the things that we are writing during signup we are storing them 
    // usig this:


    const signupUser = async()=>{
        let response = await API.userSignup(signup);// jo bhi value humare signup me stored hai use humne api pe call kar dia to store them in db.
        if(response.isSuccess){
            setError('');
            setSignup(SignUpInitialValues);
            toggleAccount('login')
        }
        else{
            setError('Something went wrong! Please try again later')// if we find any error in signup
            // then we need to show this on user's screen.
        }
    }
    const loginUser = async()=>{
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');

            // if we are able to sign in successfully then humare paas user_controller.js se
            // kuchh cheeze aa rahi hai:
            
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            // name
            // username
            setAccount({username: response.data.username,name: response.data.name})
            isUserAuthenticated(true)
            navigate('/');
        }
        else{
            setError('Something went wrong! Please try again later');// if we find any error in login
            // then we need to show this on user's screen.
        }
    }
    return(
        // The <Box> component in Material-UI serves as a versatile layout and styling component, 
        // similar to a <div>, but with additional features and styling options provided by Material-UI.
        <Component>
            <Box>
                <Image src={imageURL} alt='login'/>
                
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)} name="username" label="Enter Username " InputLabelProps={{ shrink: true }}/>
                            <TextField variant="standard" value={login.password} onChange={(e)=>onValueChange(e)} name="password" label="Enter Password"  InputLabelProps={{ shrink: true }}/>

                            {error && <Error>{error}</Error>}
                            

                            <LoginButton1 variant="contained" onClick={() => loginUser()}>Login</LoginButton1>
                            <Paragraph>OR</Paragraph>
                            <SignUpButton1 variant="contained" onClick={()=> toggleSignUp()}>Create an account</SignUpButton1>
                        </Wrapper>
                    :// when account===signup
                        <Wrapper>
                            <TextField variant="standard" onChange={(e)=> onInputChange(e)} name="name" label="Enter Name" InputLabelProps={{ shrink: true }} />
                            <TextField variant="standard" onChange={(e)=> onInputChange(e)} name="username" label="Enter Username" InputLabelProps={{ shrink: true }} />
                            <TextField variant="standard" onChange={(e)=> onInputChange(e)} name="password" label="Enter Password" InputLabelProps={{ shrink: true }}/>

                            {error && <Error>{error}</Error>}
                            

                            <SignUpButton2 variant="contained" onClick={() => signupUser()}  >Sign Up</SignUpButton2>
                            <Paragraph>OR</Paragraph>
                            <LoginButton2 variant="contained" onClick={() => toggleSignUp()} >Already have an account</LoginButton2>
                        </Wrapper>
                }
            </Box>
        </Component>
    );
};
// if we are making any component then we need to export it.
export default Login;


