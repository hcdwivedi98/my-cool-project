// src/modules/drugMaster/validation/drug.validation.js

export const drugValidation = {

    itemCode: [

        {

            required: true,

            message: "Item Code is required",

        },

    ],

    itemName: [

        {

            required: true,

            message: "Medicine Name is required",

        },

    ],

    categoryId: [

        {

            required: true,

            message: "Category is required",

        },

    ],

    manufacturerId: [

        {

            required: true,

            message: "Manufacturer is required",

        },

    ],

    dosageFormId: [

        {

            required: true,

            message: "Dosage Form is required",

        },

    ],

    purchaseUomId: [

        {

            required: true,

            message: "Purchase UOM is required",

        },

    ],

    saleUomId: [

        {

            required: true,

            message: "Sale UOM is required",

        },

    ],

    issueUomId: [

        {

            required: true,

            message: "Issue UOM is required",

        },

    ],

};