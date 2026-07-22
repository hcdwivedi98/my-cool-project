import apiClient from "../../../core/api/apiClient";

const BASE_URL = "/drug-master";

//------------------------------------------------------
// Grid
//------------------------------------------------------

export const getDrugs = (params) =>

    apiClient.get(BASE_URL, {
        params,
    });

//------------------------------------------------------
// By Id
//------------------------------------------------------

export const getDrugById = (id) =>

    apiClient.get(`${BASE_URL}/${id}`);

//------------------------------------------------------
// Create
//------------------------------------------------------

export const createDrug = (data) =>

    apiClient.post(BASE_URL, data);

//------------------------------------------------------
// Update
//------------------------------------------------------

export const updateDrug = (id, data) =>

    apiClient.put(`${BASE_URL}/${id}`, data);

//------------------------------------------------------
// Delete
//------------------------------------------------------

export const deleteDrug = (id) =>

    apiClient.delete(`${BASE_URL}/${id}`);

//------------------------------------------------------
// Activate
//------------------------------------------------------

export const activateDrug = (id) =>

    apiClient.patch(`${BASE_URL}/${id}/activate`);

//------------------------------------------------------
// Deactivate
//------------------------------------------------------

export const deactivateDrug = (id) =>

    apiClient.patch(`${BASE_URL}/${id}/deactivate`);

//------------------------------------------------------
// Clone
//------------------------------------------------------

export const cloneDrug = (id) =>

    apiClient.post(`${BASE_URL}/${id}/clone`);

//------------------------------------------------------
// Lookup
//------------------------------------------------------

export const getDrugLookup = () =>

    apiClient.get(`${BASE_URL}/lookup`);

//------------------------------------------------------
// Import
//------------------------------------------------------

export const importDrug = (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return apiClient.post(

        `${BASE_URL}/import`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

};

//------------------------------------------------------
// Export Excel
//------------------------------------------------------

export const exportDrugExcel = (params) =>

    apiClient.get(

        `${BASE_URL}/export/excel`,

        {

            params,

            responseType: "blob",

        }

    );

//------------------------------------------------------
// Export PDF
//------------------------------------------------------

export const exportDrugPdf = (params) =>

    apiClient.get(

        `${BASE_URL}/export/pdf`,

        {

            params,

            responseType: "blob",

        }

    );

//------------------------------------------------------
// Audit Trail
//------------------------------------------------------

export const getDrugAuditTrail = (id) =>

    apiClient.get(`${BASE_URL}/${id}/audit`);

//------------------------------------------------------
// Price History
//------------------------------------------------------

export const getDrugPriceHistory = (id) =>

    apiClient.get(`${BASE_URL}/${id}/price-history`);

//------------------------------------------------------
// Stock Summary
//------------------------------------------------------

export const getDrugStockSummary = (id) =>

    apiClient.get(`${BASE_URL}/${id}/stock-summary`);

//------------------------------------------------------
// Batch Summary
//------------------------------------------------------

export const getDrugBatchSummary = (id) =>

    apiClient.get(`${BASE_URL}/${id}/batch-summary`);