// src/models/Task.ts
import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the task'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);