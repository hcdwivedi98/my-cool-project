// src/modules/user-management/permission/components/BasicSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
    Select,
} from "antd";

import {
    PERMISSION_MODULE_OPTIONS,
} from "../constants/permission.constants";

import {
    usePermissionLookup,
} from "../hooks/usePermissionLookup";


/* =========================================================
   BASIC SECTION
   ========================================================= */

const BasicSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       LOOKUP
    ===================================================== */

    const {
        allModuleOptions,
    } =
        usePermissionLookup();


    /* =====================================================
       MODULE OPTIONS
    ===================================================== */

    const moduleOptions =
        allModuleOptions?.length
            ? allModuleOptions
            : PERMISSION_MODULE_OPTIONS;


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <section
            className="permission-form-section"
        >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div
                className="permission-section-header"
            >

                <div
                    className="permission-section-title"
                >
                    Basic Information
                </div>


                <div
                    className="permission-section-description"
                >
                    Define the basic identity and application
                    location of this permission.
                </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =============================================
                    PERMISSION CODE
                ============================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="permissionCode"
                        label="Permission Code"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter permission code.",
                            },

                            {
                                pattern:
                                    /^[A-Za-z][A-Za-z0-9_.-]*$/,

                                message:
                                    "Permission code contains invalid characters.",
                            },

                            {
                                max:
                                    100,

                                message:
                                    "Permission code cannot exceed 100 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. INVENTORY.STOCK"
                            disabled={
                                isViewMode
                            }
                            maxLength={
                                100
                            }
                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    PERMISSION NAME
                ============================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="permissionName"
                        label="Permission Name"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter permission name.",
                            },

                            {
                                whitespace:
                                    true,

                                message:
                                    "Permission name cannot be empty.",
                            },

                            {
                                max:
                                    150,

                                message:
                                    "Permission name cannot exceed 150 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. Stock Management"
                            disabled={
                                isViewMode
                            }
                            maxLength={
                                150
                            }
                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    MODULE
                ============================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="moduleCode"
                        label="Module"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select module.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select module"
                            options={
                                moduleOptions
                            }
                            disabled={
                                isViewMode
                            }
                            showSearch
                            optionFilterProp="label"
                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    RESOURCE
                ============================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="resourceCode"
                        label="Resource"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter resource.",
                            },

                            {
                                whitespace:
                                    true,

                                message:
                                    "Resource cannot be empty.",
                            },

                            {
                                max:
                                    100,

                                message:
                                    "Resource cannot exceed 100 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. STOCK"
                            disabled={
                                isViewMode
                            }
                            maxLength={
                                100
                            }
                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    DESCRIPTION
                ============================================= */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                max:
                                    500,

                                message:
                                    "Description cannot exceed 500 characters.",
                            },
                        ]}
                    >

                        <Input.TextArea
                            placeholder={
                                "Describe what this permission allows."
                            }
                            disabled={
                                isViewMode
                            }
                            rows={
                                4
                            }
                            maxLength={
                                500
                            }
                            showCount
                        />

                    </Form.Item>

                </Col>

            </Row>

        </section>

    );

};


export default BasicSection;