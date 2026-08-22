// src/modules/pharmacy/drug-route/components/ConfirmCloseModal.jsx

import React from "react";

import {
    Modal,
} from "antd";

import {
    ExclamationCircleOutlined,
} from "@ant-design/icons";


const ConfirmCloseModal = ({
    open = false,

    loading = false,

    onConfirm,

    onCancel,
}) => {

    return (
        <Modal
            open={
                open
            }

            title="Discard Changes?"

            centered

            okText="Discard"

            cancelText="Keep Editing"

            okButtonProps={{
                danger:
                    true,

                loading:
                    loading,
            }}

            cancelButtonProps={{
                disabled:
                    loading,
            }}

            onOk={
                onConfirm
            }

            onCancel={
                onCancel
            }

            closable={
                !loading
            }

            maskClosable={
                !loading
            }

            keyboard={
                !loading
            }

            icon={
                <ExclamationCircleOutlined />
            }
        >
            <div
                style={{
                    lineHeight:
                        1.6,
                }}
            >
                You have unsaved changes.

                <br />

                Are you sure you want to close
                without saving?
            </div>
        </Modal>
    );
};


export default ConfirmCloseModal;