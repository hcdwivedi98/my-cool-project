// src/modules/pharmacy/drug-category/components/sections/ClassificationSection.jsx

import React from "react";

import {
    Col,
    Form,
    InputNumber,
    Row,
    Select,
} from "antd";

import {
    ApartmentOutlined,
    SortAscendingOutlined,
    TagsOutlined,
} from "@ant-design/icons";

import useDrugCategoryLookup
    from "../../hooks/useDrugCategoryLookup";


const ClassificationSection = ({
    disabled = false,
}) => {

    const {
        categoryTypes,
        parentCategoryOptions,
    } = useDrugCategoryLookup();


    return (
        <div className="form-section">

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="form-section-header">
                <div className="form-section-title">
                    Classification
                </div>

                <div className="form-section-description">
                    Configure the category type,
                    parent hierarchy and display order.
                </div>
            </div>


            {/* =================================================
                FORM FIELDS
            ================================================= */}

            <Row gutter={[16, 4]}>

                {/* CATEGORY TYPE */}

                <Col
                    xs={24}
                    sm={24}
                    md={8}
                >
                    <Form.Item
                        name="categoryType"
                        label="Category Type"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select category type.",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select category type"
                            options={
                                categoryTypes
                            }
                            disabled={disabled}
                            allowClear={!disabled}
                            showSearch
                            optionFilterProp="label"
                            suffixIcon={
                                <TagsOutlined />
                            }
                        />
                    </Form.Item>
                </Col>


                {/* PARENT CATEGORY */}

                <Col
                    xs={24}
                    sm={24}
                    md={8}
                >
                    <Form.Item
                        name="parentCategoryId"
                        label="Parent Category"
                        tooltip="Optional. Leave empty to create a root category."
                    >
                        <Select
                            placeholder="Select parent category"
                            options={
                                parentCategoryOptions
                            }
                            disabled={disabled}
                            allowClear={!disabled}
                            showSearch
                            optionFilterProp="label"
                            suffixIcon={
                                <ApartmentOutlined />
                            }
                            notFoundContent={
                                "No active categories found"
                            }
                        />
                    </Form.Item>
                </Col>


                {/* SORT ORDER */}

                <Col
                    xs={24}
                    sm={24}
                    md={8}
                >
                    <Form.Item
                        name="sortOrder"
                        label="Display Order"
                        rules={[
                            {
                                type: "number",
                                min: 0,
                                message:
                                    "Display order must be 0 or greater.",
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                            placeholder="e.g. 10"
                            min={0}
                            max={9999}
                            disabled={disabled}
                            controls
                            prefix={
                                <SortAscendingOutlined />
                            }
                        />
                    </Form.Item>
                </Col>

            </Row>


            {/* =================================================
                INFORMATION NOTE
            ================================================= */}

            {!disabled && (
                <div className="form-section-note">
                    <ApartmentOutlined />

                    <span>
                        Leave <strong>Parent Category</strong>{" "}
                        empty when creating a top-level
                        category.
                    </span>
                </div>
            )}

        </div>
    );
};

export default ClassificationSection;