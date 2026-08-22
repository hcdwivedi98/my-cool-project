// src/modules/pharmacy/drug-category/components/sections/AuditSection.jsx

import React from "react";

import {
    Col,
    Descriptions,
    Row,
    Tag,
} from "antd";

import {
    CalendarOutlined,
    ClockCircleOutlined,
    EditOutlined,
    UserOutlined,
} from "@ant-design/icons";


const AuditSection = ({
    data = {},
}) => {

    const {
        createdBy,
        createdOn,
        modifiedBy,
        modifiedOn,
    } = data;


    return (
        <div className="form-section">

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="form-section-header">

                <div className="form-section-title">
                    Audit Information
                </div>

                <div className="form-section-description">
                    System-maintained record creation
                    and modification information.
                </div>

            </div>


            {/* =================================================
                AUDIT DETAILS
            ================================================= */}

            <Descriptions
                bordered
                size="small"
                column={{
                    xs: 1,
                    sm: 2,
                    md: 2,
                }}
            >

                {/* CREATED BY */}

                <Descriptions.Item
                    label={
                        <span>
                            <UserOutlined
                                style={{
                                    marginRight: 6,
                                }}
                            />
                            Created By
                        </span>
                    }
                >
                    {createdBy || "-"}
                </Descriptions.Item>


                {/* CREATED ON */}

                <Descriptions.Item
                    label={
                        <span>
                            <CalendarOutlined
                                style={{
                                    marginRight: 6,
                                }}
                            />
                            Created On
                        </span>
                    }
                >
                    {createdOn || "-"}
                </Descriptions.Item>


                {/* MODIFIED BY */}

                <Descriptions.Item
                    label={
                        <span>
                            <EditOutlined
                                style={{
                                    marginRight: 6,
                                }}
                            />
                            Modified By
                        </span>
                    }
                >
                    {modifiedBy || "-"}
                </Descriptions.Item>


                {/* MODIFIED ON */}

                <Descriptions.Item
                    label={
                        <span>
                            <ClockCircleOutlined
                                style={{
                                    marginRight: 6,
                                }}
                            />
                            Modified On
                        </span>
                    }
                >
                    {modifiedOn || "-"}
                </Descriptions.Item>

            </Descriptions>


            {/* =================================================
                SYSTEM MANAGED NOTE
            ================================================= */}

            <div className="audit-system-note">

                <Tag
                    color="blue"
                >
                    System Managed
                </Tag>

                <span>
                    Audit information is automatically
                    maintained by the system and cannot
                    be edited manually.
                </span>

            </div>

        </div>
    );
};


export default AuditSection;