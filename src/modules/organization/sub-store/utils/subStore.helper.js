export const prepareSubStorePayload = (values) => {

    return {

        ...values,

        status: values.status ?? true,

        allowNegativeStock: values.allowNegativeStock ?? false,

        batchMandatory: values.batchMandatory ?? false,

        expiryMandatory: values.expiryMandatory ?? false,

        barcodeMandatory: values.barcodeMandatory ?? false,

        autoReorder: values.autoReorder ?? false,

        allowInterStoreTransfer: values.allowInterStoreTransfer ?? false,

        allowIssue: values.allowIssue ?? true,

        allowReceive: values.allowReceive ?? true

    };

};