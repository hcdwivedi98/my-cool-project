// src/modules/drugMaster/components/tabs/ClinicalTab.jsx

import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSwitch,
    AppSelect,
} from "../../../../components/common/form";

function ClinicalTab({ lookups = {} }) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="therapeuticCategoryId"
                    label="Therapeutic Category"
                >

                    <AppSelect
                        showSearch
                        allowClear
                        placeholder="Select Therapeutic Category"
                        options={lookups.therapeuticCategories || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="pharmacologicalCategoryId"
                    label="Pharmacological Category"
                >

                    <AppSelect
                        showSearch
                        allowClear
                        placeholder="Select Pharmacological Category"
                        options={lookups.pharmacologicalCategories || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="drugClassId"
                    label="Drug Class"
                >

                    <AppSelect
                        showSearch
                        allowClear
                        placeholder="Select Drug Class"
                        options={lookups.drugClasses || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="indication"
                    label="Indication"
                >

                    <AppInput
                        variant="textarea"
                        rows={3}
                        maxLength={1000}
                        showCount
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="contraIndication"
                    label="Contra Indication"
                >

                    <AppInput
                        variant="textarea"
                        rows={3}
                        maxLength={1000}
                        showCount
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="sideEffects"
                    label="Side Effects"
                >

                    <AppInput
                        variant="textarea"
                        rows={3}
                        maxLength={1000}
                        showCount
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="drugInteraction"
                    label="Drug Interaction"
                >

                    <AppInput
                        variant="textarea"
                        rows={3}
                        maxLength={1000}
                        showCount
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="foodInteraction"
                    label="Food Interaction"
                >

                    <AppInput
                        variant="textarea"
                        rows={3}
                        maxLength={1000}
                        showCount
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={12}>

                <AppFormItem
                    name="adultDose"
                    label="Adult Dose"
                >

                    <AppInput
                        variant="textarea"
                        rows={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={12}>

                <AppFormItem
                    name="pediatricDose"
                    label="Pediatric Dose"
                >

                    <AppInput
                        variant="textarea"
                        rows={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="pregnancyCategory"
                    label="Pregnancy Category"
                >

                    <AppSelect
                        allowClear
                        options={lookups.pregnancyCategories || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="lactationCategory"
                    label="Lactation Category"
                >

                    <AppSelect
                        allowClear
                        options={lookups.lactationCategories || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="storageCondition"
                    label="Storage Condition"
                >

                    <AppInput
                        placeholder="Enter Storage Condition"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="controlledDrug"
                    label="Controlled Drug"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="narcotic"
                    label="Narcotic"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="highRisk"
                    label="High Risk Drug"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="lasaDrug"
                    label="LASA Drug"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="antibiotic"
                    label="Antibiotic"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="vaccine"
                    label="Vaccine"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="cytotoxic"
                    label="Cytotoxic"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="soundAlike"
                    label="Sound Alike"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="lookAlike"
                    label="Look Alike"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="prescriptionRequired"
                    label="Prescription Required"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="clinicalNotes"
                    label="Clinical Notes"
                >

                    <AppInput
                        variant="textarea"
                        rows={4}
                        maxLength={2000}
                        showCount
                    />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(ClinicalTab);