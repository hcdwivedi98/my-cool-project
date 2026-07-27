import apiClient from "@/services/apiClient";

const BASE_URL = "/organization/racks";

export const getRacks = (params) =>
    apiClient.get(BASE_URL, { params });

export const getRackById = (id) =>
    apiClient.get(`${BASE_URL}/${id}`);

export const createRack = (payload) =>
    apiClient.post(BASE_URL, payload);

export const updateRack = (id, payload) =>
    apiClient.put(`${BASE_URL}/${id}`, payload);

export const deleteRack = (id) =>
    apiClient.delete(`${BASE_URL}/${id}`);

const rackService = {
    getRacks,
    getRackById,
    createRack,
    updateRack,
    deleteRack
};

export default rackService;