// src/components/common/form/AppFormItem/AppFormItem.jsx

import PropTypes from "prop-types";
import { Form } from "antd";

function AppFormItem({
    children,
    name,
    label,
    rules = [],
    required = false,
    tooltip,
    extra,
    help,
    hidden = false,
    validateTrigger = "onChange",
    dependencies,
    shouldUpdate,
    noStyle = false,
    valuePropName,
    normalize,
    getValueFromEvent,
    preserve = true,
    ...rest
}) {
    const finalRules = [...rules];

    if (
        required &&
        !finalRules.some((r) => r.required)
    ) {
        finalRules.unshift({
            required: true,
            message: `${label} is required`,
        });
    }

    return (
        <Form.Item
            {...rest}
            name={name}
            label={label}
            rules={finalRules}
            tooltip={tooltip}
            extra={extra}
            help={help}
            hidden={hidden}
            validateTrigger={validateTrigger}
            dependencies={dependencies}
            shouldUpdate={shouldUpdate}
            noStyle={noStyle}
            valuePropName={valuePropName}
            normalize={normalize}
            getValueFromEvent={getValueFromEvent}
            preserve={preserve}
        >
            {children}
        </Form.Item>
    );
}

AppFormItem.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    label: PropTypes.node,
    rules: PropTypes.array,
    required: PropTypes.bool,
    tooltip: PropTypes.node,
    extra: PropTypes.node,
    help: PropTypes.node,
    hidden: PropTypes.bool,
    validateTrigger: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    dependencies: PropTypes.array,
    shouldUpdate: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func,
    ]),
    noStyle: PropTypes.bool,
    valuePropName: PropTypes.string,
    normalize: PropTypes.func,
    getValueFromEvent: PropTypes.func,
    preserve: PropTypes.bool,
};

export default AppFormItem;