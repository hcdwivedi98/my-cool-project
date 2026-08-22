// src/modules/pharmacy/drug-category/components/ConfirmCloseModal.jsx

import React from "react";

import {
    Modal,
} from "antd";

import {
    ExclamationCircleOutlined,
} from "@ant-design/icons";


const ConfirmCloseModal = ({
    open = false,

    title = "Discard Changes?",

    message =
        "You have unsaved changes. Are you sure you want to close without saving?",

    confirmText = "Discard",

    cancelText = "Continue Editing",

    loading = false,

    onConfirm,

    onCancel,
}) => {

    return (
        <Modal
            open={open}

            title={title}

            centered

            maskClosable={false}

            keyboard={!loading}

            closable={!loading}

            onCancel={onCancel}

            footer={[
                <button
                    key="cancel"
                    type="button"
                    className="drug-category-modal-btn secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    {cancelText}
                </button>,

                <button
                    key="confirm"
                    type="button"
                    className="drug-category-modal-btn danger"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading
                        ? "Please wait..."
                        : confirmText}
                </button>,
            ]}
        >
            <div className="drug-category-confirm-content">

                <div className="drug-category-confirm-icon">
                    <ExclamationCircleOutlined />
                </div>

                <div className="drug-category-confirm-message">
                    {message}
                </div>

            </div>
        </Modal>
    );
};


export default ConfirmCloseModal;