// src/modules/pharmacy/manufacturer/components/ManufacturerForm.jsx

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
} from "react";

import {
    Alert,
    Form,
    message,
} from "antd";

import dayjs from "dayjs";

import BasicSection from "./sections/BasicSection";
import ContactSection from "./sections/ContactSection";
import AddressSection from "./sections/AddressSection";
import RegulatorySection from "./sections/RegulatorySection";
import DocumentsSection from "./sections/DocumentsSection";
import AuditSection from "./sections/AuditSection";

import useManufacturerLookup from "../hooks/useManufacturerLookup";

import {
    getDefaultManufacturerValues,
    mapManufacturerToForm,
    prepareManufacturerPayload,
} from "../utils/manufacturer.helper";

const ManufacturerForm = forwardRef(
    (
        {
            mode = "ADD",
            record = null,
            onSubmit,
            onDirtyChange,
        },
        ref
    ) => {
        const [
            form,
        ] = Form.useForm();

        const lookup =
            useManufacturerLookup();

        const isView =
            mode === "VIEW";

        const isEdit =
            mode === "EDIT";

        /*
         * =========================================
         * Initial Values
         * =========================================
         */

        const initialValues =
            useMemo(() => {
                if (
                    record &&
                    (isEdit ||
                        isView)
                ) {
                    return mapManufacturerToForm(
                        record
                    );
                }

                return getDefaultManufacturerValues();
            }, [
                record,
                isEdit,
                isView,
            ]);

        /*
         * =========================================
         * Convert API dates to Dayjs
         * =========================================
         */

        const convertDatesToDayjs =
            (values) => {
                return {
                    ...values,

                    licenseIssueDate:
                        values.licenseIssueDate
                            ? dayjs(
                                  values.licenseIssueDate
                              )
                            : null,

                    licenseExpiryDate:
                        values.licenseExpiryDate
                            ? dayjs(
                                  values.licenseExpiryDate
                              )
                            : null,

                    documents:
                        Array.isArray(
                            values.documents
                        )
                            ? values.documents.map(
                                  (
                                      document
                                  ) => ({
                                      ...document,

                                      issueDate:
                                          document.issueDate
                                              ? dayjs(
                                                    document.issueDate
                                                )
                                              : null,

                                      expiryDate:
                                          document.expiryDate
                                              ? dayjs(
                                                    document.expiryDate
                                                )
                                              : null,
                                  })
                              )
                            : [],
                };
            };

        /*
         * =========================================
         * Set Form Values
         * =========================================
         */

        useEffect(() => {
            const values =
                convertDatesToDayjs(
                    initialValues
                );

            form.setFieldsValue(
                values
            );

            onDirtyChange?.(
                false
            );
        }, [
            form,
            initialValues,
            onDirtyChange,
        ]);

        /*
         * =========================================
         * Expose Form Methods to Parent
         * =========================================
         */

        useImperativeHandle(
            ref,
            () => ({
                submit: () =>
                    form.submit(),

                validate: () =>
                    form.validateFields(),

                getValues: () =>
                    form.getFieldsValue(
                        true
                    ),

                reset: () =>
                    form.resetFields(),

                isFieldsTouched: () =>
                    form.isFieldsTouched(
                        true
                    ),
            }),
            [form]
        );

        /*
         * =========================================
         * Form Submit
         * =========================================
         */

        const handleFinish =
            async (values) => {
                try {
                    const payload =
                        prepareManufacturerPayload(
                            values
                        );

                    await onSubmit?.(
                        payload,
                        {
                            mode,
                            record,
                        }
                    );

                    onDirtyChange?.(
                        false
                    );
                } catch (error) {
                    console.error(
                        "Manufacturer save error:",
                        error
                    );

                    message.error(
                        error?.message ||
                            "Unable to save manufacturer."
                    );
                }
            };

        /*
         * =========================================
         * Validation Failed
         * =========================================
         */

        const handleFinishFailed =
            ({
                errorFields,
            }) => {
                if (
                    errorFields?.length
                ) {
                    const firstField =
                        errorFields[0];

                    form.scrollToField(
                        firstField.name,
                        {
                            behavior:
                                "smooth",
                            block:
                                "center",
                        }
                    );

                    message.error(
                        "Please complete all required fields."
                    );
                }
            };

        /*
         * =========================================
         * Dirty State
         * =========================================
         */

        const handleValuesChange =
            () => {
                onDirtyChange?.(
                    form.isFieldsTouched(
                        true
                    )
                );
            };

        return (
            <Form
                form={form}
                layout="vertical"
                requiredMark="optional"
                initialValues={
                    initialValues
                }
                onFinish={
                    handleFinish
                }
                onFinishFailed={
                    handleFinishFailed
                }
                onValuesChange={
                    handleValuesChange
                }
                scrollToFirstError={{
                    behavior:
                        "smooth",
                    block:
                        "center",
                }}
            >
                {/* =================================
                    VIEW MODE INFORMATION
                ================================= */}

                {isView && (
                    <Alert
                        type="info"
                        showIcon
                        message="View Mode"
                        description="Manufacturer information is read-only."
                        style={{
                            marginBottom: 16,
                        }}
                    />
                )}

                {/* =================================
                    BASIC INFORMATION
                ================================= */}

                <BasicSection
                    mode={mode}
                    lookup={lookup}
                />

                {/* =================================
                    CONTACT INFORMATION
                ================================= */}

                <ContactSection
                    mode={mode}
                />

                {/* =================================
                    ADDRESS INFORMATION
                ================================= */}

                <AddressSection
                    mode={mode}
                    lookup={lookup}
                />

                {/* =================================
                    REGULATORY INFORMATION
                ================================= */}

                <RegulatorySection
                    mode={mode}
                    lookup={lookup}
                />

                {/* =================================
                    DOCUMENTS
                ================================= */}

                <DocumentsSection
                    mode={mode}
                    lookup={lookup}
                />

                {/* =================================
                    AUDIT
                ================================= */}

                {(isEdit ||
                    isView) && (
                    <AuditSection
                        mode={mode}
                    />
                )}
            </Form>
        );
    }
);

ManufacturerForm.displayName =
    "ManufacturerForm";

export default ManufacturerForm;