import React from "react";
import { Row, Col } from "antd";

import {
    FileTextOutlined,
    EditOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

import { AppStatCard } from "../../../components/common/cards";

function PurchaseStats({ data = [] }) {

    const stats = [

        {
            title: "Total PR",
            value: data.length,
            color: "#1677ff",
            icon: <FileTextOutlined />,
        },

        {
            title: "Draft",
            value: data.filter(x => x.status === "Draft").length,
            color: "#722ED1",
            icon: <EditOutlined />,
        },

        {
            title: "Pending",
            value: data.filter(x => x.status === "Pending Approval").length,
            color: "#FA8C16",
            icon: <ClockCircleOutlined />,
        },

        {
            title: "Approved",
            value: data.filter(x => x.status === "Approved").length,
            color: "#52C41A",
            icon: <CheckCircleOutlined />,
        },

        {
            title: "Rejected",
            value: data.filter(x => x.status === "Rejected").length,
            color: "#FF4D4F",
            icon: <CloseCircleOutlined />,
        },

    ];

    return (

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>

            {

                stats.map(card => (

                    <Col
                        key={card.title}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                        xl={4}
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

export default React.memo(PurchaseStats);