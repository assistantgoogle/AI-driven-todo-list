import { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { Analytics } from "@/components/Analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Draft and finalize the Q2 project proposal for client review",
    category: "Work",
    dueDate: "2024-03-20",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Weekly Team Meeting",
    description: "Discuss project progress and upcoming milestones",
    category: "Meetings",
    dueDate: "2024-03-15",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Gym Session",
    description: "30-minute cardio and strength training",
    category: "Personal",
    dueDate: "2024-03-14",
    priority: "low",
    completed: true,
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");

  const handleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Button className="hover-scale">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tasks..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-4 fade-in">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;