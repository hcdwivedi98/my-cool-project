import { Row, Col } from "antd";

import {
    AppFormItem,
    AppInput,
    AppLookupSelect,
    AppSwitch
} from "@/components/common";

import {
    CENTER_LOOKUP,
    STORE_TYPE_LOOKUP,
    ROLE_LOOKUP
} from "../../data/store.lookup";

import { STORE_VALIDATION } from "../../constants/store.validation";
import { isDuplicateStoreCode } from "../../utils/store.helper";
const BasicInformationSection = ({
    lookup,
    isView,
    stores,
    currentId
}) => {
    const fieldProps = {
        disabled: isView
    };

    return (

        <Row gutter={[16, 16]}>

            <Col span={12}>
                <AppFormItem
                    name="centerId"
                    label="Center"
                    rules={STORE_VALIDATION.centerId}
                >
                    <AppLookupSelect
                        options={CENTER_LOOKUP}
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="departmentId"
                    label="Department"
                    rules={STORE_VALIDATION.departmentId}
                >
                    <AppLookupSelect
                        options={lookup.departments}
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
    name="storeCode"
    label="Store Code"
    rules={[
        ...STORE_VALIDATION.storeCode,

        {
            validator(_, value) {

                if (
                    !isDuplicateStoreCode(
                        value,
                        stores,
                        currentId
                    )
                ) {
                    return Promise.resolve();
                }

                return Promise.reject(
                    new Error("Store Code already exists.")
                );

            }
        }

    ]}
>
                    <AppInput
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="storeName"
                    label="Store Name"
                    rules={STORE_VALIDATION.storeName}
                >
                    <AppInput
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="shortName"
                    label="Short Name"
                    rules={STORE_VALIDATION.shortName}
                >
                    <AppInput
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="storeType"
                    label="Store Type"
                    rules={STORE_VALIDATION.storeType}
                >
                    <AppLookupSelect
                        options={STORE_TYPE_LOOKUP}
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="managerId"
                    label="Store Manager"
                >
                    <AppLookupSelect
                        options={ROLE_LOOKUP}
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="status"
                    label="Status"
                    valuePropName="checked"
                >
                    <AppSwitch
                        {...fieldProps}
                    />
                </AppFormItem>
            </Col>

        </Row>

    );

};

export default BasicInformationSection;