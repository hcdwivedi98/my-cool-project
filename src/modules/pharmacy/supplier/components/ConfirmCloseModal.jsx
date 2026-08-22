// src/modules/pharmacy/supplier/components/ConfirmCloseModal.jsx

import React from "react";

import {
    Button,
    Modal,
    Space,
    Typography,
} from "antd";

import {
    ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ConfirmCloseModal = ({
    open = false,
    onCancel,
    onDiscard,
}) => {
    return (
        <Modal
            open={open}
            title="Discard Changes?"
            centered
            width={420}
            mask={{
                closable: false,
            }}
            footer={null}
            onCancel={onCancel}
            destroyOnHidden
        >
            <div
                style={{
                    display: "flex",
                    gap: 12,
                    alignItems:
                        "flex-start",
                    padding:
                        "8px 0 20px",
                }}
            >
                <ExclamationCircleOutlined
                    style={{
                        fontSize: 22,
                        marginTop: 2,
                    }}
                />

                <div>
                    <Text strong>
                        You have unsaved
                        changes.
                    </Text>

                    <div
                        style={{
                            marginTop: 6,
                        }}
                    >
                        <Text type="secondary">
                            If you close this
                            form now, all
                            unsaved changes
                            will be lost.
                        </Text>
                    </div>
                </div>
            </div>

            <Space
                orientation="horizontal"
                style={{
                    width: "100%",
                    justifyContent:
                        "flex-end",
                }}
            >
                <Button
                    onClick={onCancel}
                >
                    Continue Editing
                </Button>

                <Button
                    danger
                    type="primary"
                    onClick={
                        onDiscard
                    }
                >
                    Discard Changes
                </Button>
            </Space>
        </Modal>
    );
};

export default ConfirmCloseModal;