/* =========================================================
   USER BASIC SECTION
   ========================================================= */

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";


const BasicSection = ({
    mode,
}) => {

    const isViewMode =
        mode === "VIEW";


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
                    Basic Information
                </div>

                <div
                    className="user-section-description"
                >
                    Enter the user's basic identity and
                    contact information.
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
                    USER CODE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="User Code"
                        name="userCode"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please enter user code.",
                            },

                            {
                                max: 30,

                                message:
                                    "User code cannot exceed 30 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter user code"
                            maxLength={30}
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    USERNAME
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please enter username.",
                            },

                            {
                                min: 3,

                                message:
                                    "Username must be at least 3 characters.",
                            },

                            {
                                max: 50,

                                message:
                                    "Username cannot exceed 50 characters.",
                            },

                            {
                                pattern:
                                    /^[a-zA-Z0-9._-]+$/,

                                message:
                                    "Username can contain letters, numbers, dot, underscore and hyphen only.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter username"
                            maxLength={50}
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    EMPLOYEE ID
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Employee ID"
                        name="employeeId"
                        rules={[
                            {
                                max: 30,

                                message:
                                    "Employee ID cannot exceed 30 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter employee ID"
                            maxLength={30}
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    FIRST NAME
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please enter first name.",
                            },

                            {
                                max: 50,

                                message:
                                    "First name cannot exceed 50 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter first name"
                            maxLength={50}
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    MIDDLE NAME
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Middle Name"
                        name="middleName"
                        rules={[
                            {
                                max: 50,

                                message:
                                    "Middle name cannot exceed 50 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter middle name"
                            maxLength={50}
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    LAST NAME
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please enter last name.",
                            },

                            {
                                max: 50,

                                message:
                                    "Last name cannot exceed 50 characters.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter last name"
                            maxLength={50}
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    EMAIL
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email",

                                message:
                                    "Please enter a valid email address.",
                            },

                            {
                                max: 150,

                                message:
                                    "Email cannot exceed 150 characters.",
                            },
                        ]}
                    >

                        <Input
                            type="email"
                            placeholder="Enter email address"
                            maxLength={150}
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    MOBILE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Mobile Number"
                        name="mobileNumber"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please enter mobile number.",
                            },

                            {
                                pattern:
                                    /^[6-9]\d{9}$/,

                                message:
                                    "Please enter a valid 10-digit mobile number.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter mobile number"
                            maxLength={10}
                            inputMode="numeric"
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    ALTERNATE MOBILE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Alternate Mobile"
                        name="alternateMobileNumber"
                        rules={[
                            {
                                pattern:
                                    /^$|^[6-9]\d{9}$/,

                                message:
                                    "Please enter a valid 10-digit mobile number.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter alternate mobile"
                            maxLength={10}
                            inputMode="numeric"
                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>

            </Row>

        </section>

    );
};


export default BasicSection;