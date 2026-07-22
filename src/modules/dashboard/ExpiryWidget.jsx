import { Card, Table, Tag } from "antd";

function ExpiryWidget() {
  const data = [
    {
      key: 1,
      medicine: "Crocin",
      days: 15,
    },
    {
      key: 2,
      medicine: "Azithromycin",
      days: 22,
    },
    {
      key: 3,
      medicine: "Insulin",
      days: 30,
    },
  ];

  const columns = [
    {
      title: "Medicine",
      dataIndex: "medicine",
    },
    {
      title: "Days Left",
      dataIndex: "days",
      render: (value) => (
        <Tag color="orange">
          {value} Days
        </Tag>
      ),
    },
  ];

  return (
    <Card
      title="Expiring Medicines"
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

export default ExpiryWidget;