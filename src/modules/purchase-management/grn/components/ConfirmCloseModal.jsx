// src/modules/purchase-management/grn/components/ConfirmCloseModal.jsx

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

    onConfirm,

    onCancel,

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

            onCancel={
                onCancel
            }

            footer={

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
                        Discard & Close
                    </Button>

                </Space>

            }

        >

            <div
                style={{
                    display:
                        "flex",

                    gap:
                        12,

                    alignItems:
                        "flex-start",

                    padding:
                        "8px 0",
                }}
            >

                <ExclamationCircleOutlined
                    style={{
                        fontSize:
                            22,

                        color:
                            "#faad14",

                        marginTop:
                            2,
                    }}
                />


                <div>

                    <Text>
                        You have unsaved changes in this
                        Goods Receipt Note.
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
                            If you close now, the changes
                            made in this form will be lost.
                        </Text>

                    </div>

                </div>

            </div>

        </Modal>

    );

};


export default ConfirmCloseModal;