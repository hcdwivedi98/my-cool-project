import React, { useState } from "react";

import {
    Drawer,
    Form,
    Row,
    Col,
    Input,
    Select,
    DatePicker,
    Card,
    Button,
    Table,
    InputNumber,
    Space,
    Tag,
    Statistic,
    Typography,
    message,
} from "antd";

import {
    SaveOutlined,
    SearchOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

import ItemSearchModal from "./ItemSearchModal";
import ApiPayloadPreview from "../common/ApiPayloadPreview";
import AppDrawerFooter from "../common/AppDrawerFooter";
function AddPurchaseRequisitionDrawer({
    open,
    onClose,
}) {

    const [form] = Form.useForm();
    const { Text } = Typography;
    const [formValues, setFormValues] = useState({});
    const [openItemSearch, setOpenItemSearch] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [prNumber] = useState(() => {

        const year =
            new Date().getFullYear();

        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );

        return `PR-${year}-${random}`;
    });
    const storeOptions = [

        {
            label: "Main Pharmacy Store",
            value: 1,
            centerId: 1,
        },

        {
            label: "Emergency Pharmacy Store",
            value: 2,
            centerId: 1,
        },

        {
            label: "OT Pharmacy Store",
            value: 3,
            centerId: 2,
        },

        {
            label: "Ward Pharmacy Store",
            value: 4,
            centerId: 2,
        },
    ];

    const centerOptions = [

        {
            label: "LifeCare Hospital - Lucknow",
            value: 1,
        },

        {
            label: "LifeCare Hospital - Kanpur",
            value: 2,
        },
    ];

    const subStoreOptions = [

        {
            label: "ICU Store",
            value: 1,
            storeId: 1,
        },

        {
            label: "NICU Store",
            value: 2,
            storeId: 1,
        },

        {
            label: "Ward Store",
            value: 3,
            storeId: 2,
        },
    ];
    const payload = {
        header: formValues,
        items: selectedItems,
    };
    const itemColumns = [
        {
            title: "Item Code",
            dataIndex: "itemCode",
            width: 120,
        },
        {
            title: "Medicine Name",
            dataIndex: "itemName",
            width: 300,
        },
        {
            title: "Required Qty",
            width: 150,
            render: (_, record) => (

                <InputNumber
                    min={1}
                    value={
                        record.requiredQty
                    }

                    onChange={value => {

                        setSelectedItems(
                            prev =>

                                prev.map(x =>

                                    x.key ===
                                        record.key

                                        ? {
                                            ...x,
                                            requiredQty:
                                                value
                                        }

                                        : x
                                )
                        );
                    }}

                    style={{
                        width: "100%",
                    }}
                />
            )
        },
        {
            title: "UOM",
            dataIndex: "uom",
            width: 100,
        },

        {
            title: "Remarks",
            width: 220,
            render: () => (
                <Input
                    placeholder="Remarks"
                />
            )
        },

        {
            title: "Action",
            width: 100,
            fixed: "right",
            render: (_, record) => (

                <Button

                    danger

                    type="text"

                    onClick={() =>

                        setSelectedItems(

                            prev =>

                                prev.filter(
                                    x =>
                                        x.key !==
                                        record.key
                                )
                        )
                    }
                >
                    Remove
                </Button>
            )
        }
    ];

    const itemData = [
        {
            key: 1,
            itemName: "Paracetamol 500mg",
            currentStock: 120,
            suggestedQty: 500,
            uom: "Tablet",
            rate: 1.25,
        },
        {
            key: 2,
            itemName: "Amoxicillin 250mg",
            currentStock: 50,
            suggestedQty: 300,
            uom: "Capsule",
            rate: 5.00,
        },
    ];
    const handleSubmit = async () => {

        try {

            const values =
                await form.validateFields();

            if (
                selectedItems.length === 0
            ) {

                message.error(
                    "Please add at least one medicine"
                );

                return;
            }

            const invalidQty =
                selectedItems.some(
                    x =>
                        !x.requiredQty ||
                        x.requiredQty <= 0
                );

            if (invalidQty) {

                message.error(
                    "Please enter valid quantity"
                );

                return;
            }

            const payload = {

                prNo:
                    prNumber,

                prDate:
                    values.prDate,

                requiredDate:
                    values.requiredDate,

                storeId:
                    values.store,

                departmentId:
                    values.department,

                priority:
                    values.priority,

                remarks:
                    values.remarks,

                items:

                    selectedItems.map(
                        item => ({

                            itemCode:
                                item.itemCode,

                            itemName:
                                item.itemName,

                            requiredQty:
                                item.requiredQty,

                            uom:
                                item.uom,

                            remarks:
                                item.remarks,
                        })
                    )
            };

            console.log(
                "PR Payload",
                payload
            );

            message.success(
                "Purchase Requisition Submitted Successfully"
            );

        }
        catch {

            message.error(
                "Please fill mandatory fields"
            );
        }
    };
    const handleSaveDraft =
        async () => {

            try {

                const values =
                    form.getFieldsValue();

                const draftPayload = {

                    prNo: prNumber,

                    status: "Draft",

                    ...values,

                    items:
                        selectedItems,
                };

                console.log(
                    "Draft Payload",
                    draftPayload
                );

                message.success(
                    "Draft Saved Successfully"
                );

            }
            catch {

                message.error(
                    "Unable to save draft"
                );
            }
        };
    return (
        <Drawer
            title={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        

                    }}
                    

                >
                    <div>

                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                            }}
                        >
                            Purchase Requisition
                        </div>
                        <div
                            style={{
                                color: "#8c8c8c",
                                fontSize: 12,
                            }}
                        >
                            Create medicine purchase request
                        </div>
                    </div>
                    <Tag color="processing">
                        Draft | {prNumber}
                    </Tag>
                </div>
            }
            open={open}
            onClose={onClose}
            size="large"
            destroyOnClose
            styles={{
                body: {
                    background:
                        "#f5f7fa",

                    paddingBottom: 100,
                }
            }}
            footer={

                <AppDrawerFooter

    submitText="Submit Requisition"

    onCancel={onClose}

    onSaveDraft={handleSaveDraft}

    onSubmit={handleSubmit}

/>

            }
        >
            <Space
                direction="vertical"
                size={16}
                style={{
                    width: "100%",
                }}
            >
                {/* Requisition Information */}
                <Card
                    title="Requisition Information"
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                        border: "none",
                    }}
                    styles={{
                        header: {
                            background: "#fafafa",
                            borderBottom: "1px solid #f0f0f0",
                        }
                    }}
                >
                    <Form

                        form={form}

                        onValuesChange={(_, allValues) => {

                            setFormValues(
                                allValues
                            );
                        }}
                    >
                        <Row gutter={16}>

                            <Col span={8}>
                                <Form.Item
                                    label="Center"
                                    name="center"
                                >
                                    <Select
                                        placeholder="Select Center"
                                        options={centerOptions}

                                        onChange={(value) => {

                                            setSelectedCenter(value);

                                            form.setFieldValue(
                                                "store",
                                                null
                                            );

                                            form.setFieldValue(
                                                "subStore",
                                                null
                                            );

                                            setSelectedStore(null);
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    label="Store"
                                    name="store"
                                >
                                    <Select

                                        placeholder="Select Store"

                                        options={
                                            storeOptions.filter(
                                                x =>
                                                    x.centerId ===
                                                    selectedCenter
                                            )
                                        }

                                        onChange={(value) => {

                                            setSelectedStore(value);

                                            form.setFieldValue(
                                                "subStore",
                                                null
                                            );
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>

                                <Form.Item
                                    label="Sub Store"
                                    name="subStore"

                                >
                                    <Select

                                        placeholder="Select Sub Store"

                                        options={
                                            subStoreOptions.filter(
                                                x =>
                                                    x.storeId ===
                                                    selectedStore
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    label="Required Date"
                                    name="requiredDate"
                                >
                                    <DatePicker
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    label="Priority"
                                    name="priority"
                                >
                                    <Select
                                        placeholder="Select Priority"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label="Remarks"
                                    name="remarks"
                                >
                                    <Input.TextArea
                                        rows={3}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>

                    </Form>

                </Card>

                {/* Item Selection */}

                <Card

                    title="Item Selection"

                    style={{

                        borderRadius: 12,

                        boxShadow:
                            "0 2px 12px rgba(0,0,0,0.05)",

                        border: "none",
                    }}

                    styles={{
                        header: {

                            background:
                                "#fafafa",

                            borderBottom:
                                "1px solid #f0f0f0",
                        }
                    }}
                >

                    <Row
                        gutter={16}
                        style={{
                            marginBottom: 16,
                        }}
                    >

                        <Col span={12}>

                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                onClick={() =>
                                    setOpenItemSearch(true)
                                }
                            >
                                Search Medicines
                            </Button>

                        </Col>

                    </Row>

                    <Table

                        columns={itemColumns}

                        dataSource={selectedItems}

                        pagination={false}

                        scroll={{
                            x: 1000,
                        }}
                    />

                </Card>

                {/* Summary */}

                <Card

                    title="Summary"

                    style={{

                        borderRadius: 12,

                        boxShadow:
                            "0 2px 12px rgba(0,0,0,0.05)",

                        border: "none",
                        
                    }}

                    styles={{
                        header: {

                            background:
                                "#fafafa",

                            borderBottom:
                                "1px solid #f0f0f0",
                                
                        }
                    }}
                >

                    <Row gutter={16}>

                        <Col span={6}>
                            <Card size="small" >
                                <Card
    bodyStyle={{
        padding:20,
    }}
    style={{
        borderRadius:16,
        boxShadow:
            "0 6px 18px rgba(0,0,0,.06)",
    }}
>

    <Row
        justify="space-between"
    >

        <Avatar
            size={42}
            style={{
                background:"#E6F4FF",
                color:"#1677ff",
            }}
        >
            📦
        </Avatar>

        <Tag color="green">

            +5 Today

        </Tag>

    </Row>

    <Typography.Text
        type="secondary"
        style={{
            fontSize:13,
        }}
    >

        Total Items

    </Typography.Text>

    <div
        style={{
            fontSize:34,
            fontWeight:700,
            marginTop:6,
        }}
    >

        28

    </div>

</Card>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small">
                                <Statistic
                                    title="Total Qty"

                                    value={
                                        selectedItems.reduce(
                                            (sum, item) =>

                                                sum +
                                                Number(
                                                    item.requiredQty || 0
                                                ),

                                            0
                                        )
                                    }
                                />
                            </Card>
                        </Col>

<Col span={6}>
    <Card size="small">
        <Statistic
            title="Priority"
            value={
                form.getFieldValue("priority") || "-"
            }
        />
    </Card>
</Col>
              <Col span={6}>
    <Card size="small">
        <Statistic
            title="Required Date"
            value={
                form.getFieldValue("requiredDate")
                    ? form.getFieldValue("requiredDate").format("DD-MMM-YYYY")
                    : "-"
            }
        />
    </Card>
</Col>          

                        
                        

                    </Row>

                </Card>
                <ApiPayloadPreview
                    payload={payload}
                />

            </Space>


            <ItemSearchModal

                open={openItemSearch}

                onClose={() =>
                    setOpenItemSearch(false)
                }

                onSelect={item => {

                    const exists =
                        selectedItems.some(
                            x =>
                                x.key === item.key
                        );

                    if (exists) {

                        message.warning(
                            "Medicine already added"
                        );

                        return;
                    }

                    setSelectedItems([
                        ...selectedItems,
                        {
                            ...item,
                            requiredQty: 1,
                            remarks: "",
                        }
                    ]);

                    setOpenItemSearch(false);
                }}
            />



        </Drawer>

    );

}

export default AddPurchaseRequisitionDrawer;