// src/modules/pharmacy/drug-route/components/sections/BasicSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";

import {
    DRUG_ROUTE_CODE_CONFIG,
    DRUG_ROUTE_DESCRIPTION_CONFIG,
    DRUG_ROUTE_NAME_CONFIG,
} from "../../constants/drugRoute.constants";

import {
    normalizeDrugRouteCode,
    normalizeDrugRouteName,
    normalizeDrugRouteDescription,
} from "../../utils/drugRoute.helper";


const BasicSection = ({
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
                        Basic Information
                    </div>

                    <div className="drug-route-section-description">
                        Define the basic identification and
                        description of the drug administration route.
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
                    ROUTE CODE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        name="routeCode"

                        label="Route Code"

                        required

                        tooltip="Unique short code used to identify the route."

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter route code.",
                            },

                            {
                                min:
                                    DRUG_ROUTE_CODE_CONFIG.minLength,

                                message:
                                    `Route code must contain at least ${DRUG_ROUTE_CODE_CONFIG.minLength} characters.`,
                            },

                            {
                                max:
                                    DRUG_ROUTE_CODE_CONFIG.maxLength,

                                message:
                                    `Route code cannot exceed ${DRUG_ROUTE_CODE_CONFIG.maxLength} characters.`,
                            },

                            {
                                pattern:
                                    /^[A-Z0-9_-]+$/,

                                message:
                                    "Only uppercase letters, numbers, hyphen and underscore are allowed.",
                            },
                        ]}
                    >

                        <Input
                            disabled={
                                disabled ||
                                loading
                            }

                            maxLength={
                                DRUG_ROUTE_CODE_CONFIG.maxLength
                            }

                            placeholder="e.g. IV"

                            style={{
                                textTransform:
                                    "uppercase",
                            }}

                            onChange={(
                                event
                            ) => {

                                const value =
                                    normalizeDrugRouteCode(
                                        event.target.value
                                    );

                                event.target.value =
                                    value;
                            }}

                            onBlur={(
                                event
                            ) => {

                                const value =
                                    normalizeDrugRouteCode(
                                        event.target.value
                                    );

                                event.target.value =
                                    value;
                            }}
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    ROUTE NAME
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={10}
                >

                    <Form.Item
                        name="routeName"

                        label="Route Name"

                        required

                        tooltip="Standardized display name of the administration route."

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter route name.",
                            },

                            {
                                min:
                                    DRUG_ROUTE_NAME_CONFIG.minLength,

                                message:
                                    `Route name must contain at least ${DRUG_ROUTE_NAME_CONFIG.minLength} characters.`,
                            },

                            {
                                max:
                                    DRUG_ROUTE_NAME_CONFIG.maxLength,

                                message:
                                    `Route name cannot exceed ${DRUG_ROUTE_NAME_CONFIG.maxLength} characters.`,
                            },

                            {
                                validator:
                                    async (
                                        _,
                                        value
                                    ) => {

                                        const normalized =
                                            normalizeDrugRouteName(
                                                value
                                            );

                                        if (
                                            value &&
                                            !normalized
                                        ) {

                                            throw new Error(
                                                "Route name cannot be empty."
                                            );
                                        }

                                    },
                            },
                        ]}
                    >

                        <Input
                            disabled={
                                disabled ||
                                loading
                            }

                            maxLength={
                                DRUG_ROUTE_NAME_CONFIG.maxLength
                            }

                            placeholder="e.g. Intravenous"

                            onBlur={(
                                event
                            ) => {

                                const value =
                                    normalizeDrugRouteName(
                                        event.target.value
                                    );

                                event.target.value =
                                    value;
                            }}
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    DESCRIPTION
                ============================================== */}

                <Col
                    xs={24}
                    md={24}
                >

                    <Form.Item
                        name="description"

                        label="Description"

                        rules={[
                            {
                                max:
                                    DRUG_ROUTE_DESCRIPTION_CONFIG.maxLength,

                                message:
                                    `Description cannot exceed ${DRUG_ROUTE_DESCRIPTION_CONFIG.maxLength} characters.`,
                            },

                            {
                                validator:
                                    async (
                                        _,
                                        value
                                    ) => {

                                        const normalized =
                                            normalizeDrugRouteDescription(
                                                value
                                            );

                                        if (
                                            value &&
                                            normalized.length === 0
                                        ) {

                                            throw new Error(
                                                "Description cannot contain only spaces."
                                            );
                                        }

                                    },
                            },
                        ]}
                    >

                        <Input.TextArea
                            disabled={
                                disabled ||
                                loading
                            }

                            rows={
                                4
                            }

                            maxLength={
                                DRUG_ROUTE_DESCRIPTION_CONFIG.maxLength
                            }

                            showCount

                            placeholder="Enter a brief description of this administration route."

                            onBlur={(
                                event
                            ) => {

                                const value =
                                    normalizeDrugRouteDescription(
                                        event.target.value
                                    );

                                event.target.value =
                                    value;
                            }}
                        />

                    </Form.Item>

                </Col>

            </Row>

        </div>
    );
};


export default BasicSection;