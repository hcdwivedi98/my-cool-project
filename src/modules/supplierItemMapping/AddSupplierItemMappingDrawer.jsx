import { useEffect, useState, } from "react";
import {
    Drawer,
    Form,
    Tabs,
    Button,
    Space,
    Row,
    Col,
    Input,
    Select,
    InputNumber,
    Divider,
    Card,
    Statistic,
    Alert,
    Badge,
    Tag,
    Empty,
    Table,
    Switch,
    Avatar,
    Checkbox,
    Popconfirm,
    message,
} from "antd";

import { AppDatePicker } from "@/components/common";
import AddContractDrawer from "./AddContractDrawer";
import dayjs from "dayjs";
import {
    FileTextOutlined,
    CalendarOutlined,
    SafetyOutlined,
    MoreOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
} from "@ant-design/icons";

function AddSupplierItemMappingDrawer({
    open,
    onClose,
    editingRecord,
}) {
    const [form] = Form.useForm();
    const [openContractDrawer, setOpenContractDrawer,] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
   // const [editingRecord,setEditingRecord] = useState(null);
    
   // const [editingRecord, setEditingRecord] = useState(null);

    const [contractHistory,
        setContractHistory] =
        useState([]);

    const [activeContract, setActiveContract] =
        useState(null);
    const taxType =
        Form.useWatch(
            "taxType",
            form
        );
    const gstPercent =
        Form.useWatch(
            "gstPercent",
            form
        );
    const purchaseRate =
        Form.useWatch(
            "purchaseRate",
            form
        );

    const purchaseDiscount =
        Form.useWatch(
            "purchaseDiscountPercent",
            form
        );

    const additionalDiscount =
        Form.useWatch(
            "additionalDiscountPercent",
            form
        );



    const cgst =
        Form.useWatch(
            "cgstPercent",
            form
        );

    const sgst =
        Form.useWatch(
            "sgstPercent",
            form
        );

    const igst =
        Form.useWatch(
            "igstPercent",
            form
        );

    const handleSave = async () => {

        try {

            await form.validateFields();

            const formData =
                form.getFieldsValue(true);

            if (
                centerMappings.length === 0
            ) {
                message.error(
                    "Please map at least one center"
                );
                return;
            }

            const payload = {

                ...formData,

                activeContract,

                centerMappings,

            };
console.log(
    "Final Payload",
    payload
);

          

            // API Call Yahan Hogi
            // await supplierItemService.save(payload);

           if (editingRecord) {

    console.log(
        "Update Payload",
        payload
    );

    message.success(
        "Mapping Updated Successfully"
    );

} else {

    console.log(
        "Create Payload",
        payload
    );

    message.success(
        "Mapping Saved Successfully"
    );
}

            form.resetFields();

            setCenterMappings([]);

            setSelectedCenters([]);

            setActiveContract(null);

            onClose();

        } catch (error) {

            console.log(error);

            message.error(
                "Please complete required fields"
            );
        }
    };
   
    const [
        costSummary,
        setCostSummary,
    ] = useState({
        effectiveCost: 0,
        taxAmount: 0,
        netCost: 0,
    });

    useEffect(() => {

    if (
        editingRecord &&
        open
    ) {

        form.setFieldsValue({

            supplierId:
                editingRecord.supplierId,

            itemId:
                editingRecord.itemId,

            supplierRank:
                editingRecord.rank,

            purchaseRate:
                editingRecord.purchaseRate,

            gstPercent:
                editingRecord.gst,

            leadTimeDays:
                editingRecord.leadTime,

            status:
                editingRecord.status,

            taxType: "GST",

            supplierItemCode:
                editingRecord.supplierItemCode,

            supplierItemName:
                editingRecord.supplierItemName,
        });

    }

    if (
        !editingRecord &&
        open
    ) {

        form.resetFields();

        setActiveContract(null);

        setCenterMappings([
            {
                id: 1,
                centerName:
                    "Main Hospital",
                active: true,
                priority: 1,
                effectiveFrom:
                    dayjs(),
            },

            {
                id: 2,
                centerName:
                    "Emergency Center",
                active: true,
                priority: 2,
                effectiveFrom:
                    dayjs(),
            },
        ]);
    }

}, [
    editingRecord,
    open,
    form,
]);
    useEffect(() => {

        const gst =
            Number(
                gstPercent || 0
            );

        if (taxType === "GST") {

            form.setFieldsValue({
                cgstPercent:
                    gst / 2,

                sgstPercent:
                    gst / 2,

                igstPercent: 0,
            });

        }

        else if (
            taxType === "IGST"
        ) {

            form.setFieldsValue({
                cgstPercent: 0,
                sgstPercent: 0,
                igstPercent: gst,
            });

        }

        else {

            form.setFieldsValue({
                gstPercent: 0,
                cgstPercent: 0,
                sgstPercent: 0,
                igstPercent: 0,
            });

        }

    }, [
        gstPercent,
        taxType,
        form,
    ]);
    useEffect(() => {

        const purchaseUom =
            form.getFieldValue(
                "purchaseUom"
            );

        form.setFieldsValue({
            schemeUom:
                purchaseUom,
        });

    }, [form]);
    useEffect(() => {

        const rate =
            Number(
                purchaseRate || 0
            );

        const disc1 =
            Number(
                purchaseDiscount || 0
            );

        const disc2 =
            Number(
                additionalDiscount || 0
            );


        const afterPurchaseDiscount =
            rate -
            (
                rate *
                disc1 /
                100
            );

        const discountedRate =
            afterPurchaseDiscount -
            (
                afterPurchaseDiscount *
                disc2 /
                100
            );

        let effectiveCost = discountedRate;



        let totalTax =
            0;

        if (
            taxType === "GST"
        ) {
            totalTax =
                Number(cgst || 0)
                +
                Number(sgst || 0);
        }

        if (
            taxType === "IGST"
        ) {
            totalTax =
                Number(igst || 0);
        }

        const taxAmount =
            effectiveCost *
            totalTax /
            100;

        const netCost =
            effectiveCost +
            taxAmount;

        form.setFieldsValue({
            effectiveUnitCost:
                Number(
                    effectiveCost.toFixed(2)
                ),

            taxAmount:
                Number(
                    taxAmount.toFixed(2)
                ),

            netPurchaseCost:
                Number(
                    netCost.toFixed(2)
                ),
        });
        setCostSummary({
            effectiveCost:
                Number(
                    effectiveCost.toFixed(2)
                ),

            taxAmount:
                Number(
                    taxAmount.toFixed(2)
                ),

            netCost:
                Number(
                    netCost.toFixed(2)
                ),
        });

    }, [
        purchaseRate,
        purchaseDiscount,
        additionalDiscount,
        cgst,
        sgst,
        igst,
        taxType,
        form,
    ]);

    const contractHistoryColumns = [
        {
            title: (
                <Space>
                    <FileTextOutlined />
                    Contract No
                </Space>
            ),
            dataIndex: "contractNumber",
        },

        {
            title: (
                <Space>
                    <FileTextOutlined />
                    Contract Type
                </Space>
            ),
            dataIndex: "contractType",
        },

        {
            title: (
                <Space>
                    ₹ Rate
                </Space>
            ),
            dataIndex: "purchaseRate",
        },

        {
            title: (
                <Space>
                    <CalendarOutlined />
                    Start Date
                </Space>
            ),
            dataIndex: "startDate",
        },

        {
            title: (
                <Space>
                    <CalendarOutlined />
                    End Date
                </Space>
            ),
            dataIndex: "endDate",
        },

        {
            title: (
                <Space>
                    <SafetyOutlined />
                    Status
                </Space>
            ),
            dataIndex: "status",
            render: status => (
                <Tag
                    color={
                        status === "ACTIVE"
                            ? "success"
                            : "error"
                    }
                    style={{
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontWeight: 600,
                    }}
                >
                    ● {status}
                </Tag>
            )
        },
        {
            title: "Action",
            key: "action",
            width: 100,
            render: () => (
                <Button
                    type="text"
                    icon={<MoreOutlined />}
                />
            ),
        }
    ];
    const allCenters = [
        "Main Hospital",
        "Emergency Center",
        "OT Pharmacy",
        "IP Pharmacy",
        "Retail Pharmacy",
    ];
    const [selectedCenters, setSelectedCenters] =
        useState([]);
    const [centerMappings,
        setCenterMappings] =
        useState([
            {
                id: 1,
                centerName:
                    "Main Hospital",
                active: true,
                priority: 1,
                effectiveFrom:
                    dayjs(),

            },
            {
                id: 2,
                centerName:
                    "Emergency Center",
                active: true,
                priority: 2,
                effectiveFrom:
                    dayjs(),

            },
        ]);
    const [
        selectedMappedRows,
        setSelectedMappedRows,
    ] = useState([]);
    const centerColumns = [
        {
            title: "Center Name",
            dataIndex: "centerName",

            render: (text) => (
                <Space>
                    <Avatar
                        size={32}
                        style={{
                            background: "#1677ff",
                        }}
                    >
                        🏥
                    </Avatar>

                    <div>
                        <div
                            style={{
                                fontWeight: 500,
                            }}
                        >
                            {text}
                        </div>
                    </div>
                </Space>
            ),
        },

        {
            title: "Status",
            dataIndex: "active",

            render: value => (
                <Tag
                    color={
                        value
                            ? "success"
                            : "error"
                    }
                >
                    {value
                        ? "Active"
                        : "Inactive"}
                </Tag>
            ),
        },

        {
            title: "Priority",

            dataIndex: "priority",

            render: value => {
                const color =
                    value === 1
                        ? "gold"
                        : value === 2
                            ? "blue"
                            : "default";

                return (
                    <Tag color={color}>
                        P{value}
                    </Tag>
                );
            }
        },

        {
            title: "Effective From",

            dataIndex:
                "effectiveFrom",

            render: date =>
                dayjs(date).format(
                    "DD-MMM-YYYY"
                ),
        },
        {
            title: "Action",
            key: "action",
            width: 120,

            render: (_, record) => (
                <Popconfirm
                    title="Remove Center"
                    description="Are you sure?"
                    onConfirm={() =>
                        handleRemoveCenter(record)
                    }
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                    >
                        Remove
                    </Button>
                </Popconfirm>
            ),
        }


    ];// latest
    // const handleCenterMappingSave
    const handleAddCenters = () => {

        if (selectedCenters.length === 0) {
            message.warning(
                "Please select at least one center"
            );
            return;
        }

        const existingCenters =
            centerMappings.map(
                x => x.centerName
            );

        const duplicateCenters =
            selectedCenters.filter(center =>
                centerMappings.some(
                    x =>
                        x.centerName
                            .toLowerCase()
                            .trim() ===
                        center
                            .toLowerCase()
                            .trim()
                )
            );

        if (
            duplicateCenters.length > 0
        ) {
            message.warning(
                `${duplicateCenters.join(", ")} already mapped`
            );
            return;
        }

        const newCenters =
            selectedCenters.map(
                (center, index) => ({
                    id: Date.now() + index,
                    centerName: center,
                    active: true,
                    priority:
                        centerMappings.length +
                        index +
                        1,
                    effectiveFrom:
                        dayjs(),
                })
            );

        setCenterMappings(prev => [
            ...prev,
            ...newCenters,
        ]);

        setSelectedCenters([]);

        message.success(
            "Center Added Successfully"
        );
    };
    const handleCenterMappingSave = () => {

        if (selectedCenters.length === 0) {
            message.error(
                "Please select at least one center"
            );
            return;
        }

        const centerMappingData =
            selectedCenters.map(
                (center, index) => ({
                    id: index + 1,
                    centerName: center,
                    active: true,
                    priority: index + 1,
                    effectiveFrom:
                        dayjs().format(
                            "YYYY-MM-DD"
                        ),
                    remarks: "",
                })
            );

        setCenterMappings(
            centerMappingData
        );

        message.success(
            "Center Mapping Saved Successfully"
        );

        return centerMappingData;
    };
    const handleRemoveCenter = (
        record
    ) => {

        setCenterMappings(prev =>
            prev.filter(
                item =>
                    item.id !== record.id
            )
        );

        message.success(
            `${record.centerName} removed successfully`
        );
    };
    const handleRemoveSelectedCenters = () => {

        if (
            selectedMappedRows.length === 0
        ) {
            message.warning(
                "Please select at least one center"
            );
            return;
        }

        setCenterMappings(prev =>
            prev.filter(
                item =>
                    !selectedMappedRows.includes(
                        item.id
                    )
            )
        );

        setSelectedMappedRows([]);

        message.success(
            "Selected Centers Removed Successfully"
        );
    };
    const handleMapAll = () => {
        setSelectedCenters(allCenters);
    };

    const handleUnmapAll = () => {
        setSelectedCenters([]);
    };

    
    return (
        <>
            <Drawer
                title={
    editingRecord
        ? "Edit Supplier Item Mapping"
        : "Add Supplier Item Mapping"
}
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
    icon={
        editingRecord
            ? <EditOutlined />
            : <SaveOutlined />
    }
    onClick={handleSave}
>
    {
        editingRecord
            ? "Update Mapping"
            : "Save Mapping"
    }
</Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Tabs
                        items={[
                            {
                                key: "basic",
                                label: "Basic Mapping",
                                children: (
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Card
                                                size="small"
                                                title={
                                                    <span
                                                        style={{
                                                            color: "#1677ff",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Item Information
                                                    </span>
                                                }
                                                style={{
                                                    borderRadius: 12,
                                                    marginBottom: 16,
                                                    border: "1px solid #dbeafe",
                                                    background: "#f8fbff",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0,0,0,0.05)",
                                                }}

                                            >
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} md={4}>
                                                        <Form.Item
                                                            label="Supplier"
                                                            name="supplierId"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select Supplier",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Select Supplier"
                                                                options={[
                                                                    {
                                                                        label:
                                                                            "ABC Pharma",
                                                                        value: 1,
                                                                    },
                                                                    {
                                                                        label:
                                                                            "XYZ Pharma",
                                                                        value: 2,
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            label="Item"
                                                            name="itemId"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select Item",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Select Item"
                                                                options={[
                                                                    {
                                                                        label:
                                                                            "Paracetamol 500mg",
                                                                        value: 1,
                                                                    },
                                                                    {
                                                                        label:
                                                                            "Amoxicillin 500mg",
                                                                        value: 2,
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            label="Supplier Rank"
                                                            name="supplierRank"
                                                            tooltip="Rank 1 = Highest Priority Supplier"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select Supplier Rank",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                placeholder="Select Rank"
                                                                options={[
                                                                    {
                                                                        label:
                                                                            "Rank 1 - Primary Supplier",
                                                                        value: 1,
                                                                    },
                                                                    {
                                                                        label:
                                                                            "Rank 2 - Secondary Supplier",
                                                                        value: 2,
                                                                    },
                                                                    {
                                                                        label:
                                                                            "Rank 3 - Backup Supplier",
                                                                        value: 3,
                                                                    },
                                                                    {
                                                                        label:
                                                                            "Rank 4 - Alternate Supplier",
                                                                        value: 4,
                                                                    },
                                                                    {
                                                                        label:
                                                                            "Rank 5 - Emergency Supplier",
                                                                        value: 5,
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            label="Supplier Item Code"
                                                            name="supplierItemCode"
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            label="Supplier Item Name"
                                                            name="supplierItemName"
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            label="Status"
                                                            name="status"
                                                            initialValue="ACTIVE"
                                                        >
                                                            <Select
                                                                options={[
                                                                    {
                                                                        label: "Active",
                                                                        value: "ACTIVE",
                                                                    },
                                                                    {
                                                                        label: "Inactive",
                                                                        value: "INACTIVE",
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>

                                        <Col span={24}>
                                            <Card
                                                title={
                                                    <span
                                                        style={{
                                                            color: "#1677ff",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Item Information
                                                    </span>
                                                }
                                                style={{
                                                    borderRadius: 12,
                                                    marginBottom: 16,
                                                    border: "1px solid #dbeafe",
                                                    background: "#f8fbff",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0,0,0,0.05)",
                                                }}
                                                size="small"
                                            >
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} md={4}>
                                                        <Form.Item
                                                            label="Purchase UOM"
                                                            name="purchaseUom"
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={4}>
                                                        <Form.Item
                                                            label="Issue UOM"
                                                            name="issueUom"
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={4}>
                                                        <Form.Item
                                                            label="Conversion Factor"
                                                            name="conversionFactor"
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={4}>
                                                        <Form.Item
                                                            label="Dosage Form"
                                                            name="dosageForm"
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={4}>
                                                        <Form.Item
                                                            label="Manufacturer"
                                                            name="manufacturer"
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={4}>
                                                        <Form.Item
                                                            label="Strength"
                                                            name="strength"
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                ),
                            },

                            {

                                key: "pricing",
                                label: "Effective Contract Pricing",
                                children: (
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} md={6}>
                                            <Form.Item
                                                label="Purchase UOM"
                                                name="purchaseUom"
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Card
                                                size="small"
                                                title={
                                                    <span
                                                        style={{
                                                            color: "#1677ff",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Purchase Pricing
                                                    </span>
                                                }
                                                style={{
                                                    borderRadius: 12,
                                                    marginBottom: 16,
                                                    border: "1px solid #dbeafe",
                                                    background: "#f8fbff",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0,0,0,0.05)",
                                                }}

                                            >
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} md={6}>
                                                        <Form.Item label="Status">
                                                            <Badge
                                                                status="success"
                                                                text="Active"
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Contract Type"
                                                        >
                                                            <Input
                                                                disabled
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Status"
                                                        >
                                                            <Input
                                                                disabled
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Currency"
                                                        >
                                                            <Input
                                                                disabled
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Start Date"
                                                        >
                                                            <Input
                                                                disabled
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="End Date"
                                                        >
                                                            <Input
                                                                disabled
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                        {/* Purchase Rate */}
                                        <Col span={24}>
                                            <Card
                                                size="small"
                                                title={
                                                    <span
                                                        style={{
                                                            color: "#1677ff",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Purchase Pricing

                                                    </span>

                                                }

                                                style={{
                                                    borderRadius: 12,
                                                    marginBottom: 16,
                                                    border: "1px solid #dbeafe",
                                                    background: "#f8fbff",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0,0,0,0.05)",
                                                }}
                                                extra={
                                                    <div
                                                        style={{
                                                            padding:
                                                                "10px 22px",
                                                            borderRadius: 24,
                                                            background:
                                                                "#f6ffed",
                                                            border:
                                                                "1px solid #b7eb8f",
                                                            color:
                                                                "#52c41a",
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        ● ACTIVE
                                                    </div>
                                                }
                                            >
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} md={12}>
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

                                                    {/* Tax Type */}

                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            label="Tax Type"
                                                            name="taxType"
                                                            initialValue="GST"
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
                                                                        label: "EXEMPT",
                                                                        value: "EXEMPT",
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    {taxType !== "EXEMPT" && (
                                                        <Col xs={24} md={6}>
                                                            <Form.Item
                                                                label="GST %"
                                                                name="gstPercent"
                                                            >
                                                                <Select
                                                                    options={[
                                                                        { label: "0%", value: 0 },
                                                                        { label: "5%", value: 5 },
                                                                        { label: "12%", value: 12 },
                                                                        { label: "18%", value: 18 },
                                                                        { label: "28%", value: 28 },
                                                                    ]}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    )}

                                                    {taxType === "GST" && (
                                                        <>
                                                            <Col xs={24} md={6}>
                                                                <Form.Item
                                                                    label="CGST %"
                                                                    name="cgstPercent"
                                                                >
                                                                    <InputNumber disabled />

                                                                </Form.Item>
                                                            </Col>

                                                            <Col xs={24} md={6}>
                                                                <Form.Item
                                                                    label="SGST %"
                                                                    name="sgstPercent"
                                                                >
                                                                    <InputNumber disabled />
                                                                </Form.Item>
                                                            </Col>
                                                        </>
                                                    )}

                                                    {/* IGST */}

                                                    {taxType === "IGST" && (
                                                        <Col xs={24} md={6}>
                                                            <Form.Item
                                                                label="IGST %"
                                                                name="igstPercent"
                                                            >
                                                                <InputNumber disabled />
                                                            </Form.Item>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </Card>
                                        </Col>


                                        {/* Purchase Discount */}
                                        <Col span={24}>
                                            <Card
                                                size="small"
                                                title={
                                                    <span
                                                        style={{
                                                            color: "#1677ff",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Discount Structure
                                                    </span>
                                                }
                                                style={{
                                                    borderRadius: 12,
                                                    marginBottom: 16,
                                                    border: "1px solid #dbeafe",
                                                    background: "#f8fbff",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0,0,0,0.05)",
                                                }}
                                            >
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Purchase Disc %"
                                                            name="purchaseDiscountPercent"
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

                                                    {/* Additional Discount */}

                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Additional Disc %"
                                                            name="additionalDiscountPercent"
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

                                                    {/* Buy Qty */}



                                                    {/* Free Qty */}


                                                </Row>
                                            </Card>
                                        </Col>

                                        {/* Effective Unit Cost */}
                                        <Col span={24}>
                                            <Row gutter={16}>

                                                <Col xs={24} md={8}>
                                                    <Card
                                                        size="small"
                                                        bordered
                                                    >
                                                        <Statistic
                                                            title="Effective Cost / Purchase UOM"
                                                            value={
                                                                costSummary.effectiveCost
                                                            }
                                                            precision={2}
                                                        />
                                                    </Card>
                                                </Col>

                                                <Col xs={24} md={8}>
                                                    <Card
                                                        size="small"
                                                        bordered
                                                    >
                                                        <Statistic
                                                            title="Tax Amount"
                                                            value={
                                                                costSummary.taxAmount
                                                            }
                                                            precision={2}
                                                        />
                                                    </Card>
                                                </Col>

                                                <Col xs={24} md={8}>
                                                    <Card
                                                        size="small"
                                                        bordered
                                                    >
                                                        <Statistic
                                                            title="Net Cost / Purchase UOM"
                                                            value={
                                                                costSummary.netCost
                                                            }
                                                            precision={2}
                                                        />
                                                    </Card>
                                                </Col>

                                            </Row>
                                        </Col>


                                        {/* Rate Validity */}


                                        <Col span={24}>
                                            <Alert
                                                type="info"
                                                showIcon
                                                style={{
                                                    marginTop: 16,
                                                }}
                                                message="Note"
                                                description={
                                                    <>
                                                        <strong>UOM</strong> = Unit of Measure.
                                                        <br />
                                                        Examples: BOX, STRIP,
                                                        TABLET, VIAL, BOTTLE,
                                                        AMPULE, CAPSULE, INJECTION.
                                                        <br />
                                                        Purchase Rate is always
                                                        maintained against the
                                                        selected Purchase UOM.
                                                    </>
                                                }
                                            />
                                        </Col>
                                    </Row>

                                ),

                            },

                            {
                                key: "procurement",
                                label:
                                    "Procurement Rules",
                                children:
                                    <Row gutter={[16, 16]}>

                                        <Col span={24}>
                                            <Card
                                                size="small"
                                                title="Lead Time"
                                                style={{
                                                    borderRadius: 10,
                                                }}
                                            >
                                                <Row gutter={[16, 16]}>

                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            label="Lead Time (Days)"
                                                            name="leadTimeDays"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please enter Lead Time",
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber
                                                                min={0}
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Alert
                                                            type="info"
                                                            showIcon
                                                            message="Lead Time Information"
                                                            description="Lead Time defines the number of days normally required by the supplier to deliver the item after Purchase Order approval."
                                                        />
                                                    </Col>
                                                    <Col span={24}>
                                                        <Card
                                                            size="small"
                                                            title="Ordering Rules"
                                                            style={{
                                                                borderRadius: 10,
                                                                marginTop: 16,
                                                            }}
                                                        >
                                                            <Row gutter={[16, 16]}>

                                                                <Col xs={24} md={8}>
                                                                    <Form.Item
                                                                        label="Minimum Order Qty"
                                                                        name="minimumOrderQty"
                                                                    >
                                                                        <InputNumber
                                                                            min={0}
                                                                            style={{
                                                                                width: "100%",
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>

                                                                <Col xs={24} md={8}>
                                                                    <Form.Item
                                                                        label="Maximum Order Qty"
                                                                        name="maximumOrderQty"
                                                                    >
                                                                        <InputNumber
                                                                            min={0}
                                                                            style={{
                                                                                width: "100%",
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>

                                                                <Col xs={24} md={8}>
                                                                    <Form.Item
                                                                        label="Order Multiple"
                                                                        name="orderMultiple"
                                                                    >
                                                                        <InputNumber
                                                                            min={1}
                                                                            style={{
                                                                                width: "100%",
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={24}>
                                                                    <Alert
                                                                        type="info"
                                                                        showIcon
                                                                        style={{
                                                                            marginTop: 16,
                                                                        }}
                                                                        message="Ordering Rules"
                                                                        description="MOQ controls minimum quantity 
                                                        allowed for purchase.Order Multiple ensures 
                                                        purchases are made in fixed packs/cases."
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>

                                        <Col span={24}>
                                            <Card
                                                size="small"
                                                title="Emergency Procurement"
                                                style={{
                                                    borderRadius: 10,
                                                    marginTop: 16,
                                                }}
                                            >
                                                <Row gutter={[16, 16]}>

                                                    <Col xs={24} md={8}>
                                                        <Form.Item
                                                            label="Emergency Procurement Allowed"
                                                            name="emergencyProcurementAllowed"
                                                            initialValue={true}
                                                        >
                                                            <Select
                                                                options={[
                                                                    {
                                                                        label: "Yes",
                                                                        value: true,
                                                                    },
                                                                    {
                                                                        label: "No",
                                                                        value: false,
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>,
                            },
                            {
                                key: "contract",
                                label: "Agreement & Contract",
                                children: (
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Card
                                                title="Current Active Contract"
                                                extra={
                                                    <Space>
                                                        <Button
                                                            onClick={() =>
                                                                setHistoryOpen(true)
                                                            }
                                                        >
                                                            Contract History
                                                        </Button>

                                                        <Button
                                                            type="primary"
                                                            onClick={() =>
                                                                setOpenContractDrawer(true)
                                                            }
                                                        >
                                                            Add Contract
                                                        </Button>
                                                    </Space>
                                                }
                                            >
                                                <Card
                                                    bordered={false}
                                                    style={{
                                                        borderRadius: 20,
                                                        border:
                                                            "1px solid #d9f7be",
                                                        background:
                                                            "linear-gradient(180deg,#fcfffc,#f6ffed)",
                                                        boxShadow:
                                                            "0 4px 20px rgba(0,0,0,0.05)",
                                                    }}
                                                >
                                                    <Row
                                                        justify="space-between"
                                                        align="middle"
                                                        style={{
                                                            marginBottom: 24,
                                                            paddingBottom: 16,
                                                            borderBottom:
                                                                "1px solid #f0f0f0",
                                                        }}
                                                    >
                                                        <Space size={16}>
                                                            <div
                                                                style={{
                                                                    width: 48,
                                                                    height: 48,
                                                                    borderRadius: "50%",
                                                                    background:
                                                                        "linear-gradient(135deg,#52c41a,#73d13d)",
                                                                    color: "#fff",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: 22,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                ✓
                                                            </div>

                                                            <div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 20,
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    Active Contract
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        color: "#8c8c8c",
                                                                        fontSize: 12,
                                                                    }}
                                                                >
                                                                    Contract currently active for procurement
                                                                </div>
                                                            </div>
                                                        </Space>

                                                        <Tag
                                                            color="success"
                                                            style={{
                                                                fontWeight: 600,
                                                                padding:
                                                                    "4px 12px",
                                                                borderRadius: 20,
                                                            }}
                                                        >
                                                            ACTIVE
                                                        </Tag>
                                                    </Row>

                                                    <Row gutter={[24, 24]}>
                                                        <Col
                                                            span={8}
                                                            style={{
                                                                borderRight:
                                                                    "1px solid #f0f0f0",
                                                                paddingRight: 24,
                                                            }}
                                                        >
                                                            <Space align="start">
                                                                <div
                                                                    style={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        borderRadius: 12,
                                                                        background: "#1677ff",
                                                                        color: "#fff",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        fontSize: 22,
                                                                        fontWeight: 700,
                                                                    }}
                                                                >
                                                                    #
                                                                </div>

                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            color: "#8c8c8c",

                                                                        }}
                                                                    >
                                                                        Contract No
                                                                    </div>

                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 600,
                                                                            marginTop: 8,
                                                                        }}
                                                                    >
                                                                        {activeContract?.contractNumber}
                                                                    </div>
                                                                </div>
                                                            </Space>
                                                        </Col>

                                                        <Col
                                                            span={8}
                                                            style={{
                                                                borderRight:
                                                                    "1px solid #f0f0f0",
                                                                paddingRight: 24,
                                                            }}
                                                        >
                                                            <Space align="start">
                                                                <div
                                                                    style={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        borderRadius: 12,
                                                                        background: "#722ed1",
                                                                        color: "#fff",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        fontSize: 22,
                                                                        fontWeight: 700,
                                                                    }}
                                                                >
                                                                    ₹
                                                                </div>

                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            color: "#8c8c8c",
                                                                        }}
                                                                    >
                                                                        Purchase Rate
                                                                    </div>

                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 600,
                                                                            marginTop: 8,
                                                                        }}
                                                                    >
                                                                        {activeContract?.purchaseRate}{" "}
                                                                        {activeContract?.currency}
                                                                    </div>
                                                                </div>
                                                            </Space>
                                                        </Col>

                                                        <Col
                                                            span={8}
                                                            style={{
                                                                borderRight:
                                                                    "1px solid #f0f0f0",
                                                                paddingRight: 24,
                                                            }}
                                                        >
                                                            <Space align="start">
                                                                <div
                                                                    style={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        borderRadius: 12,
                                                                        background: "#fa8c16",
                                                                        color: "#fff",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        fontSize: 22,
                                                                        fontWeight: 700,
                                                                    }}
                                                                >
                                                                    T
                                                                </div>

                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            color: "#8c8c8c",
                                                                        }}
                                                                    >
                                                                        Contract Type
                                                                    </div>

                                                                    <div
                                                                        style={{
                                                                            fontSize: 14,
                                                                            fontWeight: 600,
                                                                            marginTop: 8,
                                                                        }}
                                                                    >
                                                                        {activeContract?.contractType}
                                                                    </div>
                                                                </div>
                                                            </Space>
                                                        </Col>
                                                    </Row>

                                                    <Divider />

                                                    <Row gutter={[16, 16]}>
                                                        <Col span={12}>
                                                            <Card
                                                                size="small"
                                                                bordered={false}
                                                                style={{
                                                                    background: "#fff",
                                                                    borderRadius: 16,
                                                                    boxShadow:
                                                                        "0 2px 12px rgba(0,0,0,0.06)",
                                                                    border:
                                                                        "1px solid #f0f0f0",
                                                                }}
                                                            >
                                                                <Space>
                                                                    <CalendarOutlined
                                                                        style={{
                                                                            fontSize: 25,
                                                                            color: "#52c41a",
                                                                        }}
                                                                    />

                                                                    <div>
                                                                        <div
                                                                            style={{
                                                                                fontSize: 14,
                                                                                color: "#8c8c8c",
                                                                                textTransform:
                                                                                    "uppercase",
                                                                            }}
                                                                        >
                                                                            Start Date
                                                                        </div>
                                                                    </div>
                                                                </Space>

                                                                <div
                                                                    style={{
                                                                        marginTop: 8,
                                                                        fontSize: 16,
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    {
                                                                        activeContract?.startDate
                                                                            ? dayjs(activeContract.startDate).format("DD-MMM-YYYY")
                                                                            : "-"
                                                                    }
                                                                </div>
                                                            </Card>
                                                        </Col>

                                                        <Col span={12}>
                                                            <Card
                                                                size="small"
                                                                bordered={false}
                                                                style={{
                                                                    background:
                                                                        "#fafafa",
                                                                    borderRadius: 12,
                                                                }}
                                                            >
                                                                <Space>
                                                                    <CalendarOutlined
                                                                        style={{
                                                                            fontSize: 25,
                                                                            color: "#ff4d4f",
                                                                        }}
                                                                    />

                                                                    <div>
                                                                        <div
                                                                            style={{
                                                                                fontSize: 14,
                                                                                color: "#8c8c8c",
                                                                                textTransform:
                                                                                    "uppercase",
                                                                            }}
                                                                        >
                                                                            End Date
                                                                        </div>
                                                                    </div>
                                                                </Space>

                                                                <div
                                                                    style={{
                                                                        marginTop: 8,
                                                                        fontSize: 16,
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    {
                                                                        activeContract?.endDate
                                                                            ? dayjs(activeContract.endDate).format("DD-MMM-YYYY")
                                                                            : "-"
                                                                    }
                                                                </div>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Card>
                                        </Col>
                                    </Row>
                                ),
                            },
                            {
                                key: "center",
                                label:
                                    "Center Mapping",
                                children:
                                    <Row gutter={16} style={{ marginBottom: 16 }}>
                                        <Col span={6}>
                                            <Card style={{
                                                borderLeft: "4px solid #1677ff",
                                            }}>
                                                <Statistic
                                                    title="🏥 Total Centers"
                                                    value={5}
                                                />
                                            </Card>
                                        </Col>

                                        <Col span={6}>
                                            <Card style={{
                                                borderLeft: "4px solid #52c41a",
                                            }}>
                                                <Statistic
                                                    title="✅ Active Centers"
                                                    value={4}
                                                />
                                            </Card>
                                        </Col>

                                        <Col span={6}>
                                            <Card style={{
                                                borderLeft: "4px solid #ff4d4f",
                                            }}>
                                                <Statistic
                                                    title="❌ Inactive Centers"
                                                    value={1}
                                                />
                                            </Card>
                                        </Col>

                                        <Col span={6}>
                                            <Card style={{
                                                borderLeft: "4px solid #ff4d4f",
                                            }}>
                                                <Statistic
                                                    title="🔗 Mapped Centers"
                                                    value={selectedCenters.length}
                                                />
                                            </Card>
                                        </Col>
                                        <Row gutter={16} style={{ marginBottom: 16 }}>

                                            <Col span={12}>
                                                <Card
                                                    bodyStyle={{
                                                        minHeight: 290,
                                                    }}
                                                >
                                                    <Row
                                                        justify="space-between"
                                                        align="middle"
                                                        style={{
                                                            marginBottom: 16,
                                                            paddingBottom: 12,
                                                            borderBottom:
                                                                "1px solid #f0f0f0",
                                                        }}
                                                    >
                                                        <Space>
                                                            <span
                                                                style={{
                                                                    fontSize: 18,
                                                                }}
                                                            >
                                                                🏥
                                                            </span>

                                                            <span
                                                                style={{
                                                                    fontSize: 18,
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                Available Centers
                                                            </span>
                                                        </Space>

                                                        <Space size="small">
                                                            <Button
                                                                size="small"
                                                                onClick={handleMapAll}
                                                            >
                                                                Map All
                                                            </Button>

                                                            <Button
                                                                size="small"
                                                                danger
                                                                onClick={handleUnmapAll}
                                                            >
                                                                Unmap All
                                                            </Button>
                                                        </Space>
                                                    </Row>

                                                    <Checkbox.Group
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        value={selectedCenters}
                                                        onChange={(values) =>
                                                            setSelectedCenters(values)
                                                        }
                                                    >
                                                        <Space
                                                            direction="vertical"
                                                            size={16}
                                                        >
                                                            {allCenters.map(center => (
                                                                <Checkbox
                                                                    key={center}
                                                                    value={center}
                                                                    disabled={
                                                                        centerMappings.some(
                                                                            x =>
                                                                                x.centerName
                                                                                    .trim()
                                                                                    .toLowerCase() ===
                                                                                center
                                                                                    .trim()
                                                                                    .toLowerCase()
                                                                        )
                                                                    }
                                                                >
                                                                    <Space>
                                                                        <Avatar
                                                                            size={24}
                                                                            style={{
                                                                                background: "#1677ff",
                                                                            }}
                                                                        >
                                                                            🏥
                                                                        </Avatar>

                                                                        {center}

                                                                        {centerMappings.some(
                                                                            x =>
                                                                                x.centerName
                                                                                    .trim()
                                                                                    .toLowerCase() ===
                                                                                center
                                                                                    .trim()
                                                                                    .toLowerCase()
                                                                        ) && (
                                                                                <Tag color="success">
                                                                                    Mapped
                                                                                </Tag>
                                                                            )}
                                                                    </Space>
                                                                </Checkbox>
                                                            ))}
                                                        </Space>
                                                    </Checkbox.Group>
                                                    <Row
                                                        justify="end"
                                                        style={{
                                                            marginTop: 24,
                                                        }}
                                                    >
                                                        <Button
                                                            type="primary"
                                                            onClick={handleAddCenters}
                                                        >
                                                            Add Center
                                                        </Button>
                                                    </Row>

                                                </Card>
                                            </Col>

                                            <Col span={12}>
                                                <Card title={
                                                    <Space>
                                                        <span>🔗</span>
                                                        <span>Mapped Centers</span>
                                                    </Space>


                                                }
                                                    extra={
                                                        <Popconfirm
                                                            title="Remove Selected Centers"
                                                            description="Are you sure you want to remove selected centers?"
                                                            onConfirm={handleRemoveSelectedCenters}
                                                        >
                                                            <Button
                                                                danger
                                                                disabled={
                                                                    selectedMappedRows.length === 0
                                                                }
                                                            >
                                                                Remove Selected
                                                            </Button>
                                                        </Popconfirm>
                                                    }
                                                    styles={{
                                                        header: {
                                                            background: "#fafafa",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                >


                                                    <Table
                                                        rowKey="id"
                                                        columns={centerColumns}
                                                        dataSource={centerMappings}
                                                        rowSelection={{
                                                            selectedRowKeys:
                                                                selectedMappedRows,

                                                            onChange: (
                                                                selectedRowKeys
                                                            ) => {
                                                                setSelectedMappedRows(
                                                                    selectedRowKeys
                                                                );
                                                            },
                                                        }}
                                                        pagination={false}
                                                    />

                                                </Card>
                                            </Col>

                                        </Row>

                                    </Row>

                            },
                        ]}
                    />
                </Form>
                <AddContractDrawer
                    open={openContractDrawer}
                    onClose={() =>
                        setOpenContractDrawer(false)
                    }
                    onSave={(contract) => {

                        setActiveContract(contract);

                        setContractHistory(prev => [
                            {
                                ...contract,
                                id: Date.now(),
                                status: "ACTIVE",
                            },
                            ...prev,
                        ]);
                    }}
                />

            </Drawer>
            <Drawer
                title="Contract History"
                width={1000}
                open={historyOpen}
                onClose={() =>
                    setHistoryOpen(false)
                }
            >
                <Card
                    style={{
                        marginBottom: 16,
                        borderRadius: 16,
                        border: "1px solid #d9f7be",
                        background:
                            "linear-gradient(180deg,#fcfffc,#f6ffed)",
                    }}
                >
                    <Row align="middle">
                        <Col span={4}>
                            <div
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 16,
                                    background:
                                        "linear-gradient(135deg,#52c41a,#73d13d)",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 28,
                                    fontWeight: 700,
                                }}
                            >
                                📄
                            </div>
                        </Col>

                        <Col span={6}>
                            <Statistic
                                title="Total Contracts"
                                value={contractHistory.length}
                            />
                        </Col>

                        <Col span={6}>
                            <Statistic
                                title="Active Contracts"
                                value={
                                    contractHistory.filter(
                                        x => x.status === "ACTIVE"
                                    ).length
                                }
                                valueStyle={{
                                    color: "#52c41a",
                                }}
                            />
                        </Col>

                        <Col span={6}>
                            <Statistic
                                title="Expired Contracts"
                                value={
                                    contractHistory.filter(
                                        x => x.status === "EXPIRED"
                                    ).length
                                }
                                valueStyle={{
                                    color: "#ff4d4f",
                                }}
                            />
                        </Col>

                    </Row>
                </Card>
                <Table
                    rowKey="id"
                    columns={contractHistoryColumns}
                    dataSource={contractHistory}
                    bordered={false}
                    pagination={{
                        pageSize: 10,
                    }}
                />
                <Row
                    justify="end"
                    style={{
                        marginTop: 24,
                    }}
                >
                    <Space>
                        <Button
                            onClick={() =>
                                setHistoryOpen(false)
                            }
                        >
                            Close
                        </Button>

                        <Button
                            type="primary"
                            onClick={() => {
                                setHistoryOpen(false);
                                setOpenContractDrawer(true);
                            }}
                        >
                            Add Contract
                        </Button>
                    </Space>
                </Row>
            </Drawer>
        </>
    );
}

export default AddSupplierItemMappingDrawer;