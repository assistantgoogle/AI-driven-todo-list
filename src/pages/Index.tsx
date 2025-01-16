import { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { Analytics } from "@/components/Analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";

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

interface NewTaskForm {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const form = useForm<NewTaskForm>();

  const handleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = !task.completed;
          toast({
            title: newStatus ? "Task Completed! 🎉" : "Task Reopened",
            description: `"${task.title}" has been ${newStatus ? "marked as complete" : "reopened"}`,
          });
          return { ...task, completed: newStatus };
        }
        return task;
      })
    );
  };

  const handleAddTask = (data: NewTaskForm) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    toast({
      title: "Task Added Successfully",
      description: "Your new task has been created",
    });
    form.reset();
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hover-scale w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddTask)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Task title" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Task description" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Task category" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="low" />
                              </FormControl>
                              <FormLabel className="text-green-600">Low</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="medium" />
                              </FormControl>
                              <FormLabel className="text-yellow-600">Medium</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="high" />
                              </FormControl>
                              <FormLabel className="text-red-600">High</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Create Task</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
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
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No tasks found. Try adjusting your search or add a new task.
                </div>
              )}
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