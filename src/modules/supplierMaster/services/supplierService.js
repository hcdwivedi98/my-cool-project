import * as api from "../api/supplierApi";

const supplierService = {

    async getPaged(params) {

        const response = await api.getSuppliers(params);

        return response.data;

    },

    async getById(id) {

        const response = await api.getSupplierById(id);

        return response.data;

    },

    async save(values) {

        if (values.id > 0) {

            return api.updateSupplier(

                values.id,

                values

            );

        }

        return api.createSupplier(values);

    },

    async delete(id) {

        return api.deleteSupplier(id);

    },

    async activate(id) {

        return api.activateSupplier(id);

    },

    async deactivate(id) {

        return api.deactivateSupplier(id);

    },

    async clone(id) {

        return api.cloneSupplier(id);

    },

    async getLookup() {

        const response =

            await api.getSupplierLookup();

        return response.data;

    },

};

export default supplierService;