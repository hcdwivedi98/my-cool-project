// src/modules/pharmacy/manufacturer/components/sections/DocumentsSection.jsx

import React from "react";

import {
    Button,
    Card,
    Col,
    DatePicker,
    Empty,
    Form,
    Input,
    Row,
    Select,
    Space,
    Table,
    Tooltip,
} from "antd";

import {
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";

const DocumentsSection = ({
    mode = "ADD",
    lookup = {},
}) => {
    const isView = mode === "VIEW";

    return (
        <Card
            size="small"
            title="Documents & Certifications"
            className="manufacturer-section-card"
            styles={{
                body: {
                    padding: "16px",
                },
            }}
        >
            <Form.List name="documents">
                {(
                    fields,
                    {
                        add,
                        remove,
                    }
                ) => (
                    <>
                        {!isView && (
                            <div
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                <Button
                                    type="dashed"
                                    icon={
                                        <PlusOutlined />
                                    }
                                    onClick={() =>
                                        add({
                                            documentType:
                                                undefined,
                                            documentName:
                                                "",
                                            documentNumber:
                                                "",
                                            issueDate:
                                                null,
                                            expiryDate:
                                                null,
                                            remarks:
                                                "",
                                        })
                                    }
                                >
                                    Add Document
                                </Button>
                            </div>
                        )}

                        {fields.length ===
                        0 ? (
                            <Empty
                                image={
                                    Empty.PRESENTED_IMAGE_SIMPLE
                                }
                                description="No documents added"
                            />
                        ) : (
                            <div
                                style={{
                                    overflowX:
                                        "auto",
                                }}
                            >
                                <Table
                                    size="small"
                                    pagination={false}
                                    bordered
                                    rowKey="key"
                                    dataSource={fields}
                                    columns={[
                                        {
                                            title:
                                                "Document Type",
                                            width: 200,
                                            render:
                                                (
                                                    _,
                                                    field
                                                ) => (
                                                    <Form.Item
                                                        {...field}
                                                        name={[
                                                            field.name,
                                                            "documentType",
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Select document type",
                                                            },
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Select
                                                            showSearch
                                                            optionFilterProp="label"
                                                            placeholder="Select type"
                                                            options={
                                                                lookup.documentTypes ||
                                                                lookup.licenseTypes ||
                                                                []
                                                            }
                                                            disabled={
                                                                isView
                                                            }
                                                        />
                                                    </Form.Item>
                                                ),
                                        },

                                        {
                                            title:
                                                "Document Name",
                                            width: 220,
                                            render:
                                                (
                                                    _,
                                                    field
                                                ) => (
                                                    <Form.Item
                                                        {...field}
                                                        name={[
                                                            field.name,
                                                            "documentName",
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Enter document name",
                                                            },
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input
                                                            placeholder="e.g. Manufacturing License"
                                                            maxLength={
                                                                150
                                                            }
                                                            disabled={
                                                                isView
                                                            }
                                                        />
                                                    </Form.Item>
                                                ),
                                        },

                                        {
                                            title:
                                                "Document Number",
                                            width: 180,
                                            render:
                                                (
                                                    _,
                                                    field
                                                ) => (
                                                    <Form.Item
                                                        {...field}
                                                        name={[
                                                            field.name,
                                                            "documentNumber",
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input
                                                            placeholder="Document number"
                                                            maxLength={
                                                                100
                                                            }
                                                            disabled={
                                                                isView
                                                            }
                                                        />
                                                    </Form.Item>
                                                ),
                                        },

                                        {
                                            title:
                                                "Issue Date",
                                            width: 150,
                                            render:
                                                (
                                                    _,
                                                    field
                                                ) => (
                                                    <Form.Item
                                                        {...field}
                                                        name={[
                                                            field.name,
                                                            "issueDate",
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <DatePicker
                                                            style={{
                                                                width:
                                                                    "100%",
                                                            }}
                                                            format="DD-MM-YYYY"
                                                            placeholder="Issue date"
                                                            disabled={
                                                                isView
                                                            }
                                                        />
                                                    </Form.Item>
                                                ),
                                        },

                                        {
                                            title:
                                                "Expiry Date",
                                            width: 150,
                                            render:
                                                (
                                                    _,
                                                    field
                                                ) => (
                                                    <Form.Item
                                                        {...field}
                                                        name={[
                                                            field.name,
                                                            "expiryDate",
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <DatePicker
                                                            style={{
                                                                width:
                                                                    "100%",
                                                            }}
                                                            format="DD-MM-YYYY"
                                                            placeholder="Expiry date"
                                                            disabled={
                                                                isView
                                                            }
                                                        />
                                                    </Form.Item>
                                                ),
                                        },

                                        {
                                            title:
                                                "Remarks",
                                            width: 200,
                                            render:
                                                (
                                                    _,
                                                    field
                                                ) => (
                                                    <Form.Item
                                                        {...field}
                                                        name={[
                                                            field.name,
                                                            "remarks",
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input
                                                            placeholder="Remarks"
                                                            maxLength={
                                                                250
                                                            }
                                                            disabled={
                                                                isView
                                                            }
                                                        />
                                                    </Form.Item>
                                                ),
                                        },

                                        {
                                            title:
                                                "Action",
                                            width: 70,
                                            fixed: "right",
                                            align: "center",
                                            render:
                                                (
                                                    _,
                                                    field
                                                ) =>
                                                    !isView ? (
                                                        <Tooltip title="Remove document">
                                                            <Button
                                                                type="text"
                                                                danger
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                onClick={() =>
                                                                    remove(
                                                                        field.name
                                                                    )
                                                                }
                                                            />
                                                        </Tooltip>
                                                    ) : null,
                                        },
                                    ]}
                                />
                            </div>
                        )}
                    </>
                )}
            </Form.List>
        </Card>
    );
};

export default DocumentsSection;