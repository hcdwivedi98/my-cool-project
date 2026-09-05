import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Alert,
    Card,
    Col,
    Divider,
    Layout,
    Row,
    Space,
    Tag,
    Typography,
    message,
    Modal,
    Button,
} from "antd";

import {
    SearchOutlined,
    ShoppingCartOutlined,
    EyeOutlined,
    PrinterOutlined,
    PlusOutlined,
} from "@ant-design/icons";


/* =========================================================
   CONSTANTS
   ========================================================= */

import {
    BILL_STATUS,
    BILLING_MODE,
} from "../constants/billing.constants";


/* =========================================================
   SERVICE
   ========================================================= */

import billingService from "../services/billing.service";


/* =========================================================
   HOOKS
   ========================================================= */

import useBilling from "../hooks/useBilling";
import useBillingCart from "../hooks/useBillingCart";
import useBillingPayment from "../hooks/useBillingPayment";


/* =========================================================
   UTILITIES
   ========================================================= */

import {
    calculateBillingItem,
} from "../utils/billing.calculation";

import {
    formatCurrency,
    normalizeBillItem,
    toNumber,
} from "../utils/billing.helper";

import {
    getBillingValidationSummary,
} from "../utils/billing.validation";


/* =========================================================
   COMPONENTS
   ========================================================= */

import PatientSelector from "../components/PatientSelector";
import MedicineSearch from "../components/MedicineSearch";
import BillingCart from "../components/BillingCart";
import BillingSummary from "../components/BillingSummary";
import PaymentSection from "../components/PaymentSection";
import BillingActions from "../components/BillingActions";
import InvoicePreview from "../components/InvoicePreview";


/* =========================================================
   STYLES
   ========================================================= */

import "../styles/billing.css";

/* =========================================================
   INVOICE PRINT
   ========================================================= */


import {
    printInvoice,
} from "../utils/invoicePrint.helper";


/* =========================================================
   LAYOUT
   ========================================================= */

const {
    Content,
} = Layout;


const {
    Text,
} = Typography;


/* =========================================================
   DEVELOPMENT DUMMY PATIENT DATA
   ========================================================= */

const DUMMY_PATIENTS = [

    {
        id: "PAT-001",

        patientId:
            "PAT-001",

        name:
            "Rajesh Kumar",

        patientName:
            "Rajesh Kumar",

        uhid:
            "UHID-100001",

        patientUHID:
            "UHID-100001",

        mobile:
            "9876543210",

        phone:
            "9876543210",

        gender:
            "Male",

        age:
            45,

        ipdNo:
            "",

        opdNo:
            "OPD-2026-001",

        doctorId:
            "DOC-001",

        doctorName:
            "Dr. Amit Sharma",

        refDoctorName:
            "Dr. Amit Sharma",

        refDr:
            "Dr. Amit Sharma",

        patientAddress:
            "New Delhi, India",

    },


    {
        id: "PAT-002",

        patientId:
            "PAT-002",

        name:
            "Sunita Devi",

        patientName:
            "Sunita Devi",

        uhid:
            "UHID-100002",

        patientUHID:
            "UHID-100002",

        mobile:
            "9876543211",

        phone:
            "9876543211",

        gender:
            "Female",

        age:
            38,

        ipdNo:
            "",

        opdNo:
            "OPD-2026-002",

        doctorId:
            "DOC-002",

        doctorName:
            "Dr. Neha Verma",

        refDoctorName:
            "Dr. Neha Verma",

        refDr:
            "Dr. Neha Verma",

        patientAddress:
            "Lucknow, Uttar Pradesh",

    },


    {
        id: "PAT-003",

        patientId:
            "PAT-003",

        name:
            "Amit Singh",

        patientName:
            "Amit Singh",

        uhid:
            "UHID-100003",

        patientUHID:
            "UHID-100003",

        mobile:
            "9876543212",

        phone:
            "9876543212",

        gender:
            "Male",

        age:
            32,

        ipdNo:
            "IPD-2026-015",

        opdNo:
            "",

        doctorId:
            "DOC-003",

        doctorName:
            "Dr. Rajiv Gupta",

        refDoctorName:
            "Dr. Rajiv Gupta",

        refDr:
            "Dr. Rajiv Gupta",

        patientAddress:
            "Noida, Uttar Pradesh",

    },


    {
        id: "PAT-004",

        patientId:
            "PAT-004",

        name:
            "Priya Sharma",

        patientName:
            "Priya Sharma",

        uhid:
            "UHID-100004",

        patientUHID:
            "UHID-100004",

        mobile:
            "9876543213",

        phone:
            "9876543213",

        gender:
            "Female",

        age:
            29,

        ipdNo:
            "",

        opdNo:
            "OPD-2026-004",

        doctorId:
            "DOC-004",

        doctorName:
            "Dr. Pooja Mehta",

        refDoctorName:
            "Dr. Pooja Mehta",

        refDr:
            "Dr. Pooja Mehta",

        patientAddress:
            "Ghaziabad, Uttar Pradesh",

    },


    {
        id: "PAT-005",

        patientId:
            "PAT-005",

        name:
            "Mohammed Asif",

        patientName:
            "Mohammed Asif",

        uhid:
            "UHID-100005",

        patientUHID:
            "UHID-100005",

        mobile:
            "9876543214",

        phone:
            "9876543214",

        gender:
            "Male",

        age:
            51,

        ipdNo:
            "",

        opdNo:
            "OPD-2026-005",

        doctorId:
            "DOC-005",

        doctorName:
            "Dr. Sameer Khan",

        refDoctorName:
            "Dr. Sameer Khan",

        refDr:
            "Dr. Sameer Khan",

        patientAddress:
            "Delhi, India",

    },


    {
        id: "PAT-006",

        patientId:
            "PAT-006",

        name:
            "Neha Verma",

        patientName:
            "Neha Verma",

        uhid:
            "UHID-100006",

        patientUHID:
            "UHID-100006",

        mobile:
            "9876543215",

        phone:
            "9876543215",

        gender:
            "Female",

        age:
            26,

        ipdNo:
            "",

        opdNo:
            "OPD-2026-006",

        doctorId:
            "DOC-006",

        doctorName:
            "Dr. Anil Kapoor",

        refDoctorName:
            "Dr. Anil Kapoor",

        refDr:
            "Dr. Anil Kapoor",

        patientAddress:
            "Faridabad, Haryana",

    },


    {
        id: "PAT-007",

        patientId:
            "PAT-007",

        name:
            "Vikas Yadav",

        patientName:
            "Vikas Yadav",

        uhid:
            "UHID-100007",

        patientUHID:
            "UHID-100007",

        mobile:
            "9876543216",

        phone:
            "9876543216",

        gender:
            "Male",

        age:
            41,

        ipdNo:
            "IPD-2026-021",

        opdNo:
            "",

        doctorId:
            "DOC-007",

        doctorName:
            "Dr. Rakesh Singh",

        refDoctorName:
            "Dr. Rakesh Singh",

        refDr:
            "Dr. Rakesh Singh",

        patientAddress:
            "Meerut, Uttar Pradesh",

    },


    {
        id: "PAT-008",

        patientId:
            "PAT-008",

        name:
            "Anjali Gupta",

        patientName:
            "Anjali Gupta",

        uhid:
            "UHID-100008",

        patientUHID:
            "UHID-100008",

        mobile:
            "9876543217",

        phone:
            "9876543217",

        gender:
            "Female",

        age:
            34,

        ipdNo:
            "",

        opdNo:
            "OPD-2026-008",

        doctorId:
            "DOC-008",

        doctorName:
            "Dr. Kavita Joshi",

        refDoctorName:
            "Dr. Kavita Joshi",

        refDr:
            "Dr. Kavita Joshi",

        patientAddress:
            "Gurugram, Haryana",

    },

];

/* =========================================================
   DEVELOPMENT DUMMY MEDICINE DATA
   ========================================================= */

const DUMMY_MEDICINES = [

    {
        id: "MED-001",
        itemCode: "PCM500",
        name: "Paracetamol 500mg Tablet",
        itemName: "Paracetamol 500mg Tablet",
        medicineName: "Paracetamol 500mg Tablet",
        genericName: "Paracetamol",
        manufacturer: "ABC Pharma",
        taxPercent: 5,
    },

    {
        id: "MED-002",
        itemCode: "AMX500",
        name: "Amoxicillin 500mg Capsule",
        itemName: "Amoxicillin 500mg Capsule",
        medicineName: "Amoxicillin 500mg Capsule",
        genericName: "Amoxicillin",
        manufacturer: "MediCare Pharma",
        taxPercent: 12,
    },

    {
        id: "MED-003",
        itemCode: "AZI500",
        name: "Azithromycin 500mg Tablet",
        itemName: "Azithromycin 500mg Tablet",
        medicineName: "Azithromycin 500mg Tablet",
        genericName: "Azithromycin",
        manufacturer: "Sun Pharma",
        taxPercent: 12,
    },

    {
        id: "MED-004",
        itemCode: "CET10",
        name: "Cetirizine 10mg Tablet",
        itemName: "Cetirizine 10mg Tablet",
        medicineName: "Cetirizine 10mg Tablet",
        genericName: "Cetirizine",
        manufacturer: "Cipla",
        taxPercent: 5,
    },

    {
        id: "MED-005",
        itemCode: "OMZ20",
        name: "Omeprazole 20mg Capsule",
        itemName: "Omeprazole 20mg Capsule",
        medicineName: "Omeprazole 20mg Capsule",
        genericName: "Omeprazole",
        manufacturer: "Dr. Reddy's",
        taxPercent: 5,
    },

    {
        id: "MED-006",
        itemCode: "MET500",
        name: "Metformin 500mg Tablet",
        itemName: "Metformin 500mg Tablet",
        medicineName: "Metformin 500mg Tablet",
        genericName: "Metformin",
        manufacturer: "Mankind Pharma",
        taxPercent: 5,
    },

    {
        id: "MED-007",
        itemCode: "IBU400",
        name: "Ibuprofen 400mg Tablet",
        itemName: "Ibuprofen 400mg Tablet",
        medicineName: "Ibuprofen 400mg Tablet",
        genericName: "Ibuprofen",
        manufacturer: "Abbott",
        taxPercent: 5,
    },

    {
        id: "MED-008",
        itemCode: "ORS001",
        name: "ORS Powder Sachet",
        itemName: "ORS Powder Sachet",
        medicineName: "ORS Powder Sachet",
        genericName: "Oral Rehydration Salts",
        manufacturer: "Electral",
        taxPercent: 12,
    },

];

/* =========================================================
   DEVELOPMENT DUMMY PATIENT DATA
   ========================================================= */
/* =========================================================
DEVELOPMENT DUMMY BATCH DATA
========================================================= */

const DUMMY_BATCHES = {

    "MED-001": [

        {
            id: "BATCH-001",
            batchId: "BATCH-001",
            batchNumber: "PCM25001",
            batchNo: "PCM25001",
            expiryDate: "2027-12-31",
            availableQuantity: 100,
            stockQuantity: 100,
            quantity: 100,
            mrp: 25,
            sellingRate: 22,
            rate: 22,
            taxPercent: 5,
        },

        {
            id: "BATCH-002",
            batchId: "BATCH-002",
            batchNumber: "PCM25002",
            batchNo: "PCM25002",
            expiryDate: "2028-06-30",
            availableQuantity: 50,
            stockQuantity: 50,
            quantity: 50,
            mrp: 28,
            sellingRate: 24,
            rate: 24,
            taxPercent: 5,
        },

    ],


    "MED-002": [

        {
            id: "BATCH-003",
            batchId: "BATCH-003",
            batchNumber: "AMX25001",
            batchNo: "AMX25001",
            expiryDate: "2027-10-31",
            availableQuantity: 80,
            stockQuantity: 80,
            quantity: 80,
            mrp: 120,
            sellingRate: 110,
            rate: 110,
            taxPercent: 12,
        },

    ],


    "MED-003": [

        {
            id: "BATCH-004",
            batchId: "BATCH-004",
            batchNumber: "AZI25001",
            batchNo: "AZI25001",
            expiryDate: "2027-08-31",
            availableQuantity: 60,
            stockQuantity: 60,
            quantity: 60,
            mrp: 150,
            sellingRate: 135,
            rate: 135,
            taxPercent: 12,
        },

    ],


    "MED-004": [

        {
            id: "BATCH-005",
            batchId: "BATCH-005",
            batchNumber: "CET25001",
            batchNo: "CET25001",
            expiryDate: "2028-01-31",
            availableQuantity: 120,
            stockQuantity: 120,
            quantity: 120,
            mrp: 35,
            sellingRate: 30,
            rate: 30,
            taxPercent: 5,
        },

    ],


    "MED-005": [

        {
            id: "BATCH-006",
            batchId: "BATCH-006",
            batchNumber: "OMZ25001",
            batchNo: "OMZ25001",
            expiryDate: "2027-11-30",
            availableQuantity: 75,
            stockQuantity: 75,
            quantity: 75,
            mrp: 85,
            sellingRate: 78,
            rate: 78,
            taxPercent: 5,
        },

    ],


    "MED-006": [

        {
            id: "BATCH-007",
            batchId: "BATCH-007",
            batchNumber: "MET25001",
            batchNo: "MET25001",
            expiryDate: "2028-03-31",
            availableQuantity: 90,
            stockQuantity: 90,
            quantity: 90,
            mrp: 45,
            sellingRate: 40,
            rate: 40,
            taxPercent: 5,
        },

    ],


    "MED-007": [

        {
            id: "BATCH-008",
            batchId: "BATCH-008",
            batchNumber: "IBU25001",
            batchNo: "IBU25001",
            expiryDate: "2027-09-30",
            availableQuantity: 70,
            stockQuantity: 70,
            quantity: 70,
            mrp: 60,
            sellingRate: 52,
            rate: 52,
            taxPercent: 5,
        },

    ],


    "MED-008": [

        {
            id: "BATCH-009",
            batchId: "BATCH-009",
            batchNumber: "ORS25001",
            batchNo: "ORS25001",
            expiryDate: "2027-07-31",
            availableQuantity: 200,
            stockQuantity: 200,
            quantity: 200,
            mrp: 25,
            sellingRate: 22,
            rate: 22,
            taxPercent: 12,
        },

    ],

};

/* =========================================================
   DEFAULT BILL
   ========================================================= */

const DEFAULT_BILL = {

    billNumber:
        "",

    invoiceNumber:
        "",

    status:
        BILL_STATUS.DRAFT,

    paymentStatus:
        "PENDING",

    billType:
        "RETAIL",

    currency:
        "INR",


    /* =====================================================
       PATIENT
       ===================================================== */

    patientId:
        null,

    patientName:
        "",

    patientUHID:
        "",

    uhid:
        "",

    ipdNo:
        "",

    opdNo:
        "",

    refDoctorName:
        "",

    patientSource:
        "WALK_IN",


    /* =====================================================
       DOCTOR
       ===================================================== */

    doctorId:
        null,

    doctorName:
        "",


    /* =====================================================
       HIS
       ===================================================== */

    isHISPatient:
        false,


    /* =====================================================
       BILL ITEMS
       ===================================================== */

    items:
        [],


    /* =====================================================
       MULTI PAYMENTS
       ===================================================== */

    payments:
        [],

};


/* =========================================================
   COMPONENT
   ========================================================= */

const BillingPage = ({

    initialBill =
    DEFAULT_BILL,

    mode =
    BILLING_MODE.CREATE,

    user =
    {},

    store =
    {},

}) => {

    /* =====================================================
       MESSAGE
       ===================================================== */

    const [
        messageApi,
        messageContextHolder,
    ] =
        message.useMessage();


    /* =====================================================
       BILLING
       ===================================================== */

    const billing =
        useBilling(
            initialBill
        );


    /* =====================================================
       CART
       ===================================================== */

    const cart =
        useBillingCart(
            initialBill?.items || []
        );


    /* =====================================================
       PATIENT SEARCH
       ===================================================== */

    const [
        patientSearch,
        setPatientSearch,
    ] =
        useState("");


    const [
        patientOptions,
        setPatientOptions,
    ] =
        useState([]);


    const [
        patientLoading,
        setPatientLoading,
    ] =
        useState(false);


    /* =====================================================
       MEDICINE SEARCH
       ===================================================== */

    const [
        medicineSearch,
        setMedicineSearch,
    ] =
        useState("");


    const [
        medicineOptions,
        setMedicineOptions,
    ] =
        useState([]);


    const [
        medicineLoading,
        setMedicineLoading,
    ] =
        useState(false);


    const [
        batchLoading,
        setBatchLoading,
    ] =
        useState(false);


    const medicineInputRef =
        useRef(null);


    /* =====================================================
       PAYMENT
       ===================================================== */

    const payment =
        useBillingPayment(
            cart.grandTotal,
            initialBill?.payments || []
        );


    /* =====================================================
       INVOICE
       ===================================================== */

    const [
        invoice,
        setInvoice,
    ] =
        useState(null);


    const [
        invoiceLoading,
        setInvoiceLoading,
    ] =
        useState(false);


    const [
        isInvoicePreviewOpen,
        setIsInvoicePreviewOpen,
    ] = useState(false);

    const [
        completed,
        setCompleted,
    ] = useState(false);

    /* =====================================================
       SUBMIT
       ===================================================== */

    const [
        submitting,
        setSubmitting,
    ] =
        useState(false);


    /* =====================================================
       CART → BILL SAFE SYNC
       =====================================================

       IMPORTANT:

       Do not blindly call billing.setItems(cart.items)
       on every render.

       The signature prevents an update loop when the cart
       hook returns a new array reference.
    */

    const cartItemsSignature =
        useMemo(
            () =>
                JSON.stringify(
                    cart.items || []
                ),
            [
                cart.items,
            ]
        );


    const lastSyncedCartSignature =
        useRef(null);


    useEffect(
        () => {

            if (
                lastSyncedCartSignature.current ===
                cartItemsSignature
            ) {

                return;

            }


            lastSyncedCartSignature.current =
                cartItemsSignature;


            billing.setItems(
                cart.items || []
            );

        },
        [
            cartItemsSignature,
        ]
    );


    /* =====================================================
       TOTALS
       ===================================================== */

    const totals =
        useMemo(
            () => ({

                subtotal:
                    cart.subtotal,

                discountAmount:
                    cart.discountAmount,

                taxAmount:
                    cart.taxAmount,

                roundOff:
                    cart.roundOff,

                grandTotal:
                    cart.grandTotal,

                paidAmount:
                    payment.paidAmount,

                dueAmount:
                    payment.dueAmount,

                changeAmount:
                    payment.changeAmount,

            }),
            [
                cart.subtotal,
                cart.discountAmount,
                cart.taxAmount,
                cart.roundOff,
                cart.grandTotal,
                payment.paidAmount,
                payment.dueAmount,
                payment.changeAmount,
            ]
        );


    /* =====================================================
       VALIDATION SUMMARY
       ===================================================== */

    const validationSummary =
        useMemo(
            () =>
                getBillingValidationSummary(
                    billing.validationErrors
                ),
            [
                billing.validationErrors,
            ]
        );


    /* =====================================================
       PATIENT SEARCH
       ===================================================== */

    /* =====================================================
   PATIENT SEARCH - LOCAL DEVELOPMENT DATA
   ===================================================== */

    const handlePatientSearch =
        useCallback(
            async (
                value
            ) => {

                setPatientSearch(
                    value
                );


                /* =============================================
                   CLEAR SEARCH
                ============================================= */

                if (
                    !value ||
                    value.trim().length < 2
                ) {

                    setPatientOptions([]);

                    return;

                }


                setPatientLoading(
                    true
                );


                try {

                    const search =
                        value
                            .trim()
                            .toLowerCase();


                    /* =========================================
                       LOCAL FILTER
                    ========================================= */

                    const filteredPatients =
                        DUMMY_PATIENTS.filter(
                            patient => {

                                const name =
                                    String(
                                        patient.name ||
                                        patient.patientName ||
                                        ""
                                    ).toLowerCase();


                                const uhid =
                                    String(
                                        patient.uhid ||
                                        patient.patientUHID ||
                                        ""
                                    ).toLowerCase();


                                const mobile =
                                    String(
                                        patient.mobile ||
                                        patient.phone ||
                                        ""
                                    ).toLowerCase();


                                const patientId =
                                    String(
                                        patient.patientId ||
                                        patient.id ||
                                        ""
                                    ).toLowerCase();


                                const opdNo =
                                    String(
                                        patient.opdNo ||
                                        ""
                                    ).toLowerCase();


                                const ipdNo =
                                    String(
                                        patient.ipdNo ||
                                        ""
                                    ).toLowerCase();


                                return (

                                    name.includes(
                                        search
                                    ) ||

                                    uhid.includes(
                                        search
                                    ) ||

                                    mobile.includes(
                                        search
                                    ) ||

                                    patientId.includes(
                                        search
                                    ) ||

                                    opdNo.includes(
                                        search
                                    ) ||

                                    ipdNo.includes(
                                        search
                                    )

                                );

                            }
                        );


                    /* =========================================
                       OPTIONS
                    ========================================= */

                    setPatientOptions(

                        filteredPatients.map(
                            patient => ({

                                value:
                                    patient.id,

                                label: (

                                    <div>

                                        <Text strong>

                                            {
                                                patient.name ||
                                                patient.patientName ||
                                                "-"
                                            }

                                        </Text>


                                        <br />


                                        <Text
                                            type="secondary"
                                        >

                                            {
                                                [
                                                    patient.uhid ||
                                                    patient.patientUHID,

                                                    patient.mobile ||
                                                    patient.phone,

                                                    patient.opdNo ||
                                                    patient.ipdNo,
                                                ]
                                                    .filter(
                                                        Boolean
                                                    )
                                                    .join(
                                                        " • "
                                                    )
                                            }

                                        </Text>

                                    </div>

                                ),

                                patient,

                            })
                        )

                    );

                } finally {

                    setPatientLoading(
                        false
                    );

                }

            },
            []
        );



    /* =====================================================
   PATIENT SELECT
   ===================================================== */

    const handlePatientSelect =
        useCallback(
            (
                patientId,
                option
            ) => {

                const patient =
                    option?.patient ||
                    {};


                billing.updateBill({

                    patientId:
                        patient?.patientId ||
                        patientId ||
                        null,

                    patientName:
                        patient?.patientName ||
                        patient?.name ||
                        "",

                    patientUHID:
                        patient?.uhid ||
                        patient?.patientUHID ||
                        "",

                    uhid:
                        patient?.uhid ||
                        patient?.patientUHID ||
                        "",

                    ipdNo:
                        patient?.ipdNo ||
                        "",

                    opdNo:
                        patient?.opdNo ||
                        "",

                    refDoctorName:
                        patient?.refDoctorName ||
                        patient?.refDr ||
                        "",

                    patientSource:
                        "HIS",

                    doctorId:
                        patient?.doctorId ||
                        null,

                    doctorName:
                        patient?.doctorName ||
                        "",

                    isHISPatient:
                        true,

                });


                setPatientSearch("");

                setPatientOptions([]);

            },
            [
                billing,
            ]
        );



    /* =====================================================
   MANUAL PATIENT
   ===================================================== */

    const handleManualPatientSave =
        useCallback(
            (
                patient
            ) => {

                billing.updateBill({

                    patientId:
                        patient?.patientId ||
                        null,

                    patientName:
                        patient?.patientName ||
                        "",

                    patientUHID:
                        patient?.uhid ||
                        "",

                    uhid:
                        patient?.uhid ||
                        "",

                    ipdNo:
                        patient?.ipdNo ||
                        "",

                    opdNo:
                        patient?.opdNo ||
                        "",

                    refDoctorName:
                        patient?.refDoctorName ||
                        "",

                    patientSource:
                        "MANUAL",

                    doctorId:
                        null,

                    doctorName:
                        patient?.doctorName ||
                        "",

                    isHISPatient:
                        false,

                });


                setPatientSearch("");

                setPatientOptions([]);


                messageApi.success(
                    "Manual patient selected."
                );

            },
            [
                billing,
                messageApi,
            ]
        );


    /* =====================================================
       WALK-IN
       ===================================================== */

    const handleWalkIn =
        useCallback(
            (
                patient
            ) => {

                billing.updateBill({

                    patientId:
                        null,

                    patientName:
                        patient?.patientName ||
                        "Walk-in Customer",

                    patientUHID:
                        "",

                    uhid:
                        "",

                    ipdNo:
                        "",

                    opdNo:
                        "",

                    refDoctorName:
                        "",

                    patientSource:
                        "WALK_IN",

                    doctorId:
                        null,

                    doctorName:
                        "",

                    isHISPatient:
                        false,

                });


                setPatientSearch("");

                setPatientOptions([]);


                messageApi.success(
                    "Walk-in customer selected."
                );

            },
            [
                billing,
                messageApi,
            ]
        );


    /* =====================================================
       BILL TYPE
       ===================================================== */

    const handleBillTypeChange =
        useCallback(
            (
                value
            ) => {

                billing.updateBill({

                    billType:
                        value,

                });

            },
            [
                billing,
            ]
        );


    /* =====================================================
       MEDICINE SEARCH
       ===================================================== */

    /* =====================================================
   MEDICINE SEARCH - LOCAL DEVELOPMENT DATA
   ===================================================== */

    const handleMedicineSearch =
        useCallback(
            async (
                value
            ) => {

                setMedicineSearch(
                    value
                );


                if (
                    !value ||
                    value.trim().length < 1
                ) {

                    setMedicineOptions([]);

                    return;

                }


                setMedicineLoading(
                    true
                );


                try {

                    const search =
                        value
                            .trim()
                            .toLowerCase();


                    const filteredMedicines =
                        DUMMY_MEDICINES.filter(
                            medicine => {

                                const name =
                                    String(
                                        medicine.name ||
                                        ""
                                    ).toLowerCase();


                                const itemName =
                                    String(
                                        medicine.itemName ||
                                        ""
                                    ).toLowerCase();


                                const medicineName =
                                    String(
                                        medicine.medicineName ||
                                        ""
                                    ).toLowerCase();


                                const itemCode =
                                    String(
                                        medicine.itemCode ||
                                        ""
                                    ).toLowerCase();


                                const genericName =
                                    String(
                                        medicine.genericName ||
                                        ""
                                    ).toLowerCase();


                                return (

                                    name.includes(
                                        search
                                    ) ||

                                    itemName.includes(
                                        search
                                    ) ||

                                    medicineName.includes(
                                        search
                                    ) ||

                                    itemCode.includes(
                                        search
                                    ) ||

                                    genericName.includes(
                                        search
                                    )

                                );

                            }
                        );


                    setMedicineOptions(

                        filteredMedicines.map(
                            medicine => ({

                                value:
                                    medicine.id,

                                label: (

                                    <div>

                                        <Text strong>

                                            {
                                                medicine.name ||
                                                medicine.itemName ||
                                                medicine.medicineName ||
                                                "-"
                                            }

                                        </Text>


                                        <br />


                                        <Text
                                            type="secondary"
                                        >

                                            {
                                                [
                                                    medicine.itemCode,
                                                    medicine.genericName,
                                                    medicine.manufacturer,
                                                ]
                                                    .filter(
                                                        Boolean
                                                    )
                                                    .join(
                                                        " • "
                                                    )
                                            }

                                        </Text>

                                    </div>

                                ),

                                medicine,

                            })
                        )

                    );

                } finally {

                    setMedicineLoading(
                        false
                    );

                }

            },
            []
        );


    /* =====================================================
       MEDICINE BATCHES
       ===================================================== */

    /* =====================================================
   MEDICINE BATCHES - LOCAL DEVELOPMENT DATA
   ===================================================== */

    const getMedicineBatches =
        useCallback(
            async (
                medicine
            ) => {

                if (
                    !medicine?.id
                ) {

                    return [];

                }


                setBatchLoading(
                    true
                );


                try {

                    const batches =
                        DUMMY_BATCHES[
                        medicine.id
                        ] || [];


                    return batches;

                } finally {

                    setBatchLoading(
                        false
                    );

                }

            },
            []
        );


    /* =====================================================
       MEDICINE SELECT
       ===================================================== */

    const handleMedicineSelect =
        useCallback(
            async (
                medicineId,
                option
            ) => {

                const medicine =
                    option?.medicine ||
                    {};


                const batches =
                    await getMedicineBatches(
                        medicine
                    );


                if (
                    batches.length === 0
                ) {

                    messageApi.warning(
                        "No saleable batch available for this medicine."
                    );

                    return;

                }


                const selectedBatch =
                    batches.find(
                        batch =>
                            toNumber(
                                batch.availableQuantity ??
                                batch.stockQuantity ??
                                batch.quantity
                            ) > 0
                    ) ||
                    batches[0];


                const item =
                    calculateBillingItem({

                        id:
                            `BILL-${Date.now()}-${Math.random()
                                .toString(36)
                                .slice(2, 7)}`,

                        medicineId:
                            medicine.id ||
                            medicineId,

                        itemCode:
                            medicine.itemCode ||
                            medicine.code ||
                            medicine.barcode ||
                            "",

                        itemName:
                            medicine.name ||
                            medicine.itemName ||
                            medicine.medicineName ||
                            "",

                        batchId:
                            selectedBatch.id ||
                            selectedBatch.batchId ||
                            null,

                        batchNumber:
                            selectedBatch.batchNumber ||
                            selectedBatch.batchNo ||
                            "",

                        expiryDate:
                            selectedBatch.expiryDate ||
                            null,

                        availableQuantity:
                            toNumber(
                                selectedBatch.availableQuantity ??
                                selectedBatch.stockQuantity ??
                                selectedBatch.quantity
                            ),

                        quantity:
                            1,

                        freeQuantity:
                            0,

                        mrp:
                            toNumber(
                                selectedBatch.mrp ??
                                medicine.mrp
                            ),

                        unitRate:
                            toNumber(
                                selectedBatch.sellingRate ??
                                selectedBatch.rate ??
                                medicine.sellingRate ??
                                medicine.rate ??
                                medicine.mrp
                            ),

                        discountType:
                            "PERCENTAGE",

                        discountValue:
                            0,

                        taxPercent:
                            toNumber(
                                selectedBatch.taxPercent ??
                                medicine.taxPercent
                            ),

                    });


                cart.addItem(
                    normalizeBillItem(
                        item
                    )
                );


                setMedicineSearch("");

                setMedicineOptions([]);


                requestAnimationFrame(
                    () => {

                        medicineInputRef
                            .current
                            ?.focus();

                    }
                );

            },
            [
                cart,
                getMedicineBatches,
                messageApi,
            ]
        );


    /* =====================================================
       QUANTITY
       ===================================================== */

    const handleQuantityChange =
        useCallback(
            (
                itemId,
                quantity
            ) => {

                cart.updateQuantity(
                    itemId,
                    quantity
                );

            },
            [
                cart,
            ]
        );


    /* =====================================================
       DISCOUNT
       ===================================================== */

    const handleDiscountChange =
        useCallback(
            (
                itemId,
                value
            ) => {

                cart.updateItem(

                    itemId,

                    {

                        discountValue:
                            toNumber(
                                value
                            ),

                    }

                );

            },
            [
                cart,
            ]
        );


    /* =====================================================
       PAYMENT METHOD
       ===================================================== */

    const handlePaymentMethod =
        useCallback(
            (
                method
            ) => {

                payment.setActiveMethod(
                    method
                );

            },
            [
                payment,
            ]
        );


    /* =====================================================
       ADD PAYMENT
       ===================================================== */

    const handleAddPayment =
        useCallback(
            (
                paymentData
            ) => {

                const result =
                    payment.addPayment(
                        paymentData
                    );


                if (
                    result?.success === false
                ) {

                    messageApi.warning(
                        result.error ||
                        "Unable to add payment."
                    );

                }


                return result;

            },
            [
                payment,
                messageApi,
            ]
        );


    /* =====================================================
       REMOVE PAYMENT
       ===================================================== */

    const handleRemovePayment =
        useCallback(
            (
                paymentId
            ) => {

                payment.removePayment(
                    paymentId
                );

            },
            [
                payment,
            ]
        );


    /* =====================================================
       SAVE DRAFT
       ===================================================== */

    const handleSaveDraft =
        useCallback(
            async () => {

                const payload = {

                    ...billing.bill,

                    items:
                        cart.items,

                    payments:
                        payment.payments,

                    subtotal:
                        totals.subtotal,

                    discountAmount:
                        totals.discountAmount,

                    taxAmount:
                        totals.taxAmount,

                    roundOff:
                        totals.roundOff,

                    grandTotal:
                        totals.grandTotal,

                    paidAmount:
                        totals.paidAmount,

                    dueAmount:
                        totals.dueAmount,

                    changeAmount:
                        totals.changeAmount,

                    userId:
                        user?.id ||
                        null,

                    storeId:
                        store?.id ||
                        null,

                };


                const result =
                    billing.bill?.id
                        ? await billing.updateDraft(
                            billing.bill.id,
                            payload
                        )
                        : await billing.saveDraft(
                            payload
                        );


                if (
                    result?.success
                ) {

                    messageApi.success(
                        "Bill saved as draft."
                    );

                    return result;

                }


                if (
                    result?.errors?.length
                ) {

                    messageApi.error(
                        "Please correct billing validation errors."
                    );

                } else {

                    messageApi.error(
                        result?.error?.message ||
                        "Unable to save bill."
                    );

                }


                return result;

            },
            [
                billing,
                cart.items,
                payment.payments,
                totals,
                user,
                store,
                messageApi,
            ]
        );


    /* =========================================================
LOCAL INVOICE PREVIEW
DEVELOPMENT MODE
========================================================= */

    const handlePreviewBill =
        useCallback(
            () => {

                /* =============================================
                   ITEM VALIDATION
                   ============================================= */

                if (
                    cart.items.length === 0
                ) {

                    messageApi.warning(
                        "Please add at least one medicine before previewing the bill."
                    );

                    return;

                }


                /* =============================================
                   PREPARE PAYMENT LIST
                   ============================================= */

                const paymentList =
                    payment.payments.map(
                        item => ({

                            ...item,

                            amount:
                                toNumber(
                                    item.amount
                                ),

                        })
                    );


                /* =============================================
                   PREPARE LOCAL INVOICE TOTALS
                   ============================================= */

                const invoiceTotals = {

                    subtotal:
                        toNumber(
                            totals.subtotal
                        ),

                    discountAmount:
                        toNumber(
                            totals.discountAmount
                        ),

                    taxableAmount:
                        toNumber(
                            totals.subtotal
                        ) -
                        toNumber(
                            totals.discountAmount
                        ),

                    cgstAmount:
                        toNumber(
                            totals.cgstAmount
                        ),

                    sgstAmount:
                        toNumber(
                            totals.sgstAmount
                        ),

                    igstAmount:
                        toNumber(
                            totals.igstAmount
                        ),

                    taxAmount:
                        toNumber(
                            totals.taxAmount
                        ),

                    roundOff:
                        toNumber(
                            totals.roundOff
                        ),

                    grandTotal:
                        toNumber(
                            totals.grandTotal
                        ),

                    paidAmount:
                        toNumber(
                            payment.paidAmount
                        ),

                    dueAmount:
                        toNumber(
                            payment.dueAmount
                        ),

                    changeAmount:
                        toNumber(
                            payment.changeAmount
                        ),

                };


                /* =============================================
                   LOCAL INVOICE OBJECT
                   ============================================= */

                const preparedInvoice = {

                    id:
                        billing.bill?.id ||
                        billing.bill?.billId ||
                        `LOCAL-${Date.now()}`,


                    invoiceNumber:
                        billing.bill?.invoiceNumber ||
                        billing.bill?.billNumber ||
                        `INV-${Date.now()}`,


                    billNumber:
                        billing.bill?.billNumber ||
                        "",


                    invoiceDate:
                        new Date().toISOString(),


                    paymentStatus:
                        payment.paymentStatus ||
                        "PENDING",


                    /* =========================================
                       CENTER
                       ========================================= */

                    center: {

                        name:
                            store?.name ||
                            store?.centerName ||
                            "Pharmacy",

                        addressLine1:
                            store?.addressLine1 ||
                            store?.address ||
                            "",

                        addressLine2:
                            store?.addressLine2 ||
                            "",

                        city:
                            store?.city ||
                            "",

                        state:
                            store?.state ||
                            "",

                        postalCode:
                            store?.postalCode ||
                            store?.pincode ||
                            "",

                        phone:
                            store?.phone ||
                            store?.mobile ||
                            "",

                        gstin:
                            store?.gstin ||
                            store?.GSTIN ||
                            "",

                        drugLicenseNumber:
                            store?.drugLicenseNumber ||
                            store?.drugLicenseNo ||
                            "",

                    },


                    /* =========================================
                       CUSTOMER
                       ========================================= */

                    customer: {

                        name:
                            billing.bill?.patientName ||
                            "Walk-in Customer",

                        patientId:
                            billing.bill?.patientId ||
                            null,

                        mrn:
                            billing.bill?.patientUHID ||
                            billing.bill?.uhid ||
                            "",

                        phone:
                            billing.bill?.patientPhone ||
                            billing.bill?.phone ||
                            "",

                        address:
                            billing.bill?.patientAddress ||
                            "",

                    },


                    /* =========================================
                       PRESCRIPTION
                       ========================================= */

                    prescription: {

                        prescriptionNumber:
                            billing.bill?.prescriptionNumber ||
                            "",

                        doctorName:
                            billing.bill?.doctorName ||
                            billing.bill?.refDoctorName ||
                            "",

                        doctorRegistrationNumber:
                            billing.bill?.doctorRegistrationNumber ||
                            "",

                    },


                    /* =========================================
                       ITEMS
                       ========================================= */

                    items:
                        cart.items.map(
                            item => ({

                                ...item,

                                id:
                                    item.id ||
                                    `${item.productId || item.medicineId}-${item.batchNumber || Date.now()}`,

                                productId:
                                    item.productId ||
                                    item.medicineId ||
                                    null,

                                productName:
                                    item.productName ||
                                    item.itemName ||
                                    item.medicineName ||
                                    "",

                                genericName:
                                    item.genericName ||
                                    "",

                                batchNumber:
                                    item.batchNumber ||
                                    "",

                                expiryDate:
                                    item.expiryDate ||
                                    null,

                                quantity:
                                    toNumber(
                                        item.quantity
                                    ),

                                mrp:
                                    toNumber(
                                        item.mrp
                                    ),

                                discountAmount:
                                    toNumber(
                                        item.discountAmount
                                    ),

                                totalTax:
                                    toNumber(
                                        item.totalTax ??
                                        item.taxAmount
                                    ),

                                lineTotal:
                                    toNumber(
                                        item.lineTotal ??
                                        item.totalAmount
                                    ),

                            })
                        ),


                    /* =========================================
                       PAYMENTS
                       ========================================= */

                    payments:
                        paymentList,


                    /* =========================================
                       TOTALS
                       ========================================= */

                    totals:
                        invoiceTotals,


                    notes:
                        "",


                    termsAndConditions:
                        "",

                };


                /* =============================================
                   SET INVOICE
                   ============================================= */

                setInvoice(
                    preparedInvoice
                );


                /* =============================================
                   OPEN PREVIEW
                   ============================================= */

                setIsInvoicePreviewOpen(
                    true
                );

            },
            [
                cart.items,
                payment,
                billing,
                totals,
                store,
                messageApi,
            ]
        );

    /* =====================================================
       COMPLETE BILL
       ===================================================== */

    /* =====================================================
   COMPLETE BILL
   DEVELOPMENT MODE - LOCAL ONLY
   ===================================================== */

    const handleCompleteBill =
        useCallback(
            () => {

                if (
                    submitting
                ) {
                    return;
                }


                /* =============================================
                   ITEM VALIDATION
                ============================================= */

                if (
                    !cart.items ||
                    cart.items.length === 0
                ) {

                    messageApi.warning(
                        "Please add at least one medicine before completing the bill."
                    );

                    return;

                }


                /* =============================================
                   PAYMENT VALIDATION
                ============================================= */

                if (
                    !payment.payments ||
                    payment.payments.length === 0
                ) {

                    messageApi.warning(
                        "Please add at least one payment."
                    );

                    return;

                }


                if (
                    !payment.isFullyPaid
                ) {

                    messageApi.warning(
                        `Payment is incomplete. Due amount is ${formatCurrency(
                            payment.dueAmount
                        )}.`
                    );

                    return;

                }


                setSubmitting(
                    true
                );


                try {

                    /* =========================================
                       PAYMENT LIST
                    ========================================= */

                    const paymentList =
                        payment.payments.map(
                            item => ({

                                ...item,

                                amount:
                                    toNumber(
                                        item.amount
                                    ),

                            })
                        );


                    /* =========================================
                       INVOICE TOTALS
                    ========================================= */

                    const invoiceTotals = {

                        subtotal:
                            toNumber(
                                totals.subtotal
                            ),

                        discountAmount:
                            toNumber(
                                totals.discountAmount
                            ),

                        taxableAmount:
                            toNumber(
                                totals.subtotal
                            ) -
                            toNumber(
                                totals.discountAmount
                            ),

                        cgstAmount:
                            toNumber(
                                totals.cgstAmount
                            ),

                        sgstAmount:
                            toNumber(
                                totals.sgstAmount
                            ),

                        igstAmount:
                            toNumber(
                                totals.igstAmount
                            ),

                        taxAmount:
                            toNumber(
                                totals.taxAmount
                            ),

                        roundOff:
                            toNumber(
                                totals.roundOff
                            ),

                        grandTotal:
                            toNumber(
                                totals.grandTotal
                            ),

                        paidAmount:
                            toNumber(
                                payment.paidAmount
                            ),

                        dueAmount:
                            toNumber(
                                payment.dueAmount
                            ),

                        changeAmount:
                            toNumber(
                                payment.changeAmount
                            ),

                    };


                    /* =========================================
                       LOCAL BILL / INVOICE NUMBER
                    ========================================= */

                    const timestamp =
                        Date.now();

                    const billNumber =
                        billing.bill?.billNumber ||
                        `BILL-${timestamp}`;

                    const invoiceNumber =
                        billing.bill?.invoiceNumber ||
                        `INV-${timestamp}`;


                    /* =========================================
                       LOCAL INVOICE
                    ========================================= */

                    const preparedInvoice = {

                        id:
                            billing.bill?.id ||
                            billing.bill?.billId ||
                            `LOCAL-${timestamp}`,

                        invoiceNumber:

                            invoiceNumber,

                        billNumber:

                            billNumber,

                        invoiceDate:
                            new Date().toISOString(),

                        paymentStatus:
                            payment.paymentStatus ||
                            "PAID",


                        /* =====================================
                           CENTER
                        ===================================== */

                        center: {

                            name:
                                store?.name ||
                                store?.centerName ||
                                "Pharmacy",

                            addressLine1:
                                store?.addressLine1 ||
                                store?.address ||
                                "",

                            addressLine2:
                                store?.addressLine2 ||
                                "",

                            city:
                                store?.city ||
                                "",

                            state:
                                store?.state ||
                                "",

                            postalCode:
                                store?.postalCode ||
                                store?.pincode ||
                                "",

                            phone:
                                store?.phone ||
                                store?.mobile ||
                                "",

                            gstin:
                                store?.gstin ||
                                store?.GSTIN ||
                                "",

                            drugLicenseNumber:
                                store?.drugLicenseNumber ||
                                store?.drugLicenseNo ||
                                "",

                        },


                        /* =====================================
                           CUSTOMER
                        ===================================== */

                        customer: {

                            name:
                                billing.bill?.patientName ||
                                "Walk-in Customer",

                            patientId:
                                billing.bill?.patientId ||
                                null,

                            mrn:
                                billing.bill?.patientUHID ||
                                billing.bill?.uhid ||
                                "",

                            phone:
                                billing.bill?.patientPhone ||
                                billing.bill?.phone ||
                                "",

                            address:
                                billing.bill?.patientAddress ||
                                "",

                        },


                        /* =====================================
                           PRESCRIPTION
                        ===================================== */

                        prescription: {

                            prescriptionNumber:
                                billing.bill?.prescriptionNumber ||
                                "",

                            doctorName:
                                billing.bill?.doctorName ||
                                billing.bill?.refDoctorName ||
                                "",

                            doctorRegistrationNumber:
                                billing.bill?.doctorRegistrationNumber ||
                                "",

                        },


                        /* =====================================
                           ITEMS
                        ===================================== */

                        items:

                            cart.items.map(
                                item => ({

                                    ...item,

                                    id:
                                        item.id ||
                                        `${item.productId || item.medicineId}-${item.batchNumber || timestamp}`,

                                    productId:
                                        item.productId ||
                                        item.medicineId ||
                                        null,

                                    productName:
                                        item.productName ||
                                        item.itemName ||
                                        item.medicineName ||
                                        "",

                                    genericName:
                                        item.genericName ||
                                        "",

                                    batchNumber:
                                        item.batchNumber ||
                                        "",

                                    expiryDate:
                                        item.expiryDate ||
                                        null,

                                    quantity:
                                        toNumber(
                                            item.quantity
                                        ),

                                    mrp:
                                        toNumber(
                                            item.mrp
                                        ),

                                    discountAmount:
                                        toNumber(
                                            item.discountAmount
                                        ),

                                    totalTax:
                                        toNumber(
                                            item.totalTax ??
                                            item.taxAmount
                                        ),

                                    lineTotal:
                                        toNumber(
                                            item.lineTotal ??
                                            item.totalAmount
                                        ),

                                })
                            ),


                        /* =====================================
                           PAYMENTS
                        ===================================== */

                        payments:
                            paymentList,


                        /* =====================================
                           TOTALS
                        ===================================== */

                        totals:
                            invoiceTotals,


                        notes:
                            "",

                        termsAndConditions:
                            "",

                    };


                    /* =========================================
                       UPDATE BILL NUMBER LOCALLY
                    ========================================= */

                    billing.updateBill({

                        billNumber:
                            billNumber,

                        invoiceNumber:
                            invoiceNumber,

                        status:
                            BILL_STATUS.COMPLETED,

                        paymentStatus:
                            payment.paymentStatus ||
                            "PAID",

                    });


                    /* =========================================
                       SET INVOICE
                    ========================================= */

                    setInvoice(
                        preparedInvoice
                    );


                    /* =========================================
                       MARK COMPLETED
                    ========================================= */

                    setCompleted(
                        true
                    );


                    /* =========================================
                       OPEN INVOICE PREVIEW
                    ========================================= */

                    setIsInvoicePreviewOpen(
                        true
                    );


                    messageApi.success(
                        "Bill completed successfully."
                    );


                } catch (
                error
                ) {

                    console.error(
                        "Complete bill error:",
                        error
                    );

                    messageApi.error(
                        error?.message ||
                        "Unable to complete the bill."
                    );

                } finally {

                    setSubmitting(
                        false
                    );

                }

            },
            [
                submitting,
                cart.items,
                payment,
                billing,
                totals,
                store,
                messageApi,
            ]
        );
    /* =========================================================
   PRINT INVOICE
   DEVELOPMENT MODE - LOCAL ONLY
   ========================================================= */

    const handlePrintInvoice =
        useCallback(
            () => {

                if (
                    !invoice
                ) {

                    messageApi.warning(
                        "Invoice is not available."
                    );

                    return;

                }


                const printArea =
                    document.getElementById(
                        "billing-invoice-print-area"
                    );


                if (
                    !printArea
                ) {

                    messageApi.warning(
                        "Invoice preview is not available."
                    );

                    return;

                }


                const printWindow =
                    window.open(
                        "",
                        "_blank",
                        "width=1000,height=800"
                    );


                if (
                    !printWindow
                ) {

                    messageApi.error(
                        "Unable to open print window. Please allow pop-ups."
                    );

                    return;

                }


                const styles =
                    Array.from(
                        document.querySelectorAll(
                            'link[rel="stylesheet"], style'
                        )
                    )
                        .map(
                            element =>
                                element.outerHTML
                        )
                        .join(
                            "\n"
                        );


                printWindow.document.open();


                printWindow.document.write(`

                <!DOCTYPE html>

                <html>

                    <head>

                        <meta charset="UTF-8" />

                        <title>
                            Invoice ${invoice.invoiceNumber ||
                    ""
                    }
                        </title>

                        ${styles}

                        <style>

                            @page {

                                size: A4;

                                margin: 12mm;

                            }


                            * {

                                box-sizing:
                                    border-box;

                            }


                            html,
                            body {

                                margin: 0;

                                padding: 0;

                                background:
                                    #ffffff;

                            }


                            body {

                                font-family:
                                    Arial,
                                    Helvetica,
                                    sans-serif;

                                color:
                                    #000000;

                            }


                            .billing-invoice-print-area {

                                width:
                                    100%;

                            }


                            .billing-invoice-preview {

                                width:
                                    100%;

                                border:
                                    none !important;

                                box-shadow:
                                    none !important;

                            }


                            .ant-card {

                                border:
                                    none !important;

                                box-shadow:
                                    none !important;

                            }


                            .ant-card-body {

                                padding:
                                    0 !important;

                            }


                            .invoice-header {

                                display:
                                    flex;

                                justify-content:
                                    space-between;

                                align-items:
                                    flex-start;

                                gap:
                                    24px;

                            }


                            .invoice-customer-section {

                                display:
                                    flex;

                                justify-content:
                                    space-between;

                                align-items:
                                    flex-start;

                                gap:
                                    24px;

                            }


                            .billing-summary-row {

                                display:
                                    flex;

                                justify-content:
                                    space-between;

                                align-items:
                                    center;

                                margin-bottom:
                                    6px;

                            }


                            .invoice-totals {

                                page-break-inside:
                                    avoid;

                            }


                            .invoice-items-table {

                                page-break-inside:
                                    auto;

                            }


                            .invoice-items-table tr {

                                page-break-inside:
                                    avoid;

                                page-break-after:
                                    auto;

                            }


                            .ant-table {

                                width:
                                    100%;

                            }


                            .ant-table table {

                                width:
                                    100%;

                                border-collapse:
                                    collapse;

                            }


                            .ant-table-thead > tr > th,
                            .ant-table-tbody > tr > td {

                                border:
                                    1px solid #d9d9d9;

                            }


                            .ant-tag {

                                background:
                                    transparent !important;

                                color:
                                    #000000 !important;

                            }


                            .no-print {

                                display:
                                    none !important;

                            }

                        </style>

                    </head>


                    <body>

                        <div
                            class="billing-invoice-print-area"
                        >

                            ${printArea.innerHTML}

                        </div>

                    </body>

                </html>

            `);


                printWindow.document.close();


                printWindow.focus();


                setTimeout(
                    () => {

                        printWindow.print();

                    },
                    300
                );

            },
            [
                invoice,
                messageApi,
            ]
        );

    /* =====================================================
       LOAD INVOICE
       ===================================================== */

    const handleLoadInvoice =
        useCallback(
            async () => {

                const billId =
                    billing.bill?.id ||
                    billing.bill?.billId;


                if (
                    !billId
                ) {

                    return;

                }


                setInvoiceLoading(
                    true
                );


                try {

                    const result =
                        await billingService
                            .getInvoice(
                                billId
                            );


                    setInvoice(
                        result
                    );

                } catch (
                error
                ) {

                    messageApi.error(
                        error?.message ||
                        "Unable to load invoice."
                    );

                } finally {

                    setInvoiceLoading(
                        false
                    );

                }

            },
            [
                billing.bill?.id,
                billing.bill?.billId,
                messageApi,
            ]
        );


    /* =====================================================
       PRINT INVOICE
       ===================================================== */






    /* =========================================================
   NEW BILL
   ========================================================= */

    const handleNewBill = useCallback(() => {
        window.location.reload();
    }, []);


    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

    useEffect(
        () => {

            const handleKeyDown =
                event => {

                    if (
                        event.key ===
                        "F2"
                    ) {

                        event.preventDefault();

                        medicineInputRef
                            .current
                            ?.focus();

                    }


                    if (
                        event.key ===
                        "F8"
                    ) {

                        event.preventDefault();

                        document
                            .getElementById(
                                "billing-complete-button"
                            )
                            ?.focus();

                    }

                };


            window.addEventListener(
                "keydown",
                handleKeyDown
            );


            return () => {

                window.removeEventListener(
                    "keydown",
                    handleKeyDown
                );

            };

        },
        []
    );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <Layout
            className="billing-page"
        >

            {messageContextHolder}


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div
                className="billing-page-header"
            >

                <div>

                    <h1
                        className="billing-page-title"
                    >
                        Pharmacy Billing
                    </h1>


                    <div
                        className="billing-page-subtitle"
                    >

                        <ShoppingCartOutlined />

                        <span>
                            Point of Sale
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <Content
                className="billing-page-content"
            >

                {/* =================================================
                    VALIDATION
                ================================================= */}

                {
                    validationSummary.hasErrors && (

                        <Alert

                            type="error"

                            showIcon

                            closable

                            message={
                                `Please correct ${validationSummary.count} billing error(s).`
                            }

                            description={

                                <ul>

                                    {
                                        validationSummary.messages
                                            ?.map(
                                                (
                                                    errorMessage,
                                                    index
                                                ) => (

                                                    <li
                                                        key={
                                                            index
                                                        }
                                                    >

                                                        {
                                                            errorMessage
                                                        }

                                                    </li>

                                                )
                                            )
                                    }

                                </ul>

                            }

                            style={{
                                marginBottom:
                                    16,
                            }}

                        />

                    )
                }


                {/* =================================================
                    PATIENT
                ================================================= */}

                <PatientSelector

                    patientSearch={
                        patientSearch
                    }

                    patientOptions={
                        patientOptions
                    }

                    patientLoading={
                        patientLoading
                    }

                    patientName={
                        billing.bill?.patientName
                    }

                    patientUHID={
                        billing.bill?.patientUHID
                    }

                    doctorName={
                        billing.bill?.doctorName
                    }

                    billType={
                        billing.bill?.billType
                    }

                    patientSource={
                        billing.bill?.patientSource
                    }

                    hisEnabled={
                        true
                    }

                    hisAvailable={
                        true
                    }

                    allowManualPatient={
                        true
                    }

                    allowWalkIn={
                        true
                    }

                    manualPatient={
                        billing.bill
                    }

                    onPatientSearch={
                        handlePatientSearch
                    }

                    onPatientSelect={
                        handlePatientSelect
                    }

                    onBillTypeChange={
                        handleBillTypeChange
                    }

                    onManualPatientSave={
                        handleManualPatientSave
                    }

                    onWalkIn={
                        handleWalkIn
                    }

                />


                {/* =================================================
                    MAIN POS GRID
                ================================================= */}

                <Row

                    gutter={[
                        16,
                        16,
                    ]}

                    className="billing-main-grid"

                >

                    {/* =================================================
                        MEDICINE / CART
                    ================================================= */}

                    <Col
                        xs={24}
                        xl={17}
                    >

                        <Card
                            className="billing-workspace-card"
                        >

                            <MedicineSearch

                                value={
                                    medicineSearch
                                }

                                options={
                                    medicineOptions
                                }

                                loading={
                                    medicineLoading
                                }

                                batchLoading={
                                    batchLoading
                                }

                                inputRef={
                                    medicineInputRef
                                }

                                onSearch={
                                    handleMedicineSearch
                                }

                                onSelect={
                                    handleMedicineSelect
                                }

                            />


                            <Divider />


                            <BillingCart

                                items={
                                    cart.items
                                }

                                onQuantityChange={
                                    handleQuantityChange
                                }

                                onDiscountChange={
                                    handleDiscountChange
                                }

                                onRemoveItem={
                                    cart.removeItem
                                }

                            />

                        </Card>

                    </Col>


                    {/* =================================================
                        RIGHT PANEL
                    ================================================= */}

                    <Col
                        xs={24}
                        xl={7}
                    >

                        <div
                            className="billing-right-panel"
                        >

                            {/* =========================================
                                BILL SUMMARY
                            ========================================= */}

                            <BillingSummary

                                items={
                                    cart.items
                                }

                                subtotal={
                                    totals.subtotal
                                }

                                discountAmount={
                                    totals.discountAmount
                                }

                                taxAmount={
                                    totals.taxAmount
                                }

                                roundOff={
                                    totals.roundOff
                                }

                                grandTotal={
                                    totals.grandTotal
                                }

                            />


                            {/* =========================================
                                PAYMENT
                            ========================================= */}

                            <PaymentSection

                                activeMethod={
                                    payment.activeMethod
                                }

                                payments={
                                    payment.payments
                                }

                                grandTotal={
                                    totals.grandTotal
                                }

                                paidAmount={
                                    payment.paidAmount
                                }

                                dueAmount={
                                    payment.dueAmount
                                }

                                changeAmount={
                                    payment.changeAmount
                                }

                                remainingAmount={
                                    payment.remainingAmount
                                }

                                isFullyPaid={
                                    payment.isFullyPaid
                                }

                                isOverpaid={
                                    payment.isOverpaid
                                }

                                onMethodChange={
                                    handlePaymentMethod
                                }

                                onAddPayment={
                                    handleAddPayment
                                }

                                onRemovePayment={
                                    handleRemovePayment
                                }

                            />


                            {/* =========================================
                                ACTIONS
                            ========================================= */}

                            <BillingActions
                                loading={billing.loading}
                                submitting={submitting}
                                disabled={cart.items.length === 0}
                                completed={completed}
                                onSaveDraft={handleSaveDraft}
                                onPreview={handlePreviewBill}
                                onComplete={handleCompleteBill}
                                onPrintInvoice={handlePrintInvoice}
                                onNewBill={handleNewBill}
                            />


                            {/* =========================================
                                INVOICE
                            ========================================= */}

                            {
                                invoice && (

                                    <Modal

                                        open={
                                            isInvoicePreviewOpen
                                        }

                                        onCancel={() =>
                                            setIsInvoicePreviewOpen(
                                                false
                                            )
                                        }

                                        title={
                                            <Space>

                                                <EyeOutlined />

                                                <span>
                                                    Invoice Preview
                                                </span>

                                            </Space>
                                        }

                                        width={
                                            1100
                                        }

                                        centered

                                        destroyOnHidden

                                        footer={

                                            <Space>

                                                <Button

                                                    onClick={() =>
                                                        setIsInvoicePreviewOpen(
                                                            false
                                                        )
                                                    }

                                                >
                                                    Close

                                                </Button>


                                                <Button

                                                    icon={
                                                        <PrinterOutlined />
                                                    }

                                                    onClick={
                                                        handlePrintInvoice
                                                    }

                                                >
                                                    Print Invoice

                                                </Button>




                                            </Space>

                                        }

                                    >

                                        <div
                                            style={{
                                                maxHeight:
                                                    "70vh",

                                                overflowY:
                                                    "auto",

                                                padding:
                                                    "8px 4px",
                                            }}
                                        >

                                            <InvoicePreview

                                                invoice={
                                                    invoice
                                                }

                                                showHeader={
                                                    true
                                                }

                                                showPayments={
                                                    true
                                                }

                                                showNotes={
                                                    true
                                                }

                                            />

                                        </div>

                                    </Modal>

                                )
                            }

                        </div>

                    </Col>

                </Row>

            </Content>

        </Layout>

    );

};


export default BillingPage;