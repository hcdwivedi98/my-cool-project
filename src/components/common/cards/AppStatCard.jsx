import React from "react";
import { Card } from "antd";
import "./AppStatCard.css";

function AppStatCard({

    title,

    value,

    icon,

    color = "#1677ff",

    onClick,

}) {

    return (

        <Card

            hoverable

            className="erp-stat-card"

            onClick={onClick}

        >

            <div className="erp-stat-header">

                <span className="erp-stat-title">

                    {title}

                </span>

            </div>

            <div className="erp-stat-body">

                <span
                    className="erp-stat-icon"
                    style={{ color }}
                >
                    {icon}
                </span>

                <span
                    className="erp-stat-value"
                    style={{ color }}
                >
                    {value}
                </span>

            </div>

        </Card>

    );

}

export default React.memo(AppStatCard);