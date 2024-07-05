import { Box, styled, Typography, Link } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">NexBlog</Typography>
                <Text variant="h6">NexBlog, created by Harsh Mishra, is a user-friendly platform designed 
                    for bloggers to create, manage, and interact through posts and comments effortlessly. 
                    Whether you're sharing your thoughts, engaging with other's content, or exploring new ideas, 
                    NexBlog offers a responsive and intuitive experience across all devices.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
