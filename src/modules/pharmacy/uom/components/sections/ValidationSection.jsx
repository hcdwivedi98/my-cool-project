// src/modules/pharmacy/uom/components/sections/ValidationSection.jsx

import React from "react";

import {
    Alert,
    Card,
    Col,
    Divider,
    Form,
    Row,
    Tag,
    Typography,
} from "antd";

import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

import {
    isPackagingUom,
    isConvertibleUomType,
} from "../../utils/uom.helper";


const {
    Text,
} = Typography;


const ValidationSection = ({
    form,
    mode = "ADD",
}) => {
    const isViewMode =
        mode === "VIEW";


    /*
     * ============================================
     * WATCH FORM VALUES
     * ============================================
     */

    const uomCode =
        Form.useWatch(
            "uomCode",
            form
        );

    const uomName =
        Form.useWatch(
            "uomName",
            form
        );

    const uomType =
        Form.useWatch(
            "uomType",
            form
        );

    const baseUnitId =
        Form.useWatch(
            "baseUnitId",
            form
        );

    const conversionFactor =
        Form.useWatch(
            "conversionFactor",
            form
        );

    const decimalAllowed =
        Form.useWatch(
            "decimalAllowed",
            form
        );


    /*
     * ============================================
     * TYPE CHECKS
     * ============================================
     */

    const packaging =
        isPackagingUom(
            uomType
        );

    const convertible =
        isConvertibleUomType(
            uomType
        );


    /*
     * ============================================
     * VALIDATION STATE
     * ============================================
     */

    const validationItems = [
        {
            key: "code",
            label: "UOM Code",
            valid:
                Boolean(
                    uomCode?.trim()
                ),
            message:
                "UOM code is required.",
        },

        {
            key: "name",
            label: "UOM Name",
            valid:
                Boolean(
                    uomName?.trim()
                ),
            message:
                "UOM name is required.",
        },

        {
            key: "type",
            label: "UOM Type",
            valid:
                Boolean(
                    uomType
                ),
            message:
                "UOM type is required.",
        },

        {
            key: "baseUnit",
            label: "Base Unit",
            valid:
                packaging ||
                Boolean(
                    baseUnitId
                ),
            message:
                "Base unit is required for this UOM type.",
        },

        {
            key: "conversion",
            label:
                "Conversion Factor",
            valid:
                packaging ||
                (
                    conversionFactor !==
                        null &&
                    conversionFactor !==
                        undefined &&
                    conversionFactor !==
                        "" &&
                    Number(
                        conversionFactor
                    ) > 0
                ),
            message:
                "Conversion factor must be greater than zero.",
        },
    ];


    const hasErrors =
        validationItems.some(
            (item) =>
                !item.valid
        );


    /*
     * ============================================
     * SUCCESS MESSAGE
     * ============================================
     */

    const successMessage =
        isViewMode
            ? "UOM configuration is available in read-only mode."
            : "UOM configuration is ready for final validation and save.";


    return (
        <Card
            title="Validation"
            bordered={false}
            styles={{
                body: {
                    padding:
                        "20px 0 4px",
                },
            }}
        >
            <Row
                gutter={[
                    20,
                    16,
                ]}
            >
                {/* ================================= */}
                {/* OVERALL STATUS */}
                {/* ================================= */}

                <Col
                    xs={24}
                >
                    {hasErrors ? (
                        <Alert
                            type="warning"
                            showIcon
                            icon={
                                <ExclamationCircleOutlined />
                            }
                            message="UOM configuration requires attention"
                            description="Please complete the required information before saving this UOM."
                        />
                    ) : (
                        <Alert
                            type="success"
                            showIcon
                            icon={
                                <CheckCircleOutlined />
                            }
                            message="UOM configuration is valid"
                            description={
                                successMessage
                            }
                        />
                    )}
                </Col>


                {/* ================================= */}
                {/* VALIDATION ITEMS */}
                {/* ================================= */}

                <Col
                    xs={24}
                >
                    <Divider
                        style={{
                            margin:
                                "4px 0 16px",
                        }}
                    />

                    <Row
                        gutter={[
                            12,
                            12,
                        ]}
                    >
                        {validationItems.map(
                            (
                                item
                            ) => (
                                <Col
                                    key={
                                        item.key
                                    }
                                    xs={24}
                                    sm={12}
                                    lg={8}
                                >
                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "space-between",
                                            gap: 12,
                                            padding:
                                                "10px 12px",
                                            border:
                                                "1px solid #f0f0f0",
                                            borderRadius:
                                                8,
                                            background:
                                                "#fafafa",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize:
                                                    13,
                                            }}
                                        >
                                            {
                                                item.label
                                            }
                                        </Text>

                                        {item.valid ? (
                                            <Tag
                                                color="success"
                                                icon={
                                                    <CheckCircleOutlined />
                                                }
                                            >
                                                Valid
                                            </Tag>
                                        ) : (
                                            <Tag
                                                color="warning"
                                                icon={
                                                    <ExclamationCircleOutlined />
                                                }
                                            >
                                                Required
                                            </Tag>
                                        )}
                                    </div>
                                </Col>
                            )
                        )}
                    </Row>
                </Col>


                {/* ================================= */}
                {/* CONVERSION INFORMATION */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                >
                    <div
                        style={{
                            padding:
                                "12px 14px",
                            border:
                                "1px solid #f0f0f0",
                            borderRadius:
                                8,
                        }}
                    >
                        <div
                            style={{
                                marginBottom:
                                    6,
                            }}
                        >
                            <Text
                                type="secondary"
                            >
                                Conversion Model
                            </Text>
                        </div>

                        {packaging ? (
                            <Text strong>
                                Drug-specific
                                packaging
                                conversion
                            </Text>
                        ) : convertible ? (
                            <Text strong>
                                Physical unit
                                conversion
                            </Text>
                        ) : (
                            <Text strong>
                                Count-based
                                unit
                            </Text>
                        )}
                    </div>
                </Col>


                {/* ================================= */}
                {/* DECIMAL INFORMATION */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                >
                    <div
                        style={{
                            padding:
                                "12px 14px",
                            border:
                                "1px solid #f0f0f0",
                            borderRadius:
                                8,
                        }}
                    >
                        <div
                            style={{
                                marginBottom:
                                    6,
                            }}
                        >
                            <Text
                                type="secondary"
                            >
                                Decimal Quantity
                            </Text>
                        </div>

                        {decimalAllowed ? (
                            <Tag
                                color="blue"
                            >
                                Allowed
                            </Tag>
                        ) : (
                            <Tag>
                                Not Allowed
                            </Tag>
                        )}
                    </div>
                </Col>


                {/* ================================= */}
                {/* PACKAGING INFORMATION */}
                {/* ================================= */}

                {packaging && (
                    <Col
                        xs={24}
                    >
                        <Alert
                            type="info"
                            showIcon
                            icon={
                                <InfoCircleOutlined />
                            }
                            message="Packaging conversion is maintained at Drug level"
                            description={
                                "Do not define a global BOX, STRIP, PACK or BOTTLE conversion here. The actual pack quantity depends on the specific Drug configuration."
                            }
                        />
                    </Col>
                )}
            </Row>
        </Card>
    );
};


export default ValidationSection;