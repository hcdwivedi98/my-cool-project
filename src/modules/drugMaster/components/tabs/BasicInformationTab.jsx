import React, { memo } from "react";

import {
    AppFormGrid,
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

        <AppFormGrid>

            {/* Item Code */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="itemCode"

                    label="Item Code"

                    rules={[

                        {
                            required: true,
                            message: "Item Code is required",
                        },

                    ]}

                >

                    <AppInput

                        placeholder="Enter Item Code"

                        maxLength={30}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Item Name */}

            <AppFormGrid.Item span={16}>

                <AppFormItem

                    name="itemName"

                    label="Medicine Name"

                    rules={[

                        {
                            required: true,
                            message: "Medicine Name is required",
                        },

                    ]}

                >

                    <AppInput

                        placeholder="Medicine Name"

                        maxLength={200}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Generic Name */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="genericName"

                    label="Generic Name"

                >

                    <AppInput

                        placeholder="Generic Name"

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Short Name */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="shortName"

                    label="Short Name"

                >

                    <AppInput

                        placeholder="Short Name"

                        maxLength={50}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Category */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="categoryId"

                    label="Category"

                    rules={[

                        {

                            required: true,

                            message: "Category is required",

                        },

                    ]}

                >

                    <AppSelect

                        options={lookups.categories}

                        allowClear

                        showSearch

                        placeholder="Select Category"

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Manufacturer */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="manufacturerId"

                    label="Manufacturer"

                    rules={[

                        {

                            required: true,

                            message: "Manufacturer is required",

                        },

                    ]}

                >

                    <AppSelect

                        options={lookups.manufacturers}

                        allowClear

                        showSearch

                        placeholder="Select Manufacturer"

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Company */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="companyId"

                    label="Company"

                >

                    <AppSelect

                        options={lookups.companies}

                        allowClear

                        showSearch

                        placeholder="Select Company"

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Dosage Form */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="dosageFormId"

                    label="Dosage Form"

                    rules={[

                        {

                            required: true,

                            message: "Dosage Form is required",

                        },

                    ]}

                >

                    <AppSelect

                        options={lookups.dosageForms}

                        showSearch

                        allowClear

                        placeholder="Dosage Form"

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Strength */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="strength"

                    label="Strength"

                >

                    <AppInput

                        placeholder="500 mg"

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Route */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="routeId"

                    label="Route"

                >

                    <AppSelect

                        options={lookups.routes}

                        allowClear

                        showSearch

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Schedule */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="scheduleTypeId"

                    label="Schedule"

                >

                    <AppSelect

                        options={lookups.scheduleTypes}

                        allowClear

                        showSearch

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* HSN */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="hsnCode"

                    label="HSN Code"

                >

                    <AppInput

                        maxLength={15}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Barcode */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="barcode"

                    label="Barcode"

                >

                    <AppInput />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* QR */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="qrCode"

                    label="QR Code"

                >

                    <AppInput />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Image */}

            <AppFormGrid.Item span={24}>

                <AppFormItem

                    name="image"

                    label="Medicine Image"

                    valuePropName="fileList"

                >

                    <AppUpload

                        accept="image/*"

                        maxCount={1}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Active */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="isActive"

                    label="Active"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Prescription */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="prescriptionRequired"

                    label="Prescription Required"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* High Risk */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="highRisk"

                    label="High Risk"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* LASA */}

            <AppFormGrid.Item>

                <AppFormItem

                    name="lasaDrug"

                    label="LASA Drug"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(BasicInformationTab);