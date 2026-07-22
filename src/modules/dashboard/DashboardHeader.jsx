import { Input, Avatar, Badge, Space } from "antd";
import {
  SearchOutlined,
  BellOutlined,
} from "@ant-design/icons";

function DashboardHeader() {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px 24px",
        borderRadius: 16,
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search medicines, invoices, suppliers..."
        style={{
          width: 450,
        }}
      />

      <Space size={20}>
        <Badge count={5}>
          <BellOutlined
            style={{
              fontSize: 22,
            }}
          />
        </Badge>

        <Avatar size={40}>
          A
        </Avatar>
      </Space>
    </div>
  );
}

export default DashboardHeader;