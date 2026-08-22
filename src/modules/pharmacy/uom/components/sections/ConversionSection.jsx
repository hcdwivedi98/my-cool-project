// src/modules/pharmacy/uom/components/sections/ConversionSection.jsx

import React from "react";

import {
    Alert,
    Card,
    Col,
    Form,
    InputNumber,
    Row,
    Select,
    Typography,
} from "antd";

import useUomLookup from "../../hooks/useUomLookup";

import {
    isPackagingUom,
    isConvertibleUomType,
} from "../../utils/uom.helper";


const {
    Text,
} = Typography;


const ConversionSection = ({
    form,
    mode = "ADD",
}) => {
    const {
        baseUnits,
        getBaseUnitsByType,
    } = useUomLookup();

    const isViewMode =
        mode === "VIEW";


    /*
     * ============================================
     * CURRENT UOM TYPE
     * ============================================
     */

    const uomType =
        Form.useWatch(
            "uomType",
            form
        );


    /*
     * ============================================
     * CURRENT BASE UNIT
     * ============================================
     */

    const baseUnitId =
        Form.useWatch(
            "baseUnitId",
            form
        );


    /*
     * ============================================
     * BASE UNIT OPTIONS
     * ============================================
     */

    const filteredBaseUnits =
        getBaseUnitsByType(
            uomType
        );


    /*
     * ============================================
     * IS PACKAGING?
     * ============================================
     */

    const packaging =
        isPackagingUom(
            uomType
        );


    /*
     * ============================================
     * IS CONVERTIBLE?
     * ============================================
     */

    const convertible =
        isConvertibleUomType(
            uomType
        );


    /*
     * ============================================
     * UOM TYPE NOT SELECTED
     * ============================================
     */

    if (!uomType) {
        return (
            <Card
                title="Conversion"
                bordered={false}
                styles={{
                    body: {
                        padding:
                            "20px 0 4px",
                    },
                }}
            >
                <Alert
                    type="info"
                    showIcon
                    message="Select a UOM Type first"
                    description="Base Unit and conversion settings will be available after selecting the UOM type."
                />
            </Card>
        );
    }


    return (
        <Card
            title="Conversion"
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
                {/* PACKAGING MESSAGE */}
                {/* ================================= */}

                {packaging && (
                    <Col
                        xs={24}
                    >
                        <Alert
                            type="info"
                            showIcon
                            message="Drug-specific packaging conversion"
                            description={
                                "Packaging conversion is not maintained globally in UOM Master. Pack quantity such as 1 Box = 10 Strips or 1 Strip = 10 Tablets must be configured in Drug Master."
                            }
                        />
                    </Col>
                )}


                {/* ================================= */}
                {/* BASE UNIT */}
                {/* ================================= */}

                {!packaging && (
                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                    >
                        <Form.Item
                            name="baseUnitId"
                            label="Base Unit"
                            rules={[
                                {
                                    required:
                                        true,
                                    message:
                                        "Please select base unit.",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select base unit"
                                options={
                                    filteredBaseUnits
                                }
                                disabled={
                                    isViewMode
                                }
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>
                    </Col>
                )}


                {/* ================================= */}
                {/* CONVERSION FACTOR */}
                {/* ================================= */}

                {!packaging && (
                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                    >
                        <Form.Item
                            name="conversionFactor"
                            label="Conversion Factor"
                            tooltip={
                                "Number of base units represented by one unit."
                            }
                            rules={[
                                {
                                    required:
                                        true,
                                    message:
                                        "Please enter conversion factor.",
                                },
                                {
                                    type:
                                        "number",
                                    min: 0.000001,
                                    message:
                                        "Conversion factor must be greater than zero.",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width:
                                        "100%",
                                }}
                                min={
                                    0.000001
                                }
                                max={
                                    999999999
                                }
                                precision={
                                    6
                                }
                                placeholder="e.g. 1000"
                                disabled={
                                    isViewMode
                                }
                            />
                        </Form.Item>
                    </Col>
                )}


                {/* ================================= */}
                {/* CONVERSION PREVIEW */}
                {/* ================================= */}

                {convertible &&
                    !packaging && (
                        <Col
                            xs={24}
                            sm={24}
                            lg={8}
                        >
                            <div
                                style={{
                                    paddingTop:
                                        30,
                                }}
                            >
                                <Text
                                    type="secondary"
                                >
                                    Conversion Preview
                                </Text>

                                <div
                                    style={{
                                        marginTop:
                                            6,
                                        fontSize:
                                            14,
                                        fontWeight:
                                            600,
                                    }}
                                >
                                    1{" "}
                                    {form.getFieldValue(
                                        "uomCode"
                                    ) ||
                                        "UOM"}{" "}
                                    ={" "}
                                    {form.getFieldValue(
                                        "conversionFactor"
                                    ) ||
                                        1}{" "}
                                    {filteredBaseUnits.find(
                                        (
                                            item
                                        ) =>
                                            item.value ===
                                            baseUnitId
                                    )?.code ||
                                        "Base Unit"}
                                </div>
                            </div>
                        </Col>
                    )}


                {/* ================================= */}
                {/* COUNT UOM MESSAGE */}
                {/* ================================= */}

                {uomType ===
                    "COUNT" && (
                    <Col
                        xs={24}
                    >
                        <Alert
                            type="info"
                            showIcon
                            message="Count-based UOM"
                            description={
                                "Count units such as Tablet, Capsule and Vial represent discrete quantities. Drug-specific packaging relationships should be configured in Drug Master."
                            }
                        />
                    </Col>
                )}


                {/* ================================= */}
                {/* PACKAGING NO BASE UNIT */}
                {/* ================================= */}

                {packaging && (
                    <Col
                        xs={24}
                    >
                        <div
                            style={{
                                padding:
                                    "12px 16px",
                                border:
                                    "1px dashed #d9d9d9",
                                borderRadius:
                                    8,
                                background:
                                    "#fafafa",
                            }}
                        >
                            <Text
                                type="secondary"
                            >
                                Global Base Unit:
                            </Text>

                            <Text
                                strong
                                style={{
                                    marginLeft:
                                        8,
                                }}
                            >
                                Not Applicable
                            </Text>

                            <br />

                            <Text
                                type="secondary"
                            >
                                Global Conversion Factor:
                            </Text>

                            <Text
                                strong
                                style={{
                                    marginLeft:
                                        8,
                                }}
                            >
                                Not Applicable
                            </Text>
                        </div>
                    </Col>
                )}

            </Row>
        </Card>
    );
};


export default ConversionSection;