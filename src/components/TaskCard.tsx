import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Tag } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    completed: boolean;
  };
  onComplete: (id: string) => void;
}

export const TaskCard = ({ task, onComplete }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  return (
    <Card
      className={`p-4 mb-4 hover-scale glass-card ${
        task.completed ? "opacity-75" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            <Badge
              variant="secondary"
              className={`${priorityColors[task.priority]} text-xs`}
            >
              {task.priority}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{task.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{task.dueDate}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`ml-4 transition-opacity ${
            isHovered || task.completed ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => onComplete(task.id)}
        >
          <CheckCircle
            className={`w-5 h-5 ${
              task.completed ? "text-green-500" : "text-gray-400"
            }`}
          />
        </Button>
      </div>
    </Card>
  );
};