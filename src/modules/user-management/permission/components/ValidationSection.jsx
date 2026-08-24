// src/modules/user-management/permission/components/ValidationSection.jsx

import React, {
    useMemo,
} from "react";

import {
    Alert,
    Card,
    Col,
    Form,
    Row,
    Space,
    Tag,
    Typography,
} from "antd";

import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
    PERMISSION_ACTIONS,
    PERMISSION_STATUS,
} from "../constants/permission.constants";

import {
    isValidPermissionCode,
    normalizePermissionCode,
} from "../utils/permission.helper";

const {
    Text,
} = Typography;


/* =========================================================
   VALIDATION SECTION
   ========================================================= */

const ValidationSection = ({
    mode = "CREATE",
    disabled = false,
    existingPermissions = [],
}) => {

    const form =
        Form.useFormInstance();


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       WATCH FORM VALUES
    ===================================================== */

    const permissionCode =
        Form.useWatch(
            "permissionCode",
            form
        ) || "";


    const permissionName =
        Form.useWatch(
            "permissionName",
            form
        ) || "";


    const moduleCode =
        Form.useWatch(
            "moduleCode",
            form
        ) || "";


    const resourceCode =
        Form.useWatch(
            "resourceCode",
            form
        ) || "";


    const actions =
        Form.useWatch(
            "actions",
            form
        ) || [];


    const status =
        Form.useWatch(
            "status",
            form
        );


    const permissionType =
        Form.useWatch(
            "permissionType",
            form
        );


    /* =====================================================
       NORMALIZED CODE
    ===================================================== */

    const normalizedCode =
        useMemo(
            () =>
                normalizePermissionCode(
                    permissionCode
                ),
            [
                permissionCode,
            ]
        );


    /* =====================================================
       DUPLICATE CODE
    ===================================================== */

    const duplicateCode =
        useMemo(
            () => {

                if (
                    !normalizedCode ||
                    !Array.isArray(
                        existingPermissions
                    )
                ) {

                    return false;

                }


                return existingPermissions.some(
                    (
                        permission
                    ) => {

                        const existingCode =
                            normalizePermissionCode(
                                permission.permissionCode
                            );


                        return (
                            existingCode ===
                            normalizedCode
                        );

                    }
                );

            },
            [
                existingPermissions,
                normalizedCode,
            ]
        );


    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    const codeValid =
        Boolean(
            normalizedCode &&
            isValidPermissionCode(
                normalizedCode
            )
        );


    const nameValid =
        Boolean(
            String(
                permissionName
            ).trim()
        );


    const moduleValid =
        Boolean(
            moduleCode
        );


    const resourceValid =
        Boolean(
            String(
                resourceCode
            ).trim()
        );


    const actionsValid =
        Array.isArray(
            actions
        ) &&
        actions.length > 0;


    const statusValid =
        status ===
            PERMISSION_STATUS.ACTIVE ||
        status ===
            PERMISSION_STATUS.INACTIVE;


    /* =====================================================
       OVERALL VALIDATION
    ===================================================== */

    const validationErrors = [];


    if (
        !codeValid
    ) {

        validationErrors.push(
            "Permission code is missing or invalid."
        );

    }


    if (
        duplicateCode
    ) {

        validationErrors.push(
            "Permission code already exists."
        );

    }


    if (
        !nameValid
    ) {

        validationErrors.push(
            "Permission name is required."
        );

    }


    if (
        !moduleValid
    ) {

        validationErrors.push(
            "Module is required."
        );

    }


    if (
        !resourceValid
    ) {

        validationErrors.push(
            "Resource is required."
        );

    }


    if (
        !actionsValid
    ) {

        validationErrors.push(
            "At least one permission action must be selected."
        );

    }


    if (
        !statusValid
    ) {

        validationErrors.push(
            "Permission status is required."
        );

    }


    const isValid =
        validationErrors.length ===
        0;


    /* =====================================================
       VALIDATION ITEM
    ===================================================== */

    const renderValidationItem = ({
        label,
        valid,
        message,
    }) => (

        <div
            className="permission-validation-item"
        >

            <div
                className="permission-validation-item-header"
            >

                {
                    valid
                        ? (
                            <CheckCircleOutlined
                                style={{
                                    color:
                                        "#52c41a",
                                }}
                            />
                        )
                        : (
                            <ExclamationCircleOutlined
                                style={{
                                    color:
                                        "#ff4d4f",
                                }}
                            />
                        )
                }


                <Text
                    strong
                >
                    {
                        label
                    }
                </Text>

            </div>


            <div
                className="permission-validation-item-message"
            >
                {
                    message
                }
            </div>

        </div>

    );


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
                    Validation
                </div>


                <div
                    className="permission-section-description"
                >
                    Review the permission configuration before
                    saving the record.
                </div>

            </div>


            {/* =================================================
                OVERALL STATUS
            ================================================= */}

            <Card
                size="small"
                className="permission-validation-card"
            >

                <div
                    className="permission-validation-overall"
                >

                    <div>

                        <Text
                            strong
                        >
                            Overall Validation
                        </Text>


                        <div
                            style={{
                                marginTop:
                                    4,

                                color:
                                    "#8c8c8c",

                                fontSize:
                                    13,
                            }}
                        >
                            {
                                isValid
                                    ? "Permission configuration is valid."
                                    : `${validationErrors.length} validation issue${
                                        validationErrors.length > 1
                                            ? "s"
                                            : ""
                                    } found.`
                            }
                        </div>

                    </div>


                    <Tag
                        icon={
                            isValid
                                ? (
                                    <CheckCircleOutlined />
                                )
                                : (
                                    <ExclamationCircleOutlined />
                                )
                        }
                        color={
                            isValid
                                ? "success"
                                : "error"
                        }
                    >
                        {
                            isValid
                                ? "Valid"
                                : "Needs Attention"
                        }
                    </Tag>

                </div>

            </Card>


            {/* =================================================
                VALIDATION GRID
            ================================================= */}

            <div
                style={{
                    marginTop:
                        16,
                }}
            >

                <Row
                    gutter={[
                        16,
                        16,
                    ]}
                >

                    <Col
                        xs={24}
                        md={12}
                    >

                        {renderValidationItem({

                            label:
                                "Permission Code",

                            valid:
                                codeValid &&
                                !duplicateCode,

                            message:
                                duplicateCode
                                    ? "This permission code already exists."
                                    : codeValid
                                        ? "Permission code format is valid."
                                        : "Enter a valid permission code.",

                        })}

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        {renderValidationItem({

                            label:
                                "Permission Name",

                            valid:
                                nameValid,

                            message:
                                nameValid
                                    ? "Permission name is provided."
                                    : "Permission name is required.",

                        })}

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        {renderValidationItem({

                            label:
                                "Module",

                            valid:
                                moduleValid,

                            message:
                                moduleValid
                                    ? "Module is selected."
                                    : "Select a module.",

                        })}

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        {renderValidationItem({

                            label:
                                "Resource",

                            valid:
                                resourceValid,

                            message:
                                resourceValid
                                    ? "Resource is provided."
                                    : "Resource is required.",

                        })}

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        {renderValidationItem({

                            label:
                                "Actions",

                            valid:
                                actionsValid,

                            message:
                                actionsValid
                                    ? `${actions.length} action${
                                        actions.length > 1
                                            ? "s"
                                            : ""
                                    } selected.`
                                    : "Select at least one action.",

                        })}

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        {renderValidationItem({

                            label:
                                "Status",

                            valid:
                                statusValid,

                            message:
                                statusValid
                                    ? "Permission status is configured."
                                    : "Select permission status.",

                        })}

                    </Col>

                </Row>

            </div>


            {/* =================================================
                WARNINGS
            ================================================= */}

            {
                permissionType ===
                    "SYSTEM" && (

                    <Alert
                        className="permission-validation-alert"
                        style={{
                            marginTop:
                                16,
                        }}
                        type="warning"
                        showIcon
                        message="System Permission"
                        description={
                            "System permissions are core application permissions. "
                            + "They should not normally be deleted or renamed."
                        }
                    />

                )
            }


            {
                !isViewMode &&
                validationErrors.length >
                    0 && (

                    <Alert
                        className="permission-validation-alert"
                        style={{
                            marginTop:
                                16,
                        }}
                        type="error"
                        showIcon
                        message="Please resolve the validation issues before saving."
                        description={

                            <ul
                                style={{
                                    margin:
                                        "8px 0 0 18px",

                                    padding:
                                        0,
                                }}
                            >

                                {
                                    validationErrors.map(
                                        (
                                            error
                                        ) => (

                                            <li
                                                key={
                                                    error
                                                }
                                            >
                                                {
                                                    error
                                                }
                                            </li>

                                        )
                                    )
                                }

                            </ul>

                        }
                    />

                )
            }

        </section>

    );

};


export default ValidationSection;