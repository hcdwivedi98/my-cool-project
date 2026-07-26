export const STORE_VALIDATION = {

    centerId: [
        {
            required: true,
            message: "Center is required."
        }
    ],

    departmentId: [
        {
            required: true,
            message: "Department is required."
        }
    ],

    storeCode: [
        {
            required: true,
            message: "Store Code is required."
        },
        {
            min: 2,
            max: 20,
            message: "Store Code must be between 2 and 20 characters."
        }
    ],

    storeName: [
        {
            required: true,
            message: "Store Name is required."
        },
        {
            min: 3,
            max: 100,
            message: "Store Name must be between 3 and 100 characters."
        }
    ],

    shortName: [
        {
            required: true,
            message: "Short Name is required."
        }
    ],

    storeType: [
        {
            required: true,
            message: "Store Type is required."
        }
    ],

    contactPerson: [
        {
            required: true,
            message: "Contact Person is required."
        }
    ],

    mobileNo: [
        {
            pattern: /^[6-9]\d{9}$/,
            message: "Invalid Mobile Number."
        }
    ],

    email: [
        {
            type: "email",
            message: "Invalid Email Address."
        }
    ],

    buildingId: [
        {
            required: true,
            message: "Building is required."
        }
    ],

    floorId: [
        {
            required: true,
            message: "Floor is required."
        }
    ]

};