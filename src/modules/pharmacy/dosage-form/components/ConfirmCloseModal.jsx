// src/modules/pharmacy/dosage-form/components/ConfirmCloseModal.jsx

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

    title =
        "Discard Changes?",

    message =
        "You have unsaved changes. Are you sure you want to close without saving?",

    onContinue,

    onDiscard,

}) => {

    return (
        <Modal
            open={
                open
            }

            title={
                title
            }

            centered

            maskClosable={
                false
            }

            keyboard={
                false
            }

            closable={
                false
            }

            okText="Discard Changes"

            cancelText="Continue Editing"

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

            icon={
                <ExclamationCircleOutlined />
            }

            onOk={
                onDiscard
            }

            onCancel={
                onContinue
            }
        >

            <div
                style={{
                    paddingTop:
                        4,

                    color:
                        "#595959",

                    lineHeight:
                        1.6,
                }}
            >
                {
                    message
                }
            </div>

        </Modal>
    );
};


export default ConfirmCloseModal;