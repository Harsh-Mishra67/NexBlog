
import { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
    max-width: 100%;  // Ensure it doesn't exceed the screen width
    box-sizing: border-box;  // Include padding and border in the element's total width and height
    word-wrap: break-word;  // Break long words to fit within the container
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
    flex-wrap: wrap;  // Ensure the content wraps within the container
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    color: #878787;
    font-size: 14px;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const CommentText = styled(Typography)`
    word-wrap: break-word;  // Break long words to fit within the container
    overflow-wrap: break-word;  // Ensure words break properly
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {
        let response = await API.deleteComment(comment._id);
        if (response.isSuccess) {
            setToggle(prevState => !prevState);
        }
    };

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && <DeleteIcon onClick={() => removeComment()} />}
            </Container>
            <Box>
                <CommentText>{comment.comments}</CommentText>
            </Box>
        </Component>
    );
};

export default Comment;
