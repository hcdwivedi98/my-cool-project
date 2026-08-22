// src/modules/pharmacy/manufacturer/hooks/useManufacturerLookup.js

import {
    MANUFACTURER_TYPES,
    MANUFACTURER_CATEGORIES,
    MANUFACTURER_STATUS_OPTIONS,
    LICENSE_TYPES,
    CERTIFICATION_TYPES,
    COUNTRIES,
    STATES,
    CITIES,
    CURRENCIES,
    PAYMENT_TERMS,
    YES_NO_OPTIONS,
} from "../constants/manufacturer.constants";

import {
    manufacturerList,
} from "../mock/manufacturer.mock";

const useManufacturerLookup = () => {
    /*
     * -----------------------------------------
     * Manufacturer Lookup
     *
     * Used by:
     * - Manufacturer Master
     * - Drug Master
     * - Reports
     * - Filters
     * -----------------------------------------
     */

    const manufacturers =
        manufacturerList.map(
            (manufacturer) => ({
                value:
                    manufacturer.id,

                label:
                    manufacturer.manufacturerName,

                code:
                    manufacturer.manufacturerCode,

                shortName:
                    manufacturer.shortName,

                manufacturerType:
                    manufacturer.manufacturerType,

                manufacturerCategory:
                    manufacturer.manufacturerCategory,
            })
        );

    return {
        /*
         * Manufacturer
         */

        manufacturers,

        /*
         * Classification
         */

        manufacturerTypes:
            MANUFACTURER_TYPES,

        manufacturerCategories:
            MANUFACTURER_CATEGORIES,

        /*
         * Regulatory
         */

        licenseTypes:
            LICENSE_TYPES,

        certificationTypes:
            CERTIFICATION_TYPES,

        /*
         * Location
         */

        countries:
            COUNTRIES,

        states:
            STATES,

        cities:
            CITIES,

        /*
         * Commercial
         */

        currencies:
            CURRENCIES,

        paymentTerms:
            PAYMENT_TERMS,

        /*
         * Common
         */

        statuses:
            MANUFACTURER_STATUS_OPTIONS,

        yesNoOptions:
            YES_NO_OPTIONS,
    };
};

export default useManufacturerLookup;