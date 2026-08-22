// src/modules/pharmacy/generic/index.js

export { default as GenericPage } from "./pages/GenericPage";

export { default as GenericDrawer } from "./components/GenericDrawer";

export { default as GenericForm } from "./components/GenericForm";

export {
    getGenerics,
    getGenericById,
    createGeneric,
    updateGeneric,
    deactivateGeneric,
    activateGeneric,
    getGenericStatistics,
} from "./services/generic.service";

export {
    default as useGenericLookup,
} from "./hooks/useGenericLookup";

export {
    default as genericList,
    genericStatistics,
} from "./mock/generic.mock";