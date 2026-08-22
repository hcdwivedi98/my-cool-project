// src/modules/pharmacy/drug-category/components/sections/BasicSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";

import {
    CodeOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const BasicSection = ({
    disabled = false,
}) => {
    return (
        <div className="form-section">

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="form-section-header">
                <div className="form-section-title">
                    Basic Information
                </div>

                <div className="form-section-description">
                    Define the basic identification
                    and description of the drug category.
                </div>
            </div>


            {/* =================================================
                FORM FIELDS
            ================================================= */}

            <Row gutter={[16, 4]}>

                {/* CATEGORY CODE */}

                <Col
                    xs={24}
                    sm={24}
                    md={12}
                >
                    <Form.Item
                        name="categoryCode"
                        label="Category Code"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter category code.",
                            },
                            {
                                max: 50,
                                message:
                                    "Category code cannot exceed 50 characters.",
                            },
                            {
                                pattern:
                                    /^[A-Za-z0-9_-]+$/,
                                message:
                                    "Only letters, numbers, underscore and hyphen are allowed.",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <CodeOutlined />
                            }
                            placeholder="e.g. ANTIBIOTIC"
                            maxLength={50}
                            disabled={disabled}
                            allowClear={!disabled}
                            style={{
                                textTransform:
                                    "uppercase",
                            }}
                        />
                    </Form.Item>
                </Col>


                {/* CATEGORY NAME */}

                <Col
                    xs={24}
                    sm={24}
                    md={12}
                >
                    <Form.Item
                        name="categoryName"
                        label="Category Name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter category name.",
                            },
                            {
                                max: 100,
                                message:
                                    "Category name cannot exceed 100 characters.",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <FileTextOutlined />
                            }
                            placeholder="e.g. Antibiotic"
                            maxLength={100}
                            disabled={disabled}
                            allowClear={!disabled}
                        />
                    </Form.Item>
                </Col>


                {/* DESCRIPTION */}

                <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                max: 500,
                                message:
                                    "Description cannot exceed 500 characters.",
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Enter a brief description of this drug category..."
                            rows={4}
                            maxLength={500}
                            showCount
                            disabled={disabled}
                        />
                    </Form.Item>
                </Col>

            </Row>
        </div>
    );
};

export default BasicSection;