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
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id'>) => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>) => {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },
};