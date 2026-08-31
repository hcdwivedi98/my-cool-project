// src/modules/purchase-management/grn/components/GRNStockPostingModal.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Alert,
    Descriptions,
    Form,
    Input,
    Modal,
    Tag,
} from "antd";


/* =========================================================
   STOCK POSTING MODAL
   ========================================================= */

const GRNStockPostingModal = ({
    open = false,

    grn = null,

    action = "POST",

    loading = false,

    onConfirm,

    onCancel,

}) => {

    const [
        form
    ] =
        Form.useForm();


    /* =====================================================
       ACTION
    ===================================================== */

    const normalizedAction =
        String(
            action ||
            "POST"
        )
            .toUpperCase();


    const isRetry =
        normalizedAction ===
        "RETRY";


    /* =====================================================
       RESET FORM
    ===================================================== */

    useEffect(
        () => {

            if (
                open
            ) {

                form.resetFields();

            }

        },
        [
            open,
            form,
        ]
    );


    /* =====================================================
       TITLE
    ===================================================== */

    const title =
        isRetry
            ? "Retry Stock Posting"
            : "Post GRN Stock";


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    const description =
        isRetry
            ? "Retry posting the received GRN stock to inventory."
            : "Post the received GRN stock to inventory.";


    /* =====================================================
       STOCK STATUS
    ===================================================== */

    const stockPostingStatus =
        String(
            grn?.stockPostingStatus ||
            grn?.stockPosting?.status ||
            grn?.stockPostingStatusCode ||
            "NOT_POSTED"
        )
            .toUpperCase();


    /* =====================================================
       STATUS TAG
    ===================================================== */

    const statusTag =
        useMemo(
            () => {

                switch (
                    stockPostingStatus
                ) {

                    case "POSTED":

                        return (
                            <Tag
                                color="success"
                            >
                                Posted
                            </Tag>
                        );


                    case "PENDING":

                        return (
                            <Tag
                                color="processing"
                            >
                                Posting
                            </Tag>
                        );


                    case "FAILED":

                        return (
                            <Tag
                                color="error"
                            >
                                Failed
                            </Tag>
                        );


                    default:

                        return (
                            <Tag>
                                Not Posted
                            </Tag>
                        );

                }

            },
            [
                stockPostingStatus,
            ]
        );


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

                await onConfirm(
                    values
                );

            }

        }
        catch (
            error
        ) {

            /*
             * Ant Design validation errors
             * are intentionally not displayed
             * as application errors here.
             */

            if (
                error?.errorFields
            ) {

                return;

            }


            console.error(
                "Stock posting confirmation error:",
                error
            );

        }

    };


    /* =====================================================
       MODAL
    ===================================================== */

    return (

        <Modal

            open={
                open
            }

            title={
                title
            }

            okText={
                isRetry
                    ? "Retry Post"
                    : "Post Stock"
            }

            cancelText="Cancel"

            confirmLoading={
                loading
            }

            onOk={
                handleConfirm
            }

            onCancel={
                onCancel
            }

            destroyOnClose

            maskClosable={
                !loading
            }

            closable={
                !loading
            }

        >

            {/* =============================================
                DESCRIPTION
            ============================================= */}

            <Alert

                type={
                    isRetry
                        ? "warning"
                        : "info"
                }

                showIcon

                message={
                    description
                }

                style={{
                    marginBottom:
                        16,
                }}

            />


            {/* =============================================
                GRN INFORMATION
            ============================================= */}

            <Descriptions

                bordered

                size="small"

                column={
                    1
                }

                style={{
                    marginBottom:
                        16,
                }}

            >

                <Descriptions.Item
                    label="GRN No."
                >
                    {
                        grn?.grnNumber ||
                        "-"
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="GRN Date"
                >
                    {
                        grn?.grnDate ||
                        "-"
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Supplier"
                >
                    {
                        grn?.supplierName ||
                        "-"
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Store"
                >
                    {
                        grn?.storeName ||
                        "-"
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Items"
                >
                    {
                        grn?.totalItems ??
                        grn?.items?.length ??
                        0
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Received Quantity"
                >
                    {
                        grn?.totalReceivedQuantity ??
                        grn?.receivedQuantity ??
                        0
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Stock Status"
                >
                    {
                        statusTag
                    }
                </Descriptions.Item>

            </Descriptions>


            {/* =============================================
                REMARKS
            ============================================= */}

            <Form

                form={
                    form
                }

                layout="vertical"

            >

                <Form.Item
                    name="remarks"
                    label="Remarks"
                >

                    <Input.TextArea

                        rows={
                            3
                        }

                        maxLength={
                            500
                        }

                        showCount

                        placeholder={
                            isRetry
                                ? "Enter retry remarks..."
                                : "Enter stock posting remarks..."
                        }

                    />

                </Form.Item>

            </Form>


            {/* =============================================
                WARNING
            ============================================= */}

            {
                isRetry && (

                    <Alert

                        type="warning"

                        showIcon

                        message="Previous stock posting failed."

                        description={
                            "Please verify the GRN quantities and batch details before retrying."
                        }

                    />

                )
            }

        </Modal>

    );

};


export default GRNStockPostingModal;