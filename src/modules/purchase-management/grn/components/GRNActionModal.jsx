// src/modules/purchase-management/grn/components/GRNActionModal.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Alert,
    Button,
    Form,
    Input,
    Modal,
    Space,
} from "antd";

import {
    CheckOutlined,
    CloseOutlined,
    SendOutlined,
} from "@ant-design/icons";

import {
    getGRNActionLabel,
    getGRNActionDescription,
} from "../utils/grn.workflow";


const {
    TextArea,
} = Input;


/* =========================================================
   GRN ACTION MODAL
   ========================================================= */

const GRNActionModal = ({

    open = false,

    action = null,

    grn = null,

    loading = false,

    onConfirm,

    onCancel,

}) => {


    /* =====================================================
       FORM
    ===================================================== */

    const [
        form
    ] =
        Form.useForm();


    /* =====================================================
       STATE
    ===================================================== */

    const [
        remarks,
        setRemarks,
    ] =
        useState(
            ""
        );


    /* =====================================================
       RESET
    ===================================================== */

    useEffect(
        () => {

            if (
                open
            ) {

                form.resetFields();

                setRemarks(
                    ""
                );

            }

        },
        [
            open,
            form,
        ]
    );


    /* =====================================================
       ACTION
    ===================================================== */

    const actionLabel =
        getGRNActionLabel(
            action
        );


    const actionDescription =
        getGRNActionDescription(
            action
        );


    /* =====================================================
       ACTION ICON
    ===================================================== */

    const getActionIcon = () => {

        switch (
            action
        ) {

            case "SUBMIT":

                return (
                    <SendOutlined />
                );


            case "APPROVE":

                return (
                    <CheckOutlined />
                );


            case "REJECT":

                return (
                    <CloseOutlined />
                );


            default:

                return null;

        }

    };


    /* =====================================================
       MODAL TITLE
    ===================================================== */

    const getModalTitle = () => {

        switch (
            action
        ) {

            case "SUBMIT":

                return "Submit GRN for Approval";


            case "APPROVE":

                return "Approve GRN";


            case "REJECT":

                return "Reject GRN";


            default:

                return "GRN Action";

        }

    };


    /* =====================================================
       CONFIRM
    ===================================================== */

    const handleConfirm = async () => {

        try {

            const values =
                await form.validateFields();


            if (
                typeof onConfirm ===
                "function"
            ) {

                await onConfirm({

                    action,

                    grn,

                    remarks:
                        values.remarks ||
                        "",

                });

            }

        }
        catch (
            error
        ) {

            /*
             * Ant Design validation errors
             * are intentionally handled by Form.
             */

        }

    };


    /* =====================================================
       REMARKS REQUIRED
    ===================================================== */

    const remarksRequired =
        action ===
        "REJECT";


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Modal

            open={
                open
            }

            title={
                getModalTitle()
            }

            centered

            destroyOnClose

            maskClosable={
                !loading
            }

            closable={
                !loading
            }

            onCancel={
                onCancel
            }

            width={500}

            footer={

                <Space>

                    <Button

                        icon={
                            <CloseOutlined />
                        }

                        disabled={
                            loading
                        }

                        onClick={
                            onCancel
                        }
                    >
                        Cancel
                    </Button>


                    <Button

                        type={
                            action ===
                            "REJECT"
                                ? "default"
                                : "primary"
                        }

                        danger={
                            action ===
                            "REJECT"
                        }

                        icon={
                            getActionIcon()
                        }

                        loading={
                            loading
                        }

                        onClick={
                            handleConfirm
                        }
                    >
                        {
                            actionLabel
                        }
                    </Button>

                </Space>

            }

        >

            {
                grn && (

                    <Alert

                        type={
                            action ===
                            "REJECT"
                                ? "warning"
                                : "info"
                        }

                        showIcon

                        message={
                            grn.grnNumber ||
                            "Goods Receipt Note"
                        }

                        description={
                            actionDescription
                        }

                        style={{
                            marginBottom:
                                18,
                        }}

                    />

                )
            }


            <Form

                form={
                    form
                }

                layout="vertical"

            >

                <Form.Item

                    label="Remarks"

                    name="remarks"

                    rules={

                        remarksRequired
                            ? [
                                {
                                    required: true,

                                    whitespace: true,

                                    message:
                                        "Please enter rejection remarks.",
                                },
                            ]
                            : []

                    }

                >

                    <TextArea

                        rows={4}

                        value={
                            remarks
                        }

                        onChange={
                            (event) =>
                                setRemarks(
                                    event.target.value
                                )
                        }

                        placeholder={
                            action ===
                            "REJECT"
                                ? "Enter reason for rejection"
                                : "Enter remarks (optional)"
                        }

                        maxLength={
                            1000
                        }

                        showCount

                        disabled={
                            loading
                        }

                    />

                </Form.Item>

            </Form>

        </Modal>

    );

};


export default GRNActionModal;