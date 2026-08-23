/* =========================================================
   USER SECURITY SECTION
   ========================================================= */

import React from "react";

import {
    Alert,
    Badge,
    Col,
    Descriptions,
    Form,
    Row,
    Switch,
    Tag,
} from "antd";

import {
    PASSWORD_STATUS,
    PASSWORD_STATUS_OPTIONS,
} from "../../constants/user.constants";

import {
    getPasswordStatusColor,
    getPasswordStatusLabel,
} from "../../utils/user.helper";


const SecuritySection = ({
    mode,
    record,
}) => {

    const isViewMode =
        mode === "VIEW";


    const form =
        Form.useFormInstance();


    const passwordStatus =
        Form.useWatch(
            "passwordStatus",
            form
        ) ||
        record?.passwordStatus ||
        PASSWORD_STATUS.RESET_REQUIRED;


    const mustChangePassword =
        Form.useWatch(
            "mustChangePassword",
            form
        );


    const failedLoginCount =
        Form.useWatch(
            "failedLoginCount",
            form
        ) ??
        record?.failedLoginCount ??
        0;


    const lastLoginAt =
        Form.useWatch(
            "lastLoginAt",
            form
        ) ||
        record?.lastLoginAt;


    const accountLockedUntil =
        Form.useWatch(
            "accountLockedUntil",
            form
        ) ||
        record?.accountLockedUntil;


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    const formatDateTime =
        (
            value
        ) => {

            if (!value) {
                return "-";
            }


            const date =
                new Date(
                    value
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {
                return "-";
            }


            return date.toLocaleString(
                "en-IN",
                {
                    dateStyle:
                        "medium",

                    timeStyle:
                        "short",
                }
            );
        };


    /* =====================================================
       PASSWORD STATUS CHANGE
    ===================================================== */

    const handlePasswordStatusChange =
        (
            event
        ) => {

            const checked =
                event.target.checked;

            if (
                checked
            ) {

                form.setFieldValue(
                    "mustChangePassword",
                    true
                );

            }

        };


    return (

        <section
            className="user-form-section user-security-section"
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
                    Security
                </div>

                <div
                    className="user-section-description"
                >
                    Review account security and password-related
                    information.
                </div>

            </div>


            {/* =================================================
                SECURITY FORM VALUES
            ================================================= */}

            <Form.Item
                name="passwordStatus"
                hidden
            >
                <input />
            </Form.Item>


            <Form.Item
                name="failedLoginCount"
                hidden
            >
                <input />
            </Form.Item>


            <Form.Item
                name="lastLoginAt"
                hidden
            >
                <input />
            </Form.Item>


            <Form.Item
                name="accountLockedUntil"
                hidden
            >
                <input />
            </Form.Item>


            {/* =================================================
                PASSWORD STATUS
            ================================================= */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
            >

                <Col
                    xs={24}
                    sm={12}
                >

                    <div
                        className="user-security-card"
                    >

                        <div
                            className="user-security-label"
                        >
                            Password Status
                        </div>

                        <div
                            className="user-security-value"
                        >

                            <Tag
                                color={
                                    getPasswordStatusColor(
                                        passwordStatus
                                    )
                                }
                            >
                                {
                                    getPasswordStatusLabel(
                                        passwordStatus
                                    )
                                }
                            </Tag>

                        </div>

                    </div>

                </Col>


                {/* =============================================
                    FAILED LOGIN
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <div
                        className="user-security-card"
                    >

                        <div
                            className="user-security-label"
                        >
                            Failed Login Attempts
                        </div>

                        <div
                            className="user-security-value"
                        >

                            <Badge
                                count={
                                    failedLoginCount
                                }

                                showZero

                                overflowCount={
                                    99
                                }
                            />

                        </div>

                    </div>

                </Col>


                {/* =============================================
                    LAST LOGIN
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <div
                        className="user-security-card"
                    >

                        <div
                            className="user-security-label"
                        >
                            Last Login
                        </div>

                        <div
                            className="user-security-value"
                        >
                            {
                                formatDateTime(
                                    lastLoginAt
                                )
                            }
                        </div>

                    </div>

                </Col>


                {/* =============================================
                    LOCKED UNTIL
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <div
                        className="user-security-card"
                    >

                        <div
                            className="user-security-label"
                        >
                            Account Locked Until
                        </div>

                        <div
                            className="user-security-value"
                        >
                            {
                                formatDateTime(
                                    accountLockedUntil
                                )
                            }
                        </div>

                    </div>

                </Col>

            </Row>


            {/* =================================================
                MUST CHANGE PASSWORD
            ================================================= */}

            <div
                className="user-security-setting-card"
            >

                <Form.Item
                    label="Require Password Change"
                    name="mustChangePassword"
                    valuePropName="checked"
                    style={{
                        marginBottom: 0,
                    }}
                >

                    <Switch
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        disabled={
                            isViewMode
                        }
                    />

                </Form.Item>

            </div>


            {/* =================================================
                SECURITY WARNING
            ================================================= */}

            {
                passwordStatus ===
                    PASSWORD_STATUS.LOCKED && (

                    <Alert
                        className="user-security-alert"

                        type="error"

                        showIcon

                        message="Account is locked"

                        description="This account is currently locked and cannot be used for normal authentication."
                    />

                )
            }


            {
                passwordStatus ===
                    PASSWORD_STATUS.RESET_REQUIRED && (

                    <Alert
                        className="user-security-alert"

                        type="warning"

                        showIcon

                        message="Password reset required"

                        description="The user will be required to change the password before continuing with normal application access."
                    />

                )
            }

        </section>

    );
};


export default SecuritySection;