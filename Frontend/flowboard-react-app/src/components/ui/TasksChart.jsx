import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  { date: "Mon", tasks: 3 },
  { date: "Tue", tasks: 5 },
  { date: "Wed", tasks: 26 },
  { date: "Thu", tasks: 8 },
  { date: "Fri", tasks: 12 },
  { date: "Sat", tasks: 18 },
  { date: "Sun", tasks: 2 },
]; 


export default function TasksChart() {
  return (
    <div className="grid gap-4 lg:grid-cols-1 mb-8  ">
      
      {/* Card */}
      <div className="">
        
        

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              
              <CartesianGrid strokeDasharray="3 3" />
              
              <XAxis dataKey="date" />
              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="tasks"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}