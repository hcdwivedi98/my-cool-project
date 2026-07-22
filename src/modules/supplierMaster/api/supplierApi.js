import apiClient from "../../../core/api/apiClient";

const BASE_URL = "/supplier-master";

export const getSuppliers = (params) =>
    apiClient.get(BASE_URL, { params });

export const getSupplierById = (id) =>
    apiClient.get(`${BASE_URL}/${id}`);

export const createSupplier = (data) =>
    apiClient.post(BASE_URL, data);

export const updateSupplier = (id, data) =>
    apiClient.put(`${BASE_URL}/${id}`, data);

export const deleteSupplier = (id) =>
    apiClient.delete(`${BASE_URL}/${id}`);

export const activateSupplier = (id) =>
    apiClient.patch(`${BASE_URL}/${id}/activate`);

export const deactivateSupplier = (id) =>
    apiClient.patch(`${BASE_URL}/${id}/deactivate`);

export const cloneSupplier = (id) =>
    apiClient.post(`${BASE_URL}/${id}/clone`);

export const getSupplierLookup = () =>
    apiClient.get(`${BASE_URL}/lookup`);