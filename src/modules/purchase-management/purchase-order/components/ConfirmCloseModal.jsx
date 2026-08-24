// src/modules/purchase-management/purchase-order/components/ConfirmCloseModal.jsx

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
   CONFIRM CLOSE MODAL
   ========================================================= */

const ConfirmCloseModal = ({
    open = false,

    loading = false,

    title =
        "Discard Purchase Order?",

    description =
        "You have unsaved changes. Are you sure you want to close this form? Your changes will be lost.",

    onConfirm,

    onCancel,

}) => {

    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <Modal

            open={
                open
            }

            title={
                null
            }

            footer={
                null
            }

            centered

            closable={
                !loading
            }

            maskClosable={
                !loading
            }

            keyboard={
                !loading
            }

            onCancel={
                onCancel
            }

            width={
                460
            }

            destroyOnHidden
        >

            <div
                className="purchase-order-confirm-close"
            >

                {/* =================================================
                    ICON
                ================================================= */}

                <div
                    className="purchase-order-confirm-close-icon"
                >

                    <ExclamationCircleOutlined />

                </div>


                {/* =================================================
                    TITLE
                ================================================= */}

                <div
                    className="purchase-order-confirm-close-title"
                >

                    {
                        title
                    }

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                    className="purchase-order-confirm-close-content"
                >

                    {
                        description
                    }

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div
                    className="purchase-order-confirm-close-actions"
                >

                    <Space>

                        <Button
                            disabled={
                                loading
                            }

                            onClick={
                                onCancel
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

                </div>

            </div>

        </Modal>

    );

};


export default ConfirmCloseModal;