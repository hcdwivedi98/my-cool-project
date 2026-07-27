import { Empty } from "antd";

import {
    AppButton
} from "@/components/common";

const DocumentsSection = ({
    record,
    readOnly
}) => {

    return (

        <>

            {

                !readOnly && (

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
                            Upload Document
                        </AppButton>

                    </div>

                )

            }

            <Empty
                description="No documents uploaded."
            />

            {

                record?.documents?.length > 0 && (

                    <div>

                        {/* Future:
                            AppTable
                            Document Name
                            Type
                            Size
                            Uploaded By
                            Uploaded On
                            Download
                            Delete
                        */}

                    </div>

                )

            }

        </>

    );

};

export default DocumentsSection;