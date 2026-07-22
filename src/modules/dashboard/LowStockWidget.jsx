import { Card, Table, Tag } from "antd";

function LowStockWidget() {
  const data = [
    {
      key: 1,
      medicine: "Paracetamol 650",
      stock: 12,
    },
    {
      key: 2,
      medicine: "Amoxicillin",
      stock: 8,
    },
    {
      key: 3,
      medicine: "Vitamin D3",
      stock: 5,
    },
  ];

  const columns = [
    {
      title: "Medicine",
      dataIndex: "medicine",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (value) => (
        <Tag color="red">{value}</Tag>
      ),
    },
  ];

  return (
    <Card
      title="Low Stock Medicines"
      style={{
        borderRadius: 16,
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
    </Card>
  );
}

export default LowStockWidget;