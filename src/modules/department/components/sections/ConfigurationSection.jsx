import React from "react";
import {
    AppCard,
    AppFormItem,
    AppInput,
    AppLookupSelect,
    AppSwitch,
} from "@/components/common";
import {
    Row,
    Col,
} from "antd";
const departmentCategories = [
    { label: "Clinical", value: "CLINICAL" },
    { label: "Non Clinical", value: "NON_CLINICAL" },
    { label: "Support", value: "SUPPORT" },
];

const costCenters = [
    { label: "Main Hospital", value: "MAIN" },
    { label: "Emergency", value: "ER" },
    { label: "Diagnostic", value: "LAB" },
    { label: "Pharmacy", value: "PHARMACY" },
];

const priorityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Critical", value: "CRITICAL" },
];

const ConfigurationSection = () => {
    return (
        <AppCard title="Department Configuration">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <AppFormItem
                        name="departmentCategory"
                        label="Department Category"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select Department Category",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            placeholder="Select Department Category"
                            options={departmentCategories}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="costCenter"
                        label="Cost Center"
                    >
                        <AppLookupSelect
                            placeholder="Select Cost Center"
                            options={costCenters}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="priorityLevel"
                        label="Priority Level"
                    >
                        <AppLookupSelect
                            placeholder="Select Priority"
                            options={priorityOptions}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="departmentCodePrefix"
                        label="Department Prefix"
                    >
                        <AppInput
                            maxLength={10}
                            placeholder="Example: OPD"
                        />
                    </AppFormItem>
                </Col>
            </Row>

            <Row
                gutter={[16, 16]}
                style={{ marginTop: 8 }}
            >
                <Col xs={24} md={12}>
                    <AppFormItem
                        name="isDefaultDepartment"
                        label="Default Department"
                        valuePropName="checked"
                    >
                        <AppSwitch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="allowAppointment"
                        label="Allow Appointment"
                        valuePropName="checked"
                    >
                        <AppSwitch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="isEmergencyDepartment"
                        label="Emergency Department"
                        valuePropName="checked"
                    >
                        <AppSwitch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="isActive"
                        label="Active"
                        valuePropName="checked"
                    >
                        <AppSwitch
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                        />
                    </AppFormItem>
                </Col>
            </Row>
            <AppCard
                title="Operational Configuration"
                style={{ marginTop: 16 }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="workingHours"
                            label="Working Hours"
                        >
                            <AppInput
                                placeholder="Example: 09:00 AM - 06:00 PM"
                                maxLength={100}
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="shiftType"
                            label="Shift Type"
                        >
                            <AppLookupSelect
                                placeholder="Select Shift Type"
                                options={[
                                    {
                                        label: "General Shift",
                                        value: "GENERAL",
                                    },
                                    {
                                        label: "Morning Shift",
                                        value: "MORNING",
                                    },
                                    {
                                        label: "Evening Shift",
                                        value: "EVENING",
                                    },
                                    {
                                        label: "Night Shift",
                                        value: "NIGHT",
                                    },
                                    {
                                        label: "24 × 7",
                                        value: "ROUND_THE_CLOCK",
                                    },
                                ]}
                            />
                        </AppFormItem>
                    </Col>
                </Row>

                <Row
                    gutter={[16, 16]}
                    style={{ marginTop: 8 }}
                >
                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="requiresShiftPlanning"
                            label="Shift Planning Required"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="enableQueueManagement"
                            label="Queue Management"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="autoGenerateToken"
                            label="Auto Generate Token"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="allowBilling"
                            label="Allow Billing"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="enablePharmacyIntegration"
                            label="Pharmacy Integration"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="enableLaboratoryIntegration"
                            label="Laboratory Integration"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>
                </Row>
            </AppCard>
            <AppCard
                title="Approval & Notification Settings"
                style={{ marginTop: 16 }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="approvalRequired"
                            label="Approval Required"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="autoApprove"
                            label="Auto Approve"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="emailNotification"
                            label="Email Notification"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="smsNotification"
                            label="SMS Notification"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="whatsAppNotification"
                            label="WhatsApp Notification"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>

                    <Col xs={24} md={12}>
                        <AppFormItem
                            name="auditEnabled"
                            label="Audit Logging"
                            valuePropName="checked"
                        >
                            <AppSwitch
                                checkedChildren="Enabled"
                                unCheckedChildren="Disabled"
                            />
                        </AppFormItem>
                    </Col>
                </Row>

                <Row
                    gutter={[16, 16]}
                    style={{ marginTop: 8 }}
                >
                    <Col span={24}>
                        <AppFormItem
                            name="remarks"
                            label="Remarks"
                        >
                            <AppInput.TextArea
                                rows={4}
                                maxLength={500}
                                showCount
                                placeholder="Enter Remarks"
                            />
                        </AppFormItem>
                    </Col>
                </Row>
            </AppCard>
        </AppCard>

    );
};

export default ConfigurationSection;