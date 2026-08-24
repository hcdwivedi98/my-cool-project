// src/modules/purchase-management/purchase-order/mock/purchaseOrder.mock.js

import {
    PO_STATUS,
    PO_TYPE,
    PAYMENT_TERMS,
    DELIVERY_TERMS,
    PO_ITEM_STATUS,
    PO_CURRENCY,
    PO_COMMUNICATION_METHOD,
} from "../constants/purchaseOrder.constants";


/* =========================================================
   SUPPLIER MOCK
   ========================================================= */

export const purchaseOrderSupplierList = [

    {
        id:
            "SUP-001",

        supplierCode:
            "SUP001",

        supplierName:
            "Apollo Pharma Distributors",

        contactPerson:
            "Rajesh Kumar",

        phone:
            "9876543210",

        email:
            "sales@apollopharma.example",

        billingAddress:
            "12 MG Road, New Delhi",

        shippingAddress:
            "Central Pharmacy Store, New Delhi",

        paymentTerms:
            PAYMENT_TERMS.NET_30,
    },

    {
        id:
            "SUP-002",

        supplierCode:
            "SUP002",

        supplierName:
            "Medico Healthcare Pvt Ltd",

        contactPerson:
            "Amit Sharma",

        phone:
            "9812345678",

        email:
            "orders@medicohealth.example",

        billingAddress:
            "45 Industrial Area, Gurugram",

        shippingAddress:
            "Main Pharmacy Store, Gurugram",

        paymentTerms:
            PAYMENT_TERMS.NET_45,
    },

    {
        id:
            "SUP-003",

        supplierCode:
            "SUP003",

        supplierName:
            "LifeCare Pharma",

        contactPerson:
            "Neha Verma",

        phone:
            "9898989898",

        email:
            "purchase@lifecarepharma.example",

        billingAddress:
            "21 Ring Road, Noida",

        shippingAddress:
            "Hospital Pharmacy Store, Noida",

        paymentTerms:
            PAYMENT_TERMS.COD,
    },

];


/* =========================================================
   DRUG / ITEM MOCK
   ========================================================= */

export const purchaseOrderDrugList = [

    {
        id:
            "DRUG-001",

        drugCode:
            "PCM500",

        drugName:
            "Paracetamol 500 mg Tablet",

        uomId:
            "UOM-TAB",

        uomCode:
            "TAB",

        uomName:
            "Tablet",

        taxPercent:
            12,

        defaultRate:
            1.25,
    },

    {
        id:
            "DRUG-002",

        drugCode:
            "AMX500",

        drugName:
            "Amoxicillin 500 mg Capsule",

        uomId:
            "UOM-CAP",

        uomCode:
            "CAP",

        uomName:
            "Capsule",

        taxPercent:
            12,

        defaultRate:
            4.75,
    },

    {
        id:
            "DRUG-003",

        drugCode:
            "AZT500",

        drugName:
            "Azithromycin 500 mg Tablet",

        uomId:
            "UOM-TAB",

        uomCode:
            "TAB",

        uomName:
            "Tablet",

        taxPercent:
            12,

        defaultRate:
            6.5,
    },

    {
        id:
            "DRUG-004",

        drugCode:
            "INS100",

        drugName:
            "Insulin Human 100 IU/ml",

        uomId:
            "UOM-VIAL",

        uomCode:
            "VIAL",

        uomName:
            "Vial",

        taxPercent:
            5,

        defaultRate:
            285,
    },

    {
        id:
            "DRUG-005",

        drugCode:
            "NS500",

        drugName:
            "Normal Saline 0.9% 500 ml",

        uomId:
            "UOM-BTL",

        uomCode:
            "BTL",

        uomName:
            "Bottle",

        taxPercent:
            5,

        defaultRate:
            38,
    },

];


/* =========================================================
   PURCHASE REQUISITION MOCK
   ========================================================= */

export const purchaseOrderRequisitionList = [

    {
        id:
            "PR-2026-0001",

        requisitionNumber:
            "PR-2026-0001",

        requisitionDate:
            "2026-08-10",

        departmentName:
            "Pharmacy",

        storeName:
            "Main Pharmacy Store",

        status:
            "APPROVED",

        supplierId:
            "SUP-001",

        totalItems:
            3,

        totalQuantity:
            1200,
    },

    {
        id:
            "PR-2026-0002",

        requisitionNumber:
            "PR-2026-0002",

        requisitionDate:
            "2026-08-12",

        departmentName:
            "Emergency Pharmacy",

        storeName:
            "Emergency Store",

        status:
            "APPROVED",

        supplierId:
            "SUP-002",

        totalItems:
            2,

        totalQuantity:
            350,
    },

];


/* =========================================================
   PO ITEM MOCK
   ========================================================= */

export const purchaseOrderItemList = [

    {
        id:
            "POI-001",

        purchaseOrderId:
            "PO-2026-0001",

        purchaseRequisitionItemId:
            "PRI-001",

        drugId:
            "DRUG-001",

        itemCode:
            "PCM500",

        itemName:
            "Paracetamol 500 mg Tablet",

        uomId:
            "UOM-TAB",

        orderedQuantity:
            1000,

        freeQuantity:
            50,

        receivedQuantity:
            400,

        outstandingQuantity:
            600,

        unitRate:
            1.25,

        discountPercent:
            2,

        discountAmount:
            25,

        taxableAmount:
            1225,

        taxPercent:
            12,

        taxAmount:
            147,

        lineTotal:
            1372,

        expectedDeliveryDate:
            "2026-08-30",

        status:
            PO_ITEM_STATUS.PARTIALLY_RECEIVED,

        remarks:
            "",
    },

    {
        id:
            "POI-002",

        purchaseOrderId:
            "PO-2026-0001",

        purchaseRequisitionItemId:
            "PRI-002",

        drugId:
            "DRUG-002",

        itemCode:
            "AMX500",

        itemName:
            "Amoxicillin 500 mg Capsule",

        uomId:
            "UOM-CAP",

        orderedQuantity:
            500,

        freeQuantity:
            25,

        receivedQuantity:
            500,

        outstandingQuantity:
            0,

        unitRate:
            4.75,

        discountPercent:
            0,

        discountAmount:
            0,

        taxableAmount:
            2375,

        taxPercent:
            12,

        taxAmount:
            285,

        lineTotal:
            2660,

        expectedDeliveryDate:
            "2026-08-30",

        status:
            PO_ITEM_STATUS.FULLY_RECEIVED,

        remarks:
            "",
    },

];


/* =========================================================
   PURCHASE ORDER MOCK LIST
   ========================================================= */

export const purchaseOrderList = [

    {
        id:
            "PO-2026-0001",

        poNumber:
            "PO-2026-0001",

        poDate:
            "2026-08-18",

        purchaseRequisitionId:
            "PR-2026-0001",

        supplierId:
            "SUP-001",

        supplierCode:
            "SUP001",

        supplierName:
            "Apollo Pharma Distributors",

        companyId:
            "COMP-001",

        companyName:
            "Pharmacy Core Hospital",

        centerId:
            "CENTER-001",

        centerName:
            "Main Hospital",

        storeId:
            "STORE-001",

        storeName:
            "Main Pharmacy Store",

        poType:
            PO_TYPE.STANDARD,

        status:
            PO_STATUS.PARTIALLY_RECEIVED,

        currency:
            PO_CURRENCY.INR,

        paymentTerms:
            PAYMENT_TERMS.NET_30,

        deliveryTerms:
            DELIVERY_TERMS.SUPPLIER_DELIVERY,

        expectedDeliveryDate:
            "2026-08-30",

        billingAddress:
            "Pharmacy Core Hospital, New Delhi",

        shippingAddress:
            "Main Pharmacy Store, New Delhi",

        subtotal:
            3650,

        discountAmount:
            25,

        taxAmount:
            432,

        otherCharges:
            50,

        roundOff:
            -0.5,

        grandTotal:
            4106.5,

        totalItems:
            2,

        totalQuantity:
            1500,

        receivedQuantity:
            900,

        outstandingQuantity:
            600,

        remarks:
            "Regular monthly pharmacy replenishment.",

        internalNotes:
            "Verify near-expiry stock before receiving.",

        createdBy:
            "USR-001",

        createdByName:
            "Harish",

        createdAt:
            "2026-08-18T10:30:00",

        updatedBy:
            "USR-001",

        updatedAt:
            "2026-08-20T15:45:00",

        approvedBy:
            "USR-002",

        approvedByName:
            "Purchase Manager",

        approvedAt:
            "2026-08-18T14:00:00",

        approvalRemarks:
            "Approved as per monthly requirement.",

        sentBy:
            "USR-002",

        sentAt:
            "2026-08-18T15:00:00",

        communicationMethod:
            PO_COMMUNICATION_METHOD.EMAIL,

        version:
            2,

        isDeleted:
            false,

        items:
            purchaseOrderItemList.filter(
                (
                    item
                ) =>
                    item.purchaseOrderId ===
                    "PO-2026-0001"
            ),
    },


    {
        id:
            "PO-2026-0002",

        poNumber:
            "PO-2026-0002",

        poDate:
            "2026-08-20",

        purchaseRequisitionId:
            "PR-2026-0002",

        supplierId:
            "SUP-002",

        supplierCode:
            "SUP002",

        supplierName:
            "Medico Healthcare Pvt Ltd",

        companyId:
            "COMP-001",

        companyName:
            "Pharmacy Core Hospital",

        centerId:
            "CENTER-001",

        centerName:
            "Main Hospital",

        storeId:
            "STORE-002",

        storeName:
            "Emergency Store",

        poType:
            PO_TYPE.EMERGENCY,

        status:
            PO_STATUS.APPROVED,

        currency:
            PO_CURRENCY.INR,

        paymentTerms:
            PAYMENT_TERMS.NET_45,

        deliveryTerms:
            DELIVERY_TERMS.EXPRESS,

        expectedDeliveryDate:
            "2026-08-25",

        billingAddress:
            "Pharmacy Core Hospital, New Delhi",

        shippingAddress:
            "Emergency Store, New Delhi",

        subtotal:
            5750,

        discountAmount:
            0,

        taxAmount:
            690,

        otherCharges:
            0,

        roundOff:
            0,

        grandTotal:
            6440,

        totalItems:
            2,

        totalQuantity:
            350,

        receivedQuantity:
            0,

        outstandingQuantity:
            350,

        remarks:
            "Emergency stock requirement.",

        internalNotes:
            "",

        createdBy:
            "USR-001",

        createdByName:
            "Harish",

        createdAt:
            "2026-08-20T09:15:00",

        updatedBy:
            "USR-001",

        updatedAt:
            "2026-08-20T11:20:00",

        approvedBy:
            "USR-002",

        approvedByName:
            "Purchase Manager",

        approvedAt:
            "2026-08-20T12:00:00",

        approvalRemarks:
            "Emergency requirement approved.",

        sentBy:
            null,

        sentAt:
            null,

        communicationMethod:
            null,

        version:
            1,

        isDeleted:
            false,

        items:
            [],
    },


    {
        id:
            "PO-2026-0003",

        poNumber:
            "PO-2026-0003",

        poDate:
            "2026-08-21",

        purchaseRequisitionId:
            null,

        supplierId:
            "SUP-003",

        supplierCode:
            "SUP003",

        supplierName:
            "LifeCare Pharma",

        companyId:
            "COMP-001",

        companyName:
            "Pharmacy Core Hospital",

        centerId:
            "CENTER-001",

        centerName:
            "Main Hospital",

        storeId:
            "STORE-001",

        storeName:
            "Main Pharmacy Store",

        poType:
            PO_TYPE.DIRECT,

        status:
            PO_STATUS.PENDING_APPROVAL,

        currency:
            PO_CURRENCY.INR,

        paymentTerms:
            PAYMENT_TERMS.COD,

        deliveryTerms:
            DELIVERY_TERMS.STANDARD,

        expectedDeliveryDate:
            "2026-09-02",

        billingAddress:
            "Pharmacy Core Hospital, New Delhi",

        shippingAddress:
            "Main Pharmacy Store, New Delhi",

        subtotal:
            3250,

        discountAmount:
            65,

        taxAmount:
            382.2,

        otherCharges:
            0,

        roundOff:
            0.8,

        grandTotal:
            3568,

        totalItems:
            1,

        totalQuantity:
            500,

        receivedQuantity:
            0,

        outstandingQuantity:
            500,

        remarks:
            "Direct purchase for regular stock.",

        internalNotes:
            "Pending purchase manager approval.",

        createdBy:
            "USR-001",

        createdByName:
            "Harish",

        createdAt:
            "2026-08-21T13:20:00",

        updatedBy:
            "USR-001",

        updatedAt:
            "2026-08-21T13:20:00",

        approvedBy:
            null,

        approvedByName:
            null,

        approvedAt:
            null,

        approvalRemarks:
            null,

        sentBy:
            null,

        sentAt:
            null,

        communicationMethod:
            null,

        version:
            1,

        isDeleted:
            false,

        items:
            [],
    },

];


/* =========================================================
   APPROVAL HISTORY MOCK
   ========================================================= */

export const purchaseOrderApprovalList = [

    {
        id:
            "POA-001",

        purchaseOrderId:
            "PO-2026-0001",

        action:
            "SUBMIT",

        actionBy:
            "USR-001",

        actionByName:
            "Harish",

        actionAt:
            "2026-08-18T11:00:00",

        remarks:
            "Submitted for approval.",

        previousStatus:
            PO_STATUS.DRAFT,

        newStatus:
            PO_STATUS.PENDING_APPROVAL,
    },

    {
        id:
            "POA-002",

        purchaseOrderId:
            "PO-2026-0001",

        action:
            "APPROVE",

        actionBy:
            "USR-002",

        actionByName:
            "Purchase Manager",

        actionAt:
            "2026-08-18T14:00:00",

        remarks:
            "Approved as per requirement.",

        previousStatus:
            PO_STATUS.PENDING_APPROVAL,

        newStatus:
            PO_STATUS.APPROVED,
    },

    {
        id:
            "POA-003",

        purchaseOrderId:
            "PO-2026-0001",

        action:
            "SEND",

        actionBy:
            "USR-002",

        actionByName:
            "Purchase Manager",

        actionAt:
            "2026-08-18T15:00:00",

        remarks:
            "PO sent to supplier by email.",

        previousStatus:
            PO_STATUS.APPROVED,

        newStatus:
            PO_STATUS.SENT_TO_SUPPLIER,
    },

];


/* =========================================================
   AUDIT MOCK
   ========================================================= */

export const purchaseOrderAuditList = [

    {
        id:
            "POAUD-001",

        purchaseOrderId:
            "PO-2026-0001",

        action:
            "CREATED",

        changedBy:
            "USR-001",

        changedByName:
            "Harish",

        changedAt:
            "2026-08-18T10:30:00",

        previousValue:
            null,

        newValue:
            "PO Created",

        remarks:
            "Purchase Order created.",
    },

    {
        id:
            "POAUD-002",

        purchaseOrderId:
            "PO-2026-0001",

        action:
            "STATUS_CHANGED",

        changedBy:
            "USR-001",

        changedByName:
            "Harish",

        changedAt:
            "2026-08-18T11:00:00",

        previousValue:
            PO_STATUS.DRAFT,

        newValue:
            PO_STATUS.PENDING_APPROVAL,

        remarks:
            "PO submitted for approval.",
    },

    {
        id:
            "POAUD-003",

        purchaseOrderId:
            "PO-2026-0001",

        action:
            "STATUS_CHANGED",

        changedBy:
            "USR-002",

        changedByName:
            "Purchase Manager",

        changedAt:
            "2026-08-18T14:00:00",

        previousValue:
            PO_STATUS.PENDING_APPROVAL,

        newValue:
            PO_STATUS.APPROVED,

        remarks:
            "PO approved.",
    },

];


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default purchaseOrderList;