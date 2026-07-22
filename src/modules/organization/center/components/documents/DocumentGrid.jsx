import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useMemo } from "react";

import {
    getDocumentStatus,
    downloadDocument,
    formatDocumentDate,
} from "../../utils/documentUtils";

import StatusTag from "../StatusTag";


const getColumns = ({
    readOnly,
    onEdit,
    onDelete,
}) => [

        {
            title: "Status",
            key: "status",
            width: 150,

            sorter: (a, b) =>
                getDocumentStatus(a.expiryDate)
                    .text.localeCompare(
                        getDocumentStatus(b.expiryDate).text
                    ),

            render: (_, record) => {

                const status =
                    getDocumentStatus(record.expiryDate);

                return (
                    <StatusTag
                        status={status.color}
                        text={status.text}
                    />
                );

            },
        },
        {
            title: "Type",
            dataIndex: "documentType",
            key: "documentType",
            width: 170,
            sorter: (a, b) =>
                (a.documentType || "").localeCompare(
                    b.documentType || ""
                ),
        },
        {
            title: "Document No.",
            dataIndex: "documentNumber",
            key: "documentNumber",
            width: 180,
            sorter: (a, b) =>
                (a.documentNumber || "").localeCompare(
                    b.documentNumber || ""
                ),
        },

        {
            title: "Authority",
            dataIndex: "authority",
            key: "authority",
            width: 220,
            ellipsis: true,
        },

        {
            title: "Issue Date",
            dataIndex: "issueDate",
            key: "issueDate",
            width: 140,
            sorter: (a, b) =>
                (a.issueDate ? dayjs(a.issueDate).valueOf() : 0) -
                (b.issueDate ? dayjs(b.issueDate).valueOf() : 0),
            render: formatDocumentDate,
        },

        {
            title: "Expiry Date",
            dataIndex: "expiryDate",
            key: "expiryDate",
            width: 140,
            sorter: (a, b) =>
                (a.expiryDate
                    ? dayjs(a.expiryDate).valueOf() : 0) -
                (b.expiryDate
                    ? dayjs(b.expiryDate).valueOf()
                    : 0),

            render: (value) =>
                value
                    ? dayjs(value).format("DD-MMM-YYYY")
                    : "-",
        },

        {
            title: "Actions",
            key: "actions",
            width: 220,
            fixed: "right",

            render: (_, record) => (
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                    }}
                >
                    <AppButton
                        type="link"
                        size="small"
                        onClick={() => {
                            if (record.attachment) {
                                window.open(record.attachment, "_blank");
                            }
                        }}
                    >
                        View
                    </AppButton>

                    <AppButton
                        type="link"
                        size="small"
                        onClick={() => {
                            if (record.attachment) {
                                downloadDocument(
                                    record.attachment,
                                    record.fileName
                                );
                                link.href = record.attachment;
                                link.download =
                                    record.fileName ??
                                    "document";
                                link.click();
                            }
                        }}
                    >
                        Download
                    </AppButton>

                    {!readOnly && (
                        <>
                            <AppButton
                                type="link"
                                size="small"
                                onClick={() => onEdit?.(record)}
                            >
                                Edit
                            </AppButton>

                            <AppPopconfirm
                                title="Delete Document"
                                description="Are you sure you want to delete this document?"
                                okText="Delete"
                                cancelText="Cancel"
                                onConfirm={() => onDelete?.(record.id)}
                            >
                                <AppButton
                                    danger
                                    type="link"
                                    size="small"
                                >
                                    Delete
                                </AppButton>
                            </AppPopconfirm>
                        </>
                    )}
                </div>
            ),
        }

    ];

function DocumentGrid({

    data = [],

    readOnly = false,

    onEdit,

    onDelete,

}) {

    const columns = useMemo(
        () =>
            getColumns({
                readOnly,
                onEdit,
                onDelete,
            }),
        [readOnly, onEdit, onDelete]
    );

    return (

        <AppTable
            rowKey="id"
            columns={columns}
            dataSource={data}
            sticky
            locale={{
                emptyText: (
                    <div
                        style={{
                            padding: 30,
                            textAlign: "center",
                        }}
                    >
                        No Compliance Documents Available
                    </div>
                ),
            }}
            pagination={{
                pageSize: 10,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
                showTotal: (total) =>
                    `Total ${total} Documents`,
            }}
            scroll={{
                x: 1300,
            }}
        />

    );

}



DocumentGrid.propTypes = {

    data: PropTypes.array,

    readOnly: PropTypes.bool,

    onEdit: PropTypes.func,

    onDelete: PropTypes.func,

};
export default DocumentGrid;