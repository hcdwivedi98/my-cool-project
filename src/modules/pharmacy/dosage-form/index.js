// src/modules/pharmacy/dosage-form/index.js

import DosageFormPage
    from "./DosageFormPage";

import DosageFormDrawer
    from "./components/DosageFormDrawer";

import DosageFormForm
    from "./components/DosageFormForm";

import dosageFormService
    from "./services/dosageForm.service";

import useDosageFormLookup
    from "./hooks/useDosageFormLookup";


export {
    DosageFormPage,

    DosageFormDrawer,

    DosageFormForm,

    dosageFormService,

    useDosageFormLookup,
};


export default DosageFormPage;