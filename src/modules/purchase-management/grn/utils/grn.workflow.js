// src/modules/purchase-management/grn/utils/grn.workflow.js

import {
    GRN_STATUS,

    GRN_EDITABLE_STATUSES,
    GRN_SUBMITTABLE_STATUSES,
    GRN_APPROVAL_STATUSES,
    GRN_FINAL_STATUSES,
    GRN_READ_ONLY_STATUSES,

} from "../constants/grn.constants";


/* =========================================================
   SAFE STATUS
   ========================================================= */

export const getGRNStatus = (
    grn
) => {

    return (
        grn?.status ||
        GRN_STATUS.DRAFT
    );

};


/* =========================================================
   STATUS CHECK
   ========================================================= */

export const isGRNStatus = (
    grn,
    status
) => {

    return (
        getGRNStatus(grn) ===
        status
    );

};


/* =========================================================
   EDITABLE
   ========================================================= */

export const canEditGRN = (
    grn
) => {

    const status =
        getGRNStatus(grn);

    return (
        Array.isArray(
            GRN_EDITABLE_STATUSES
        ) &&
        GRN_EDITABLE_STATUSES.includes(
            status
        )
    );

};


/* =========================================================
   SUBMITTABLE
   ========================================================= */

export const canSubmitGRN = (
    grn
) => {

    const status =
        getGRNStatus(grn);

    return (
        Array.isArray(
            GRN_SUBMITTABLE_STATUSES
        ) &&
        GRN_SUBMITTABLE_STATUSES.includes(
            status
        )
    );

};


/* =========================================================
   APPROVAL
   ========================================================= */

export const canApproveGRN = (
    grn
) => {

    const status =
        getGRNStatus(grn);

    return (
        Array.isArray(
            GRN_APPROVAL_STATUSES
        ) &&
        GRN_APPROVAL_STATUSES.includes(
            status
        )
    );

};


/* =========================================================
   REJECTION
   ========================================================= */

export const canRejectGRN = (
    grn
) => {

    const status =
        getGRNStatus(grn);

    return (
        Array.isArray(
            GRN_APPROVAL_STATUSES
        ) &&
        GRN_APPROVAL_STATUSES.includes(
            status
        )
    );

};


/* =========================================================
   FINAL STATUS
   ========================================================= */

export const isGRNFinal = (
    grn
) => {

    const status =
        getGRNStatus(grn);

    return (
        Array.isArray(
            GRN_FINAL_STATUSES
        ) &&
        GRN_FINAL_STATUSES.includes(
            status
        )
    );

};


/* =========================================================
   READ ONLY
   ========================================================= */

export const isGRNReadOnly = (
    grn
) => {

    const status =
        getGRNStatus(grn);

    if (
        Array.isArray(
            GRN_READ_ONLY_STATUSES
        ) &&
        GRN_READ_ONLY_STATUSES.includes(
            status
        )
    ) {

        return true;

    }


    return isGRNFinal(
        grn
    );

};


/* =========================================================
   AVAILABLE ACTIONS
   ========================================================= */

export const getGRNActions = (
    grn
) => {

    if (
        !grn
    ) {

        return [];

    }


    const actions = [];


    /* -----------------------------------------------------
       EDIT
    ----------------------------------------------------- */

    if (
        canEditGRN(grn)
    ) {

        actions.push(
            "EDIT"
        );

    }


    /* -----------------------------------------------------
       SUBMIT
    ----------------------------------------------------- */

    if (
        canSubmitGRN(grn)
    ) {

        actions.push(
            "SUBMIT"
        );

    }


    /* -----------------------------------------------------
       APPROVE
    ----------------------------------------------------- */

    if (
        canApproveGRN(grn)
    ) {

        actions.push(
            "APPROVE"
        );

    }


    /* -----------------------------------------------------
       REJECT
    ----------------------------------------------------- */

    if (
        canRejectGRN(grn)
    ) {

        actions.push(
            "REJECT"
        );

    }


    return actions;

};


/* =========================================================
   WORKFLOW ACTION LABEL
   ========================================================= */

export const getGRNActionLabel = (
    action
) => {

    switch (
        action
    ) {

        case "EDIT":

            return "Edit";


        case "SUBMIT":

            return "Submit for Approval";


        case "APPROVE":

            return "Approve";


        case "REJECT":

            return "Reject";


        default:

            return action;

    }

};


/* =========================================================
   WORKFLOW ACTION DESCRIPTION
   ========================================================= */

export const getGRNActionDescription = (
    action
) => {

    switch (
        action
    ) {

        case "SUBMIT":

            return (
                "Submit this GRN for approval."
            );


        case "APPROVE":

            return (
                "Approve this goods receipt note."
            );


        case "REJECT":

            return (
                "Reject this goods receipt note and send it back for correction."
            );


        default:

            return "";

    }

};


/* =========================================================
   ACTION → SERVICE COMMAND
   ========================================================= */

export const getGRNWorkflowCommand = (
    action
) => {

    switch (
        action
    ) {

        case "SUBMIT":

            return "SUBMIT";


        case "APPROVE":

            return "APPROVE";


        case "REJECT":

            return "REJECT";


        default:

            return null;

    }

};


/* =========================================================
   WORKFLOW VALIDATION
   ========================================================= */

export const validateGRNWorkflowAction = (
    grn,
    action
) => {

    if (
        !grn
    ) {

        return {
            valid: false,
            message:
                "GRN record is required.",
        };

    }


    const actions =
        getGRNActions(
            grn
        );


    if (
        !actions.includes(
            action
        )
    ) {

        return {
            valid: false,

            message:
                `Action "${action}" is not allowed for the current GRN status.`,
        };

    }


    return {
        valid: true,
        message: "",
    };

};


/* =========================================================
   EXPORT
   ========================================================= */

export default {

    getGRNStatus,

    isGRNStatus,

    canEditGRN,

    canSubmitGRN,

    canApproveGRN,

    canRejectGRN,

    isGRNFinal,

    isGRNReadOnly,

    getGRNActions,

    getGRNActionLabel,

    getGRNActionDescription,

    getGRNWorkflowCommand,

    validateGRNWorkflowAction,

};