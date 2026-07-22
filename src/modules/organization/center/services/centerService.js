/**
 * ==========================================================
 * Center Service
 * Hospital Pharmacy ERP
 * ==========================================================
 */

import centerMock from "../data/center.mock";

import {
    cloneCenter,
    createCenterRequest,
    mapCenterList,
    mapCenterResponse,
    updateCenterRequest,
} from "../models/centerModel";

/**
 * Simulate API delay
 */
const delay = (ms = 300) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/**
 * ==========================================================
 * Get Center List
 * ==========================================================
 */
export async function getCenters(filters = {}, pagination = {}) {

    await delay();

    let data = [...centerMock];

    if (filters.search) {

        const keyword = filters.search.toLowerCase();

        data = data.filter(
            (x) =>
                x.code?.toLowerCase().includes(keyword) ||
                x.name?.toLowerCase().includes(keyword)
        );

    }

    if (filters.centerType) {

        data = data.filter(
            (x) => x.centerType === filters.centerType
        );

    }

    if (filters.status !== null && filters.status !== undefined) {

        data = data.filter(
            (x) => x.isActive === filters.status
        );

    }

    const pageNumber = pagination.pageNumber || 1;
    const pageSize = pagination.pageSize || 10;

    const start = (pageNumber - 1) * pageSize;

    return {

        items: mapCenterList(
            data.slice(start, start + pageSize)
        ),

        totalRecords: data.length,

        pageNumber,

        pageSize

    };

}

/**
 * ==========================================================
 * Get Center By Id
 * ==========================================================
 */
export async function getCenterById(id) {

    await delay();

    const center = centerMock.find(
        (x) => x.id === id
    );

    return mapCenterResponse(center);

}

/**
 * ==========================================================
 * Create Center
 * ==========================================================
 */
export async function createCenter(values) {

    await delay();

    return {

        success: true,

        message: "Center created successfully.",

        data: createCenterRequest(values)

    };

}

/**
 * ==========================================================
 * Update Center
 * ==========================================================
 */
export async function updateCenter(values) {

    await delay();

    return {

        success: true,

        message: "Center updated successfully.",

        data: updateCenterRequest(values)

    };

}

/**
 * ==========================================================
 * Delete Center
 * ==========================================================
 */
export async function deleteCenter(id) {

    await delay();

    return {

        success: true,

        message: `Center ${id} deleted successfully.`

    };

}

/**
 * ==========================================================
 * Activate Center
 * ==========================================================
 */
export async function activateCenter(id) {

    await delay();

    return {

        success: true,

        message: "Center activated successfully.",

        id

    };

}

/**
 * ==========================================================
 * Deactivate Center
 * ==========================================================
 */
export async function deactivateCenter(id) {

    await delay();

    return {

        success: true,

        message: "Center deactivated successfully.",

        id

    };

}

/**
 * ==========================================================
 * Lookup Data
 * ==========================================================
 */
export async function getLookups() {

    await delay();

    return {

        centerTypes: [],

        hospitalTypes: [],

        countries: [],

        states: [],

        financialYears: [],

        currencies: [],

        timeZones: []

    };

}

/**
 * ==========================================================
 * Clone Existing Center
 * ==========================================================
 */
export async function cloneExistingCenter(id) {

    await delay();

    const center = centerMock.find(
        (x) => x.id === id
    );

    return cloneCenter(center);

}