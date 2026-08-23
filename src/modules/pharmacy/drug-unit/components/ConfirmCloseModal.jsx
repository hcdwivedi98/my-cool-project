/* =========================================================
   DRUG UNIT - CONFIRM CLOSE MODAL
   ========================================================= */

import React from "react";

import {
    Button,
    Modal,
    Space,
} from "antd";

import {
    ExclamationCircleOutlined,
} from "@ant-design/icons";


/* =========================================================
   COMPONENT
   ========================================================= */

const ConfirmCloseModal = ({
    open = false,

    loading = false,

    onConfirm,

    onCancel,
}) => {

    return (
        <Modal
            open={open}
            title="Discard Changes?"
            centered
            closable={!loading}
            maskClosable={!loading}
            keyboard={!loading}
            onCancel={onCancel}
            footer={null}
            width={420}
        >

            <div
                className="drug-unit-confirm-close"
            >

                {/* =========================================
                    ICON
                ========================================== */}

                <div
                    className="drug-unit-confirm-close-icon"
                >
                    <ExclamationCircleOutlined />
                </div>


                {/* =========================================
                    CONTENT
                ========================================== */}

                <div
                    className="drug-unit-confirm-close-content"
                >
                    You have unsaved changes in this form.
                    Are you sure you want to close without
                    saving?
                </div>


                {/* =========================================
                    ACTIONS
                ========================================== */}

                <div
                    className="drug-unit-confirm-close-actions"
                >

                    <Space>

                        <Button
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Continue Editing
                        </Button>


                        <Button
                            danger
                            type="primary"
                            loading={loading}
                            onClick={onConfirm}
                        >
                            Discard Changes
                        </Button>

                    </Space>

                </div>

            </div>

        </Modal>
    );
};


export default ConfirmCloseModal;