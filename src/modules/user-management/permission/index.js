// src/modules/user-management/permission/index.js

export {
    default as PermissionPage,
} from "./pages/PermissionPage";

export {
    default as PermissionDrawer,
} from "./components/PermissionDrawer";

export {
    default as PermissionForm,
} from "./components/PermissionForm";

export {
    default as BasicSection,
} from "./components/BasicSection";

export {
    default as AccessSection,
} from "./components/AccessSection";

export {
    default as ValidationSection,
} from "./components/ValidationSection";

export {
    default as AuditSection,
} from "./components/AuditSection";

export {
    default as ConfirmCloseModal,
} from "./components/ConfirmCloseModal";

export {
    default as usePermissionLookup,
} from "./hooks/usePermissionLookup";

export {
    default as permissionService,
} from "./services/permission.service";