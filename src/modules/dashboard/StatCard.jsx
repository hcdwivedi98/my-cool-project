import { Card } from "antd";

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <Card
      style={{
        borderRadius: 16,
        height: 130,
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color,
          marginTop: 15,
        }}
      >
        {value}
      </div>
    </Card>
  );
}

export default StatCard;