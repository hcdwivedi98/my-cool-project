// src/modules/drugMaster/validation/pricing.validation.js

export const pricingValidation = {

    purchasePrice: [

        {

            required: true,

            message: "Purchase Price is required",

        },

        {

            type: "number",

            min: 0,

            message: "Purchase Price cannot be negative",

        },

    ],

    salePrice: [

        {

            required: true,

            message: "Sale Price is required",

        },

        ({ getFieldValue }) => ({

            validator(_, value) {

                const mrp = getFieldValue("mrp");

                if (

                    value === undefined ||

                    value === null ||

                    value <= mrp

                ) {

                    return Promise.resolve();

                }

                return Promise.reject(

                    new Error(

                        "Sale Price cannot exceed MRP"

                    )

                );

            },

        }),

    ],

    mrp: [

        {

            required: true,

            message: "MRP is required",

        },

        {

            type: "number",

            min: 0,

            message: "MRP cannot be negative",

        },

    ],

    gstRate: [

        {

            type: "number",

            min: 0,

            max: 100,

            message: "GST must be between 0 and 100",

        },

    ],

    marginPercentage: [

        {

            type: "number",

            min: 0,

            max: 1000,

            message: "Invalid Margin",

        },

    ],

};