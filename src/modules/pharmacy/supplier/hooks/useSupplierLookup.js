// src/modules/pharmacy/supplier/hooks/useSupplierLookup.js

import {
    SUPPLIER_TYPES,
    SUPPLIER_CATEGORIES,
    SUPPLIER_STATUS_OPTIONS,
    PAYMENT_TERMS,
    CURRENCIES,
    LICENSE_TYPES,
    COUNTRIES,
} from "../constants/supplier.constants";

const cities = [
    {
        value: "DELHI",
        label: "Delhi",
    },
    {
        value: "MUMBAI",
        label: "Mumbai",
    },
    {
        value: "LUCKNOW",
        label: "Lucknow",
    },
    {
        value: "KANPUR",
        label: "Kanpur",
    },
];

const useSupplierLookup = () => {
    return {
        supplierTypes:
            SUPPLIER_TYPES,

        supplierCategories:
            SUPPLIER_CATEGORIES,

        statuses:
            SUPPLIER_STATUS_OPTIONS,

        paymentTerms:
            PAYMENT_TERMS,

        currencies:
            CURRENCIES,

        licenseTypes:
            LICENSE_TYPES,

        countries:
            COUNTRIES,

        // ✅ ADD THIS
        cities:
            cities,
    };
};

export default useSupplierLookup;