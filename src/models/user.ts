import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[],
    

}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        trim :true,
        unique:true,
    },
    email: {
        type: String,
        required: [true,"Username is required"],
    },
    password: {
        type: String,
        required: [true,"password is required"],
    },
    verifyCode: {
        type: String,
        required: [true,"verifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true,"verifyCodeExpiry is required"],
    },
    isVerified: {
        type: Boolean,
        default:false
        
    },
    isAcceptingMessage: {
        type: Boolean,
        default:true,
    },
    messages: {
        type: [MessageSchema],
    
    },
})

export const  UserModel = (mongoose.models.User as mongoose.Model<User>) ||mongoose.model<User>("User", UserSchema)