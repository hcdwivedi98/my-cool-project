// src/modules/billing/components/BillingActions.jsx

import React from "react";

import {
    Button,
    Card,
    Space,
    Typography,
} from "antd";

import {
    CheckCircleOutlined,
    EyeOutlined,
    PrinterOutlined,
    SaveOutlined,
    PlusOutlined,
} from "@ant-design/icons";


const {
    Text,
} = Typography;


/* =========================================================
   COMPONENT
   ========================================================= */

const BillingActions = ({

    loading = false,

    submitting = false,

    disabled = false,

    completed = false,

    onSaveDraft,

    onPreview,

    onComplete,

    onPrintInvoice,

    onNewBill,

}) => {

    const isBusy =
        Boolean(
            loading ||
            submitting
        );


    /* =====================================================
       SAVE DRAFT
       ===================================================== */

    const handleSaveDraft = () => {

        if (
            isBusy
        ) {

            return;

        }


        if (
            typeof onSaveDraft ===
            "function"
        ) {

            onSaveDraft();

        }

    };


    /* =====================================================
       PREVIEW
       ===================================================== */

    const handlePreview = () => {

        if (
            isBusy ||
            disabled
        ) {

            return;

        }


        if (
            typeof onPreview ===
            "function"
        ) {

            onPreview();

        }

    };


    /* =====================================================
       COMPLETE
       ===================================================== */

    const handleComplete = () => {

        if (
            isBusy ||
            disabled ||
            completed
        ) {

            return;

        }


        if (
            typeof onComplete ===
            "function"
        ) {

            onComplete();

        }

    };


    /* =====================================================
       PRINT
       ===================================================== */

    const handlePrint = () => {

        if (
            isBusy
        ) {

            return;

        }


        if (
            typeof onPrintInvoice ===
            "function"
        ) {

            onPrintInvoice();

        }

    };

    /* =====================================================
       NEW BILL
       ===================================================== */

    const handleNewBill = () => {

        if (
            isBusy
        ) {

            return;

        }


        if (
            typeof onNewBill ===
            "function"
        ) {

            onNewBill();

        }

    };
    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <Card

            className="billing-actions-card"

            title="Bill Actions"

        >

            <Space

                direction="vertical"

                size={10}

                style={{
                    width:
                        "100%",
                }}

            >

                {/* =========================================
                    COMPLETED STATUS
                ========================================= */}

                {
                    completed && (

                        <Text
                            type="success"
                            strong
                        >

                            <CheckCircleOutlined />

                            {" "}

                            Bill completed successfully

                        </Text>

                    )
                }


                {/* =========================================
                    SAVE DRAFT
                ========================================= */}

                {
                    !completed && (

                        <Button

                            block

                            size="large"

                            icon={
                                <SaveOutlined />
                            }

                            loading={
                                loading &&
                                !submitting
                            }

                            disabled={
                                isBusy
                            }

                            onClick={
                                handleSaveDraft
                            }

                        >

                            Save Draft

                        </Button>

                    )
                }


                {/* =========================================
                    BILL PREVIEW
                ========================================= */}

                {
                    !completed && (

                        <Button

                            id="billing-preview-button"

                            block

                            type="primary"

                            size="large"

                            icon={
                                <EyeOutlined />
                            }

                            disabled={
                                isBusy ||
                                disabled
                            }

                            onClick={
                                handlePreview
                            }

                        >

                            Bill Preview

                        </Button>

                    )
                }


                {/* =========================================
                    COMPLETE & PRINT
                ========================================= */}

                {
                    !completed && (

                        <Button

                            id="billing-complete-button"

                            block

                            type="primary"

                            size="large"

                            icon={
                                <CheckCircleOutlined />
                            }

                            loading={
                                submitting
                            }

                            disabled={
                                isBusy ||
                                disabled
                            }

                            onClick={
                                handleComplete
                            }

                        >

                            Complete & Print

                        </Button>

                    )
                }


                {/* =========================================
                    PRINT / REPRINT
                ========================================= */}

                {
                    completed && (

                        <Button

                            block

                            size="large"

                            icon={
                                <PrinterOutlined />
                            }

                            disabled={
                                isBusy
                            }

                            onClick={
                                handlePrint
                            }

                        >

                            Print Invoice

                        </Button>

                    )
                }

                {
                    completed && (

                        <>

                            <Button

                                block

                                size="large"

                                icon={
                                    <PrinterOutlined />
                                }

                                disabled={
                                    isBusy
                                }

                                onClick={
                                    handlePrint
                                }

                            >

                                Print Invoice

                            </Button>


                            <Button

                                block

                                type="primary"

                                size="large"

                                icon={
                                    <PlusOutlined />
                                }

                                disabled={
                                    isBusy
                                }

                                onClick={
                                    handleNewBill
                                }

                            >

                                New Bill

                            </Button>

                        </>

                    )
                }
            </Space>

        </Card>

    );

};


export default BillingActions;