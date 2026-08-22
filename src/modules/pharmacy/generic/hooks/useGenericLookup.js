// src/modules/pharmacy/generic/hooks/useGenericLookup.js

import {
    GENERIC_STATUS_OPTIONS,
    THERAPEUTIC_CLASSES,
    PHARMACOLOGICAL_CLASSES,
    DOSAGE_FORMS,
    ROUTES,
    YES_NO_OPTIONS,
    GENERIC_TYPES,
} from "../constants/generic.constants";

const useGenericLookup = () => {
    return {
        statuses:
            GENERIC_STATUS_OPTIONS,

        therapeuticClasses:
            THERAPEUTIC_CLASSES,

        pharmacologicalClasses:
            PHARMACOLOGICAL_CLASSES,

        dosageForms:
            DOSAGE_FORMS,

        routes:
            ROUTES,

        yesNoOptions:
            YES_NO_OPTIONS,

        genericTypes:
            GENERIC_TYPES,
    };
};

export default useGenericLookup;