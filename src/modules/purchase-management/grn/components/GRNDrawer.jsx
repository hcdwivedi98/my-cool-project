import React from "react";

import {
    Drawer,
} from "antd";

import GRNForm
    from "./GRNForm";

import "../styles/grn.css";


const GRNDrawer = ({

    open = false,

    mode = "CREATE",

    initialValues = {},

    auditTrail = [],

    loading = false,

    onSubmit,

    onSaveDraft,

    onCancel,

    onClose,

}) => {

    return (

        <Drawer

            open={
                open
            }

            placement="right"

            width="82vw"

            closable={false}

            destroyOnClose={false}

            className="grn-drawer"

            styles={{
                body: {
                    padding: 0,
                    overflow: "hidden",
                },
            }}

            onClose={
                onClose
            }

        >

            <div
                className="grn-drawer-shell"
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className="grn-drawer-header"
                >

                    <button
                        type="button"

                        className="grn-drawer-close"

                        onClick={
                            onClose
                        }
                    >
                        ×
                    </button>


                    <div
                        className="grn-drawer-header-content"
                    >

                        <div
                            className="grn-drawer-title"
                        >
                            {
                                mode === "EDIT"
                                    ? "Edit Goods Receipt Note"
                                    : mode === "VIEW"
                                        ? "Goods Receipt Note"
                                        : "Create Goods Receipt Note"
                            }
                        </div>

                        <div
                            className="grn-drawer-subtitle"
                        >
                            Goods Receipt Note
                        </div>

                    </div>

                </div>


                {/* =================================================
                    MAIN FORM
                ================================================= */}

                <div
                    className="grn-drawer-main"
                >

                    <GRNForm

                        mode={
                            mode
                        }

                        initialValues={
                            initialValues
                        }

                        auditTrail={
                            auditTrail
                        }

                        loading={
                            loading
                        }

                        onSubmit={
                            onSubmit
                        }

                        onSaveDraft={
                            onSaveDraft
                        }

                        onCancel={
                            onCancel ||
                            onClose
                        }

                        onClose={
                            onClose
                        }

                    />

                </div>

            </div>

        </Drawer>

    );

};


export default GRNDrawer;