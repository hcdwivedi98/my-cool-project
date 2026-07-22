import React from "react";

import {
    Row,
    Col,
    Form,
} from "antd";

import {
    AppInput,
    AppSelect,
    AppDatePicker,
} from "../../../../components/common/form";

function BasicInformationTab({

    form,

    lookups = {},

}) {

    return (

        <Form

            form={form}

            layout="vertical"

        >

            <Row gutter={[16, 8]}>

                <Col xs={24} md={12} lg={8}>

                    <Form.Item
                        label="Center"
                        name="centerId"
                        rules={[
                            {
                                required: true,
                                message: "Center is required",
                            },
                        ]}
                    >

                        <AppSelect
                            placeholder="Select Center"
                            options={lookups.centers}
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} md={12} lg={8}>

                    <Form.Item
                        label="Store"
                        name="storeId"
                        rules={[
                            {
                                required: true,
                                message: "Store is required",
                            },
                        ]}
                    >

                        <AppSelect
                            placeholder="Select Store"
                            options={lookups.stores}
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} md={12} lg={8}>

                    <Form.Item
                        label="Sub Store"
                        name="subStoreId"
                    >

                        <AppSelect
                            placeholder="Select Sub Store"
                            options={lookups.subStores}
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} md={12} lg={8}>

                    <Form.Item
                        label="Department"
                        name="departmentId"
                    >

                        <AppSelect
                            placeholder="Select Department"
                            options={lookups.departments}
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} md={12} lg={8}>

                    <Form.Item
                        label="Priority"
                        name="priority"
                        rules={[
                            {
                                required: true,
                                message: "Priority is required",
                            },
                        ]}
                    >

                        <AppSelect
                            placeholder="Select Priority"
                            options={[
                                {
                                    label: "Routine",
                                    value: "Routine",
                                },
                                {
                                    label: "Urgent",
                                    value: "Urgent",
                                },
                                {
                                    label: "Emergency",
                                    value: "Emergency",
                                },
                            ]}
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} md={12} lg={8}>

                    <Form.Item
                        label="Required Date"
                        name="requiredDate"
                        rules={[
                            {
                                required: true,
                                message: "Required Date is required",
                            },
                        ]}
                    >

                        <AppDatePicker
                            style={{ width: "100%" }}
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} md={12}>

                    <Form.Item
                        label="Vendor (Optional)"
                        name="vendorId"
                    >

                        <AppSelect
                            placeholder="Select Vendor"
                            options={lookups.suppliers}
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} md={12}>

                    <Form.Item
                        label="Reference No"
                        name="referenceNo"
                    >

                        <AppInput
                            placeholder="Reference Number"
                        />

                    </Form.Item>

                </Col>

                <Col span={24}>

                    <Form.Item
                        label="Remarks"
                        name="remarks"
                    >

                        <AppInput
                            variant="textarea"
                            rows={4}
                            placeholder="Enter Remarks"
                        />

                    </Form.Item>

                </Col>

            </Row>

        </Form>

    );

}

export default React.memo(BasicInformationTab);