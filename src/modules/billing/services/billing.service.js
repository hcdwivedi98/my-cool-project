// src/modules/billing/services/billing.service.js

//import apiClient from "../../../services/apiClient";


/* =========================================================
   BILLING API ENDPOINTS
   ========================================================= */

const BILLING_ENDPOINTS = {

    bills:
        "/billing/bills",

    billById:
        id =>
            `/billing/bills/${id}`,

    billConfirm:
        id =>
            `/billing/bills/${id}/confirm`,

    billCancel:
        id =>
            `/billing/bills/${id}/cancel`,

    billComplete:
        id =>
            `/billing/bills/${id}/complete`,

    billHold:
        id =>
            `/billing/bills/${id}/hold`,

    billResume:
        id =>
            `/billing/bills/${id}/resume`,

    payments:
        id =>
            `/billing/bills/${id}/payments`,

    invoice:
        id =>
            `/billing/bills/${id}/invoice`,

    invoicePrint:
        id =>
            `/billing/bills/${id}/invoice/print`,

    medicineSearch:
        "/billing/medicines/search",

    batches:
        "/billing/batches",

    patients:
        "/billing/patients/search",

    patientById:
        id =>
            `/billing/patients/${id}`,

    prescriptions:
        "/billing/prescriptions",

    returns:
        "/billing/returns",

    returnById:
        id =>
            `/billing/returns/${id}`,

    refunds:
        "/billing/refunds",

    outstanding:
        "/billing/outstanding",

    outstandingPayment:
        id =>
            `/billing/outstanding/${id}/payments`,

};


/* =========================================================
   RESPONSE HELPER
   ========================================================= */

const getResponseData = (
    response
) => {

    return response?.data;

};


/* =========================================================
   BILL LIST
   ========================================================= */

export const getBills = async (
    params = {}
) => {

    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.bills,
            {
                params,
            }
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   GET BILL BY ID
   ========================================================= */

export const getBillById = async (
    id
) => {

    if (!id) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.billById(
                id
            )
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   CREATE BILL DRAFT
   ========================================================= */

export const createBillDraft = async (
    payload
) => {

    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.bills,
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   UPDATE BILL DRAFT
   ========================================================= */

export const updateBillDraft = async (
    id,
    payload
) => {

    if (!id) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.put(
            BILLING_ENDPOINTS.billById(
                id
            ),
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   CONFIRM BILL
   ========================================================= */

export const confirmBill = async (
    id,
    payload = {}
) => {

    if (!id) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.billConfirm(
                id
            ),
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   COMPLETE BILL
   ========================================================= */

export const completeBill = async (
    id,
    payload = {}
) => {

    if (!id) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.billComplete(
                id
            ),
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   CANCEL BILL
   ========================================================= */

export const cancelBill = async (
    id,
    payload = {}
) => {

    if (!id) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.billCancel(
                id
            ),
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   HOLD BILL
   ========================================================= */

export const holdBill = async (
    id,
    payload = {}
) => {

    if (!id) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.billHold(
                id
            ),
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   RESUME BILL
   ========================================================= */

export const resumeBill = async (
    id,
    payload = {}
) => {

    if (!id) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.billResume(
                id
            ),
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   MEDICINE SEARCH
   ========================================================= */

export const searchMedicines = async (
    params = {}
) => {

    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.medicineSearch,
            {
                params,
            }
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   GET BATCHES
   ========================================================= */

export const getBatches = async (
    params = {}
) => {

    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.batches,
            {
                params,
            }
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   PATIENT SEARCH
   ========================================================= */

export const searchPatients = async (
    params = {}
) => {

    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.patients,
            {
                params,
            }
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   GET PATIENT
   ========================================================= */

export const getPatientById = async (
    id
) => {

    if (!id) {

        throw new Error(
            "Patient ID is required."
        );

    }


    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.patientById(
                id
            )
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   PRESCRIPTION SEARCH
   ========================================================= */

export const getPrescriptions = async (
    params = {}
) => {

    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.prescriptions,
            {
                params,
            }
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   ADD PAYMENT
   ========================================================= */

export const addPayment = async (
    billId,
    payload
) => {

    if (!billId) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.payments(
                billId
            ),
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   GET INVOICE
   ========================================================= */

export const getInvoice = async (
    billId
) => {

    if (!billId) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.invoice(
                billId
            )
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   PRINT INVOICE
   ========================================================= */

export const printInvoice = async (
    billId
) => {

    if (!billId) {

        throw new Error(
            "Bill ID is required."
        );

    }


    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.invoicePrint(
                billId
            ),
            {
                responseType:
                    "blob",
            }
        );


    return response?.data;

};


/* =========================================================
   CREATE SALES RETURN
   ========================================================= */

export const createSalesReturn = async (
    payload
) => {

    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.returns,
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   GET SALES RETURN
   ========================================================= */

export const getSalesReturnById = async (
    id
) => {

    if (!id) {

        throw new Error(
            "Return ID is required."
        );

    }


    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.returnById(
                id
            )
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   PROCESS REFUND
   ========================================================= */

export const processRefund = async (
    payload
) => {

    const response =
        await apiClient.post(
            BILLING_ENDPOINTS.refunds,
            payload
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   GET OUTSTANDING
   ========================================================= */

export const getOutstanding = async (
    params = {}
) => {

    const response =
        await apiClient.get(
            BILLING_ENDPOINTS.outstanding,
            {
                params,
            }
        );


    return getResponseData(
        response
    );

};


/* =========================================================
   COLLECT OUTSTANDING PAYMENT
   ========================================================= */

export const collectOutstandingPayment =
    async (
        outstandingId,
        payload
    ) => {

        if (!outstandingId) {

            throw new Error(
                "Outstanding ID is required."
            );

        }


        const response =
            await apiClient.post(
                BILLING_ENDPOINTS.outstandingPayment(
                    outstandingId
                ),
                payload
            );


        return getResponseData(
            response
        );

    };


/* =========================================================
   DEFAULT SERVICE OBJECT
   ========================================================= */

const billingService = {

    getBills,

    getBillById,

    createBillDraft,

    updateBillDraft,

    confirmBill,

    completeBill,

    cancelBill,

    holdBill,

    resumeBill,

    searchMedicines,

    getBatches,

    searchPatients,

    getPatientById,

    getPrescriptions,

    addPayment,

    getInvoice,

    printInvoice,

    createSalesReturn,

    getSalesReturnById,

    processRefund,

    getOutstanding,

    collectOutstandingPayment,

};


export default billingService;