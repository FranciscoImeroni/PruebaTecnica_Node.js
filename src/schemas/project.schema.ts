import { Schema, Document } from 'mongoose';

export interface Project extends Document {
  name: string;
  description: string;
  users: string[];
}

export const ProjectSchema = new Schema<Project>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  users: [{ type: String, required: true }],
});

export const PROJECT_NAME = 'Project'; 
