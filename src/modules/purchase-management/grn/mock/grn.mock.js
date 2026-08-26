// src/modules/purchase-management/grn/mock/grn.mock.js


import {
    GRN_STATUS,
    GRN_STATUS_LABELS,
    GRN_TYPE,
    GRN_TYPE_LABELS,
    GRN_QUALITY_STATUS,
    GRN_QUALITY_STATUS_LABELS,
    GRN_INSPECTION_STATUS,
    GRN_INSPECTION_STATUS_LABELS,
    GRN_RECEIVING_MODE,
    GRN_RECEIVING_MODE_LABELS,
    GRN_STOCK_POSTING_STATUS,
    GRN_STOCK_POSTING_STATUS_LABELS,
} from "../constants/grn.constants";


/* =========================================================
   MOCK SUPPLIERS
   ========================================================= */

export const grnSupplierList = [

    {
        id:
            "SUP001",

        supplierCode:
            "SUP001",

        supplierName:
            "Medico Healthcare Pvt Ltd",

        contactPerson:
            "Rajesh Kumar",

        phone:
            "9876543210",

        email:
            "purchase@medicohealthcare.com",

        gstNumber:
            "09AABCM1234A1Z5",

        address:
            "Lucknow, Uttar Pradesh",

        paymentTerms:
            "NET_30",

    },

    {
        id:
            "SUP002",

        supplierCode:
            "SUP002",

        supplierName:
            "LifeCare Pharma",

        contactPerson:
            "Amit Sharma",

        phone:
            "9812345678",

        email:
            "orders@lifecarepharma.com",

        gstNumber:
            "09AABCL5678A1Z2",

        address:
            "Kanpur, Uttar Pradesh",

        paymentTerms:
            "NET_30",

    },

    {
        id:
            "SUP003",

        supplierCode:
            "SUP003",

        supplierName:
            "Apollo Distributors",

        contactPerson:
            "Suresh Verma",

        phone:
            "9898989898",

        email:
            "supply@apollodistributors.com",

        gstNumber:
            "09AABCA9876A1Z8",

        address:
            "New Delhi",

        paymentTerms:
            "NET_45",

    },

];


/* =========================================================
   MOCK STORES
   ========================================================= */

export const grnStoreList = [

    {
        id:
            "STORE001",

        storeCode:
            "MAIN",

        storeName:
            "Main Pharmacy Store",

        location:
            "Ground Floor",

        status:
            "ACTIVE",
    },

    {
        id:
            "STORE002",

        storeCode:
            "CENTRAL",

        storeName:
            "Central Medical Store",

        location:
            "Basement",

        status:
            "ACTIVE",
    },

    {
        id:
            "STORE003",

        storeCode:
            "OT",

        storeName:
            "OT Pharmacy Store",

        location:
            "Operation Theatre Block",

        status:
            "ACTIVE",
    },

];


/* =========================================================
   MOCK USERS
   ========================================================= */

export const grnUserList = [

    {
        id:
            "USR001",

        name:
            "Harish",

        role:
            "Admin",
    },

    {
        id:
            "USR002",

        name:
            "Rahul Singh",

        role:
            "Store Manager",
    },

    {
        id:
            "USR003",

        name:
            "Neha Verma",

        role:
            "Pharmacist",
    },

];


/* =========================================================
   MOCK PURCHASE ORDERS
   ========================================================= */

export const grnPurchaseOrderList = [

    {
        id:
            "PO001",

        poNumber:
            "PO-2026-0001",

        poDate:
            "2026-08-18",

        supplierId:
            "SUP001",

        supplierCode:
            "SUP001",

        supplierName:
            "Medico Healthcare Pvt Ltd",

        storeId:
            "STORE001",

        storeName:
            "Main Pharmacy Store",

        status:
            "APPROVED",

        currency:
            "INR",

        totalAmount:
            125000,

        items: [

            {
                id:
                    "POITEM001",

                drugId:
                    "DRUG001",

                itemCode:
                    "PCM500",

                itemName:
                    "Paracetamol 500mg Tablet",

                drugName:
                    "Paracetamol 500mg Tablet",

                uomId:
                    "UOM001",

                uomCode:
                    "TAB",

                uomName:
                    "Tablet",

                orderedQuantity:
                    1000,

                previouslyReceivedQuantity:
                    400,

                pendingQuantity:
                    600,

                unitRate:
                    2.50,

                taxPercent:
                    12,

            },

            {
                id:
                    "POITEM002",

                drugId:
                    "DRUG002",

                itemCode:
                    "AMX500",

                itemName:
                    "Amoxicillin 500mg Capsule",

                drugName:
                    "Amoxicillin 500mg Capsule",

                uomId:
                    "UOM002",

                uomCode:
                    "CAP",

                uomName:
                    "Capsule",

                orderedQuantity:
                    500,

                previouslyReceivedQuantity:
                    0,

                pendingQuantity:
                    500,

                unitRate:
                    6.00,

                taxPercent:
                    12,

            },

        ],
    },


    {
        id:
            "PO002",

        poNumber:
            "PO-2026-0002",

        poDate:
            "2026-08-19",

        supplierId:
            "SUP002",

        supplierCode:
            "SUP002",

        supplierName:
            "LifeCare Pharma",

        storeId:
            "STORE001",

        storeName:
            "Main Pharmacy Store",

        status:
            "APPROVED",

        currency:
            "INR",

        totalAmount:
            86500,

        items: [

            {
                id:
                    "POITEM003",

                drugId:
                    "DRUG003",

                itemCode:
                    "AZI500",

                itemName:
                    "Azithromycin 500mg Tablet",

                drugName:
                    "Azithromycin 500mg Tablet",

                uomId:
                    "UOM001",

                uomCode:
                    "TAB",

                uomName:
                    "Tablet",

                orderedQuantity:
                    300,

                previouslyReceivedQuantity:
                    0,

                pendingQuantity:
                    300,

                unitRate:
                    12.50,

                taxPercent:
                    12,

            },

            {
                id:
                    "POITEM004",

                drugId:
                    "DRUG004",

                itemCode:
                    "CFT200",

                itemName:
                    "Cefixime 200mg Tablet",

                drugName:
                    "Cefixime 200mg Tablet",

                uomId:
                    "UOM001",

                uomCode:
                    "TAB",

                uomName:
                    "Tablet",

                orderedQuantity:
                    200,

                previouslyReceivedQuantity:
                    0,

                pendingQuantity:
                    200,

                unitRate:
                    18.00,

                taxPercent:
                    12,

            },

        ],
    },

];


/* =========================================================
   MOCK GRN ITEMS
   ========================================================= */

export const grnItemList = [

    {
        id:
            "GRNITEM001",

        purchaseOrderItemId:
            "POITEM001",

        drugId:
            "DRUG001",

        itemCode:
            "PCM500",

        itemName:
            "Paracetamol 500mg Tablet",

        drugName:
            "Paracetamol 500mg Tablet",

        uomId:
            "UOM001",

        uomCode:
            "TAB",

        uomName:
            "Tablet",

        orderedQuantity:
            1000,

        previouslyReceivedQuantity:
            400,

        pendingQuantity:
            600,

        receivedQuantity:
            600,

        acceptedQuantity:
            580,

        rejectedQuantity:
            20,

        damagedQuantity:
            0,

        shortQuantity:
            0,

        excessQuantity:
            0,

        batchNumber:
            "PCM26A001",

        manufacturingDate:
            "2026-01-15",

        expiryDate:
            "2028-01-14",

        mrp:
            3.50,

        purchaseRate:
            2.50,

        discountPercent:
            0,

        discountAmount:
            0,

        taxableAmount:
            1450,

        taxPercent:
            12,

        taxAmount:
            174,

        lineTotal:
            1624,

        qualityStatus:
            GRN_QUALITY_STATUS.PARTIALLY_ACCEPTED,

        rejectionReason:
            "Damaged strips",

        damageReason:
            "",

        remarks:
            "20 units rejected during inspection.",
    },

];


/* =========================================================
   MOCK GRN LIST
   ========================================================= */

export const grnList = [

    {
        id:
            "GRN001",

        grnNumber:
            "GRN-2026-0001",

        grnDate:
            "2026-08-20",

        status:
            GRN_STATUS.APPROVED,

        grnType:
            GRN_TYPE.AGAINST_PO,

        purchaseOrderId:
            "PO001",

        purchaseOrderNumber:
            "PO-2026-0001",

        supplierId:
            "SUP001",

        supplierCode:
            "SUP001",

        supplierName:
            "Medico Healthcare Pvt Ltd",

        storeId:
            "STORE001",

        storeName:
            "Main Pharmacy Store",

        receivingLocationId:
            "STORE001",

        receivingLocationName:
            "Main Pharmacy Store",

        invoiceNumber:
            "INV-MED-2026-1024",

        invoiceDate:
            "2026-08-20",

        challanNumber:
            "CH-MED-2026-7788",

        challanDate:
            "2026-08-20",

        vehicleNumber:
            "UP32AB1234",

        transporterName:
            "ABC Logistics",

        receivedBy:
            "USR002",

        receiverName:
            "Rahul Singh",

        inspectionRequired:
            true,

        inspectionStatus:
            GRN_INSPECTION_STATUS.PASSED,

        stockPostingStatus:
            GRN_STOCK_POSTING_STATUS.POSTED,

        receivingMode:
            GRN_RECEIVING_MODE.PARTIAL,

        totalItems:
            2,

        totalOrderedQuantity:
            1500,

        totalReceivedQuantity:
            1100,

        totalAcceptedQuantity:
            1080,

        totalRejectedQuantity:
            20,

        totalDamagedQuantity:
            0,

        subtotal:
            4250,

        discountAmount:
            0,

        taxAmount:
            510,

        otherCharges:
            0,

        roundOff:
            0,

        grandTotal:
            4760,

        remarks:
            "Partial receipt against PO.",

        internalRemarks:
            "20 units rejected during inspection.",

        items:
            grnItemList,

        auditTrail: [

            {
                id:
                    "AUDIT001",

                action:
                    "CREATED",

                actionLabel:
                    "Created",

                performedBy:
                    "Rahul Singh",

                performedAt:
                    "2026-08-20T10:30:00",

                remarks:
                    "GRN created.",
            },

            {
                id:
                    "AUDIT002",

                action:
                    "SUBMITTED",

                actionLabel:
                    "Submitted",

                performedBy:
                    "Rahul Singh",

                performedAt:
                    "2026-08-20T11:00:00",

                remarks:
                    "GRN submitted for approval.",
            },

            {
                id:
                    "AUDIT003",

                action:
                    "APPROVED",

                actionLabel:
                    "Approved",

                performedBy:
                    "Harish",

                performedAt:
                    "2026-08-20T14:30:00",

                remarks:
                    "GRN approved.",
            },

            {
                id:
                    "AUDIT004",

                action:
                    "STOCK_POSTED",

                actionLabel:
                    "Stock Posted",

                performedBy:
                    "System",

                performedAt:
                    "2026-08-20T14:35:00",

                remarks:
                    "Stock successfully posted.",
            },

        ],
    },


    {
        id:
            "GRN002",

        grnNumber:
            "GRN-2026-0002",

        grnDate:
            "2026-08-21",

        status:
            GRN_STATUS.PENDING_APPROVAL,

        grnType:
            GRN_TYPE.AGAINST_PO,

        purchaseOrderId:
            "PO002",

        purchaseOrderNumber:
            "PO-2026-0002",

        supplierId:
            "SUP002",

        supplierCode:
            "SUP002",

        supplierName:
            "LifeCare Pharma",

        storeId:
            "STORE001",

        storeName:
            "Main Pharmacy Store",

        receivingLocationId:
            "STORE001",

        receivingLocationName:
            "Main Pharmacy Store",

        invoiceNumber:
            "INV-LIFE-2026-8899",

        invoiceDate:
            "2026-08-21",

        challanNumber:
            "CH-LIFE-2026-5544",

        challanDate:
            "2026-08-21",

        vehicleNumber:
            "UP78CD5678",

        transporterName:
            "FastTrack Logistics",

        receivedBy:
            "USR003",

        receiverName:
            "Neha Verma",

        inspectionRequired:
            true,

        inspectionStatus:
            GRN_INSPECTION_STATUS.PENDING,

        stockPostingStatus:
            GRN_STOCK_POSTING_STATUS.NOT_POSTED,

        receivingMode:
            GRN_RECEIVING_MODE.FULL,

        totalItems:
            2,

        totalOrderedQuantity:
            500,

        totalReceivedQuantity:
            500,

        totalAcceptedQuantity:
            500,

        totalRejectedQuantity:
            0,

        totalDamagedQuantity:
            0,

        subtotal:
            7350,

        discountAmount:
            0,

        taxAmount:
            882,

        otherCharges:
            0,

        roundOff:
            0,

        grandTotal:
            8232,

        remarks:
            "Full receipt awaiting approval.",

        internalRemarks:
            "",

        items: [

            {
                id:
                    "GRNITEM002",

                purchaseOrderItemId:
                    "POITEM003",

                drugId:
                    "DRUG003",

                itemCode:
                    "AZI500",

                itemName:
                    "Azithromycin 500mg Tablet",

                drugName:
                    "Azithromycin 500mg Tablet",

                uomId:
                    "UOM001",

                uomCode:
                    "TAB",

                uomName:
                    "Tablet",

                orderedQuantity:
                    300,

                previouslyReceivedQuantity:
                    0,

                pendingQuantity:
                    300,

                receivedQuantity:
                    300,

                acceptedQuantity:
                    300,

                rejectedQuantity:
                    0,

                damagedQuantity:
                    0,

                shortQuantity:
                    0,

                excessQuantity:
                    0,

                batchNumber:
                    "AZI26B001",

                manufacturingDate:
                    "2026-02-10",

                expiryDate:
                    "2028-02-09",

                mrp:
                    17.00,

                purchaseRate:
                    12.50,

                discountPercent:
                    0,

                discountAmount:
                    0,

                taxableAmount:
                    3750,

                taxPercent:
                    12,

                taxAmount:
                    450,

                lineTotal:
                    4200,

                qualityStatus:
                    GRN_QUALITY_STATUS.PENDING,

                rejectionReason:
                    "",

                damageReason:
                    "",

                remarks:
                    "",
            },

        ],

        auditTrail: [

            {
                id:
                    "AUDIT005",

                action:
                    "CREATED",

                actionLabel:
                    "Created",

                performedBy:
                    "Neha Verma",

                performedAt:
                    "2026-08-21T09:30:00",

                remarks:
                    "GRN created.",
            },

            {
                id:
                    "AUDIT006",

                action:
                    "SUBMITTED",

                actionLabel:
                    "Submitted",

                performedBy:
                    "Neha Verma",

                performedAt:
                    "2026-08-21T10:15:00",

                remarks:
                    "GRN submitted for approval.",
            },

        ],
    },

];


/* =========================================================
   MOCK DASHBOARD SUMMARY
   ========================================================= */

export const grnDashboardSummary = {

    total:
        grnList.length,

    draft:
        grnList.filter(
            item =>
                item.status ===
                GRN_STATUS.DRAFT
        ).length,

    submitted:
        grnList.filter(
            item =>
                item.status ===
                GRN_STATUS.SUBMITTED
        ).length,

    pendingApproval:
        grnList.filter(
            item =>
                item.status ===
                GRN_STATUS.PENDING_APPROVAL
        ).length,

    approved:
        grnList.filter(
            item =>
                item.status ===
                GRN_STATUS.APPROVED
        ).length,

    rejected:
        grnList.filter(
            item =>
                item.status ===
                GRN_STATUS.REJECTED
        ).length,

    stockPosted:
        grnList.filter(
            item =>
                item.status ===
                GRN_STATUS.STOCK_POSTED
        ).length,

    completed:
        grnList.filter(
            item =>
                item.status ===
                GRN_STATUS.COMPLETED
        ).length,

};


/* =========================================================
   STATUS LOOKUP
   ========================================================= */

export const grnStatusLookup =
    Object.entries(
        GRN_STATUS_LABELS
    ).map(
        (
            [
                value,
                label,
            ]
        ) => ({

            value,

            label,

        })
    );


/* =========================================================
   TYPE LOOKUP
   ========================================================= */

export const grnTypeLookup =
    Object.entries(
        GRN_TYPE_LABELS
    ).map(
        (
            [
                value,
                label,
            ]
        ) => ({

            value,

            label,

        })
    );


/* =========================================================
   QUALITY LOOKUP
   ========================================================= */

export const grnQualityStatusLookup =
    Object.entries(
        GRN_QUALITY_STATUS_LABELS
    ).map(
        (
            [
                value,
                label,
            ]
        ) => ({

            value,

            label,

        })
    );


/* =========================================================
   INSPECTION LOOKUP
   ========================================================= */

export const grnInspectionStatusLookup =
    Object.entries(
        GRN_INSPECTION_STATUS_LABELS
    ).map(
        (
            [
                value,
                label,
            ]
        ) => ({

            value,

            label,

        })
    );


/* =========================================================
   RECEIVING MODE LOOKUP
   ========================================================= */

export const grnReceivingModeLookup =
    Object.entries(
        GRN_RECEIVING_MODE_LABELS
    ).map(
        (
            [
                value,
                label,
            ]
        ) => ({

            value,

            label,

        })
    );


/* =========================================================
   STOCK POSTING LOOKUP
   ========================================================= */

export const grnStockPostingStatusLookup =
    Object.entries(
        GRN_STOCK_POSTING_STATUS_LABELS
    ).map(
        (
            [
                value,
                label,
            ]
        ) => ({

            value,

            label,

        })
    );

/* =========================================================
   GRN MOCK DATA
   ========================================================= */

export const GRN_MOCK_DATA = [
    {
        id: "GRN-0001",

        grnNumber:
            "GRN-2026-0001",

        grnDate:
            "2026-08-20",

        status:
            "APPROVED",

        grnType:
            "AGAINST_PO",

        purchaseOrderId:
            "PO-2026-0001",

        purchaseOrderNumber:
            "PO-2026-0001",

        supplierId:
            "SUP-001",

        supplierCode:
            "SUP001",

        supplierName:
            "ABC Pharma Distributors",

        storeId:
            "STORE-001",

        storeName:
            "Main Pharmacy Store",

        receivedBy:
            "Store Pharmacist",

        receivingMode:
            "FULL",

        qualityStatus:
            "PASSED",

        inspectionStatus:
            "PASSED",

        stockPostingStatus:
            "POSTED",

        currency:
            "INR",

        totalItems:
            3,

        totalQuantity:
            150,

        acceptedQuantity:
            145,

        rejectedQuantity:
            5,

        subtotal:
            15000,

        discountAmount:
            500,

        taxAmount:
            2610,

        otherCharges:
            0,

        roundOff:
            0,

        grandTotal:
            17110,

        remarks:
            "Goods received and inspected.",

        items: [
            {
                id:
                    "GRN-0001-ITEM-001",

                itemCode:
                    "PCM500",

                itemName:
                    "Paracetamol 500mg Tablet",

                orderedQuantity:
                    100,

                receivedQuantity:
                    100,

                acceptedQuantity:
                    98,

                rejectedQuantity:
                    2,

                freeQuantity:
                    0,

                unitRate:
                    50,

                discountPercent:
                    5,

                discountAmount:
                    250,

                taxPercent:
                    12,

                taxAmount:
                    570,

                lineTotal:
                    5320,

                itemStatus:
                    "ACCEPTED",

                batchNumber:
                    "PCM24001",

                manufacturingDate:
                    "2025-06-01",

                expiryDate:
                    "2027-05-31",

                qualityStatus:
                    "PASSED",

                remarks:
                    "",
            },

            {
                id:
                    "GRN-0001-ITEM-002",

                itemCode:
                    "AMX500",

                itemName:
                    "Amoxicillin 500mg Capsule",

                orderedQuantity:
                    30,

                receivedQuantity:
                    30,

                acceptedQuantity:
                    28,

                rejectedQuantity:
                    2,

                freeQuantity:
                    0,

                unitRate:
                    100,

                discountPercent:
                    0,

                discountAmount:
                    0,

                taxPercent:
                    12,

                taxAmount:
                    336,

                lineTotal:
                    3136,

                itemStatus:
                    "PARTIALLY_ACCEPTED",

                batchNumber:
                    "AMX24002",

                manufacturingDate:
                    "2025-07-01",

                expiryDate:
                    "2027-06-30",

                qualityStatus:
                    "PARTIALLY_PASSED",

                remarks:
                    "Two units rejected during inspection.",
            },

            {
                id:
                    "GRN-0001-ITEM-003",

                itemCode:
                    "AZI500",

                itemName:
                    "Azithromycin 500mg Tablet",

                orderedQuantity:
                    20,

                receivedQuantity:
                    20,

                acceptedQuantity:
                    19,

                rejectedQuantity:
                    1,

                freeQuantity:
                    0,

                unitRate:
                    75,

                discountPercent:
                    0,

                discountAmount:
                    0,

                taxPercent:
                    12,

                taxAmount:
                    180,

                lineTotal:
                    1680,

                itemStatus:
                    "PARTIALLY_ACCEPTED",

                batchNumber:
                    "AZI24003",

                manufacturingDate:
                    "2025-05-01",

                expiryDate:
                    "2027-04-30",

                qualityStatus:
                    "PARTIALLY_PASSED",

                remarks:
                    "One unit rejected.",
            },
        ],

        createdBy:
            "admin",

        createdAt:
            "2026-08-20T10:30:00",

        updatedAt:
            "2026-08-20T14:15:00",
    },

    {
        id:
            "GRN-0002",

        grnNumber:
            "GRN-2026-0002",

        grnDate:
            "2026-08-22",

        status:
            "PENDING_APPROVAL",

        grnType:
            "AGAINST_PO",

        purchaseOrderId:
            "PO-2026-0002",

        purchaseOrderNumber:
            "PO-2026-0002",

        supplierId:
            "SUP-002",

        supplierCode:
            "SUP002",

        supplierName:
            "Medico Healthcare Supplies",

        storeId:
            "STORE-001",

        storeName:
            "Main Pharmacy Store",

        receivedBy:
            "Store Pharmacist",

        receivingMode:
            "PARTIAL",

        qualityStatus:
            "PENDING",

        inspectionStatus:
            "IN_PROGRESS",

        stockPostingStatus:
            "NOT_POSTED",

        currency:
            "INR",

        totalItems:
            2,

        totalQuantity:
            75,

        acceptedQuantity:
            0,

        rejectedQuantity:
            0,

        subtotal:
            7500,

        discountAmount:
            0,

        taxAmount:
            900,

        otherCharges:
            0,

        roundOff:
            0,

        grandTotal:
            8400,

        remarks:
            "Pending quality inspection.",

        items: [
            {
                id:
                    "GRN-0002-ITEM-001",

                itemCode:
                    "CEF500",

                itemName:
                    "Cefixime 500mg Tablet",

                orderedQuantity:
                    50,

                receivedQuantity:
                    50,

                acceptedQuantity:
                    0,

                rejectedQuantity:
                    0,

                freeQuantity:
                    0,

                unitRate:
                    100,

                discountPercent:
                    0,

                discountAmount:
                    0,

                taxPercent:
                    12,

                taxAmount:
                    600,

                lineTotal:
                    5600,

                itemStatus:
                    "PENDING",

                batchNumber:
                    "CEF26001",

                manufacturingDate:
                    "2026-02-01",

                expiryDate:
                    "2028-01-31",

                qualityStatus:
                    "PENDING",

                remarks:
                    "",
            },

            {
                id:
                    "GRN-0002-ITEM-002",

                itemCode:
                    "LEV500",

                itemName:
                    "Levofloxacin 500mg Tablet",

                orderedQuantity:
                    25,

                receivedQuantity:
                    25,

                acceptedQuantity:
                    0,

                rejectedQuantity:
                    0,

                freeQuantity:
                    0,

                unitRate:
                    100,

                discountPercent:
                    0,

                discountAmount:
                    0,

                taxPercent:
                    12,

                taxAmount:
                    300,

                lineTotal:
                    2800,

                itemStatus:
                    "PENDING",

                batchNumber:
                    "LEV26002",

                manufacturingDate:
                    "2026-01-01",

                expiryDate:
                    "2027-12-31",

                qualityStatus:
                    "PENDING",

                remarks:
                    "",
            },
        ],

        createdBy:
            "store-user",

        createdAt:
            "2026-08-22T09:15:00",

        updatedAt:
            "2026-08-22T11:45:00",
    },

    {
        id:
            "GRN-0003",

        grnNumber:
            "GRN-2026-0003",

        grnDate:
            "2026-08-24",

        status:
            "DRAFT",

        grnType:
            "AGAINST_PO",

        purchaseOrderId:
            "PO-2026-0003",

        purchaseOrderNumber:
            "PO-2026-0003",

        supplierId:
            "SUP-003",

        supplierCode:
            "SUP003",

        supplierName:
            "National Pharma Ltd.",

        storeId:
            "STORE-002",

        storeName:
            "Emergency Pharmacy Store",

        receivedBy:
            "Store Pharmacist",

        receivingMode:
            "PARTIAL",

        qualityStatus:
            "PENDING",

        inspectionStatus:
            "NOT_STARTED",

        stockPostingStatus:
            "NOT_POSTED",

        currency:
            "INR",

        totalItems:
            1,

        totalQuantity:
            40,

        acceptedQuantity:
            0,

        rejectedQuantity:
            0,

        subtotal:
            4000,

        discountAmount:
            0,

        taxAmount:
            480,

        otherCharges:
            0,

        roundOff:
            0,

        grandTotal:
            4480,

        remarks:
            "",

        items: [
            {
                id:
                    "GRN-0003-ITEM-001",

                itemCode:
                    "INS100",

                itemName:
                    "Insulin Injection",

                orderedQuantity:
                    40,

                receivedQuantity:
                    40,

                acceptedQuantity:
                    0,

                rejectedQuantity:
                    0,

                freeQuantity:
                    0,

                unitRate:
                    100,

                discountPercent:
                    0,

                discountAmount:
                    0,

                taxPercent:
                    12,

                taxAmount:
                    480,

                lineTotal:
                    4480,

                itemStatus:
                    "PENDING",

                batchNumber:
                    "INS26001",

                manufacturingDate:
                    "2026-03-01",

                expiryDate:
                    "2027-02-28",

                qualityStatus:
                    "PENDING",

                remarks:
                    "",
            },
        ],

        createdBy:
            "store-user",

        createdAt:
            "2026-08-24T10:00:00",

        updatedAt:
            "2026-08-24T10:00:00",
    },
];