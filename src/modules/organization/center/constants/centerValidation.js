/**
 * ============================================================
 * Center Validation Rules
 * Module : Organization / Center
 * Version : 1.0
 * ============================================================
 */

const GST_REGEX =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const PAN_REGEX =
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const MOBILE_REGEX =
    /^[6-9]\d{9}$/;

const PINCODE_REGEX =
    /^[1-9][0-9]{5}$/;

const WEBSITE_REGEX =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

export const centerValidation = {

    centerCode: [
        {
            required: true,
            whitespace: true,
            message: "Center Code is required."
        },
        {
            max: 20,
            message: "Maximum 20 characters allowed."
        }
    ],

    centerName: [
        {
            required: true,
            whitespace: true,
            message: "Center Name is required."
        },
        {
            max: 100,
            message: "Maximum 100 characters allowed."
        }
    ],

    companyId: [
        {
            required: true,
            message: "Please select Company."
        }
    ],

    centerType: [
        {
            required: true,
            message: "Please select Center Type."
        }
    ],

    addressLine1: [
        {
            required: true,
            whitespace: true,
            message: "Address Line 1 is required."
        }
    ],

    countryId: [
        {
            required: true,
            message: "Please select Country."
        }
    ],

    stateId: [
        {
            required: true,
            message: "Please select State."
        }
    ],

    cityId: [
        {
            required: true,
            message: "Please select City."
        }
    ],

    pinCode: [
        {
            pattern: PINCODE_REGEX,
            message: "Invalid PIN Code."
        }
    ],

    contactPerson: [
        {
            required: true,
            whitespace: true,
            message: "Contact Person is required."
        }
    ],

    mobile: [
        {
            required: true,
            message: "Mobile Number is required."
        },
        {
            pattern: MOBILE_REGEX,
            message: "Enter a valid 10 digit mobile number."
        }
    ],

    phone: [
        {
            max: 15,
            message: "Maximum 15 digits allowed."
        }
    ],

    email: [
        {
            type: "email",
            message: "Invalid Email Address."
        }
    ],

    website: [
        {
            pattern: WEBSITE_REGEX,
            message: "Invalid Website URL."
        }
    ],

    gstin: [
        {
            pattern: GST_REGEX,
            message: "Invalid GSTIN."
        }
    ],

    pan: [
        {
            pattern: PAN_REGEX,
            message: "Invalid PAN."
        }
    ],

    remarks: [
        {
            max: 500,
            message: "Maximum 500 characters allowed."
        }
    ]
};

export default centerValidation;