
// we can encrypt all the passwords that we are saving in mongodb using bcrypt library
// so that if someone hacks our db then they can't see our password.

// you can learn about bcrypt from here: https://blog.logrocket.com/password-hashing-node-js-bcrypt/#password-hashing


// import { response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Token from '../model/token.js';
dotenv.config();
export const signupUser = async(request,response) => {
    // request front-end se aati hai.
    // response backend se jaati hai.

    try{
        // encrypted password=hash(user original password+salt);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(request.body.password, salt);
        const user = {name: request.body.name, username: request.body.username, password: hashedPassword};
        
        // const user=request.body;
        const newUser = new User(user);// validating data type of entered details
        await newUser.save();// now saving the entered details in mongodb.
        return response.status(200).json({ msg:'signup successful'});// sending response to frontend
    } catch(error){
        // sending response to front end if we found any error.
        console.log(error)
        return response.status(500).json({msg:'Error while signup the user'})

    }
}
export const loginUser = async(request,response) => {
    // firstly compare username:
    let user= await User.findOne({username: request.body.username});// if we found user then this user will
    // store name ,username and password as well.
    if(!user){
        return response.status(400).json({msg: 'Username does not match'});
    }
    // now compare password:
    try{
        let match=await bcrypt.compare(request.body.password,user.password);// comparision between user entered password
        // and correct password.
        if(match){
            // now we are going to generate json web token
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY,{expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            // jab apna accessToken expire hoga tab apna jo naya accessToken hai vo refreshToken
            // ki help se generate hoga hence we need to store that refresh token, hence we are going
            // to make a token.js db to store refresh token.

            const newToken = new Token({token: refreshToken});
            await newToken.save();// go and save refresh token into database.

            return response.status(200).json({accessToken: accessToken, refreshToken:refreshToken, name: user.name, username:user.username});
        }
        else{
            // console.log('Password does not match');
            return response.status(400).json({msg: 'Password does not match'});
        }
    }
    catch(error){
        return response.status(500).json({msg: 'Error while login in user'});
    }

}

