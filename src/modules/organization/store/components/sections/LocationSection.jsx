import { Row, Col } from "antd";
import {
    AppFormItem,
    AppInput,
    AppLookupSelect,
    AppSection
} from "@/components/common";

const LocationSection = ({
    form,
    lookup,
    isView
}) => {

    const fieldProps = {
        disabled: isView
    };
    const handleBuildingChange = (value) => {

        form.setFieldsValue({
            buildingId: value,
            floorId: null,
            wingId: null,
            zoneId: null,
            roomId: null
        });

    };
    const handleFloorChange = (value) => {

        form.setFieldsValue({
            floorId: value,
            wingId: null,
            zoneId: null,
            roomId: null
        });

    };

    const handleWingChange = (value) => {

        form.setFieldsValue({
            wingId: value,
            zoneId: null,
            roomId: null
        });

    };

    const handleZoneChange = (value) => {

        form.setFieldsValue({
            zoneId: value,
            roomId: null
        });

    };

    const handleRackChange = (value) => {

        form.setFieldsValue({
            rackId: value,
            shelfId: null,
            binId: null
        });

    };

    const handleShelfChange = (value) => {

        form.setFieldsValue({
            shelfId: value,
            binId: null
        });

    };

    return (

        <>

            <AppSection title="Physical Location">

                <Row gutter={16}>

                    <Col span={12}>
                        <AppFormItem
                            name="buildingId"
                            label="Building"
                        >
                            <AppLookupSelect
                                options={lookup.buildings}
                                onChange={handleBuildingChange}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                    <Col span={12}>
                        <AppFormItem
                            name="floorId"
                            label="Floor"
                        >
                            <AppLookupSelect
                                options={lookup.floors}
                                onChange={handleFloorChange}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                    <Col span={12}>
                        <AppFormItem
                            name="wingId"
                            label="Wing"
                        >
                            <AppLookupSelect
                                options={lookup.wings}
                                onChange={handleWingChange}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                    <Col span={12}>
                        <AppFormItem
                            name="zoneId"
                            label="Zone"
                        >
                            <AppLookupSelect
                                options={lookup.zones}
                                onChange={handleZoneChange}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>
                    <Col span={12}>
                        <AppFormItem
                            name="rackId"
                            label="Rack"
                        >
                            <AppLookupSelect
                                options={lookup.racks}
                                onChange={handleRackChange}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                    <Col span={12}>
                        <AppFormItem
                            name="roomId"
                            label="Room"
                        >
                            <AppLookupSelect
                                options={lookup.rooms}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>



                </Row>

            </AppSection>

            <AppSection title="Storage Location">

                <Row gutter={16}>

                    <Col span={8}>
                        <AppFormItem
                            name="rackId"
                            label="Rack"
                        >
                            <AppLookupSelect
                                options={lookup.racks}
                                onChange={handleRackChange}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                    <Col span={8}>
                        <AppFormItem
                            name="shelfId"
                            label="Shelf"
                        >
                            <AppLookupSelect
                                options={lookup.shelves}
                                onChange={handleShelfChange}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                    <Col span={8}>
                        <AppFormItem
                            name="binId"
                            label="Bin"
                        >
                            <AppLookupSelect
                                options={lookup.bins}
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                </Row>

            </AppSection>

            <AppSection title="GPS Coordinates">

                <Row gutter={16}>

                    <Col span={12}>
                        <AppFormItem
                            name="latitude"
                            label="Latitude"
                        >
                            <AppInput
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                    <Col span={12}>
                        <AppFormItem
                            name="longitude"
                            label="Longitude"
                        >
                            <AppInput
                                {...fieldProps}
                            />
                        </AppFormItem>
                    </Col>

                </Row>

            </AppSection>

        </>

    );

};

export default LocationSection;