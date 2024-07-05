
import { Box,Typography,styled } from "@mui/material";

const Image = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
     
`;
const Heading = styled(Typography)`
    font-size: 70px;
    color: #000000; /* Black color */
    line-height: 1;
    font-style: italic; /* Italic font style */
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
    line-height: 1
`;
const Banner = () =>{
    return(
        <Image>
            {/* <Heading>BLOG</Heading>
            <SubHeading>CRICKET</SubHeading> */}
        </Image>
    )
}
export default Banner;