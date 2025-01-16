import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
  return (
    <Card className="p-6 glass-card">
      <h2 className="text-xl font-semibold mb-6">Weekly Progress</h2>
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
            <Bar
              dataKey="completed"
              fill="rgba(34, 197, 94, 0.6)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="total"
              fill="rgba(99, 102, 241, 0.6)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};