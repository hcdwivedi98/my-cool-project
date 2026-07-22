import PropTypes from "prop-types";

import {
    AppCard,
    AppFormItem,
    AppInput,
    AppLookupSelect,
    AppSwitch,
} from "@/components/common";
import { Input } from "antd";

const { TextArea } = Input;
import { Row, Col } from "antd";
import {
    DEPARTMENT_TYPES,
} from "../../constants/department.constants";

function BasicInformationSection({
    centerOptions = [],
    parentDepartmentOptions = [],
    readOnly = false,
}) {
    return (
        <AppCard title="Basic Information">

            <Row gutter={[16, 16]}>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="code"
                        label="Department Code"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Department Code is required",
                            },
                        ]}
                    >
                        <AppInput
                            maxLength={20}
                            placeholder="Enter Department Code"
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={16}>
                    <AppFormItem
                        name="name"
                        label="Department Name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Department Name is required",
                            },
                        ]}
                    >
                        <AppInput
                            maxLength={100}
                            placeholder="Enter Department Name"
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="centerId"
                        label="Center"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Center is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            options={centerOptions}
                            placeholder="Select Center"
                            disabled={readOnly}
                            allowClear
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="departmentType"
                        label="Department Type"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Department Type is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            options={DEPARTMENT_TYPES}
                            placeholder="Select Type"
                            disabled={readOnly}
                            allowClear
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="parentDepartmentId"
                        label="Parent Department"
                    >
                        <AppLookupSelect
                            options={parentDepartmentOptions}
                            placeholder="Select Parent Department"
                            disabled={readOnly}
                            allowClear
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24}>
                    <AppFormItem
                        name="remarks"
                        label="Description"
                    >
                        <TextArea
                            rows={4}
                            maxLength={500}
                            placeholder="Department Description"
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={6}>
                    <AppFormItem
                        name="isActive"
                        label="Active"
                        valuePropName="checked"
                    >
                        <AppSwitch
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </Col>

            </Row>

        </AppCard>
    );
}

BasicInformationSection.propTypes = {
    centerOptions: PropTypes.array,
    parentDepartmentOptions: PropTypes.array,
    readOnly: PropTypes.bool,
};

export default BasicInformationSection;