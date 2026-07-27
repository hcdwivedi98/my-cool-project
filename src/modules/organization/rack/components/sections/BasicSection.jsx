import { Row, Col, Form } from "antd";

import {
    AppInput,
    AppSelect,
    AppSwitch
} from "@/components/common";

import { RACK_TYPES } from "../../constants/rack.constants";

const BasicSection = ({
    lookup,
    readOnly,
    onDirtyChange
}) => {

    return (

        <Row gutter={16}>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Center"
                    name="centerId"
                    rules={[{ required: true }]}
                >
                    <AppSelect
                        options={lookup.centers}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Department"
                    name="departmentId"
                    rules={[{ required: true }]}
                >
                    <AppSelect
                        options={lookup.departments}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Store"
                    name="storeId"
                    rules={[{ required: true }]}
                >
                    <AppSelect
                        options={lookup.stores}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Sub Store"
                    name="subStoreId"
                    rules={[{ required: true }]}
                >
                    <AppSelect
                        options={lookup.subStores}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item
                    label="Rack Code"
                    name="rackCode"
                    rules={[{ required: true }]}
                >
                    <AppInput
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item
                    label="Rack Name"
                    name="rackName"
                    rules={[{ required: true }]}
                >
                    <AppInput
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item
                    label="Short Name"
                    name="shortName"
                >
                    <AppInput
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Rack Type"
                    name="rackType"
                    rules={[{ required: true }]}
                >
                    <AppSelect
                        options={RACK_TYPES}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Active"
                    name="status"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

        </Row>

    );

};

export default BasicSection;