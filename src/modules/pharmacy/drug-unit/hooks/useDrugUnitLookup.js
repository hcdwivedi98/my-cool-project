/* =========================================================
   DRUG UNIT LOOKUP HOOK
   ========================================================= */

import {
    useCallback,
    useMemo,
} from "react";

import {
    DRUG_UNIT_STATUS,
    DRUG_UNIT_TYPES,
} from "../constants/drugUnit.constants";

import {
    drugUnitList,
} from "../mock/drugUnit.mock";


/* =========================================================
   HOOK
   ========================================================= */

const useDrugUnitLookup = (
    options = {}
) => {

    const {
        includeInactive = false,
        includeAll = false,
        excludeId = null,
    } = options;


    /* =====================================================
       ACTIVE / AVAILABLE UNITS
    ===================================================== */

    const units = useMemo(
        () => {

            let result =
                [...drugUnitList];


            /*
             * Exclude current record
             */

            if (excludeId) {

                result =
                    result.filter(
                        (item) =>
                            item.id !==
                            excludeId
                    );
            }


            /*
             * Include inactive
             */

            if (
                !includeInactive
            ) {

                result =
                    result.filter(
                        (item) =>
                            item.isActive === true
                    );
            }


            return result;

        },
        [
            includeInactive,
            excludeId,
        ]
    );


    /* =====================================================
       UNIT OPTIONS
    ===================================================== */

    const unitOptions = useMemo(
        () =>
            units.map(
                (item) => ({

                    label:
                        `${item.unitName} (${item.symbol})`,

                    value:
                        item.id,

                    unitCode:
                        item.unitCode,

                    unitName:
                        item.unitName,

                    symbol:
                        item.symbol,

                    unitType:
                        item.unitType,

                    decimalPrecision:
                        item.decimalPrecision,

                    isActive:
                        item.isActive,

                })
            ),
        [
            units,
        ]
    );


    /* =====================================================
       CODE OPTIONS
    ===================================================== */

    const codeOptions = useMemo(
        () =>
            units.map(
                (item) => ({

                    label:
                        item.unitCode,

                    value:
                        item.unitCode,

                    unitId:
                        item.id,

                    unitName:
                        item.unitName,

                    symbol:
                        item.symbol,

                })
            ),
        [
            units,
        ]
    );


    /* =====================================================
       SYMBOL OPTIONS
    ===================================================== */

    const symbolOptions = useMemo(
        () =>
            units.map(
                (item) => ({

                    label:
                        `${item.symbol} — ${item.unitName}`,

                    value:
                        item.symbol,

                    unitId:
                        item.id,

                    unitCode:
                        item.unitCode,

                })
            ),
        [
            units,
        ]
    );


    /* =====================================================
       TYPE OPTIONS
    ===================================================== */

    const unitTypeOptions = useMemo(
        () => [

            {
                label:
                    "Mass",

                value:
                    DRUG_UNIT_TYPES.MASS,
            },

            {
                label:
                    "Volume",

                value:
                    DRUG_UNIT_TYPES.VOLUME,
            },

            {
                label:
                    "Count",

                value:
                    DRUG_UNIT_TYPES.COUNT,
            },

            {
                label:
                    "Packaging",

                value:
                    DRUG_UNIT_TYPES.PACKAGING,
            },

            {
                label:
                    "Length",

                value:
                    DRUG_UNIT_TYPES.LENGTH,
            },

            {
                label:
                    "Area",

                value:
                    DRUG_UNIT_TYPES.AREA,
            },

            {
                label:
                    "Time",

                value:
                    DRUG_UNIT_TYPES.TIME,
            },

            {
                label:
                    "Biological",

                value:
                    DRUG_UNIT_TYPES.BIOLOGICAL,
            },

            {
                label:
                    "Other",

                value:
                    DRUG_UNIT_TYPES.OTHER,
            },

        ],
        []
    );


    /* =====================================================
       STATUS OPTIONS
    ===================================================== */

    const statusOptions = useMemo(
        () => [

            {
                label:
                    "Active",

                value:
                    DRUG_UNIT_STATUS.ACTIVE,
            },

            {
                label:
                    "Inactive",

                value:
                    DRUG_UNIT_STATUS.INACTIVE,
            },

        ],
        []
    );


    /* =====================================================
       GET BY ID
       ===================================================== */

    const getById =
        useCallback(
            (
                id
            ) => {

                return (
                    drugUnitList.find(
                        (item) =>
                            item.id === id
                    ) || null
                );

            },
            []
        );


    /* =====================================================
       GET BY CODE
       ===================================================== */

    const getByCode =
        useCallback(
            (
                unitCode
            ) => {

                if (
                    !unitCode
                ) {
                    return null;
                }


                const normalizedCode =
                    unitCode
                        .trim()
                        .toUpperCase();


                return (
                    drugUnitList.find(
                        (item) =>
                            item.unitCode
                                ?.trim()
                                .toUpperCase() ===
                            normalizedCode
                    ) || null
                );

            },
            []
        );


    /* =====================================================
       GET BY SYMBOL
       ===================================================== */

    const getBySymbol =
        useCallback(
            (
                symbol
            ) => {

                if (
                    !symbol
                ) {
                    return null;
                }


                const normalizedSymbol =
                    symbol
                        .trim()
                        .toLowerCase();


                return (
                    drugUnitList.find(
                        (item) =>
                            item.symbol
                                ?.trim()
                                .toLowerCase() ===
                            normalizedSymbol
                    ) || null
                );

            },
            []
        );


    /* =====================================================
       GET BY TYPE
       ===================================================== */

    const getByType =
        useCallback(
            (
                unitType
            ) => {

                return drugUnitList.filter(
                    (item) =>
                        item.unitType ===
                        unitType
                );

            },
            []
        );


    /* =====================================================
       SEARCH
       ===================================================== */

    const search =
        useCallback(
            (
                searchText
            ) => {

                if (
                    !searchText
                        ?.trim()
                ) {

                    return units;
                }


                const searchValue =
                    searchText
                        .trim()
                        .toLowerCase();


                return units.filter(
                    (item) => {

                        return (

                            item.unitCode
                                ?.toLowerCase()
                                .includes(
                                    searchValue
                                )

                            ||

                            item.unitName
                                ?.toLowerCase()
                                .includes(
                                    searchValue
                                )

                            ||

                            item.symbol
                                ?.toLowerCase()
                                .includes(
                                    searchValue
                                )

                        );
                    }
                );

            },
            [
                units,
            ]
        );


    /* =====================================================
       RETURN
       ===================================================== */

    return {

        units,

        unitOptions,

        codeOptions,

        symbolOptions,

        unitTypeOptions,

        statusOptions,

        getById,

        getByCode,

        getBySymbol,

        getByType,

        search,

    };
};


export default useDrugUnitLookup;