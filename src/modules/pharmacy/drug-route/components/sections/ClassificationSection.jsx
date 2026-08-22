// src/modules/pharmacy/drug-route/components/sections/ClassificationSection.jsx

import React from "react";

import {
    Col,
    Form,
    InputNumber,
    Row,
    Select,
    Tag,
} from "antd";

import {
    DRUG_ROUTE_SORT_ORDER_CONFIG,
    DRUG_ROUTE_STATUS_OPTIONS,
    DRUG_ROUTE_TYPES,
} from "../../constants/drugRoute.constants";

import {
    normalizeDrugRouteSortOrder,
} from "../../utils/drugRoute.helper";


const ClassificationSection = ({
    disabled = false,
    loading = false,
}) => {

    return (
        <div className="drug-route-form-section">

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="drug-route-section-header">

                <div>

                    <div className="drug-route-section-title">
                        Classification
                    </div>

                    <div className="drug-route-section-description">
                        Classify the route and control its
                        availability within the pharmacy system.
                    </div>

                </div>

            </div>


            {/* =================================================
                FORM FIELDS
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =============================================
                    ROUTE TYPE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        name="routeType"

                        label="Route Type"

                        required

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select route type.",
                            },

                            {
                                validator:
                                    async (
                                        _,
                                        value
                                    ) => {

                                        const valid =
                                            DRUG_ROUTE_TYPES.some(
                                                (
                                                    item
                                                ) =>
                                                    item.value ===
                                                    value
                                            );


                                        if (
                                            value &&
                                            !valid
                                        ) {

                                            throw new Error(
                                                "Please select a valid route type."
                                            );
                                        }

                                    },
                            },
                        ]}
                    >

                        <Select
                            disabled={
                                disabled ||
                                loading
                            }

                            placeholder="Select route type"

                            options={
                                DRUG_ROUTE_TYPES
                            }

                            allowClear

                            showSearch

                            optionFilterProp="label"
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    STATUS
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        name="status"

                        label="Status"

                        required

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select status.",
                            },

                            {
                                validator:
                                    async (
                                        _,
                                        value
                                    ) => {

                                        const valid =
                                            DRUG_ROUTE_STATUS_OPTIONS.some(
                                                (
                                                    item
                                                ) =>
                                                    item.value ===
                                                    value
                                            );


                                        if (
                                            value &&
                                            !valid
                                        ) {

                                            throw new Error(
                                                "Please select a valid status."
                                            );
                                        }

                                    },
                            },
                        ]}
                    >

                        <Select
                            disabled={
                                disabled ||
                                loading
                            }

                            placeholder="Select status"

                            options={
                                DRUG_ROUTE_STATUS_OPTIONS
                            }

                            optionRender={(
                                option
                            ) => (

                                <div
                                    style={{
                                        display:
                                            "flex",

                                        alignItems:
                                            "center",

                                        gap:
                                            8,
                                    }}
                                >

                                    <Tag
                                        color={
                                            option.value ===
                                            "Active"
                                                ? "success"
                                                : "default"
                                        }
                                    >
                                        {
                                            option.label
                                        }
                                    </Tag>

                                </div>

                            )}
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    SORT ORDER
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        name="sortOrder"

                        label="Display Order"

                        tooltip="Determines the display sequence of routes."

                        rules={[
                            {
                                type:
                                    "number",

                                min:
                                    DRUG_ROUTE_SORT_ORDER_CONFIG.min,

                                max:
                                    DRUG_ROUTE_SORT_ORDER_CONFIG.max,

                                message:
                                    `Display order must be between ${DRUG_ROUTE_SORT_ORDER_CONFIG.min} and ${DRUG_ROUTE_SORT_ORDER_CONFIG.max}.`,
                            },

                            {
                                validator:
                                    async (
                                        _,
                                        value
                                    ) => {

                                        if (
                                            value ===
                                                null ||
                                            value ===
                                                undefined
                                        ) {
                                            return;
                                        }


                                        const normalized =
                                            normalizeDrugRouteSortOrder(
                                                value
                                            );


                                        if (
                                            normalized !==
                                            Number(
                                                value
                                            )
                                        ) {

                                            throw new Error(
                                                "Display order must be a valid whole number."
                                            );
                                        }

                                    },
                            },
                        ]}
                    >

                        <InputNumber
                            disabled={
                                disabled ||
                                loading
                            }

                            min={
                                DRUG_ROUTE_SORT_ORDER_CONFIG.min
                            }

                            max={
                                DRUG_ROUTE_SORT_ORDER_CONFIG.max
                            }

                            precision={
                                0
                            }

                            style={{
                                width:
                                    "100%",
                            }}

                            placeholder="e.g. 10"
                        />

                    </Form.Item>

                </Col>

            </Row>

        </div>
    );
};


export default ClassificationSection;