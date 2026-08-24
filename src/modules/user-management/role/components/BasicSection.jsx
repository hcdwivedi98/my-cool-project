// src/modules/user-management/role/components/BasicSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
    Select,
} from "antd";

import {
    ROLE_SCOPE_OPTIONS,
    ROLE_STATUS_OPTIONS,
    ROLE_TYPE_OPTIONS,
    ROLE_TYPES,
    ROLE_SCOPES,
} from "../constants/role.constants";


const BasicSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const isViewMode =
        mode === "VIEW" ||
        disabled;


    return (

        <section
            className="role-form-section role-basic-section"
        >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div
                className="role-section-header"
            >

                <div
                    className="role-section-title"
                >
                    Basic Information
                </div>

                <div
                    className="role-section-description"
                >
                    Define the role identity, type, scope and
                    current status.
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
                    ROLE CODE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        label="Role Code"
                        name="roleCode"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter role code.",
                            },

                            {
                                min:
                                    3,

                                message:
                                    "Role code must be at least 3 characters.",
                            },

                            {
                                max:
                                    50,

                                message:
                                    "Role code cannot exceed 50 characters.",
                            },

                            {
                                pattern:
                                    /^[A-Za-z0-9_]+$/,

                                message:
                                    "Only letters, numbers and underscore are allowed.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. PHARMACY_ADMIN"

                            maxLength={
                                50
                            }

                            disabled={
                                isViewMode ||
                                mode === "EDIT"
                            }

                            onChange={(
                                event
                            ) => {

                                const value =
                                    event.target.value
                                        .toUpperCase()
                                        .replace(
                                            /[^A-Z0-9_]/g,
                                            ""
                                        );

                                event.target.value =
                                    value;

                            }}
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    ROLE NAME
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        label="Role Name"
                        name="roleName"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter role name.",
                            },

                            {
                                min:
                                    3,

                                message:
                                    "Role name must be at least 3 characters.",
                            },

                            {
                                max:
                                    100,

                                message:
                                    "Role name cannot exceed 100 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. Pharmacy Administrator"

                            maxLength={
                                100
                            }

                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    ROLE TYPE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        label="Role Type"
                        name="roleType"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select role type.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select role type"

                            options={
                                ROLE_TYPE_OPTIONS
                            }

                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SCOPE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        label="Scope"
                        name="scope"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select role scope.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select scope"

                            options={
                                ROLE_SCOPE_OPTIONS
                            }

                            disabled={
                                isViewMode
                            }
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
                        label="Status"
                        name="status"

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
                                ROLE_STATUS_OPTIONS
                            }

                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        label="Description"
                        name="description"

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
                            rows={
                                4
                            }

                            maxLength={
                                500
                            }

                            showCount

                            placeholder={
                                "Describe the purpose and responsibilities of this role."
                            }

                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>

            </Row>


            {/* =================================================
                SCOPE INFORMATION
            ================================================= */}

            <Form.Item
                noStyle
                shouldUpdate={(
                    previousValues,
                    currentValues
                ) =>
                    previousValues.scope !==
                    currentValues.scope
                }
            >

                {({
                    getFieldValue,
                }) => {

                    const scope =
                        getFieldValue(
                            "scope"
                        );


                    if (
                        !scope ||
                        scope ===
                        ROLE_SCOPES.GLOBAL
                    ) {

                        return null;

                    }


                    return (

                        <div
                            className="role-scope-info"
                        >

                            Scope selected:

                            <strong>
                                {" "}
                                {
                                    ROLE_SCOPE_OPTIONS.find(
                                        (
                                            item
                                        ) =>
                                            item.value ===
                                            scope
                                    )?.label ||
                                    scope
                                }
                            </strong>

                            <div
                                style={{
                                    marginTop:
                                        4,

                                    fontSize:
                                        12,

                                    color:
                                        "#8c8c8c",
                                }}
                            >
                                Organization-specific scope
                                will be configured according
                                to the selected scope.
                            </div>

                        </div>

                    );

                }}

            </Form.Item>

        </section>

    );

};


export default BasicSection;