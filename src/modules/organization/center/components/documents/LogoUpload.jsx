import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Upload, Image, Space, Typography } from "antd";
import {
    UploadOutlined,
    DeleteOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import {
    AppButton,
    AppCard,
    AppFormSection,
} from "@/components/common";

const { Text } = Typography;

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
];

function LogoUpload({
    value,
    onChange,
    readOnly = false,
    title = "Hospital Logo",
}) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        if (!value) {
            setPreviewUrl(null);
            return;
        }

        if (typeof value === "string") {
            setPreviewUrl(value);
            return;
        }

        const url = URL.createObjectURL(value);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [value]);

    const beforeUpload = (file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            window.message?.error?.(
                "Only PNG, JPG and SVG files are allowed."
            );
            return Upload.LIST_IGNORE;
        }

        if (file.size > MAX_FILE_SIZE) {
            window.message?.error?.(
                "Maximum file size is 2 MB."
            );
            return Upload.LIST_IGNORE;
        }

        onChange?.(file);

        return false;
    };

    const handleRemove = () => {
        onChange?.(null);
        setPreviewUrl(null);
    };

    return (
        <>
            <AppFormSection title={title}>
                <AppCard>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                width: 180,
                                height: 180,
                                border: "1px dashed #d9d9d9",
                                borderRadius: 8,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                background: "#fafafa",
                            }}
                        >
                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    width={170}
                                    height={170}
                                    style={{
                                        objectFit: "contain",
                                    }}
                                    preview={false}
                                />
                            ) : (
                                <Text type="secondary">
                                    No Logo Selected
                                </Text>
                            )}
                        </div>

                        {!readOnly && (
                            <Upload
                                accept=".png,.jpg,.jpeg,.svg"
                                beforeUpload={beforeUpload}
                                showUploadList={false}
                                maxCount={1}
                            >
                                <AppButton
                                    icon={<UploadOutlined />}
                                >
                                    {value ? "Replace Logo" : "Upload Logo"}
                                </AppButton>
                            </Upload>
                        )}

                        <Space>
                            {previewUrl && (
                                <AppButton
                                    icon={<EyeOutlined />}
                                    onClick={() =>
                                        setPreviewOpen(true)
                                    }
                                >
                                    Preview
                                </AppButton>
                            )}

                            {!readOnly && value && (
                                <AppButton
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={handleRemove}
                                >
                                    Remove
                                </AppButton>
                            )}
                        </Space>

                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <Text type="secondary">
                                Supported: PNG, JPG, JPEG, SVG
                            </Text>

                            <br />

                            <Text type="secondary">
                                Maximum Size: 2 MB
                            </Text>

                            <br />

                            <Text type="secondary">
                                Recommended: 512 × 512 px
                            </Text>
                        </div>
                    </div>
                </AppCard>
            </AppFormSection>

            <Image
                style={{ display: "none" }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: setPreviewOpen,
                }}
                src={previewUrl}
            />
        </>
    );
}

LogoUpload.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    title: PropTypes.string,
};

export default LogoUpload;