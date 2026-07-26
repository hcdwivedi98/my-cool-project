import { useEffect } from "react";

const useStoreForm = ({
    form,
    record
}) => {

    useEffect(() => {

        if (record) {
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }

    }, [record, form]);

    const resetForm = () => {

        form.resetFields();

    };

    const getValues = () => {

        return form.getFieldsValue(true);

    };

    const validate = async () => {

        return await form.validateFields();

    };

    return {

        resetForm,

        getValues,

        validate

    };

};

export default useStoreForm;