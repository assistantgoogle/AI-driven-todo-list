import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Mon", completed: 4, total: 6 },
  { name: "Tue", completed: 3, total: 4 },
  { name: "Wed", completed: 5, total: 7 },
  { name: "Thu", completed: 2, total: 5 },
  { name: "Fri", completed: 6, total: 8 },
  { name: "Sat", completed: 3, total: 4 },
  { name: "Sun", completed: 1, total: 2 },
];

export const Analytics = () => {
  const totalTasks = data.reduce((acc, day) => acc + day.total, 0);
  const completedTasks = data.reduce((acc, day) => acc + day.completed, 0);
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-4">
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-2">Task Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-bold text-green-500">{completionRate}%</p>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar
                name="Completed Tasks"
                dataKey="completed"
                fill="rgba(34, 197, 94, 0.6)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                name="Total Tasks"
                dataKey="total"
                fill="rgba(99, 102, 241, 0.6)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};