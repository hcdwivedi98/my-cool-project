/* =========================================================
   USER EMPLOYMENT SECTION
   ========================================================= */

import React from "react";

import {
    Col,
    Form,
    Row,
    Select,
} from "antd";

import {
    USER_TYPE_OPTIONS,
} from "../../constants/user.constants";

import useUserLookup
    from "../../hooks/useUserLookup";


const EmploymentSection = ({
    mode,
}) => {

    const isViewMode =
        mode === "VIEW";


    const {
        departmentOptions,
        designationOptions,
        getDesignationsByDepartment,
    } =
        useUserLookup();


    const form =
        Form.useFormInstance();


    const departmentId =
        Form.useWatch(
            "departmentId",
            form
        );


    /* =====================================================
       DESIGNATION OPTIONS
    ===================================================== */

    const filteredDesignationOptions =
        departmentId
            ? getDesignationsByDepartment(
                departmentId
            )
            : designationOptions;


    /* =====================================================
       DEPARTMENT CHANGE
    ===================================================== */

    const handleDepartmentChange =
        () => {

            /*
             * Clear designation when
             * department changes.
             */

            form.setFieldValue(
                "designationId",
                undefined
            );

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
                    Employment Information
                </div>

                <div
                    className="user-section-description"
                >
                    Assign the user's staff type, department,
                    and designation.
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
                    USER TYPE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="User Type"
                        name="userType"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please select user type.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select user type"

                            options={
                                USER_TYPE_OPTIONS
                            }

                            showSearch

                            optionFilterProp="label"

                            allowClear

                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    DEPARTMENT
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Department"
                        name="departmentId"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please select department.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select department"

                            options={
                                departmentOptions
                            }

                            showSearch

                            optionFilterProp="label"

                            allowClear

                            disabled={
                                isViewMode
                            }

                            onChange={
                                handleDepartmentChange
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    DESIGNATION
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Designation"
                        name="designationId"
                        rules={[
                            {
                                required: true,

                                message:
                                    "Please select designation.",
                            },
                        ]}
                    >

                        <Select
                            placeholder={
                                departmentId
                                    ? "Select designation"
                                    : "Select department first"
                            }

                            options={
                                filteredDesignationOptions
                            }

                            showSearch

                            optionFilterProp="label"

                            allowClear

                            disabled={
                                isViewMode ||
                                !departmentId
                            }

                            notFoundContent={
                                departmentId
                                    ? "No designation found"
                                    : "Select department first"
                            }
                        />

                    </Form.Item>

                </Col>

            </Row>

        </section>

    );
};


export default EmploymentSection;