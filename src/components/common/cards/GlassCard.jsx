import { Card } from "antd";

const GlassCard = ({
  children,
  width = 480,
}) => {
  return (
    <Card
      styles={{
        body: {
          padding: "32px",
        },
      }}
      style={{
        width,
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </Card>
  );
};

export default GlassCard;