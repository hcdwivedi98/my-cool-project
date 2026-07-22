import React from "react";
import { Row, Col } from "antd";

import {
    MedicineBoxOutlined,
    CheckCircleOutlined,
    StopOutlined,
    WarningOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";

import { AppStatCard } from "../../../components/common/cards";

function DrugStats({ stats = {} }) {

    const cards = [

        {
            title: "Total Medicines",
            value: stats.total ?? 0,
            color: "#1677ff",
            icon: <MedicineBoxOutlined />,
        },

        {
            title: "Active",
            value: stats.active ?? 0,
            color: "#52c41a",
            icon: <CheckCircleOutlined />,
        },

        {
            title: "Inactive",
            value: stats.inactive ?? 0,
            color: "#faad14",
            icon: <StopOutlined />,
        },

        {
            title: "Low Stock",
            value: stats.lowStock ?? 0,
            color: "#fa8c16",
            icon: <WarningOutlined />,
        },

        {
            title: "Expiring Soon",
            value: stats.expiring ?? 0,
            color: "#ff4d4f",
            icon: <ClockCircleOutlined />,
        },

    ];

    return (

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>

            {

                cards.map((card) => (

                    <Col
                        key={card.title}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                        xl={4}
                        xxl={4}
                    >

                        <AppStatCard
                            title={card.title}
                            value={card.value}
                            icon={card.icon}
                            color={card.color}
                        />

                    </Col>

                ))

            }

        </Row>

    );

}

export default React.memo(DrugStats);