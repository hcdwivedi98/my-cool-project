import React, { useState } from "react";

import {
    Drawer,
    Upload,
    Button,
    Space,
    Typography,
    Card,
    Alert,
    message,
    Table,
    List,
    Tag,
} from "antd";

import {
    InboxOutlined,
    DownloadOutlined,
    UploadOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Dragger } = Upload;
const { Text } = Typography;

function ImportSupplierItemMappingDrawer({
    open,
    onClose,
}) {

    const [previewData, setPreviewData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [failedRecords, setFailedRecords] = useState([]);
    const handleDownloadTemplate = () => {
        const templateData = [
            {
                "Supplier Code": "",
                "Supplier Name": "",
                "Item Code": "",
                "Item Name": "",
                "Purchase Rate": "",
                "GST %": "",
                "Lead Time (Days)": "",
                "MOQ": "",
                "Maximum Qty": "",
                "Order Multiple": "",
                "Supplier Rank": "",
                "Contract No": "",
                "Contract Type": "",
                "Effective From": "",
                "Effective To": "",
                "Emergency Procurement": "YES/NO"
            }
        ];

        const worksheet =
            XLSX.utils.json_to_sheet(
                templateData
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "SupplierItemMappingTemplate"
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
            "Supplier_Item_Mapping_Template.xlsx"
        );

        message.success(
            "Template Downloaded Successfully"
        );
    };
    const validateExcelData = data => {

        const errors = [];
        const failed = [];

        data.forEach((row, index) => {

            const rowErrors = [];

            if (!row["Supplier Name"]) {

                rowErrors.push(
                    "Supplier Name Missing"
                );
            }

            if (!row["Item Name"]) {

                rowErrors.push(
                    "Item Name Missing"
                );
            }

            if (
                !row["Purchase Rate"] ||

                Number(
                    row["Purchase Rate"]
                ) <= 0
            ) {

                rowErrors.push(
                    "Invalid Purchase Rate"
                );
            }

            if (rowErrors.length > 0) {

                errors.push(
                    ...rowErrors.map(error => ({
                        row: index + 2,
                        error,
                    }))
                );

                failed.push({

                    ...row,

                    "Row Number":
                        index + 2,

                    Errors:
                        rowErrors.join(", ")
                });
            }
        });

        setValidationErrors(errors);

        setFailedRecords(failed);

        return errors.length === 0;
    };
    const handleFileUpload = file => {

        const reader = new FileReader();

        reader.onload = e => {

            const data = e.target.result;

            const workbook = XLSX.read(
                data,
                {
                    type: "binary",
                }
            );

            const sheetName =
                workbook.SheetNames[0];

            const worksheet =
                workbook.Sheets[sheetName];

            const jsonData =
                XLSX.utils.sheet_to_json(
                    worksheet
                );

            console.log(
                "Excel Data:",
                jsonData
            );

            setPreviewData(jsonData);
            validateExcelData(
                jsonData
            );

            console.log(
                "Preview State:",
                jsonData
            );
        };

        reader.readAsBinaryString(file);

        return false;
    };

    const handleDownloadErrorReport =
        () => {

            if (
                failedRecords.length === 0
            ) {

                message.warning(
                    "No failed records found"
                );

                return;
            }

            const worksheet =
                XLSX.utils.json_to_sheet(
                    failedRecords
                );

            const workbook =
                XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Import Errors"
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
                `Supplier_Import_Errors_${new Date()
                    .toISOString()
                    .slice(0, 10)}.xlsx`
            );

            message.success(
                "Error Report Downloaded"
            );
        };
    const handleImport = async () => {

        if (previewData.length === 0) {

            message.error(
                "Please upload Excel file"
            );

            return;
        }

        const payload = {

            supplierItemMappings:

                previewData.map(row => ({

                    supplierCode:
                        row["Supplier Code"],

                    supplierName:
                        row["Supplier Name"],

                    itemCode:
                        row["Item Code"],

                    itemName:
                        row["Item Name"],

                    purchaseRate:
                        Number(
                            row["Purchase Rate"]
                        ),

                    gstPercent:
                        Number(
                            row["GST %"]
                        ),

                    leadTimeDays:
                        Number(
                            row["Lead Time (Days)"]
                        ),

                    minimumOrderQty:
                        Number(
                            row["MOQ"]
                        ),

                    maximumOrderQty:
                        Number(
                            row["Maximum Qty"]
                        ),

                    orderMultiple:
                        Number(
                            row["Order Multiple"]
                        ),

                    supplierRank:
                        Number(
                            row["Supplier Rank"]
                        ),

                    contractNumber:
                        row["Contract No"],

                    contractType:
                        row["Contract Type"],

                    effectiveFrom:
                        row["Effective From"],

                    effectiveTo:
                        row["Effective To"],

                    emergencyProcurement:

                        row[
                        "Emergency Procurement"
                        ] === "YES"
                }))
        };

        console.log(
            "Bulk Import Payload",
            payload
        );

        // ====================================
        // API Placeholder
        // ====================================

        /*
        await supplierItemMappingService
            .bulkImport(payload);
        */

        message.success(
            `${previewData.length} records imported successfully`
        );

        resetImportState();

        onClose();
    };
    //latest
    const resetImportState = () => {

        setFileList([]);

        setPreviewData([]);

        setValidationErrors([]);

        setFailedRecords([]);
    };

    return (

        <Drawer
            title="Import Supplier Item Mappings"
            open={open}
            onClose={() => {

                resetImportState();

                onClose();
            }}
            width={700}
            destroyOnClose
        >

            <Space
                direction="vertical"
                size={24}
                style={{ width: "100%" }}
            >

                <Alert
                    type="info"
                    showIcon
                    message="Import Instructions"
                    description="Download template, fill supplier mappings and upload Excel file."
                />

                <Card>

                    <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                    >

                        <Button
                            icon={<DownloadOutlined />}
                            onClick={handleDownloadTemplate}
                        >
                            Download Template
                        </Button>

                        <Dragger
                            fileList={fileList}

                            beforeUpload={file => {

                                setFileList([file]);

                                handleFileUpload(file);

                                return false;
                            }}

                            onRemove={() => {

                                resetImportState();

                                message.info(
                                    "File removed successfully"
                                );
                            }}

                            maxCount={1}
                        >

                            <p>
                                <InboxOutlined
                                    style={{
                                        fontSize: 48,
                                        color: "#1677ff",
                                    }}
                                />
                            </p>

                            <p>
                                Click or Drag Excel File
                            </p>

                            <p>
                                Supported Formats:
                                .xlsx, .xls
                            </p>

                        </Dragger>

                    </Space>

                </Card>

                <Card title="Selected File">

                    {
                        fileList.length > 0

                            ? (
                                <Text strong>
                                    {fileList[0].name}
                                </Text>
                            )

                            : (
                                <Text type="secondary">
                                    No File Selected
                                </Text>
                            )
                    }

                </Card>
                {
                    previewData.length > 0 && (

                        <Card
                            title={
                                `Preview (${previewData.length} Records)`
                            }
                        >

                            <Table

                                rowKey={(_, index) =>
                                    index
                                }

                                size="small"

                                dataSource={
                                    previewData
                                }

                                scroll={{
                                    x: 1200,
                                }}

                                pagination={{
                                    pageSize: 5,
                                }}

                                columns={[
                                    {
                                        title:
                                            "Supplier",

                                        dataIndex:
                                            "Supplier Name",
                                    },

                                    {
                                        title:
                                            "Item",

                                        dataIndex:
                                            "Item Name",
                                    },

                                    {
                                        title:
                                            "Purchase Rate",

                                        dataIndex:
                                            "Purchase Rate",
                                    },

                                    {
                                        title:
                                            "GST",

                                        dataIndex:
                                            "GST %",
                                    },

                                    {
                                        title:
                                            "MOQ",

                                        dataIndex:
                                            "MOQ",
                                    },
                                ]}
                            />

                        </Card>
                    )
                }
                <Card
                    title="API Payload Preview"
                >

                    <pre
                        style={{
                            maxHeight: 250,
                            overflow: "auto",
                        }}
                    >

                        {
                            JSON.stringify(
                                previewData,
                                null,
                                2
                            )
                        }

                    </pre>

                </Card>
                {
                    validationErrors.length > 0 && (

                        <Card
                            title="Validation Errors"
                            style={{
                                border: "1px solid #ffccc7",
                            }}
                        >

                            <Alert
                                type="error"
                                showIcon
                                style={{
                                    marginBottom: 16,
                                }}
                                message={
                                    `${validationErrors.length} validation errors found`
                                }
                                description="Please correct the Excel file and upload again."
                            />
                            <Space
                                style={{
                                    width: "100%",
                                    justifyContent:
                                        "space-between",
                                    marginBottom: 16,
                                }}
                            >

                                <Alert
                                    type="error"
                                    showIcon
                                    message={
                                        `${validationErrors.length} validation errors found`
                                    }
                                />

                                <Button

                                    danger

                                    icon={
                                        <DownloadOutlined />
                                    }

                                    onClick={
                                        handleDownloadErrorReport
                                    }

                                >
                                    Download Error Report
                                </Button>

                            </Space>
                            <Table

                                rowKey={(_, index) => index}

                                size="small"

                                pagination={false}

                                dataSource={validationErrors}

                                columns={[

                                    {
                                        title: "Row",

                                        dataIndex: "row",

                                        render: value => (

                                            <Tag color="red">
                                                Row {value}
                                            </Tag>
                                        )
                                    },

                                    {
                                        title: "Error Message",

                                        dataIndex: "error",
                                    },

                                    {
                                        title: "Severity",

                                        render: (_, record) => (

                                            <Tag
                                                color={
                                                    record.error.includes(
                                                        "Invalid"
                                                    )

                                                        ? "orange"

                                                        : "red"
                                                }
                                            >
                                                {
                                                    record.error.includes(
                                                        "Invalid"
                                                    )

                                                        ? "Warning"

                                                        : "Critical"
                                                }
                                            </Tag>
                                        )
                                    }

                                ]}
                            />

                        </Card>
                    )
                }

                <Space
                    style={{
                        width: "100%",
                        justifyContent: "flex-end",
                    }}
                ></Space>
                <Space
                    style={{
                        width: "100%",
                        justifyContent: "flex-end",
                    }}
                >

                    <Button onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        type="primary"
                        icon={<UploadOutlined />}

                        disabled={
                            fileList.length === 0 ||
                            validationErrors.length > 0
                        }

                        onClick={handleImport}
                    >
                        Import
                    </Button>

                </Space>

            </Space>

        </Drawer>
    );
}

export default ImportSupplierItemMappingDrawer;