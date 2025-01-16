import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAllTasks: async () => {
    console.log('Fetching all tasks from Spring Boot backend');
    const response = await api.get<Task[]>('/tasks');
    console.log('Received tasks:', response.data);
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id'>) => {
    console.log('Creating new task:', task);
    const response = await api.post<Task>('/tasks', task);
    console.log('Created task:', response.data);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>) => {
    console.log('Updating task:', id, task);
    const response = await api.put<Task>(`/tasks/${id}`, task);
    console.log('Updated task:', response.data);
    return response.data;
  },

  deleteTask: async (id: string) => {
    console.log('Deleting task:', id);
    await api.delete(`/tasks/${id}`);
    console.log('Task deleted successfully');
  },
};