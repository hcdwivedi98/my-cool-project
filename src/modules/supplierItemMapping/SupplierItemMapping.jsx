import { useState } from "react";
import {
    Card,
    Button,
    Row,
    Col,
    Select,
    Input,
    Space,
    Drawer,
    InputNumber,
    Table,
    Tag,
    Avatar,
    Alert,
    Divider,
    List,
    Descriptions,
    Modal,
    message,
    Tooltip,
    Switch,
} from "antd";

import {
    FilterOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    HistoryOutlined,
    PlusOutlined,
    ShopOutlined,
    MedicineBoxOutlined,
    DollarOutlined,
    PercentageOutlined,
    ClockCircleOutlined,
    TrophyOutlined,
    CalendarOutlined,
    StarOutlined,
    InfoCircleOutlined,
    ApartmentOutlined,
    FileTextOutlined,
    UserOutlined,
    BankOutlined,
    CopyOutlined,
    DownloadOutlined,
    UploadOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ImportSupplierItemMappingDrawer from "./ImportSupplierItemMappingDrawer";
import AddSupplierItemMappingDrawer from "./AddSupplierItemMappingDrawer";
import AddContractDrawer from "./AddContractDrawer";

function SupplierItemMapping() {

    const [openMappingDrawer, setOpenMappingDrawer] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [openFilters, setOpenFilters] = useState(false);
    const [openContractDrawer, setOpenContractDrawer] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [cloneRecord, setCloneRecord] = useState(null);
    const [openImportDrawer, setOpenImportDrawer] = useState(false);

    const handleStatusChange = (
        record,
        checked
    ) => {

        Modal.confirm({

            title:
                checked
                    ? "Activate Mapping"
                    : "Deactivate Mapping",

            content:
                `Are you sure you want to ${checked
                    ? "activate"
                    : "deactivate"
                } this mapping?`,

            onOk() {

                setMappings(prev =>
                    prev.map(item =>

                        item.key === record.key

                            ? {
                                ...item,

                                status:
                                    checked
                                        ? "ACTIVE"
                                        : "INACTIVE"
                            }

                            : item
                    )
                );

                message.success(

                    checked
                        ? "Mapping Activated Successfully"
                        : "Mapping Deactivated Successfully"
                );
            }
        });
    };

    const handleExport = () => {

        const exportData = mappings.map(item => ({
            Supplier: item.supplier,
            Item: item.item,
            "Supplier Item Code":
                item.supplierItemCode,

            "Purchase Rate":
                item.purchaseRate,

            "GST %":
                item.gst,

            "Lead Time":
                item.leadTime,

            Rank:
                item.rank,

            Status:
                item.status,

            "Rate Effective To":
                item.rateEffectiveTo,
        }));

        const worksheet =
            XLSX.utils.json_to_sheet(
                exportData
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Supplier Mappings"
        );

        const excelBuffer =
            XLSX.write(
                workbook,
                {
                    bookType: "xlsx",
                    type: "array",
                }
            );

        const file = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            }
        );

        saveAs(
            file,
            `Supplier_Item_Mapping_${new Date()
                .toISOString()
                .slice(0, 10)}.xlsx`
        );

        message.success(
            "Excel Exported Successfully"
        );
    };
    const data = [
        {
            key: 1,

            supplier: "ABC Pharma",

            supplierId: 1,

            item: "Paracetamol 500mg",

            itemId: 101,

            supplierItemCode: "PCM500",

            supplierItemName:
                "Paracetamol 500mg",

            purchaseRate: 0.95,

            gst: 12,

            gstPercent: 12,

            taxType: "GST",

            purchaseDiscountPercent: 5,

            additionalDiscountPercent: 2,

            leadTime: 2,

            leadTimeDays: 2,

            minimumOrderQty: 100,

            maximumOrderQty: 10000,

            orderMultiple: 10,

            emergencyProcurementAllowed:
                "YES",

            score: 88,

            rank: 1,

            supplierRank: 1,

            rateEffectiveTo:
                "31-Dec-2026",

            status: "ACTIVE",

            activeContract: {
                contractNo: "CNT-0001",
                contractType:
                    "RATE CONTRACT",
            },

            centerMappings: [
                {
                    id: 1,
                    centerName:
                        "Main Hospital",
                },

                {
                    id: 2,
                    centerName:
                        "Emergency Store",
                },
            ],
        },

        {
            key: 2,

            supplier: "XYZ Pharma",

            supplierId: 2,

            item: "Amoxicillin 500mg",

            itemId: 102,

            supplierItemCode: "AMX500",

            supplierItemName:
                "Amoxicillin 500mg",

            purchaseRate: 1.25,

            gst: 12,

            gstPercent: 12,

            taxType: "GST",

            purchaseDiscountPercent: 3,

            additionalDiscountPercent: 1,

            leadTime: 4,

            leadTimeDays: 4,

            minimumOrderQty: 200,

            maximumOrderQty: 5000,

            orderMultiple: 20,

            emergencyProcurementAllowed:
                "NO",

            score: 76,

            rank: 2,

            supplierRank: 2,

            rateEffectiveTo:
                "30-Jun-2026",

            status: "ACTIVE",
        },
    ];
    const [mappings,
        setMappings] =
        useState(data);

    return (
        <>
            {/* Page Header */}

            <Card
                style={{
                    marginBottom: 16,
                }}
            >
                <Row
                    justify="space-between"
                    align="middle"
                >
                    <Col>
                        <h2
                            style={{
                                margin: 0,
                            }}
                        >
                            Supplier Item Mapping
                        </h2>

                        <p
                            style={{
                                marginTop: 6,
                                color: "#6b7280",
                            }}
                        >
                            Manage Supplier Rates,
                            Contracts and Item
                            Procurement Mapping.
                        </p>
                    </Col>

                    <Col>

                        <Space size={20}>
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                size="large"
                                onClick={() => {
                                    setOpenImportDrawer(true);
                                }}
                                style={{
                                    minWidth: 120,
                                    height: 40,
                                    borderRadius: 10,
                                }}
                            >
                                Import Excel
                            </Button>

                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                onClick={handleExport}

                                size="large"
                                style={{
                                    minWidth: 120,
                                    height: 40,
                                    borderRadius: 10,
                                }}
                            >
                                Export Excel
                            </Button>

                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                size="large"
                                onClick={() =>
                                    setOpenMappingDrawer(true)
                                }
                                style={{
                                    minWidth: 120,
                                    height: 40,
                                    borderRadius: 10,
                                }}
                            >
                                Add Mapping
                            </Button>

                        </Space>
                    </Col>
                </Row>
            </Card>
            {/* Dashboard Cards */}

            <Row gutter={[16, 16]}>

                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <div>Total Mappings</div>
                        <h2>125</h2>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <div>Active Mappings</div>
                        <h2>110</h2>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <div>Expiring Contracts</div>
                        <h2>8</h2>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <div>Inactive Mappings</div>
                        <h2>15</h2>

                    </Card>
                </Col>

            </Row>

            <br />
            <Card
                style={{
                    marginBottom: 16,
                }}
            >
                <Row gutter={[16, 16]}>

                    <Col xs={24} md={8}>
                        <Input
                            placeholder="Search by Supplier Name, Item Name, Supplier Item Code"
                            allowClear
                        />
                    </Col>

                    <Col xs={24} md={4}>
                        <Select
                            placeholder="Status"
                            allowClear
                            style={{
                                width: "100%",
                            }}
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
                    </Col>

                    <Col xs={24} md={4}>
                        <Select
                            placeholder="Contract Status"
                            allowClear
                            style={{
                                width: "100%",
                            }}
                            options={[
                                {
                                    label: "Active Contract",
                                    value: "ACTIVE",
                                },
                                {
                                    label: "Expiring Soon",
                                    value: "EXPIRING",
                                },
                                {
                                    label: "Expired",
                                    value: "EXPIRED",
                                },
                            ]}
                        />
                    </Col>

                    <Col xs={24} md={4}>
                        <Select
                            placeholder="Supplier Rank"
                            allowClear
                            style={{
                                width: "100%",
                            }}
                            options={[
                                {
                                    label: "Rank 1",
                                    value: 1,
                                },
                                {
                                    label: "Rank 2",
                                    value: 2,
                                },
                                {
                                    label: "Rank 3",
                                    value: 3,
                                },
                                {
                                    label: "Rank 4",
                                    value: 4,
                                },
                            ]}
                        />
                    </Col>

                    <Col xs={24} md={4}>
                        <Button
                            icon={<FilterOutlined />}
                            style={{
                                width: "100%",
                            }}
                            onClick={() =>
                                setOpenFilters(true)
                            }
                        >
                            Filters
                        </Button>
                    </Col>

                </Row>
            </Card>

            <Card
                title="Supplier Item Mappings"
            >
                <Table
                    rowKey="key"
                    dataSource={mappings}
                    scroll={{ x: 1000 }}
                    columns={[
                        {
                            title: "Supplier",
                            dataIndex: "supplier",
                        },
                        {
                            title: "Item",
                            dataIndex: "item",
                        },
                        {
                            title: "Purchase Rate",
                            dataIndex: "purchaseRate",
                        },
                        {
                            title: "GST %",
                            dataIndex: "gst",
                        },
                        {
                            title: "Lead Time",
                            dataIndex: "leadTime",
                        },
                        {
                            title: "Supplier Score",
                            dataIndex: "score",
                            render: (value) => (
                                <Tag color="green">
                                    {value}
                                </Tag>
                            ),
                        },
                        {
                            title: "Rank",
                            dataIndex: "rank",
                            render: (value) => (
                                <Tag color="blue">
                                    Rank {value}
                                </Tag>
                            ),
                        },
                        {
                            title: "Rate Effective To",
                            dataIndex:
                                "rateEffectiveTo",
                        },
                        {
                            title: "Status",
                            dataIndex: "status",

                            render: (_, record) => (

                                <Switch
                                    checked={
                                        record.status === "ACTIVE"
                                    }

                                    checkedChildren="Active"
                                    unCheckedChildren="Inactive"

                                    onChange={(checked) =>
                                        handleStatusChange(
                                            record,
                                            checked
                                        )
                                    }
                                />
                            )
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            width: 220,
                            fixed: "right",
                            render: (_, record) => (
                                <Space size={2}>

                                    <Tooltip title="View">
                                        <Button
                                            type="text"
                                            icon={<EyeOutlined />}
                                        />
                                    </Tooltip>

                                    <Tooltip title="Edit">
                                        <Button
                                            type="text"
                                            icon={<EditOutlined />}
                                        />
                                    </Tooltip>

                                    <Tooltip title="Clone">
                                        <Button
                                            type="text"
                                            icon={<CopyOutlined />}
                                        />
                                    </Tooltip>

                                    <Tooltip title="History">
                                        <Button
                                            type="text"
                                            icon={<HistoryOutlined />}
                                        />
                                    </Tooltip>

                                </Space>
                            ),
                        },
                    ]}
                />
            </Card>

            <Drawer
                title="Advanced Filters"
                width={400}
                open={openFilters}
                onClose={() =>
                    setOpenFilters(false)
                }
            >
                <Row gutter={[16, 16]}>

                    <Col span={24}>
                        <InputNumber
                            placeholder="Purchase Rate From"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Col>

                    <Col span={24}>
                        <InputNumber
                            placeholder="Purchase Rate To"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Col>

                    <Col span={24}>
                        <InputNumber
                            placeholder="Supplier Score From"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Col>

                    <Col span={24}>
                        <InputNumber
                            placeholder="Supplier Score To"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Col>

                </Row>
            </Drawer>

            <AddSupplierItemMappingDrawer
                open={openMappingDrawer}
                editingRecord={editingRecord}
                cloneRecord={cloneRecord}

                onClose={() => {

                    setOpenMappingDrawer(false);

                    setEditingRecord(null);
                    setCloneRecord(null);

                }}
            />
            <Drawer
                title={
                    <Space>
                        <ShopOutlined />
                        Supplier Item Mapping Details
                    </Space>
                }
                width={1000}
                open={viewOpen}
                onClose={() => setViewOpen(false)}
            >
                {selectedRecord && (
                    <>
                        {/* Header Card */}

                        <Card
                            bordered={false}
                            style={{
                                marginBottom: 24,
                                borderRadius: 16,
                                background:
                                    "linear-gradient(135deg,#f5f7ff,#ffffff)",
                                boxShadow:
                                    "0 2px 12px rgba(0,0,0,0.06)",
                            }}
                        >
                            <Row
                                justify="space-between"
                                align="middle"
                            >
                                <Col>
                                    <Space size={24}>
                                        <Avatar
                                            size={72}
                                            icon={<ShopOutlined />}
                                            style={{
                                                background: "#d6e4ff",
                                                color: "#1677ff",
                                            }}
                                        />

                                        <div>
                                            <div
                                                style={{
                                                    color: "#8c8c8c",
                                                }}
                                            >
                                                Mapping ID
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 32,
                                                    fontWeight: 700,
                                                    color: "#1677ff",
                                                }}
                                            >
                                                MAP-000125
                                            </div>

                                            <div
                                                style={{
                                                    color: "#8c8c8c",
                                                }}
                                            >
                                                Created on 21-May-2026
                                            </div>
                                        </div>
                                    </Space>
                                </Col>

                                <Col>
                                    <Tag
                                        color="success"
                                        style={{
                                            padding: "8px 20px",
                                            borderRadius: 20,
                                            fontSize: 16,
                                        }}
                                    >
                                        ● {selectedRecord.status}
                                    </Tag>
                                </Col>
                            </Row>
                        </Card>

                        {/* Supplier & Item */}

                        <Card
                            size="small"
                            style={{
                                marginBottom: 16,
                                borderRadius: 12,
                                background: "#fafafa",
                            }}
                        >
                            <Space>
                                <ShopOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    Supplier & Item Information
                                </span>
                            </Space>
                        </Card>

                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card
                                    style={{
                                        borderRadius: 12,
                                    }}
                                >
                                    <Space size={20}>
                                        <Avatar
                                            size={56}
                                            icon={<ShopOutlined />}
                                            style={{
                                                background: "#e6f4ff",
                                                color: "#1677ff",
                                            }}
                                        />

                                        <div>
                                            <div
                                                style={{
                                                    color: "#8c8c8c",
                                                }}
                                            >
                                                Supplier
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {selectedRecord.supplier}
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#8c8c8c",
                                                }}
                                            >
                                                SUP-00015
                                            </div>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>

                            <Col span={12}>
                                <Card
                                    style={{
                                        borderRadius: 12,
                                    }}
                                >
                                    <Space size={20}>
                                        <Avatar
                                            size={56}
                                            icon={
                                                <MedicineBoxOutlined />
                                            }
                                            style={{
                                                background: "#e6fffb",
                                                color: "#13c2c2",
                                            }}
                                        />

                                        <div>
                                            <div
                                                style={{
                                                    color: "#8c8c8c",
                                                }}
                                            >
                                                Item
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {selectedRecord.item}
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#8c8c8c",
                                                }}
                                            >
                                                ITEM-000245
                                            </div>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>

                        {/* Pricing */}

                        <Card
                            size="small"
                            style={{
                                marginTop: 24,
                                marginBottom: 16,
                                borderRadius: 12,
                                background: "#fafafa",
                            }}
                        >
                            <Space>
                                <DollarOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    Pricing & Tax Information
                                </span>
                            </Space>
                        </Card>

                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Card
                                    style={{
                                        borderRadius: 12,
                                    }}
                                >
                                    <Space>
                                        <Avatar
                                            icon={<DollarOutlined />}
                                            style={{
                                                background: "#e6f4ff",
                                                color: "#1677ff",
                                            }}
                                        />

                                        <div>
                                            <div>Purchase Rate</div>

                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                ₹ {selectedRecord.purchaseRate}
                                            </div>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card
                                    style={{
                                        borderRadius: 12,
                                    }}
                                >
                                    <Space>
                                        <Avatar
                                            icon={
                                                <PercentageOutlined />
                                            }
                                            style={{
                                                background: "#f9f0ff",
                                                color: "#722ed1",
                                            }}
                                        />

                                        <div>
                                            <div>GST %</div>

                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {selectedRecord.gst}%
                                            </div>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card
                                    style={{
                                        borderRadius: 12,
                                    }}
                                >
                                    <Space>
                                        <Avatar
                                            icon={<DollarOutlined />}
                                            style={{
                                                background: "#fff7e6",
                                                color: "#fa8c16",
                                            }}
                                        />

                                        <div>
                                            <div>Currency</div>

                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                INR
                                            </div>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>

                        {/* Procurement */}

                        <Card
                            size="small"
                            style={{
                                marginTop: 24,
                                marginBottom: 16,
                                borderRadius: 12,
                                background: "#fafafa",
                            }}
                        >
                            <Space>
                                <ClockCircleOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    Procurement Rules
                                </span>
                            </Space>
                        </Card>

                        <Descriptions
                            bordered
                            column={2}
                            size="small"
                        >
                            <Descriptions.Item label="Lead Time">
                                {selectedRecord.leadTime} Days
                            </Descriptions.Item>

                            <Descriptions.Item label="Supplier Rank">
                                Rank {selectedRecord.rank}
                            </Descriptions.Item>

                            <Descriptions.Item label="MOQ">
                                100 Units
                            </Descriptions.Item>

                            <Descriptions.Item label="Maximum Qty">
                                10000 Units
                            </Descriptions.Item>

                            <Descriptions.Item label="Emergency Supply">
                                <Tag color="success">
                                    Allowed
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Partial Supply">
                                <Tag color="success">
                                    Allowed
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>

                        {/* Contract */}

                        <Card
                            size="small"
                            style={{
                                marginTop: 24,
                                marginBottom: 16,
                                borderRadius: 12,
                                background: "#fafafa",
                            }}
                        >
                            <Space>
                                <FileTextOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    Contract Information
                                </span>
                            </Space>
                        </Card>

                        <Descriptions
                            bordered
                            column={2}
                            size="small"
                        >
                            <Descriptions.Item label="Contract No">
                                CNT-000125
                            </Descriptions.Item>

                            <Descriptions.Item label="Contract Type">
                                RATE CONTRACT
                            </Descriptions.Item>

                            <Descriptions.Item label="Start Date">
                                01-Jun-2026
                            </Descriptions.Item>

                            <Descriptions.Item label="End Date">
                                31-Dec-2026
                            </Descriptions.Item>
                        </Descriptions>

                        {/* Centers */}

                        <Card
                            size="small"
                            style={{
                                marginTop: 24,
                                marginBottom: 16,
                                borderRadius: 12,
                                background: "#fafafa",
                            }}
                        >
                            <Space>
                                <BankOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    Mapped Centers
                                </span>
                            </Space>
                        </Card>

                        <Card>
                            <Space wrap>
                                <Tag color="blue">
                                    🏥 Main Hospital
                                </Tag>

                                <Tag color="green">
                                    🏥 Emergency Store
                                </Tag>

                                <Tag color="purple">
                                    🏥 OT Pharmacy
                                </Tag>
                            </Space>
                        </Card>

                        {/* Audit */}

                        <Card
                            size="small"
                            style={{
                                marginTop: 24,
                                marginBottom: 16,
                                borderRadius: 12,
                                background: "#fafafa",
                            }}
                        >
                            <Space>
                                <UserOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    Audit Information
                                </span>
                            </Space>
                        </Card>

                        <Descriptions
                            bordered
                            column={2}
                            size="small"
                        >
                            <Descriptions.Item label="Created By">
                                Admin User
                            </Descriptions.Item>

                            <Descriptions.Item label="Created On">
                                21-May-2026
                            </Descriptions.Item>

                            <Descriptions.Item label="Modified By">
                                Harish Dwivedi
                            </Descriptions.Item>

                            <Descriptions.Item label="Modified On">
                                25-Jun-2026
                            </Descriptions.Item>
                        </Descriptions>

                        <Alert
                            style={{
                                marginTop: 24,
                                borderRadius: 12,
                            }}
                            type="info"
                            showIcon
                            message="Procurement Information"
                            description="This supplier item mapping is active and available for procurement across all mapped centers."
                        />
                    </>
                )}
            </Drawer>
            <ImportSupplierItemMappingDrawer
                open={openImportDrawer}
                onClose={() =>
                    setOpenImportDrawer(false)
                }
            />
        </>
    );

}

export default SupplierItemMapping;