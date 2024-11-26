// src/components/TaskForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { Task } from '@/types/Task';
import { TaskSchema } from '@/lib/validations';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, '_id' | 'createdAt'>) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      const newTask = TaskSchema.parse({ 
        title, 
        description: description || undefined,
        completed: false
      });
      
      onAddTask(newTask);
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (error) {
      // Validation errors will be handled by Zod
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full p-2 border rounded mb-2"
        required
        maxLength={100}
      />
      <textarea 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description (Optional)"
        className="w-full p-2 border rounded mb-2"
        rows={2}
        maxLength={500}
      />
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}