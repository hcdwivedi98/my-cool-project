import dayjs from "dayjs";

/**
 * Returns document status.
 */
export const getDocumentStatus = (expiryDate) => {

    if (!expiryDate) {
        return {
            text: "No Expiry",
            color: "default",
        };
    }

    const today = dayjs();

    const expiry = dayjs(expiryDate);

    if (!expiry.isValid()) {
        return {
            text: "Invalid Date",
            color: "default",
        };
    }

    if (expiry.isBefore(today, "day")) {
        return {
            text: "Expired",
            color: "error",
        };
    }

    const remainingDays =
        expiry.diff(today, "day");

    if (remainingDays <= 30) {
        return {
            text: "Expiring Soon",
            color: "warning",
        };
    }

    return {
        text: "Valid",
        color: "success",
    };

};

/**
 * Returns remaining days.
 */
export const getDaysToExpiry = (
    expiryDate
) => {

    if (!expiryDate) return null;

    const expiry = dayjs(expiryDate);

    if (!expiry.isValid()) return null;

    return expiry.diff(dayjs(), "day");

};

/**
 * Returns true if expired.
 */
export const isDocumentExpired = (
    expiryDate
) => {

    if (!expiryDate) return false;

    return dayjs(expiryDate).isBefore(
        dayjs(),
        "day"
    );

};

/**
 * Formats date.
 */
export const formatDocumentDate = (
    date,
    format = "DD-MMM-YYYY"
) => {

    if (!date) return "-";

    const parsed = dayjs(date);

    return parsed.isValid()
        ? parsed.format(format)
        : "-";

};

/**
 * Returns status color only.
 */
export const getDocumentStatusColor = (
    expiryDate
) => {

    return getDocumentStatus(
        expiryDate
    ).color;

};

/**
 * Returns status text only.
 */
export const getDocumentStatusText = (
    expiryDate
) => {

    return getDocumentStatus(
        expiryDate
    ).text;

};

/**
 * Download helper.
 */
export const downloadDocument = (
    url,
    fileName = "document"
) => {

    if (!url) return;

    const link =
        document.createElement("a");

    link.href = url;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

};