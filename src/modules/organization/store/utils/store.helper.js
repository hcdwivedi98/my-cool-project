export const generateStoreCode = (stores = []) => {

    if (!stores.length) {
        return "STR001";
    }

    const maxNumber = Math.max(
        ...stores.map(item =>
            Number(item.storeCode.replace("STR", "")) || 0
        )
    );

    return `STR${String(maxNumber + 1).padStart(3, "0")}`;

};

export const getStatusText = (status) => {

    return status ? "Active" : "Inactive";

};

export const getStatusColor = (status) => {

    return status ? "green" : "red";

};

export const getStoreTypeText = (type) => {

    switch (type) {

        case "MAIN":
            return "Main Store";

        case "SUB":
            return "Sub Store";

        case "WAREHOUSE":
            return "Warehouse";

        default:
            return "-";

    }

};

export const prepareStorePayload = (values) => ({

    ...values,

    storeCode: values.storeCode?.trim() ?? "",

    storeName: values.storeName?.trim() ?? "",

    shortName: values.shortName?.trim() ?? "",

    contactPerson: values.contactPerson?.trim() ?? "",

    email: values.email?.trim().toLowerCase() ?? ""

});

export const isDuplicateStoreCode = (
    stores = [],
    storeCode,
    currentId = null
) => {

    if (!storeCode) {
        return false;
    }

    const code = storeCode.trim().toUpperCase();

    return stores.some(item => {

        if (currentId && item.id === currentId) {
            return false;
        }

        return (
            item.storeCode?.trim().toUpperCase() === code
        );

    });

};

