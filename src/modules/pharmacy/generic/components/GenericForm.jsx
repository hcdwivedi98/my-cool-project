// src/modules/pharmacy/generic/components/GenericForm.jsx

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react";

import {
    Divider,
    Form,
    Typography,
} from "antd";

import BasicSection from "./sections/BasicSection";
import ClassificationSection from "./sections/ClassificationSection";
import PharmaceuticalSection from "./sections/PharmaceuticalSection";
import SafetySection from "./sections/SafetySection";
import DrugMappingSection from "./sections/DrugMappingSection";
import AuditSection from "./sections/AuditSection";

import {
    mapGenericToForm,
    prepareGenericPayload,
} from "../utils/generic.helper";

const {
    Text,
} = Typography;

const GenericForm = forwardRef(
    (
        {
            mode = "ADD",

            record = null,

            loading = false,

            onSubmit,

            onDirtyChange,
        },
        ref
    ) => {
        const [
            form,
        ] = Form.useForm();

        const initialValuesRef =
            useRef(null);

        const dirtyRef =
            useRef(false);

        /*
         * =========================================
         * Mode
         * =========================================
         */

        const isView =
            mode === "VIEW";

        const isEdit =
            mode === "EDIT";

        const isAdd =
            mode === "ADD";

        /*
         * =========================================
         * Initial Values
         * =========================================
         */

        const initialValues =
            useMemo(
                () =>
                    mapGenericToForm(
                        record
                    ),
                [record]
            );

        /*
         * =========================================
         * Set Initial Form Values
         * =========================================
         */

        useEffect(() => {
            form.resetFields();

            form.setFieldsValue(
                initialValues
            );

            initialValuesRef.current =
                initialValues;

            dirtyRef.current =
                false;

            onDirtyChange?.(
                false
            );
        }, [
            form,
            initialValues,
        ]);

        /*
         * =========================================
         * Dirty State
         * =========================================
         */

        const handleValuesChange =
            (
                changedValues,
                allValues
            ) => {
                if (
                    isView
                ) {
                    return;
                }

                const initial =
                    initialValuesRef.current;

                if (!initial) {
                    return;
                }

                const currentPayload =
                    prepareGenericPayload(
                        allValues
                    );

                const initialPayload =
                    prepareGenericPayload(
                        initial
                    );

                const currentJson =
                    JSON.stringify(
                        currentPayload
                    );

                const initialJson =
                    JSON.stringify(
                        initialPayload
                    );

                const dirty =
                    currentJson !==
                    initialJson;

                dirtyRef.current =
                    dirty;

                onDirtyChange?.(
                    dirty
                );
            };

        /*
         * =========================================
         * Submit
         * =========================================
         */

        const handleFinish =
            async (
                values
            ) => {
                if (
                    isView
                ) {
                    return;
                }

                const payload =
                    prepareGenericPayload(
                        values
                    );

                await onSubmit?.(
                    payload,
                    {
                        mode,
                        record,
                    }
                );

                /*
                 * Successful submit
                 * ke baad dirty false.
                 */

                dirtyRef.current =
                    false;

                onDirtyChange?.(
                    false
                );
            };

        /*
         * =========================================
         * Expose Methods To Drawer
         * =========================================
         */

        useImperativeHandle(
            ref,
            () => ({
                /*
                 * Validate form
                 */

                validate:
                    () =>
                        form.validateFields(),

                /*
                 * Submit form
                 */

                submit:
                    () =>
                        form.submit(),

                /*
                 * Get current values
                 */

                getValues:
                    () =>
                        form.getFieldsValue(
                            true
                        ),

                /*
                 * Get prepared payload
                 */

                getPayload:
                    () => {
                        const values =
                            form.getFieldsValue(
                                true
                            );

                        return prepareGenericPayload(
                            values
                        );
                    },

                /*
                 * Check dirty state
                 */

                isDirty:
                    () =>
                        dirtyRef.current,

                /*
                 * Reset form
                 */

                reset:
                    () => {
                        form.resetFields();

                        form.setFieldsValue(
                            initialValues
                        );

                        dirtyRef.current =
                            false;

                        onDirtyChange?.(
                            false
                        );
                    },
            }),
            [
                form,
                initialValues,
                mode,
                record,
                onDirtyChange,
            ]
        );

        return (
            <Form
                form={form}
                layout="vertical"
                requiredMark="optional"
                disabled={
                    isView ||
                    loading
                }
                onFinish={
                    handleFinish
                }
                onValuesChange={
                    handleValuesChange
                }
                autoComplete="off"
            >
                {/* =================================
                    BASIC INFORMATION
                ================================= */}

                <div>
                    <Divider
                        orientation="left"
                        orientationMargin={0}
                    >
                        Basic Information
                    </Divider>

                    <Text
                        type="secondary"
                        style={{
                            display:
                                "block",
                            marginBottom:
                                16,
                            fontSize:
                                12,
                        }}
                    >
                        Enter the standard
                        identity information
                        for this generic.
                    </Text>

                    <BasicSection
                        disabled={
                            isView ||
                            loading
                        }
                    />
                </div>

                {/* =================================
                    CLASSIFICATION
                ================================= */}

                <div
                    style={{
                        marginTop:
                            12,
                    }}
                >
                    <Divider
                        orientation="left"
                        orientationMargin={0}
                    >
                        Classification
                    </Divider>

                    <Text
                        type="secondary"
                        style={{
                            display:
                                "block",
                            marginBottom:
                                16,
                            fontSize:
                                12,
                        }}
                    >
                        Define therapeutic
                        and pharmacological
                        classification.
                    </Text>

                    <ClassificationSection
                        disabled={
                            isView ||
                            loading
                        }
                    />
                </div>

                {/* =================================
                    PHARMACEUTICAL INFORMATION
                ================================= */}

                <div
                    style={{
                        marginTop:
                            12,
                    }}
                >
                    <Divider
                        orientation="left"
                        orientationMargin={0}
                    >
                        Pharmaceutical Information
                    </Divider>

                    <Text
                        type="secondary"
                        style={{
                            display:
                                "block",
                            marginBottom:
                                16,
                            fontSize:
                                12,
                        }}
                    >
                        Select the dosage
                        forms and
                        administration routes
                        supported by this
                        generic.
                    </Text>

                    <PharmaceuticalSection
                        disabled={
                            isView ||
                            loading
                        }
                    />
                </div>

                {/* =================================
                    SAFETY
                ================================= */}

                <div
                    style={{
                        marginTop:
                            12,
                    }}
                >
                    <Divider
                        orientation="left"
                        orientationMargin={0}
                    >
                        Safety & Regulatory
                    </Divider>

                    <Text
                        type="secondary"
                        style={{
                            display:
                                "block",
                            marginBottom:
                                16,
                            fontSize:
                                12,
                        }}
                    >
                        Configure medication
                        safety and
                        regulatory flags.
                    </Text>

                    <SafetySection
                        disabled={
                            isView ||
                            loading
                        }
                    />
                </div>

                {/* =================================
                    DRUG MAPPING
                ================================= */}

                <div
                    style={{
                        marginTop:
                            12,
                    }}
                >
                    <Divider
                        orientation="left"
                        orientationMargin={0}
                    >
                        Drug Mapping
                    </Divider>

                    <Text
                        type="secondary"
                        style={{
                            display:
                                "block",
                            marginBottom:
                                16,
                            fontSize:
                                12,
                        }}
                    >
                        Drugs currently
                        associated with this
                        generic. Drug mapping
                        is maintained from
                        Drug Master.
                    </Text>

                    <DrugMappingSection
                        record={
                            record
                        }
                        disabled
                    />
                </div>

                {/* =================================
                    AUDIT
                ================================= */}

                <div
                    style={{
                        marginTop:
                            12,
                        paddingBottom:
                            8,
                    }}
                >
                    <Divider
                        orientation="left"
                        orientationMargin={0}
                    >
                        Audit Information
                    </Divider>

                    <AuditSection
                        disabled
                    />
                </div>
            </Form>
        );
    }
);

GenericForm.displayName =
    "GenericForm";

export default GenericForm;