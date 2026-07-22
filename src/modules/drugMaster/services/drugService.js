// src/modules/drugMaster/services/drugService.js

import apiClient from "../../../core/api/apiClient";

const BASE_URL = "/drug-master";

const drugService = {

    //---------------------------------------------------------
    // Grid
    //---------------------------------------------------------

    async getPaged(params = {}) {

        const response = await apiClient.get(BASE_URL, {
            params,
        });

        return response.data;

    },

    //---------------------------------------------------------
    // Dropdown
    //---------------------------------------------------------

    async getLookup() {

        const response = await apiClient.get(
            `${BASE_URL}/lookup`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // By Id
    //---------------------------------------------------------

    async getById(id) {

        if (!id) {

            throw new Error("Drug Id is required.");

        }

        const response = await apiClient.get(
            `${BASE_URL}/${id}`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Create
    //---------------------------------------------------------

    async create(payload) {

        const response = await apiClient.post(
            BASE_URL,
            payload
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Update
    //---------------------------------------------------------

    async update(id, payload) {

        if (!id) {

            throw new Error("Drug Id is required.");

        }

        const response = await apiClient.put(
            `${BASE_URL}/${id}`,
            payload
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Save
    //---------------------------------------------------------

    async save(payload) {

        if (payload?.id > 0) {

            return this.update(
                payload.id,
                payload
            );

        }

        return this.create(payload);

    },

    //---------------------------------------------------------
    // Delete
    //---------------------------------------------------------

    async delete(id) {

        if (!id) {

            throw new Error("Drug Id is required.");

        }

        const response = await apiClient.delete(
            `${BASE_URL}/${id}`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Activate
    //---------------------------------------------------------

    async activate(id) {

        const response = await apiClient.patch(
            `${BASE_URL}/${id}/activate`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Deactivate
    //---------------------------------------------------------

    async deactivate(id) {

        const response = await apiClient.patch(
            `${BASE_URL}/${id}/deactivate`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Clone Drug
    //---------------------------------------------------------

    async clone(id) {

        const response = await apiClient.post(
            `${BASE_URL}/${id}/clone`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Bulk Delete
    //---------------------------------------------------------

    async bulkDelete(ids = []) {

        const response = await apiClient.post(
            `${BASE_URL}/bulk-delete`,
            ids
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Bulk Activate
    //---------------------------------------------------------

    async bulkActivate(ids = []) {

        const response = await apiClient.post(
            `${BASE_URL}/bulk-activate`,
            ids
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Bulk Deactivate
    //---------------------------------------------------------

    async bulkDeactivate(ids = []) {

        const response = await apiClient.post(
            `${BASE_URL}/bulk-deactivate`,
            ids
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Export Excel
    //---------------------------------------------------------

    async exportExcel(filters = {}) {

        const response = await apiClient.get(
            `${BASE_URL}/export/excel`,
            {
                params: filters,
                responseType: "blob",
            }
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Export PDF
    //---------------------------------------------------------

    async exportPdf(filters = {}) {

        const response = await apiClient.get(
            `${BASE_URL}/export/pdf`,
            {
                params: filters,
                responseType: "blob",
            }
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Import Excel
    //---------------------------------------------------------

    async importExcel(file) {

        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        const response = await apiClient.post(
            `${BASE_URL}/import`,
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Audit Trail
    //---------------------------------------------------------

    async getAudit(id) {

        const response = await apiClient.get(
            `${BASE_URL}/${id}/audit`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Price History
    //---------------------------------------------------------

    async getPriceHistory(id) {

        const response = await apiClient.get(
            `${BASE_URL}/${id}/price-history`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Stock Summary
    //---------------------------------------------------------

    async getStockSummary(id) {

        const response = await apiClient.get(
            `${BASE_URL}/${id}/stock-summary`
        );

        return response.data;

    },

    //---------------------------------------------------------
    // Batch Summary
    //---------------------------------------------------------

    async getBatchSummary(id) {

        const response = await apiClient.get(
            `${BASE_URL}/${id}/batches`
        );

        return response.data;

    },

};

export default Object.freeze(drugService);