import express from 'express';

import { signupUser , loginUser} from '../controller/user-controller.js';
import { uploadImage ,getImage} from '../controller/image-controller.js';
import upload from '../utils/upload.js'
import { createPost,getAllPosts ,getPost,updatePost,deletePost} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment , getComments,deleteComment} from '../controller/comment-controller.js';
const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);
router.post('/create',authenticateToken,createPost);
router.post('/comment/new',authenticateToken,newComment);


router.get('/file/:filename',getImage);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getPost);
router.get('/comments/:id',authenticateToken,getComments),

router.put('/update/:id',authenticateToken,updatePost);

router.delete('/delete/:id',authenticateToken,deletePost);
router.delete('/comment/delete/:id',authenticateToken,deleteComment);

export default router;