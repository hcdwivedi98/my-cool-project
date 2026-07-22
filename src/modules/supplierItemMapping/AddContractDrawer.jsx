import React, { useState, useEffect, } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import {
    Drawer,
    Form,
    Row,
    Col,
    Input,
    Select,
    InputNumber,
    Button,
    Space,
    Card,
    Switch,
    message,
    Upload,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { AppDatePicker } from "@/components/common";


function AddContractDrawer({
    open,
    onClose,
    onSave,
}) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const handleSave = async () => {
        try {
            await form.validateFields();

            const payload = form.getFieldsValue(true);
            onSave?.(payload);

            console.log(payload);

            // API Call
            // await saveSupplierItemMapping(payload);

            message.success(
                "Mapping saved successfully"
            );

            handleReset();

            onClose();

            // Parent Grid Refresh
            // loadMappings();

        } catch (error) {
            console.log(error);
        }
    };

    const handleReset = () => {
        form.resetFields();
    };
    const contractType = Form.useWatch(
        "contractType",
        form
    );
    const purchaseRate = Form.useWatch(
        "purchaseRate",
        form
    );
    const purchaseUom = Form.useWatch(
        "purchaseUom",
        form
    );
    const currency = Form.useWatch(
        "currency",
        form
    );


    const contractQuantity = Form.useWatch(
        "contractQuantity",
        form
    );

    const consumedQuantity = Form.useWatch(
        "consumedQuantity",
        form
    );

    const startDate = Form.useWatch(
        "startDate",
        form
    );

    const endDate = Form.useWatch(
        "endDate",
        form
    );
    useEffect(() => {
        if (!startDate || !endDate) {
            form.setFieldValue(
                "active",
                false
            );
            return;
        }

        const today = dayjs();

        const isActive =
            today.isSameOrAfter(
                dayjs(startDate),
                "day"
            ) &&
            today.isSameOrBefore(
                dayjs(endDate),
                "day"
            );

        form.setFieldValue(
            "active",
            isActive
        );
    }, [
        startDate,
        endDate,
        form,
    ]);
    useEffect(() => {
        const rate =
            Number(purchaseRate) || 0;

        const qty =
            Number(contractQuantity) || 0;

        const consumed =
            Number(consumedQuantity) || 0;

        form.setFieldValue(
            "contractValue",
            rate * qty
        );

        form.setFieldValue(
            "remainingQuantity",
            qty - consumed
        );
    }, [
        purchaseRate,
        contractQuantity,
        consumedQuantity,
        form,
    ]);

    return (
        <>
            <Drawer
                title="Add Contract"
                width={1000}
                open={open}
                onClose={onClose}
                footer={
                    <Space
                        style={{
                            width: "100%",
                            justifyContent:
                                "flex-end",
                        }}
                    >
                        <Button onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="primary"
                            onClick={handleSave}
                        >
                            Save Contract
                        </Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row gutter={[16, 16]}>

                        {/* Contract Information */}

                        <Col span={24}>
                            <Card
                                title="Contract Information"
                                size="small"
                            >
                                <Row gutter={[16, 16]}>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Contract Number"
                                            name="contractNumber"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter Contract Number",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Contract Type"
                                            name="contractType"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please select Contract Type",
                                                },
                                            ]}
                                        >
                                            <Select
                                                options={[
                                                    {
                                                        label:
                                                            "Rate Contract",
                                                        value:
                                                            "RATE_CONTRACT",
                                                    },
                                                    {
                                                        label:
                                                            "Annual Contract",
                                                        value:
                                                            "ANNUAL_CONTRACT",
                                                    },
                                                    {
                                                        label:
                                                            "Tender Contract",
                                                        value:
                                                            "TENDER_CONTRACT",
                                                    },
                                                    {
                                                        label:
                                                            "Spot Purchase",
                                                        value:
                                                            "SPOT_PURCHASE",
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Start Date"
                                            name="startDate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select Start Date",
                                                },
                                            ]}
                                        >
                                            <AppDatePicker />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="End Date"
                                            name="endDate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select End Date",
                                                },
                                            ]}
                                        >
                                            <AppDatePicker />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Active"
                                            name="active"
                                            valuePropName="checked"
                                        >
                                            <Switch disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Commercial Terms"
                                size="small"
                            >
                                <Row gutter={[16, 16]}>

                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Purchase Rate"
                                            name="purchaseRate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter Purchase Rate",
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                min={0}
                                                precision={2}
                                                style={{
                                                    width: "100%",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Currency"
                                            name="currency"
                                            initialValue="INR"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select Currency",
                                                },
                                            ]}
                                        >
                                            <Select
                                                options={[
                                                    {
                                                        label: "INR",
                                                        value: "INR",
                                                    },
                                                    {
                                                        label: "USD",
                                                        value: "USD",
                                                    },
                                                    {
                                                        label: "EUR",
                                                        value: "EUR",
                                                    },
                                                    {
                                                        label: "AED",
                                                        value: "AED",
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Purchase UOM"
                                            name="purchaseUom"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </Card>
                        </Col>


                        <Col span={24}>
                            <Card
                                title="Tax Calculation"
                                size="small"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Tax Type"
                                            name="taxType"
                                            initialValue="GST"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select Tax Type",
                                                },
                                            ]}
                                        >
                                            <Select
                                                options={[
                                                    {
                                                        label: "GST",
                                                        value: "GST",
                                                    },
                                                    {
                                                        label: "IGST",
                                                        value: "IGST",
                                                    },
                                                    {
                                                        label: "Exempted",
                                                        value: "EXEMPTED",
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            noStyle
                                            shouldUpdate
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select GST %",
                                                },
                                            ]}
                                        >
                                            {({ getFieldValue }) =>
                                                getFieldValue("taxType") !==
                                                "EXEMPTED" && (
                                                    <Form.Item
                                                        label="GST %"
                                                        name="gstPercentage"
                                                    >
                                                        <Select
                                                            options={[
                                                                {
                                                                    label: "0%",
                                                                    value: 0,
                                                                },
                                                                {
                                                                    label: "5%",
                                                                    value: 5,
                                                                },
                                                                {
                                                                    label: "12%",
                                                                    value: 12,
                                                                },
                                                                {
                                                                    label: "18%",
                                                                    value: 18,
                                                                },
                                                                {
                                                                    label: "28%",
                                                                    value: 28,
                                                                },
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                )
                                            }
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        {(
                            contractType === "ANNUAL_CONTRACT" ||
                            contractType === "TENDER_CONTRACT"
                        ) && (
                                <Col span={24}>
                                    <Card
                                        title="Supply Commitment"
                                        size="small"
                                    >
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} md={6}>
                                                <Form.Item
                                                    label={`Contract Quantity ${purchaseUom
                                                        ? `(${purchaseUom})`
                                                        : ""
                                                        }`}
                                                    name="contractQuantity"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please enter Contract Quantity",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        precision={2}
                                                        style={{ width: "100%" }}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Form.Item
                                                label="Contract Value"
                                                name="contractValue"
                                                extra={
                                                    purchaseRate &&
                                                        contractQuantity ? (
                                                        <span
                                                            style={{
                                                                fontSize: "10px",
                                                                color: "#1677ff",
                                                                fontStyle: "italic"
                                                            }}
                                                        >
                                                            {`${contractQuantity} ${purchaseUom || ""
                                                                } × ${currency || "INR"} ${purchaseRate || 0
                                                                }/${purchaseUom || ""}`}
                                                        </span>
                                                    ) : null
                                                }
                                            >
                                                <InputNumber
                                                    disabled
                                                    precision={2}
                                                    style={{ width: "100%" }}
                                                />
                                            </Form.Item>
                                            <Col xs={24} md={6}>
                                                <Form.Item
                                                    label="Consumed Quantity"
                                                    name="consumedQuantity"
                                                >
                                                    <InputNumber
                                                        disabled
                                                        style={{ width: "100%" }}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} md={6}>
                                                <Form.Item
                                                    label="Remaining Quantity"
                                                    name="remainingQuantity"
                                                >
                                                    <InputNumber
                                                        disabled
                                                        style={{ width: "100%" }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            )}
                        <Col span={24}>
                            <Card
                                title="Discounts"
                                size="small"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Purchase Discount %"
                                            name="purchaseDiscount"
                                        >
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{
                                                    width: "100%",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Additional Discount %"
                                            name="additionalDiscount"
                                        >
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{
                                                    width: "100%",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Delivery Commitment"
                                size="small"

                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Committed Delivery Days"
                                            name="committedDeliveryDays"
                                            tooltip="Standard delivery time after PO"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter Contract Quantity",
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                min={1}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Emergency Delivery"
                                            name="emergencyDelivery"
                                            valuePropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            noStyle
                                            shouldUpdate
                                        >
                                            {({ getFieldValue }) =>
                                                getFieldValue(
                                                    "emergencyDelivery"
                                                ) && (
                                                    <Form.Item
                                                        label="Emergency Delivery Hours"
                                                        name="emergencyDeliveryHours"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Please enter emergency delivery hours",
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            min={1}
                                                            max={24}
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </Form.Item>
                                                )
                                            }
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Penalty Clause"
                                size="small"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Penalty Applicable"
                                            name="penaltyApplicable"
                                            valuePropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>
                                    </Col>

                                    <Form.Item
                                        noStyle
                                        shouldUpdate
                                    >
                                        {({ getFieldValue }) =>
                                            getFieldValue(
                                                "penaltyApplicable"
                                            ) && (
                                                <>
                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Penalty %"
                                                            name="penaltyPercentage"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Enter Penalty Percentage",
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber
                                                                min={0}
                                                                max={100}
                                                                precision={2}
                                                                addonAfter="%"
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            label="Penalty Reason"
                                                            name="penaltyReason"
                                                        >
                                                            <Input.TextArea
                                                                rows={2}
                                                                placeholder="Late Delivery, Short Supply, Quality Issue etc."
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </>
                                            )
                                        }
                                    </Form.Item>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Renewal Settings"
                                size="small"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Auto Renewal"
                                            name="autoRenewal"
                                            valuePropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            label="Renewal Reminder (Days)"
                                            name="renewalReminderDays"
                                            initialValue={30}
                                        >
                                            <Select
                                                options={[
                                                    {
                                                        label: "30 Days",
                                                        value: 30,
                                                    },
                                                    {
                                                        label: "60 Days",
                                                        value: 60,
                                                    },
                                                    {
                                                        label: "90 Days",
                                                        value: 90,
                                                    },
                                                    {
                                                        label: "120 Days",
                                                        value: 120,
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Renewal Remarks"
                                            name="renewalRemarks"
                                        >
                                            <Input.TextArea
                                                rows={2}
                                                placeholder="Special renewal conditions, negotiation notes, approval requirements etc."
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Contract Documents Upload"
                                size="small"
                            >
                                <Row gutter={[16, 16]}>

                                    <Col span={24}>
                                        <Form.Item

                                            name="documents"
                                        >
                                            <Upload.Dragger
                                                beforeUpload={() => false}
                                                fileList={fileList}
                                                onChange={({ fileList }) =>
                                                    setFileList(fileList)
                                                }
                                                multiple
                                            >
                                                <p>
                                                    <UploadOutlined
                                                        style={{
                                                            fontSize: 40,
                                                            color: "#1677ff",
                                                        }}
                                                    />
                                                </p>

                                                <p
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Drag & Drop Contract Files Here
                                                </p>

                                                <p
                                                    style={{
                                                        color: "#8c8c8c",
                                                    }}
                                                >
                                                    or Click to Browse Files
                                                </p>
                                            </Upload.Dragger>
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </Card>
                        </Col>

                    </Row>
                </Form >
            </Drawer >


        </>
    );
}

export default AddContractDrawer;