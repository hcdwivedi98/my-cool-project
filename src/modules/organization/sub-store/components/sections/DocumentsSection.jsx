import { useState } from "react";

import {
    AppButton,
    AppTable
} from "@/components/common";

const DocumentsSection = () => {

    const [documents, setDocuments] = useState([]);

    const columns = [

        {
            title: "Document Name",
            dataIndex: "documentName",
            key: "documentName"
        },
        {
            title: "Document Type",
            dataIndex: "documentType",
            key: "documentType"
        },
        {
            title: "Uploaded By",
            dataIndex: "uploadedBy",
            key: "uploadedBy"
        },
        {
            title: "Uploaded On",
            dataIndex: "uploadedOn",
            key: "uploadedOn"
        },
        {
            title: "Actions",
            key: "actions",
            width: 220,
            render: (_, record) => (

                <div
                    style={{
                        display: "flex",
                        gap: 8
                    }}
                >

                    <AppButton
                        type="link"
                        size="small"
                    >
                        View
                    </AppButton>

                    <AppButton
                        type="link"
                        size="small"
                    >
                        Download
                    </AppButton>

                    <AppButton
                        danger
                        type="link"
                        size="small"
                    >
                        Delete
                    </AppButton>

                </div>

            )
        }

    ];

    return (

        <>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 16
                }}
            >

                <AppButton
                    type="primary"
                >
                    Add Document
                </AppButton>

            </div>

            <AppTable
                rowKey="id"
                columns={columns}
                dataSource={documents}
                pagination={false}
            />

        </>

    );

};

export default DocumentsSection;