import {
    Row,
    Col
} from "antd";

import {
    AppFormItem,
    AppInput,
    AppNumberInput,
    AppSelect
} from "@/components/common";

const VALUATION_METHODS = [

    {
        value: "FIFO",
        label: "FIFO"
    },
    {
        value: "LIFO",
        label: "LIFO"
    },
    {
        value: "WEIGHTED_AVERAGE",
        label: "Weighted Average"
    }

];

const FinancialSection = () => {

    return (

        <Row gutter={16}>

            <Col span={8}>

                <AppFormItem
                    name="costCenter"
                    label="Cost Center"
                >

                    <AppInput
                        maxLength={50}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="budgetCode"
                    label="Budget Code"
                >

                    <AppInput
                        maxLength={50}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="ledgerCode"
                    label="Ledger Code"
                >

                    <AppInput
                        maxLength={50}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="inventoryAccount"
                    label="Inventory Account"
                >

                    <AppInput
                        maxLength={100}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="inventoryValuationMethod"
                    label="Inventory Valuation"
                >

                    <AppSelect
                        options={VALUATION_METHODS}
                        placeholder="Select Valuation Method"
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="stockValueLimit"
                    label="Maximum Stock Value"
                >

                    <AppNumberInput
                        min={0}
                        style={{ width: "100%" }}
                    />

                </AppFormItem>

            </Col>

        </Row>

    );

};

export default FinancialSection;