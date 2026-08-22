// src/modules/pharmacy/generic/components/ConfirmCloseModal.jsx

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

const {
    Text,
} = Typography;

const ConfirmCloseModal = ({
    open = false,
    onCancel,
    onConfirm,
    loading = false,
}) => {
    return (
        <Modal
            open={open}
            centered
            width={430}
            title="Discard Changes?"
            onCancel={onCancel}
            maskClosable={false}
            keyboard={!loading}
            destroyOnClose
            footer={
                <Space>
                    <Button
                        onClick={
                            onCancel
                        }
                        disabled={
                            loading
                        }
                    >
                        Continue Editing
                    </Button>

                    <Button
                        danger
                        type="primary"
                        loading={
                            loading
                        }
                        onClick={
                            onConfirm
                        }
                    >
                        Discard Changes
                    </Button>
                </Space>
            }
        >
            <div
                style={{
                    display:
                        "flex",
                    gap: 12,
                    padding:
                        "8px 0 12px",
                }}
            >
                <ExclamationCircleOutlined
                    style={{
                        fontSize: 24,
                        color: "#faad14",
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
                            drawer, all
                            unsaved changes will
                            be lost.
                        </Text>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmCloseModal;