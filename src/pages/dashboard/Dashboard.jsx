import {
  Row,
  Col,
  Card,
  Button,
  List,
} from "antd";

import {
  PlusOutlined,
} from "@ant-design/icons";

//import DashboardHeader from "../../components/dashboard/DashboardHeader";
import {
    StatCard,
    SalesChart,
    LowStockWidget,
    ExpiryWidget,
} from "../../modules/dashboard";


function Dashboard() {
  return (
    <>
 

      <h1
        style={{
          marginBottom: 24,
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        Pharmacy Dashboard
      </h1>

      <Card
        style={{
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <h2>
          Welcome Back, Admin 👋
        </h2>

        <p>
          Monitor pharmacy operations,
          inventory and prescriptions
          from one place.
        </p>
      </Card>

      {/* KPI CARDS */}

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <StatCard
            title="Today's Sales"
            value="₹1,42,580"
            color="#1677FF"
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <StatCard
            title="Pending Prescriptions"
            value="42"
            color="#52C41A"
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <StatCard
            title="Low Stock Alerts"
            value="28"
            color="#FF4D4F"
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <StatCard
            title="Near Expiry"
            value="12"
            color="#FAAD14"
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <StatCard
            title="Purchase Orders"
            value="18"
            color="#722ED1"
          />
        </Col>

        <Col xs={24} md={12} lg={8}>
          <StatCard
            title="Revenue"
            value="₹8,94,200"
            color="#13C2C2"
          />
        </Col>
      </Row>

      {/* MAIN SECTION */}

      <Row
        gutter={[16, 16]}
        style={{
          marginTop: 24,
        }}
      >
        <Col xs={24} lg={16}>
          <Card
            title="Sales Analytics"
            style={{
              borderRadius: 16,
            }}
          >
            <SalesChart />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Quick Actions"
            style={{
              marginBottom: 16,
              borderRadius: 16,
            }}
          >
            <Button
              type="primary"
              block
              style={{ marginBottom: 10 }}
            >
              Generate Bill
            </Button>

            <Button
              block
              style={{ marginBottom: 10 }}
            >
              Create Purchase Order
            </Button>

            <Button
              block
              style={{ marginBottom: 10 }}
            >
              Add Medicine
            </Button>

            <Button block>
              Stock Adjustment
            </Button>
          </Card>

          <Card
            title="Recent Activities"
            style={{
              borderRadius: 16,
            }}
          >
            <List
              dataSource={[
                "Bill #1024 Generated",
                "Purchase Added",
                "Medicine Updated",
                "Stock Transfer Completed",
                "Supplier Added",
              ]}
              renderItem={(item) => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* LOW STOCK & EXPIRY */}
      {/* LOW STOCK & EXPIRY */}

      <Row
        gutter={[16, 16]}
        style={{
          marginTop: 24,
        }}
      >
        <Col xs={24} lg={12}>
          <LowStockWidget />
        </Col>

        <Col xs={24} lg={12}>
          <ExpiryWidget />
        </Col>
      </Row>

    </>
  );
}

export default Dashboard;