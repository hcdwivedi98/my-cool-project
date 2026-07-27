export const prepareRackPayload = (values) => {

    return {

        ...values,

        status: values.status ?? true,

        coldStorage: values.coldStorage ?? false,

        narcoticRack: values.narcoticRack ?? false,

        lasaRack: values.lasaRack ?? false,

        quarantineRack: values.quarantineRack ?? false,

        damagedRack: values.damagedRack ?? false,

        approvalRequired: values.approvalRequired ?? false

    };

};