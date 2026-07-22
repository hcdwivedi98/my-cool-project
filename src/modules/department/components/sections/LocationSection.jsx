import PropTypes from "prop-types";

import {
    AppCard,
    AppFormItem,
    AppInput,
    AppLookupSelect,
} from "@/components/common";
import {
    Row,
    Col,
} from "antd";
import { Input } from "antd";

const { TextArea } = Input;
import {
    BUILDINGS,
    FLOORS,
} from "../../constants/department.constants";

function LocationSection({
    readOnly = false,
}) {
    return (
        <AppCard title="Location Information">

            <Row gutter={[16, 16]}>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="building"
                        label="Building"
                        rules={[
                            {
                                required: true,
                                message: "Building is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            placeholder="Select Building"
                            options={BUILDINGS}
                            allowClear
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="floor"
                        label="Floor"
                        rules={[
                            {
                                required: true,
                                message: "Floor is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            placeholder="Select Floor"
                            options={FLOORS}
                            allowClear
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="wing"
                        label="Wing"
                    >
                        <AppInput
                            placeholder="Enter Wing"
                            maxLength={50}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="block"
                        label="Block"
                    >
                        <AppInput
                            placeholder="Enter Block"
                            maxLength={50}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="roomNumber"
                        label="Room Number"
                    >
                        <AppInput
                            placeholder="Enter Room Number"
                            maxLength={20}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="locationCode"
                        label="Location Code"
                    >
                        <AppInput
                            placeholder="Enter Location Code"
                            maxLength={30}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24}>
                    <AppFormItem
                        name="locationDescription"
                        label="Location Description"
                    >
                        <TextArea
                            rows={4}
                            maxLength={500}
                            placeholder="Enter Location Description"
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

            </Row>

        </AppCard>
    );
}

LocationSection.propTypes = {
    readOnly: PropTypes.bool,
};

export default LocationSection;