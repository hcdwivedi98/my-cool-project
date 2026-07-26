import { Row, Col } from "antd";

import {
    AppButton,
    AppFilterPanel,
    AppInput,
    AppLookupSelect
} from "@/components/common";

const StoreFilterPanel = () => {

    return (

        <AppFilterPanel>

            <Row gutter={16}>

                <Col span={6}>
                    <AppLookupSelect
                        label="Center"
                        placeholder="Select Center"
                    />
                </Col>

                <Col span={6}>
                    <AppLookupSelect
                        label="Department"
                        placeholder="Select Department"
                    />
                </Col>

                <Col span={6}>
                    <AppInput
                        label="Store Code"
                    />
                </Col>

                <Col span={6}>
                    <AppInput
                        label="Store Name"
                    />
                </Col>

            </Row>

            <Row
                gutter={16}
                style={{ marginTop: 16 }}
            >

                <Col span={6}>
                    <AppLookupSelect
                        label="Store Type"
                    />
                </Col>

                <Col span={6}>
                    <AppLookupSelect
                        label="Status"
                    />
                </Col>

                <Col span={12}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "end",
                        gap: 8
                    }}
                >

                    <AppButton>
                        Reset
                    </AppButton>

                    <AppButton type="primary">
                        Search
                    </AppButton>

                </Col>

            </Row>

        </AppFilterPanel>

    );

};

export default StoreFilterPanel;