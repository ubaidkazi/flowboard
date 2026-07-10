import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";



const data = [
  {
    name: "Alex",
    completed: 24,
    progress: 5,
  },
  {
    name: "Sarah",
    completed: 18,
    progress: 8,
  },
  {
    name: "Mike",
    completed: 15,
    progress: 3,
  },
  {
    name: "Emily",
    completed: 12,
    progress: 6,
  },
  {
    name: "James",
    completed: 10,
    progress: 4,
  },
];




export default function TeamPerformanceChart() {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis
            dataKey="name"
            type="category"
          />

          <Tooltip />

          <Bar
            dataKey="completed"
            fill="#000"
            radius={[4, 4, 4, 4]}
          />

          <Bar
            dataKey="progress"
            fill="#555"
            radius={[4, 4, 4, 4]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}