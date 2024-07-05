import mongoose from "mongoose";
// creating schema.
const userSchema=mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    }
})

const user = mongoose.model('user',userSchema);// hume ye schema user( const user = request.body; in user-controller.js)
//  table/collection par lagana hai
export default user;