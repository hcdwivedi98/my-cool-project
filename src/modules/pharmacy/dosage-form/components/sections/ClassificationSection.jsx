// src/modules/pharmacy/dosage-form/components/sections/ClassificationSection.jsx

import React from "react";

import {
    Col,
    Form,
    InputNumber,
    Row,
    Select,
} from "antd";

import useDosageFormLookup
    from "../../hooks/useDosageFormLookup";


const ClassificationSection = ({
    disabled = false,
}) => {

    const {
        formTypes,
        routesOfAdministration,
        uoms,
        statuses,
    } =
        useDosageFormLookup();


    return (
        <div className="dosage-form-section">

            <div className="dosage-form-section-header">

                <div className="dosage-form-section-title">
                    Classification
                </div>

                <div className="dosage-form-section-description">
                    Define the pharmaceutical classification,
                    administration route and standard unit.
                </div>

            </div>


            <div className="dosage-form-section-body">

                <Row
                    gutter={[
                        16,
                        0,
                    ]}
                >

                    {/* =========================================
                        FORM TYPE
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="Form Type"
                            name="formType"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Form type is required.",
                                },
                            ]}
                        >

                            <Select
                                disabled={
                                    disabled
                                }
                                placeholder="Select form type"
                                options={
                                    formTypes
                                }
                                allowClear
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        ROUTE OF ADMINISTRATION
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="Route of Administration"
                            name="routeOfAdministrationId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Route of administration is required.",
                                },
                            ]}
                        >

                            <Select
                                disabled={
                                    disabled
                                }
                                placeholder="Select route"
                                options={
                                    routesOfAdministration
                                }
                                showSearch
                                optionFilterProp="label"
                                allowClear
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        UOM
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="UOM"
                            name="uomId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "UOM is required.",
                                },
                            ]}
                        >

                            <Select
                                disabled={
                                    disabled
                                }
                                placeholder="Select UOM"
                                options={
                                    uoms
                                }
                                showSearch
                                optionFilterProp="label"
                                allowClear
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        STATUS
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Status is required.",
                                },
                            ]}
                        >

                            <Select
                                disabled={
                                    disabled
                                }
                                placeholder="Select status"
                                options={
                                    statuses
                                }
                                allowClear
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        DISPLAY ORDER
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="Display Order"
                            name="sortOrder"
                            tooltip="Controls the display sequence of dosage forms."
                            rules={[
                                {
                                    type:
                                        "number",
                                    min:
                                        0,
                                    message:
                                        "Display order must be 0 or greater.",
                                },
                            ]}
                        >

                            <InputNumber
                                disabled={
                                    disabled
                                }
                                min={0}
                                max={9999}
                                precision={0}
                                placeholder="Enter order"
                                style={{
                                    width:
                                        "100%",
                                }}
                            />

                        </Form.Item>

                    </Col>

                </Row>

            </div>

        </div>
    );
};


export default ClassificationSection;