// src/components/TaskList.tsx
'use client';

import { Task } from '@/types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  isLoading: boolean;
}

export default function TaskList({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  isLoading 
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div role="status" className="flex justify-center items-center">
          <svg 
            aria-hidden="true" 
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" 
            viewBox="0 0 100 101" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
              fill="currentColor"
            />
            <path 
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446058 41.7345 1.27082C39.2613 1.69028 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <p>No tasks found. Start by adding a new task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div 
          key={task._id} 
          className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task._id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div>
              <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={() => onDeleteTask(task._id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
            aria-label="Delete task"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}