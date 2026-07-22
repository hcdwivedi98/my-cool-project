//------------------------------------------------------
// Supplier Display Name
//------------------------------------------------------

export const getSupplierDisplayName = (supplier = {}) => {

    const {

        supplierCode,

        supplierName,

    } = supplier;

    return [

        supplierCode,

        supplierName,

    ]

        .filter(Boolean)

        .join(" - ");

};

//------------------------------------------------------
// Address
//------------------------------------------------------

export const getSupplierAddress = (supplier = {}) => {

    return [

        supplier.address1,

        supplier.address2,

        supplier.cityName,

        supplier.stateName,

        supplier.pinCode,

        supplier.countryName,

    ]

        .filter(Boolean)

        .join(", ");

};

//------------------------------------------------------
// Contact
//------------------------------------------------------

export const getSupplierContact = (supplier = {}) => {

    return [

        supplier.contactPerson,

        supplier.mobileNo,

    ]

        .filter(Boolean)

        .join(" | ");

};

//------------------------------------------------------
// GST Available
//------------------------------------------------------

export const hasGST = (supplier = {}) =>

    Boolean(supplier.gstNo);

//------------------------------------------------------
// Drug License Available
//------------------------------------------------------

export const hasDrugLicense = (supplier = {}) =>

    Boolean(supplier.drugLicenseNo);

//------------------------------------------------------
// Credit Available
//------------------------------------------------------

export const hasCreditFacility = (supplier = {}) =>

    Number(supplier.creditDays) > 0;

//------------------------------------------------------
// Active
//------------------------------------------------------

export const isSupplierActive = (supplier = {}) =>

    Boolean(supplier.isActive);

//------------------------------------------------------
// Blacklisted
//------------------------------------------------------

export const isBlackListed = (supplier = {}) =>

    Boolean(supplier.isBlackListed);

//------------------------------------------------------
// Default Supplier
//------------------------------------------------------

export const isDefaultSupplier = (supplier = {}) =>

    Boolean(supplier.defaultSupplier);

//------------------------------------------------------
// Preferred Supplier
//------------------------------------------------------

export const isPreferredSupplier = (supplier = {}) =>

    Boolean(supplier.preferredSupplier);

//------------------------------------------------------
// License Expired
//------------------------------------------------------

export const isLicenseExpired = (

    expiryDate

) => {

    if (!expiryDate)

        return false;

    return new Date(expiryDate) < new Date();

};

//------------------------------------------------------
// Search
//------------------------------------------------------

export const matchesSearch = (

    supplier,

    keyword

) => {

    if (!keyword)

        return true;

    const value = keyword

        .toLowerCase()

        .trim();

    return [

        supplier.supplierCode,

        supplier.supplierName,

        supplier.contactPerson,

        supplier.mobileNo,

        supplier.email,

        supplier.gstNo,

        supplier.panNo,

    ]

        .filter(Boolean)

        .some((x) =>

            x

                .toString()

                .toLowerCase()

                .includes(value)

        );

};