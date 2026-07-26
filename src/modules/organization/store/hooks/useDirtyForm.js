import { useEffect, useRef, useState } from "react";

const isEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const useDirtyForm = (form) => {

    const initialValuesRef = useRef({});

    const [dirty, setDirty] = useState(false);

    useEffect(() => {

        const initialValues = form.getFieldsValue(true);

        initialValuesRef.current = initialValues;

        setDirty(false);

    }, [form]);

    useEffect(() => {

        const unsubscribe = form.watch?.((values) => {

            setDirty(
                !isEqual(values, initialValuesRef.current)
            );

        });

        return () => {

            if (unsubscribe) {
                unsubscribe();
            }

        };

    }, [form]);

    const resetDirty = () => {

        initialValuesRef.current =
            form.getFieldsValue(true);

        setDirty(false);

    };

    const markClean = () => {

        initialValuesRef.current =
            form.getFieldsValue(true);

        setDirty(false);

    };

    return {
        dirty,
        resetDirty,
        markClean
    };

};

export default useDirtyForm;