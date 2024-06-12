import mongoose, { Schema } from "mongoose";
import { TUser } from "../types";

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    file: {
        type: Buffer,
        contentType: String,
        required: false, 
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model<TUser>("User", UserSchema);
