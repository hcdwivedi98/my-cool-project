import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 5200 },
  { month: "Mar", sales: 6800 },
  { month: "Apr", sales: 6100 },
  { month: "May", sales: 7900 },
  { month: "Jun", sales: 9200 },
];

function SalesChart() {
  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="sales"
          stroke="#1677FF"
          fill="#91caff"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;