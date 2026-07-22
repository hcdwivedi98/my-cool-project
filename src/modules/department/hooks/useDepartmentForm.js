import { useState, useCallback } from "react";

import { DEFAULT_VALUES } from "../constants/department.constants";

function useDepartmentForm() {
    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [initialValues, setInitialValues] =
        useState(DEFAULT_VALUES);

    const resetForm = useCallback(() => {
        setInitialValues(DEFAULT_VALUES);
    }, []);

    const loadDepartment = useCallback(
        async (department) => {
            if (!department) {
                resetForm();
                return;
            }

            setLoading(true);

            try {
                // TODO:
                // API Integration

                setInitialValues({
                    ...DEFAULT_VALUES,
                    ...department,
                });
            } finally {
                setLoading(false);
            }
        },
        [resetForm]
    );

    const saveDepartment = useCallback(
        async (values) => {
            setSaving(true);

            try {
                // TODO:
                // Create / Update API

                console.log(values);
            } finally {
                setSaving(false);
            }
        },
        []
    );

    return {
        loading,
        saving,
        initialValues,

        loadDepartment,
        saveDepartment,
        resetForm,
    };
}

export default useDepartmentForm;