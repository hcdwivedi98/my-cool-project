import PropTypes from "prop-types";
import { Form } from "antd";

import formDefaults from "./formDefaults";
import validationMessages from "./validationMessages";

function AppForm({
    children,
    form,
    initialValues,
    onFinish,
    onValuesChange,
    layout = "vertical",
    ...rest
}) {
    return (
        <Form
            {...formDefaults}
            {...rest}
            form={form}
            layout={layout}
            initialValues={initialValues}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            validateMessages={validationMessages}
        >
            {children}
        </Form>
    );
}

AppForm.useForm = Form.useForm;

AppForm.propTypes = {
    children: PropTypes.node,
    form: PropTypes.object,
    initialValues: PropTypes.object,
    onFinish: PropTypes.func,
    onValuesChange: PropTypes.func,
    layout: PropTypes.oneOf([
        "horizontal",
        "vertical",
        "inline",
    ]),
};

export default AppForm;