import React, { memo } from "react";

import { Row, Col } from "antd";

import {
    AppFormItem,
    AppInput,
    AppSelect,
    AppSwitch,
    AppUpload,
} from "../../../../components/common/form";

function BasicInformationTab({

    lookups = {},

}) {

    return (

        <Row gutter={[16, 0]}>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="itemCode"
                    label="Item Code"
                    required
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={16}>

                <AppFormItem
                    name="itemName"
                    label="Medicine Name"
                    required
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={12}>

                <AppFormItem
                    name="genericName"
                    label="Generic Name"
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={12}>

                <AppFormItem
                    name="shortName"
                    label="Short Name"
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="categoryId"
                    label="Category"
                    required
                >
                    <AppSelect
                        options={lookups.categories}
                    />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="manufacturerId"
                    label="Manufacturer"
                    required
                >
                    <AppSelect
                        options={lookups.manufacturers}
                    />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="companyId"
                    label="Company"
                >
                    <AppSelect
                        options={lookups.companies}
                    />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="dosageFormId"
                    label="Dosage Form"
                    required
                >
                    <AppSelect
                        options={lookups.dosageForms}
                    />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="strength"
                    label="Strength"
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="routeId"
                    label="Route"
                >
                    <AppSelect
                        options={lookups.routes}
                    />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="scheduleTypeId"
                    label="Schedule"
                >
                    <AppSelect
                        options={lookups.scheduleTypes}
                    />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="hsnCode"
                    label="HSN Code"
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="barcode"
                    label="Barcode"
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={8}>

                <AppFormItem
                    name="qrCode"
                    label="QR Code"
                >
                    <AppInput />
                </AppFormItem>

            </Col>

            <Col xs={24} md={12}>

                <AppFormItem
                    name="image"
                    label="Drug Image"
                    valuePropName="fileList"
                >
                    <AppUpload
                        accept="image/*"
                        maxCount={1}
                    />
                </AppFormItem>

            </Col>

            <Col xs={24} md={12}>

                <Row gutter={[16,16]}>

                    <Col span={12}>

                        <AppFormItem
                            name="isActive"
                            label="Active"
                            valuePropName="checked"
                        >
                            <AppSwitch />
                        </AppFormItem>

                    </Col>

                    <Col span={12}>

                        <AppFormItem
                            name="isPrescriptionRequired"
                            label="Prescription Required"
                            valuePropName="checked"
                        >
                            <AppSwitch />
                        </AppFormItem>

                    </Col>

                </Row>

            </Col>

        </Row>

    );

}

export default memo(BasicInformationTab);