// src/modules/pharmacy/drug-route/index.js

import DrugRoutePage
    from "./pages/DrugRoutePage";

import DrugRouteDrawer
    from "./components/DrugRouteDrawer";

import DrugRouteForm
    from "./components/DrugRouteForm";

import ConfirmCloseModal
    from "./components/ConfirmCloseModal";

import drugRouteService
    from "./services/drugRoute.service";

import useDrugRouteLookup
    from "./hooks/useDrugRouteLookup";

import getDrugRouteColumns
    from "./columns/drugRoute.columns";

import drugRouteQuery
    from "./utils/drugRoute.query";

import * as drugRouteHelper
    from "./utils/drugRoute.helper";

import * as drugRouteConstants
    from "./constants/drugRoute.constants";


/*
 * =========================================================
 * PAGE
 * =========================================================
 */

export {
    DrugRoutePage,
};


/*
 * =========================================================
 * COMPONENTS
 * =========================================================
 */

export {
    DrugRouteDrawer,

    DrugRouteForm,

    ConfirmCloseModal,
};


/*
 * =========================================================
 * SERVICE
 * =========================================================
 */

export {
    drugRouteService,
};


/*
 * =========================================================
 * HOOK
 * =========================================================
 */

export {
    useDrugRouteLookup,
};


/*
 * =========================================================
 * TABLE
 * =========================================================
 */

export {
    getDrugRouteColumns,
};


/*
 * =========================================================
 * UTILITIES
 * =========================================================
 */

export {
    drugRouteQuery,
};


export {
    drugRouteHelper,
};


/*
 * =========================================================
 * CONSTANTS
 * =========================================================
 */

export {
    drugRouteConstants,
};


/*
 * =========================================================
 * DEFAULT EXPORT
 * =========================================================
 */

export default DrugRoutePage;