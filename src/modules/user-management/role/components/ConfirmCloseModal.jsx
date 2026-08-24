// src/modules/user-management/role/components/ConfirmCloseModal.jsx

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

            title="Discard Changes?"

            centered

            maskClosable={
                false
            }

            closable={
                !loading
            }

            footer={null}

            onCancel={
                onCancel
            }

            width={
                440
            }

        >

            <div
                className="role-confirm-close"
            >

                {/* =================================================
                    ICON
                ================================================= */}

                <div
                    className="role-confirm-close-icon"
                >

                    <ExclamationCircleOutlined />

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                    className="role-confirm-close-content"
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

                        <Text
                            type="secondary"
                        >
                            Are you sure you want to close this
                            form? All unsaved changes will be lost.
                        </Text>

                    </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div
                    className="role-confirm-close-actions"
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