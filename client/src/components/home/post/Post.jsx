

import { Box ,Typography, styled} from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";
const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin:10px;
    height: 350px;
    display: flex;
    align-items:center;
    flex-direction: column;
    &>p{
        padding: 0 5px 5px 5px;
    }
`
const Image = styled('img')({
    width:'100%',
    borderRadius:'10px 10px 0 0',
    objectFit:'cover',
    height:'150px',
})

const Text=styled(Typography)`
    color:#878787;
    font-size:12px;
`;
const Heading = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    font-family: 'Bell MT', serif;
`;
const Details=styled(Typography)`
    font-size:18px;
    font-style:italic;
    word-break: break-word;
`
const Post =({post})=>{
    const url=post.picture?post.picture:'https://th.bing.com/th?id=OIP.TRNXjrKQXvevPz7MTXWbtgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2';
    return (
        <Container>
            <Image src={url} alt="blog" />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 20)}</Heading>
            <Text>
                by <span style={{ fontWeight: 600 }}>{post.username}</span>
            </Text>
            <Details style={{ whiteSpace: 'pre-wrap' }}>{addElipsis(post.description, 80)}</Details>
        </Container>
    );
}
export default Post;