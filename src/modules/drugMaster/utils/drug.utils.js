// src/modules/drugMaster/utils/drug.utils.js

import { DEFAULT_DRUG } from "../constants/drug.constants";

//---------------------------------------------------------
// Create Empty Model
//---------------------------------------------------------

export function createDrug() {

    return structuredClone(DEFAULT_DRUG);

}

//---------------------------------------------------------
// API DTO → Form Model
//---------------------------------------------------------

export function mapDrugToForm(dto = {}) {

    return {

        ...createDrug(),

        ...dto,

        purchasePrice: Number(dto.purchasePrice || 0),

        landingCost: Number(dto.landingCost || 0),

        costPrice: Number(dto.costPrice || 0),

        ptr: Number(dto.ptr || 0),

        pts: Number(dto.pts || 0),

        mrp: Number(dto.mrp || 0),

        salePrice: Number(dto.salePrice || 0),

        gstRate: Number(dto.gstRate || 0),

        gstAmount: Number(dto.gstAmount || 0),

        marginPercentage: Number(dto.marginPercentage || 0),

        discountPercentage: Number(dto.discountPercentage || 0),

        minimumStock: Number(dto.minimumStock || 0),

        maximumStock: Number(dto.maximumStock || 0),

        reorderLevel: Number(dto.reorderLevel || 0),

        reorderQuantity: Number(dto.reorderQuantity || 0),

    };

}

//---------------------------------------------------------
// Form Model → API DTO
//---------------------------------------------------------

export function mapFormToDrug(values = {}) {

    return {

        ...values,

        purchasePrice: Number(values.purchasePrice || 0),

        landingCost: Number(values.landingCost || 0),

        costPrice: Number(values.costPrice || 0),

        ptr: Number(values.ptr || 0),

        pts: Number(values.pts || 0),

        mrp: Number(values.mrp || 0),

        salePrice: Number(values.salePrice || 0),

        gstRate: Number(values.gstRate || 0),

        gstAmount: Number(values.gstAmount || 0),

        marginPercentage: Number(values.marginPercentage || 0),

        discountPercentage: Number(values.discountPercentage || 0),

        minimumStock: Number(values.minimumStock || 0),

        maximumStock: Number(values.maximumStock || 0),

        reorderLevel: Number(values.reorderLevel || 0),

        reorderQuantity: Number(values.reorderQuantity || 0),

    };

}

//---------------------------------------------------------
// Clone Drug
//---------------------------------------------------------

export function cloneDrug(drug) {

    const copy = structuredClone(drug);

    copy.id = 0;
    copy.itemCode = "";
    copy.itemName = `${drug.itemName} Copy`;

    return copy;

}

//---------------------------------------------------------
// Status Text
//---------------------------------------------------------

export function getStatusText(active) {

    return active ? "Active" : "Inactive";

}

//---------------------------------------------------------
// Search Text
//---------------------------------------------------------

export function buildSearchText(drug) {

    return [

        drug.itemCode,

        drug.itemName,

        drug.genericName,

        drug.barcode,

        drug.manufacturerName,

    ]

        .filter(Boolean)

        .join(" ")

        .toLowerCase();

}