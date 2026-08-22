// src/modules/pharmacy/drug-strength/components/ConfirmCloseModal.jsx

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


/* =========================================================
   CONFIRM CLOSE MODAL
   ========================================================= */

const ConfirmCloseModal = ({
    open = false,

    loading = false,

    title = "Discard Changes?",

    description =
        "You have unsaved changes. Are you sure you want to close this form?",

    onCancel,

    onConfirm,
}) => {

    return (
        <Modal
            open={open}

            title={title}

            centered

            destroyOnHidden

            maskClosable={false}

            keyboard={!loading}

            closable={!loading}

            onCancel={onCancel}

            footer={null}

            width={440}
        >

            {/* =================================================
                CONTENT
            ================================================= */}

            <div
                className="drug-strength-confirm-close"
            >

                <div
                    className="drug-strength-confirm-close-icon"
                >
                    <ExclamationCircleOutlined />
                </div>


                <div
                    className="drug-strength-confirm-close-content"
                >

                    <Text>
                        {description}
                    </Text>

                </div>


                {/* =============================================
                    ACTIONS
                ============================================== */}

                <div
                    className="drug-strength-confirm-close-actions"
                >

                    <Space>

                        <Button
                            onClick={
                                onCancel
                            }

                            disabled={
                                loading
                            }
                        >
                            Keep Editing
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