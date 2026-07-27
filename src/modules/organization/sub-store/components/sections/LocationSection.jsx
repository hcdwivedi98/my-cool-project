import {
    Row,
    Col
} from "antd";

import {
    AppFormItem,
    AppInput,
    AppSelect
} from "@/components/common";

const LocationSection = ({
    lookup
}) => {

    return (

        <Row gutter={16}>

            <Col span={8}>

                <AppFormItem
                    name="buildingId"
                    label="Building"
                    rules={[
                        {
                            required: true,
                            message: "Please select Building."
                        }
                    ]}
                >

                    <AppSelect
                        placeholder="Select Building"
                        options={lookup.buildings}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="floorId"
                    label="Floor"
                    rules={[
                        {
                            required: true,
                            message: "Please select Floor."
                        }
                    ]}
                >

                    <AppSelect
                        placeholder="Select Floor"
                        options={lookup.floors}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="roomId"
                    label="Room"
                    rules={[
                        {
                            required: true,
                            message: "Please select Room."
                        }
                    ]}
                >

                    <AppSelect
                        placeholder="Select Room"
                        options={lookup.rooms}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="zone"
                    label="Zone"
                >

                    <AppInput
                        placeholder="Enter Zone"
                        maxLength={50}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="aisle"
                    label="Aisle"
                >

                    <AppInput
                        placeholder="Enter Aisle"
                        maxLength={30}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="remarks"
                    label="Remarks"
                >

                    <AppInput
                        placeholder="Enter Remarks"
                        maxLength={200}
                    />

                </AppFormItem>

            </Col>

        </Row>

    );

};

export default LocationSection;