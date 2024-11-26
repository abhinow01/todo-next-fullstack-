// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/types/Task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to load tasks');
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  // Add task handler
  const addTask = async (newTask: Omit<Task, '_id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) throw new Error('Failed to add task');
      
      const addedTask = await response.json();
      setTasks([addedTask, ...tasks]);
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  // Toggle task completion
  const toggleTask = async (id: string) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !taskToUpdate?.completed })
      });

      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  // Delete task handler
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onToggleTask={toggleTask} 
        onDeleteTask={deleteTask}
        isLoading={isLoading}
      />
      <Toaster position="top-right" />
    </div>
  );
}