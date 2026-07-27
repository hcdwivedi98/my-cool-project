import axiosInstance from "@/services/axiosInstance";

const BASE_URL = "/organization/shelves";

const shelfService = {
    getAll: (params = {}) => {
        return axiosInstance.get(BASE_URL, { params });
    },

    getById: (id) => {
        return axiosInstance.get(`${BASE_URL}/${id}`);
    },

    create: (payload) => {
        return axiosInstance.post(BASE_URL, payload);
    },

    update: (id, payload) => {
        return axiosInstance.put(
            `${BASE_URL}/${id}`,
            payload
        );
    },

    remove: (id) => {
        return axiosInstance.delete(
            `${BASE_URL}/${id}`
        );
    },

    activate: (id) => {
        return axiosInstance.patch(
            `${BASE_URL}/${id}/activate`
        );
    },

    deactivate: (id) => {
        return axiosInstance.patch(
            `${BASE_URL}/${id}/deactivate`
        );
    },

    getDropdown: () => {
        return axiosInstance.get(
            `${BASE_URL}/dropdown`
        );
    },

    getStatistics: () => {
        return axiosInstance.get(
            `${BASE_URL}/statistics`
        );
    },

    uploadDocument: (id, formData) => {
        return axiosInstance.post(
            `${BASE_URL}/${id}/documents`,
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );
    },

    deleteDocument: (id, documentId) => {
        return axiosInstance.delete(
            `${BASE_URL}/${id}/documents/${documentId}`
        );
    },
};

export default shelfService;