/* =========================================================
   USER VALIDATION SECTION
   ========================================================= */

import React, {
    useMemo,
} from "react";

import {
    Alert,
    Col,
    Form,
    Row,
    Tag,
} from "antd";

import {
    USER_STATUS,
} from "../../constants/user.constants";

import {
    canUserLogin,
    getDepartmentName,
    getDesignationName,
    getPasswordStatusLabel,
    getPrimaryRoleName,
    getUserStatusLabel,
    getUserTypeLabel,
} from "../../utils/user.helper";


const ValidationSection = ({
    mode,
    record,
}) => {

    const form =
        Form.useFormInstance();


    /* =====================================================
       FORM VALUES
    ===================================================== */

    const values =
        Form.useWatch(
            [],
            form
        ) || {};


    /* =====================================================
       NORMALIZED VALUES
    ===================================================== */

    const userCode =
        values.userCode ??
        record?.userCode ??
        "";

    const username =
        values.username ??
        record?.username ??
        "";

    const firstName =
        values.firstName ??
        record?.firstName ??
        "";

    const lastName =
        values.lastName ??
        record?.lastName ??
        "";

    const email =
        values.email ??
        record?.email ??
        "";

    const mobileNumber =
        values.mobileNumber ??
        record?.mobileNumber ??
        "";

    const userType =
        values.userType ??
        record?.userType;

    const departmentId =
        values.departmentId ??
        record?.departmentId;

    const designationId =
        values.designationId ??
        record?.designationId;

    const roleIds =
        values.roleIds ??
        record?.roleIds ??
        [];

    const primaryRoleId =
        values.primaryRoleId ??
        record?.primaryRoleId;

    const status =
        values.status ??
        record?.status ??
        USER_STATUS.ACTIVE;

    const loginAllowed =
        values.loginAllowed ??
        record?.loginAllowed ??
        false;

    const passwordStatus =
        values.passwordStatus ??
        record?.passwordStatus;


    /* =====================================================
       VALIDATION RESULTS
    ===================================================== */

    const validationResults =
        useMemo(
            () => {

                const results = [];


                /* ---------------------------------------------
                   USER CODE
                --------------------------------------------- */

                results.push({
                    key:
                        "userCode",

                    label:
                        "User Code",

                    valid:
                        Boolean(
                            userCode?.trim()
                        ),

                    message:
                        userCode?.trim()
                            ? "Valid"
                            : "User code is required.",
                });


                /* ---------------------------------------------
                   USERNAME
                --------------------------------------------- */

                results.push({
                    key:
                        "username",

                    label:
                        "Username",

                    valid:
                        Boolean(
                            username?.trim()
                        ),

                    message:
                        username?.trim()
                            ? "Valid"
                            : "Username is required.",
                });


                /* ---------------------------------------------
                   NAME
                --------------------------------------------- */

                results.push({
                    key:
                        "name",

                    label:
                        "Full Name",

                    valid:
                        Boolean(
                            firstName?.trim() &&
                            lastName?.trim()
                        ),

                    message:
                        firstName?.trim() &&
                        lastName?.trim()
                            ? "Valid"
                            : "First name and last name are required.",
                });


                /* ---------------------------------------------
                   EMAIL
                --------------------------------------------- */

                const emailValid =
                    !email ||
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        email
                    );


                results.push({
                    key:
                        "email",

                    label:
                        "Email",

                    valid:
                        emailValid,

                    message:
                        emailValid
                            ? "Valid"
                            : "Invalid email address.",
                });


                /* ---------------------------------------------
                   MOBILE
                --------------------------------------------- */

                const mobileValid =
                    /^[6-9]\d{9}$/.test(
                        mobileNumber || ""
                    );


                results.push({
                    key:
                        "mobile",

                    label:
                        "Mobile Number",

                    valid:
                        mobileValid,

                    message:
                        mobileValid
                            ? "Valid"
                            : "Enter a valid 10-digit mobile number.",
                });


                /* ---------------------------------------------
                   USER TYPE
                --------------------------------------------- */

                results.push({
                    key:
                        "userType",

                    label:
                        "User Type",

                    valid:
                        Boolean(
                            userType
                        ),

                    message:
                        userType
                            ? "Selected"
                            : "User type is required.",
                });


                /* ---------------------------------------------
                   DEPARTMENT
                --------------------------------------------- */

                results.push({
                    key:
                        "department",

                    label:
                        "Department",

                    valid:
                        Boolean(
                            departmentId
                        ),

                    message:
                        departmentId
                            ? "Selected"
                            : "Department is required.",
                });


                /* ---------------------------------------------
                   DESIGNATION
                --------------------------------------------- */

                results.push({
                    key:
                        "designation",

                    label:
                        "Designation",

                    valid:
                        Boolean(
                            designationId
                        ),

                    message:
                        designationId
                            ? "Selected"
                            : "Designation is required.",
                });


                /* ---------------------------------------------
                   ROLE
                --------------------------------------------- */

                results.push({
                    key:
                        "roles",

                    label:
                        "Role Assignment",

                    valid:
                        Array.isArray(
                            roleIds
                        ) &&
                        roleIds.length > 0,

                    message:
                        Array.isArray(
                            roleIds
                        ) &&
                        roleIds.length > 0
                            ? "Assigned"
                            : "At least one role is required.",
                });


                /* ---------------------------------------------
                   PRIMARY ROLE
                --------------------------------------------- */

                const primaryRoleValid =
                    Boolean(
                        primaryRoleId
                    ) &&
                    Array.isArray(
                        roleIds
                    ) &&
                    roleIds.includes(
                        primaryRoleId
                    );


                results.push({
                    key:
                        "primaryRole",

                    label:
                        "Primary Role",

                    valid:
                        primaryRoleValid,

                    message:
                        primaryRoleValid
                            ? "Valid"
                            : "Primary role must belong to assigned roles.",
                });


                return results;

            },
            [
                userCode,
                username,
                firstName,
                lastName,
                email,
                mobileNumber,
                userType,
                departmentId,
                designationId,
                roleIds,
                primaryRoleId,
            ]
        );


    /* =====================================================
       COUNTS
    ===================================================== */

    const validCount =
        validationResults.filter(
            (
                item
            ) =>
                item.valid
        ).length;


    const invalidCount =
        validationResults.length -
        validCount;


    const allValid =
        invalidCount === 0;


    /* =====================================================
       LOGIN VALIDATION
    ===================================================== */

    const loginEligible =
        canUserLogin({
            status,
            loginAllowed,
            passwordStatus,
        });


    return (

        <section
            className="user-form-section user-validation-section"
        >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div
                className="user-section-header"
            >

                <div
                    className="user-section-title"
                >
                    Validation
                </div>

                <div
                    className="user-section-description"
                >
                    Review the current user information before
                    saving the account.
                </div>

            </div>


            {/* =================================================
                OVERALL STATUS
            ================================================= */}

            <div
                className="user-validation-overall-card"
            >

                <div
                    className="user-validation-overall"
                >

                    <div>
                        <strong>
                            Overall Validation
                        </strong>
                    </div>


                    <Tag
                        color={
                            allValid
                                ? "success"
                                : "error"
                        }
                    >
                        {
                            allValid
                                ? "Valid"
                                : `${invalidCount} issue${invalidCount > 1 ? "s" : ""}`
                        }
                    </Tag>

                </div>


                <div
                    className="user-validation-summary"
                >
                    {
                        validCount
                    }
                    /
                    {
                        validationResults.length
                    }
                    checks passed
                </div>

            </div>


            {/* =================================================
                VALIDATION ITEMS
            ================================================= */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
                style={{
                    marginTop: 16,
                }}
            >

                {
                    validationResults.map(
                        (
                            item
                        ) => (

                            <Col
                                key={
                                    item.key
                                }

                                xs={24}
                                sm={12}
                            >

                                <div
                                    className="user-validation-card"
                                >

                                    <div
                                        className="user-validation-label"
                                    >
                                        {
                                            item.label
                                        }
                                    </div>


                                    <div
                                        className="user-validation-value"
                                    >

                                        <Tag
                                            color={
                                                item.valid
                                                    ? "success"
                                                    : "error"
                                            }
                                        >
                                            {
                                                item.valid
                                                    ? "Valid"
                                                    : "Error"
                                            }
                                        </Tag>


                                        <span>
                                            {
                                                item.message
                                            }
                                        </span>

                                    </div>

                                </div>

                            </Col>

                        )
                    )
                }

            </Row>


            {/* =================================================
                USER SUMMARY
            ================================================= */}

            <div
                className="user-validation-summary-card"
            >

                <div
                    className="user-validation-label"
                >
                    User Summary
                </div>


                <div
                    className="user-validation-summary-grid"
                >

                    <div>
                        <span>
                            User
                        </span>

                        <strong>
                            {
                                [firstName, lastName]
                                    .filter(Boolean)
                                    .join(" ") ||
                                "-"
                            }
                        </strong>
                    </div>


                    <div>
                        <span>
                            User Type
                        </span>

                        <strong>
                            {
                                getUserTypeLabel(
                                    userType
                                )
                            }
                        </strong>
                    </div>


                    <div>
                        <span>
                            Department
                        </span>

                        <strong>
                            {
                                getDepartmentName(
                                    departmentId
                                )
                            }
                        </strong>
                    </div>


                    <div>
                        <span>
                            Designation
                        </span>

                        <strong>
                            {
                                getDesignationName(
                                    designationId
                                )
                            }
                        </strong>
                    </div>


                    <div>
                        <span>
                            Primary Role
                        </span>

                        <strong>
                            {
                                primaryRoleId
                                    ? getPrimaryRoleName({
                                        primaryRoleId,
                                        roleIds,
                                    })
                                    : "-"
                            }
                        </strong>
                    </div>


                    <div>
                        <span>
                            Status
                        </span>

                        <strong>
                            {
                                getUserStatusLabel(
                                    status
                                )
                            }
                        </strong>
                    </div>

                </div>

            </div>


            {/* =================================================
                LOGIN WARNING
            ================================================= */}

            {
                loginAllowed &&
                !loginEligible && (

                    <Alert
                        className="user-validation-alert"

                        type="warning"

                        showIcon

                        message="Login configuration needs attention"

                        description={
                            passwordStatus
                                ? `The account is currently not eligible for login because its password status is ${getPasswordStatusLabel(passwordStatus)}.`
                                : "The account is not currently eligible for login."
                        }
                    />

                )
            }


            {/* =================================================
                FORM ERROR
            ================================================= */}

            {
                !allValid && (

                    <Alert
                        className="user-validation-alert"

                        type="error"

                        showIcon

                        message="Please resolve the validation issues"

                        description="Review the validation results above before submitting the user form."
                    />

                )
            }

        </section>

    );
};


export default ValidationSection;