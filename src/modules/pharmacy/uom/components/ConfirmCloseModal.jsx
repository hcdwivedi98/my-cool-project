// src/modules/pharmacy/uom/components/ConfirmCloseModal.jsx

import React from "react";

import {
    Modal,
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

    loading = false,

    onCancel,

    onConfirm,
}) => {
    return (
        <Modal
            open={open}
            title="Discard Changes?"
            centered
            destroyOnHidden
            maskClosable={false}
            keyboard={!loading}
            okText="Discard Changes"
            cancelText="Continue Editing"
            okButtonProps={{
                danger: true,
                loading,
            }}
            onCancel={onCancel}
            onOk={onConfirm}
            width={420}
            icon={
                <ExclamationCircleOutlined />
            }
        >
            <div
                style={{
                    padding:
                        "8px 0 4px",
                }}
            >
                <Text>
                    You have unsaved
                    changes in this UOM.
                </Text>

                <br />

                <Text type="secondary">
                    If you close this
                    drawer, all unsaved
                    changes will be lost.
                </Text>
            </div>
        </Modal>
    );
};


export default ConfirmCloseModal;