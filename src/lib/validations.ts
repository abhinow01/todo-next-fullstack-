// src/lib/validations.ts
import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
  completed: z.boolean().optional().default(false)
});

export type TaskInput = z.infer<typeof TaskSchema>;