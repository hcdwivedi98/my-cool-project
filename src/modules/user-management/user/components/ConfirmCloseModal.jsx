/* =========================================================
   USER CONFIRM CLOSE MODAL
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

            keyboard={
                !loading
            }

            closable={
                !loading
            }

            onCancel={
                onCancel
            }

            footer={null}

            destroyOnClose

            className="user-confirm-close-modal"
        >

            <div
                className="user-confirm-close"
            >

                {/* =================================================
                    ICON
                ================================================= */}

                <div
                    className="user-confirm-close-icon"
                >

                    <ExclamationCircleOutlined />

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                    className="user-confirm-close-content"
                >

                    <div
                        className="user-confirm-close-title"
                    >
                        You have unsaved changes.
                    </div>


                    <div
                        className="user-confirm-close-message"
                    >
                        If you close this form now, your changes
                        will be lost. Are you sure you want to
                        continue?
                    </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div
                    className="user-confirm-close-actions"
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