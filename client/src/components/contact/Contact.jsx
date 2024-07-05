import { Box, styled, Typography, Link } from '@mui/material';

const Banner = styled(Box)`
    background-image: url('https://images.pexels.com/photos/221011/pexels-photo-221011.jpeg?auto=compress&cs=tinysrgb&w=600');
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: scroll; /* Optional */
`;


const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Contact Me</Typography>   
                <br /> 
                <Text variant="h6">
                    Have a suggestion or found an issue on the website? Feel free to reach out to me on 
                    &nbsp;
                    <Link href="https://www.linkedin.com/in/harsh-mishra67" target="_blank">
                        LinkedIn
                    </Link>
                    &nbsp;or via&nbsp;
                    <Link href="mailto:hm670691@gmail.com?Subject=Website Feedback" target="_blank">
                        Email
                    </Link>.
                    <br /><br />
                    Your feedback is valuable!
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;
