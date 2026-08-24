// src/modules/user-management/permission/components/ConfirmCloseModal.jsx

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
    onCancel,
    onConfirm,
}) => {

    return (

        <Modal

            open={
                open
            }

            title={
                "Discard Changes?"
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

            footer={null}

            onCancel={
                onCancel
            }

            destroyOnHidden

        >

            <div
                className="permission-confirm-close"
            >

                {/* =================================================
                    ICON
                ================================================= */}

                <div
                    className="permission-confirm-close-icon"
                >

                    <ExclamationCircleOutlined />

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                    className="permission-confirm-close-content"
                >

                    <Text
                        strong
                    >
                        You have unsaved changes.
                    </Text>


                    <div
                        style={{
                            marginTop:
                                8,
                        }}
                    >
                        If you close this window now,
                        your changes will be lost.
                    </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div
                    className="permission-confirm-close-actions"
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