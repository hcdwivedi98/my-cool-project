// src/modules/pharmacy/uom/hooks/useUomLookup.js

import {
    UOM_TYPES,
    UOM_STATUS_OPTIONS,
    DECIMAL_OPTIONS,
    PHARMACY_UOM_TYPES,
    UOM_FORM_MODES,
} from "../constants/uom.constants";

import {
    activeUomList,
    uomBaseUnits,
} from "../mock/uom.mock";


const useUomLookup = () => {
    /*
     * ============================================
     * ALL ACTIVE UOMS
     * ============================================
     */

    const activeUoms = activeUomList.map(
        (item) => ({
            value: item.id,
            label: item.uomName,
            code: item.uomCode,
            shortName: item.shortName,
            type: item.uomType,
        })
    );


    /*
     * ============================================
     * UOM TYPES
     * ============================================
     */

    const uomTypes = UOM_TYPES;


    /*
     * ============================================
     * PHARMACY UOM TYPES
     * ============================================
     */

    const pharmacyUomTypes =
        PHARMACY_UOM_TYPES;


    /*
     * ============================================
     * STATUS OPTIONS
     * ============================================
     */

    const statuses =
        UOM_STATUS_OPTIONS;


    /*
     * ============================================
     * DECIMAL OPTIONS
     * ============================================
     */

    const decimalOptions =
        DECIMAL_OPTIONS;


    /*
     * ============================================
     * BASE UNITS
     * ============================================
     */

    const baseUnits =
        uomBaseUnits.map(
            (item) => ({
                value: item.id,
                label: item.uomName,
                code: item.uomCode,
                shortName:
                    item.shortName,
                type: item.uomType,
            })
        );


    /*
     * ============================================
     * BASE UNITS BY TYPE
     * ============================================
     *
     * Example:
     *
     * MASS
     *  -> MG
     *
     * VOLUME
     *  -> ML
     */

    const getBaseUnitsByType = (
        uomType
    ) => {
        if (!uomType) {
            return baseUnits;
        }

        return baseUnits.filter(
            (item) =>
                item.type ===
                uomType
        );
    };


    /*
     * ============================================
     * UOMS BY TYPE
     * ============================================
     */

    const getUomsByType = (
        uomType
    ) => {
        if (!uomType) {
            return activeUoms;
        }

        return activeUoms.filter(
            (item) =>
                item.type ===
                uomType
        );
    };


    /*
     * ============================================
     * UOM BY ID
     * ============================================
     */

    const getUomById = (
        uomId
    ) => {
        return activeUoms.find(
            (item) =>
                item.value ===
                uomId
        );
    };


    /*
     * ============================================
     * UOM BY CODE
     * ============================================
     */

    const getUomByCode = (
        uomCode
    ) => {
        if (!uomCode) {
            return undefined;
        }

        return activeUoms.find(
            (item) =>
                item.code ===
                uomCode
        );
    };


    /*
     * ============================================
     * FORM MODES
     * ============================================
     */

    const formModes =
        UOM_FORM_MODES;


    return {
        activeUoms,

        uomTypes,

        pharmacyUomTypes,

        statuses,

        decimalOptions,

        baseUnits,

        formModes,

        getBaseUnitsByType,

        getUomsByType,

        getUomById,

        getUomByCode,
    };
};


export default useUomLookup;