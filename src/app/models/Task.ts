import mongoose, {Schema, Document, Types} from 'mongoose'
import { TTask } from '../types'
import { TASK_STATUS } from '../constants/statusTasks';
import { TASK_PRIORITY } from '../constants/priorityTask';

export const TaskSchema : Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(TASK_STATUS),
        default: TASK_STATUS.PENDING
    },
    codeTask: {
        type: Number,
        trim: true
    },
    priority: {
        type: String,
        enum: Object.values(TASK_PRIORITY),
        default: TASK_PRIORITY.MEDIUM
    },
    // completedBy: [
    //     {
    //         user: {
    //             type: Types.ObjectId,
    //             ref: 'User',
    //             default: null
    //         },
    //         status: {
    //             type: String,
    //             enum: Object.values(TASK_STATUS),
    //             default: TASK_STATUS.PENDING
    //         }
    //     }
    // ],
    // notes: [
    //     {
    //         type: Types.ObjectId,
    //         ref: 'Note'
    //     }
    // ]
}, {timestamps: true, strict: false})

// Middleware
// TaskSchema.pre('deleteOne', {document: true}, async function() {
//     const taskId = this._id
//     if(!taskId) return
//     await Note.deleteMany({task: taskId})
// })

export default mongoose.models.Task || mongoose.model<TTask>("Task", TaskSchema);