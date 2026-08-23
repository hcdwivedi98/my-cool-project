/* =========================================================
   USER ACCESS SECTION
   ========================================================= */

import React from "react";

import {
    Alert,
    Col,
    Form,
    Row,
    Select,
    Switch,
} from "antd";

import useUserLookup
    from "../../hooks/useUserLookup";


const AccessSection = ({
    mode,
}) => {

    const isViewMode =
        mode === "VIEW";


    const {
        roleOptions,
    } =
        useUserLookup();


    const form =
        Form.useFormInstance();


    const roleIds =
        Form.useWatch(
            "roleIds",
            form
        ) || [];


    const loginAllowed =
        Form.useWatch(
            "loginAllowed",
            form
        );


    /* =====================================================
       PRIMARY ROLE OPTIONS
    ===================================================== */

    const primaryRoleOptions =
        roleOptions.filter(
            (
                option
            ) =>
                roleIds.includes(
                    option.value
                )
        );


    /* =====================================================
       ROLE CHANGE
    ===================================================== */

    const handleRoleChange =
        (
            values
        ) => {

            const currentPrimaryRole =
                form.getFieldValue(
                    "primaryRoleId"
                );


            /*
             * If selected primary role
             * is removed, clear it.
             */

            if (
                currentPrimaryRole &&
                !values.includes(
                    currentPrimaryRole
                )
            ) {

                form.setFieldValue(
                    "primaryRoleId",
                    undefined
                );

            }


            /*
             * If only one role exists,
             * automatically make it primary.
             */

            if (
                values.length === 1
            ) {

                form.setFieldValue(
                    "primaryRoleId",
                    values[0]
                );

            }

        };


    return (

        <section
            className="user-form-section"
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
                    Access & Roles
                </div>

                <div
                    className="user-section-description"
                >
                    Configure the user's application roles and
                    login access.
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
                    ROLES
                ============================================== */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        label="Roles"
                        name="roleIds"
                        rules={[
                            {
                                required: true,

                                type: "array",

                                min: 1,

                                message:
                                    "Please assign at least one role.",
                            },
                        ]}
                    >

                        <Select
                            mode="multiple"

                            placeholder="Select roles"

                            options={
                                roleOptions
                            }

                            showSearch

                            optionFilterProp="label"

                            allowClear

                            disabled={
                                isViewMode
                            }

                            onChange={
                                handleRoleChange
                            }

                            maxTagCount="responsive"
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    PRIMARY ROLE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Primary Role"
                        name="primaryRoleId"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please select primary role.",
                            },
                        ]}
                    >

                        <Select
                            placeholder={
                                roleIds.length
                                    ? "Select primary role"
                                    : "Select roles first"
                            }

                            options={
                                primaryRoleOptions
                            }

                            showSearch

                            optionFilterProp="label"

                            allowClear

                            disabled={
                                isViewMode ||
                                roleIds.length === 0
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    LOGIN ACCESS
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Login Access"
                        name="loginAllowed"
                        valuePropName="checked"
                    >

                        <Switch
                            checkedChildren="Allowed"
                            unCheckedChildren="Blocked"
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>

            </Row>


            {/* =================================================
                LOGIN ACCESS INFORMATION
            ================================================= */}

            {
                loginAllowed === false && (

                    <Alert
                        className="user-access-alert"

                        type="warning"

                        showIcon

                        message="Login access is disabled"

                        description="This user will not be allowed to sign in to the application until login access is enabled."
                    />

                )
            }

        </section>

    );
};


export default AccessSection;