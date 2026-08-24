// src/modules/user-management/permission/components/AccessSection.jsx

import React, {
    useEffect,
} from "react";

import {
    Checkbox,
    Col,
    Divider,
    Form,
    Row,
    Select,
    Space,
    Tag,
} from "antd";

import {
    PERMISSION_ACTION_OPTIONS,
    PERMISSION_SCOPE_OPTIONS,
    PERMISSION_STATUS_OPTIONS,
    PERMISSION_TYPE_OPTIONS,
} from "../constants/permission.constants";

import usePermissionLookup
    from "../hooks/usePermissionLookup";


/* =========================================================
   ACCESS SECTION
   ========================================================= */

const AccessSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    /* =====================================================
       FORM
    ===================================================== */

    const form =
        Form.useFormInstance();


    /* =====================================================
       MODE
    ===================================================== */

    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       LOOKUP
    ===================================================== */

    const lookup =
        usePermissionLookup() || {};


    /*
     * Always normalize lookup values to arrays.
     * This prevents:
     *
     * undefined.length
     * undefined.find()
     * undefined.map()
     */

    const actionOptions =
        Array.isArray(
            lookup.actionOptions
        )
            ? lookup.actionOptions
            : [];

    const scopeOptions =
        Array.isArray(
            lookup.scopeOptions
        )
            ? lookup.scopeOptions
            : [];

    const statusOptions =
        Array.isArray(
            lookup.statusOptions
        )
            ? lookup.statusOptions
            : [];

    const typeOptions =
        Array.isArray(
            lookup.typeOptions
        )
            ? lookup.typeOptions
            : [];


    /* =====================================================
       FINAL OPTIONS
       ===================================================== */

    const finalActionOptions =
        actionOptions.length > 0
            ? actionOptions
            : Array.isArray(
                PERMISSION_ACTION_OPTIONS
            )
                ? PERMISSION_ACTION_OPTIONS
                : [];


    const finalScopeOptions =
        scopeOptions.length > 0
            ? scopeOptions
            : Array.isArray(
                PERMISSION_SCOPE_OPTIONS
            )
                ? PERMISSION_SCOPE_OPTIONS
                : [];


    const finalStatusOptions =
        statusOptions.length > 0
            ? statusOptions
            : Array.isArray(
                PERMISSION_STATUS_OPTIONS
            )
                ? PERMISSION_STATUS_OPTIONS
                : [];


    const finalTypeOptions =
        typeOptions.length > 0
            ? typeOptions
            : Array.isArray(
                PERMISSION_TYPE_OPTIONS
            )
                ? PERMISSION_TYPE_OPTIONS
                : [];


    /* =====================================================
       WATCH VALUES
    ===================================================== */

    const selectedActions =
        Form.useWatch(
            "actions",
            form
        ) || [];


    const safeSelectedActions =
        Array.isArray(
            selectedActions
        )
            ? selectedActions
            : [];


    const permissionType =
        Form.useWatch(
            "permissionType",
            form
        ) || "";


    const isSystemPermission =
        Form.useWatch(
            "isSystemPermission",
            form
        ) === true;


    /* =====================================================
       SYSTEM PERMISSION EFFECT
    ===================================================== */

    useEffect(
        () => {

            if (
                permissionType ===
                "SYSTEM"
            ) {

                form.setFieldValue(
                    "isSystemPermission",
                    true
                );

                return;

            }


            if (
                permissionType ===
                "CUSTOM"
            ) {

                form.setFieldValue(
                    "isSystemPermission",
                    false
                );

            }

        },
        [
            permissionType,
            form,
        ]
    );


    /* =====================================================
       ALL ACTION VALUES
    ===================================================== */

    const allActions =
        finalActionOptions
            .map(
                (
                    option
                ) =>
                    option?.value
            )
            .filter(
                Boolean
            );


    /* =====================================================
       ALL ACTIONS SELECTED
    ===================================================== */

    const allActionsSelected =
        allActions.length > 0 &&
        allActions.every(
            (
                action
            ) =>
                safeSelectedActions.includes(
                    action
                )
        );


    /* =====================================================
       SELECT ALL ACTIONS
    ===================================================== */

    const handleSelectAllActions = (
        checked
    ) => {

        if (
            isViewMode
        ) {

            return;

        }


        form.setFieldValue(
            "actions",
            checked
                ? allActions
                : []
        );

    };


    /* =====================================================
       GET ACTION LABEL
       IMPORTANT:
       Never call .find() on undefined.
    ===================================================== */

    const getActionLabel = (
        action
    ) => {

        const option =
            finalActionOptions.find(
                (
                    item
                ) =>
                    item?.value ===
                    action
            );


        return (
            option?.label ||
            String(
                action
            )
        );

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <section
            className="permission-form-section"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="permission-section-header"
            >

                <div
                    className="permission-section-title"
                >
                    Access Configuration
                </div>


                <div
                    className="permission-section-description"
                >
                    Define the actions, scope, status and type
                    associated with this permission.
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

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        name="actions"
                        label="Allowed Actions"
                        rules={[
                            {
                                required:
                                    true,

                                type:
                                    "array",

                                min:
                                    1,

                                message:
                                    "Select at least one action.",
                            },
                        ]}
                    >

                        <Checkbox.Group
                            disabled={
                                isViewMode
                            }

                            options={
                                finalActionOptions
                            }

                        />

                    </Form.Item>


                    {/* =================================================
                        SELECT ALL
                    ================================================= */}

                    {
                        !isViewMode && (

                            <div
                                style={{
                                    marginTop:
                                        -8,

                                    marginBottom:
                                        16,
                                }}
                            >

                                <Checkbox
                                    checked={
                                        allActionsSelected
                                    }

                                    indeterminate={
                                        safeSelectedActions.length >
                                            0 &&
                                        !allActionsSelected
                                    }

                                    onChange={(
                                        event
                                    ) =>
                                        handleSelectAllActions(
                                            event
                                                .target
                                                .checked
                                        )
                                    }
                                >
                                    Select all actions
                                </Checkbox>

                            </div>

                        )
                    }


                    {/* =================================================
                        ACTION PREVIEW
                    ================================================= */}

                    {
                        safeSelectedActions.length >
                            0 && (

                            <div
                                className="permission-access-preview"
                            >

                                <div
                                    style={{
                                        marginBottom:
                                            8,

                                        fontSize:
                                            13,

                                        color:
                                            "#8c8c8c",

                                        fontWeight:
                                            500,
                                    }}
                                >
                                    Selected Actions
                                </div>


                                <Space
                                    wrap
                                    size={[
                                        6,
                                        6,
                                    ]}
                                >

                                    {
                                        safeSelectedActions.map(
                                            (
                                                action
                                            ) => (

                                                <Tag
                                                    key={
                                                        action
                                                    }

                                                    color="blue"
                                                >
                                                    {
                                                        getActionLabel(
                                                            action
                                                        )
                                                    }
                                                </Tag>

                                            )
                                        )
                                    }

                                </Space>

                            </div>

                        )
                    }

                </Col>


                {/* =================================================
                    SCOPE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="scope"
                        label="Access Scope"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select access scope.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select scope"

                            options={
                                finalScopeOptions
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


                {/* =================================================
                    STATUS
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select status.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select status"

                            options={
                                finalStatusOptions
                            }

                            disabled={
                                isViewMode
                            }

                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PERMISSION TYPE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="permissionType"
                        label="Permission Type"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select permission type.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select permission type"

                            options={
                                finalTypeOptions
                            }

                            disabled={
                                isViewMode
                            }

                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SYSTEM PERMISSION
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="isSystemPermission"
                        label="System Permission"
                        valuePropName="checked"
                    >

                        <Checkbox
                            disabled={
                                isViewMode ||
                                permissionType ===
                                    "SYSTEM"
                            }
                        >
                            This is a system permission
                        </Checkbox>

                    </Form.Item>

                </Col>

            </Row>


            {/* =================================================
                DIVIDER
            ================================================= */}

            <Divider
                style={{
                    margin:
                        "8px 0 16px",
                }}
            />


            {/* =================================================
                ACCESS SUMMARY
            ================================================= */}

            <div
                className="permission-access-summary"
            >

                <div
                    className="permission-access-summary-title"
                >
                    Access Summary
                </div>


                <div
                    className="permission-access-summary-content"
                >

                    <span>
                        Actions:
                    </span>


                    <strong>
                        {
                            safeSelectedActions.length
                        }
                    </strong>


                    <span>
                        Permission Type:
                    </span>


                    <strong>
                        {
                            permissionType ||
                            "-"
                        }
                    </strong>


                    <span>
                        System:
                    </span>


                    <strong>
                        {
                            isSystemPermission
                                ? "Yes"
                                : "No"
                        }
                    </strong>

                </div>

            </div>

        </section>

    );

};


export default AccessSection;