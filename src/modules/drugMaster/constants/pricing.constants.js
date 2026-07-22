// src/modules/drugMaster/constants/pricing.constants.js

export const PRICE_PRECISION = 2;

export const ROUNDING_MODE = {

    NONE: "NONE",

    INTEGER: "INTEGER",

    HALF: "HALF",

    DECIMAL: "DECIMAL",

};

export const GST_TYPE = {

    EXCLUSIVE: "EXCLUSIVE",

    INCLUSIVE: "INCLUSIVE",

};

export const PRICE_TYPES = {

    PURCHASE: "PURCHASE",

    COST: "COST",

    SALE: "SALE",

    MRP: "MRP",

};

export const DEFAULT_PRICE = {

    purchasePrice: 0,

    landingCost: 0,

    costPrice: 0,

    ptr: 0,

    pts: 0,

    salePrice: 0,

    mrp: 0,

    gstRate: 0,

    gstAmount: 0,

    marginPercentage: 0,

    discountPercentage: 0,

    taxInclusive: false,

    roundingMode: ROUNDING_MODE.DECIMAL,

};