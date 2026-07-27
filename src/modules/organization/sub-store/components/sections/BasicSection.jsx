import {
    Row,
    Col
} from "antd";

import {
    AppFormItem,
    AppInput,
    AppSelect,
    AppSwitch
} from "@/components/common";

const STORE_TYPES = [

    {
        value: "GENERAL",
        label: "General"
    },
    {
        value: "PHARMACY",
        label: "Pharmacy"
    },
    {
        value: "WARD",
        label: "Ward"
    },
    {
        value: "OT",
        label: "Operation Theatre"
    },
    {
        value: "EMERGENCY",
        label: "Emergency"
    }

];

const BasicSection = ({
    lookup
}) => {

    return (

        <Row gutter={16}>

            <Col span={8}>

                <AppFormItem
                    name="centerId"
                    label="Center"
                    rules={[
                        {
                            required: true,
                            message: "Please select Center."
                        }
                    ]}
                >

                    <AppSelect
                        placeholder="Select Center"
                        options={lookup.centers}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="departmentId"
                    label="Department"
                    rules={[
                        {
                            required: true,
                            message: "Please select Department."
                        }
                    ]}
                >

                    <AppSelect
                        placeholder="Select Department"
                        options={lookup.departments}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="storeId"
                    label="Store"
                    rules={[
                        {
                            required: true,
                            message: "Please select Store."
                        }
                    ]}
                >

                    <AppSelect
                        placeholder="Select Store"
                        options={lookup.stores}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="subStoreCode"
                    label="Sub Store Code"
                    rules={[
                        {
                            required: true,
                            message: "Please enter Sub Store Code."
                        }
                    ]}
                >

                    <AppInput
                        maxLength={20}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="subStoreName"
                    label="Sub Store Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter Sub Store Name."
                        }
                    ]}
                >

                    <AppInput
                        maxLength={100}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="shortName"
                    label="Short Name"
                >

                    <AppInput
                        maxLength={30}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="storeType"
                    label="Store Type"
                >

                    <AppSelect
                        placeholder="Select Store Type"
                        options={STORE_TYPES}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="status"
                    label="Status"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

        </Row>

    );

};

export default BasicSection;