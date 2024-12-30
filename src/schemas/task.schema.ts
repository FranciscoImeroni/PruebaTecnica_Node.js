import { Schema, Document, Types } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Task extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  assignedUser: Types.ObjectId;
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;
}

export const TaskSchema = new Schema<Task>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedUser: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: TaskStatus, default: TaskStatus.PENDING },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});


export const TASK_NAME = 'Task'; 
