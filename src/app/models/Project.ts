import mongoose, { Schema, Types } from "mongoose";
import { ProjectType } from "../types";

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: "Task"
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

export default mongoose.models.Project || mongoose.model<ProjectType>("Project", ProjectSchema);
