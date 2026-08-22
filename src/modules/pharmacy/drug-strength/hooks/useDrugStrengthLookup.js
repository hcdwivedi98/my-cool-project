// src/modules/pharmacy/drug-strength/hooks/useDrugStrengthLookup.js

import {
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    drugStrengthList,
} from "../mock/drugStrength.mock";

import {
    DRUG_STRENGTH_STATUS,
    DRUG_STRENGTH_TYPES,
} from "../constants/drugStrength.constants";


/* =========================================================
   DEFAULT UOM MOCK
   ========================================================= */

/*
 * These IDs correspond to the UOM references
 * used by drugStrength.mock.js.
 *
 * In production these records will come
 * from UOM Master API.
 */

const DEFAULT_UOM_LIST = [

    {
        id:
            1,

        code:
            "MG",

        name:
            "mg",

        displayName:
            "mg",

        status:
            "Active",
    },

    {
        id:
            2,

        code:
            "G",

        name:
            "g",

        displayName:
            "g",

        status:
            "Active",
    },

    {
        id:
            3,

        code:
            "MCG",

        name:
            "mcg",

        displayName:
            "mcg",

        status:
            "Active",
    },

    {
        id:
            4,

        code:
            "ML",

        name:
            "mL",

        displayName:
            "mL",

        status:
            "Active",
    },

    {
        id:
            5,

        code:
            "IU",

        name:
            "IU",

        displayName:
            "IU",

        status:
            "Active",
    },

    {
        id:
            6,

        code:
            "PCT",

        name:
            "%",

        displayName:
            "%",

        status:
            "Active",
    },

    {
        id:
            7,

        code:
            "L",

        name:
            "L",

        displayName:
            "L",

        status:
            "Active",
    },

];


/* =========================================================
   LOOKUP HOOK
   ========================================================= */

const useDrugStrengthLookup = ({
    strengths =
        drugStrengthList,

    units =
        DEFAULT_UOM_LIST,

    includeInactive =
        false,
} = {}) => {

    /* =====================================================
       SEARCH STATE
    ===================================================== */

    const [
        search,
        setSearch,
    ] = useState("");


    /* =====================================================
       LOADING
    ===================================================== */

    const [
        loading,
        setLoading,
    ] = useState(false);


    /* =====================================================
       ERROR
    ===================================================== */

    const [
        error,
        setError,
    ] = useState(null);


    /* =====================================================
       ACTIVE UNITS
    ===================================================== */

    const activeUnits =
        useMemo(
            () =>
                units.filter(
                    (
                        unit
                    ) =>
                        unit.status ===
                        "Active"
                ),
            [
                units,
            ]
        );


    /* =====================================================
       UNIT OPTIONS
    ===================================================== */

    const unitOptions =
        useMemo(
            () =>
                (
                    includeInactive
                        ? units
                        : activeUnits
                ).map(
                    (
                        unit
                    ) => ({

                        label:
                            unit.displayName ||
                            unit.name ||
                            unit.code,

                        value:
                            unit.id,

                        code:
                            unit.code,

                        name:
                            unit.name,

                        unit,

                    })
                ),
            [
                units,
                activeUnits,
                includeInactive,
            ]
        );


    /* =====================================================
       STRENGTH TYPE OPTIONS
    ===================================================== */

    const strengthTypeOptions =
        useMemo(
            () => [

                {
                    label:
                        "Mass",

                    value:
                        DRUG_STRENGTH_TYPES.MASS,
                },

                {
                    label:
                        "Volume",

                    value:
                        DRUG_STRENGTH_TYPES.VOLUME,
                },

                {
                    label:
                        "Concentration",

                    value:
                        DRUG_STRENGTH_TYPES.CONCENTRATION,
                },

                {
                    label:
                        "Activity",

                    value:
                        DRUG_STRENGTH_TYPES.ACTIVITY,
                },

                {
                    label:
                        "Percentage",

                    value:
                        DRUG_STRENGTH_TYPES.PERCENTAGE,
                },

                {
                    label:
                        "Other",

                    value:
                        DRUG_STRENGTH_TYPES.OTHER,
                },

            ],
            []
        );


    /* =====================================================
       FILTERED STRENGTHS
    ===================================================== */

    const filteredStrengths =
        useMemo(
            () => {

                const normalizedSearch =
                    String(
                        search ||
                        ""
                    )
                        .trim()
                        .toLowerCase();


                return strengths.filter(
                    (
                        item
                    ) => {

                        /*
                         * Status filter
                         */

                        if (
                            !includeInactive &&
                            item.status !==
                                DRUG_STRENGTH_STATUS.ACTIVE
                        ) {
                            return false;
                        }


                        /*
                         * Search
                         */

                        if (
                            !normalizedSearch
                        ) {
                            return true;
                        }


                        const searchableText = [

                            item.strengthCode,

                            item.strengthDisplay,

                            item.strengthUnitCode,

                            item.strengthUnitName,

                            item.strengthType,

                            item.description,

                        ]
                            .filter(
                                Boolean
                            )
                            .join(
                                " "
                            )
                            .toLowerCase();


                        return searchableText.includes(
                            normalizedSearch
                        );
                    }
                );

            },
            [
                strengths,
                search,
                includeInactive,
            ]
        );


    /* =====================================================
       STRENGTH OPTIONS
    ===================================================== */

    const strengthOptions =
        useMemo(
            () =>
                filteredStrengths.map(
                    (
                        item
                    ) => ({

                        label:
                            item.strengthDisplay,

                        value:
                            item.id,

                        code:
                            item.strengthCode,

                        strengthValue:
                            item.strengthValue,

                        strengthUnitId:
                            item.strengthUnitId,

                        strengthUnitCode:
                            item.strengthUnitCode,

                        strengthUnitName:
                            item.strengthUnitName,

                        strengthType:
                            item.strengthType,

                        status:
                            item.status,

                        record:
                            item,

                    })
                ),
            [
                filteredStrengths,
            ]
        );


    /* =====================================================
       GET BY ID
    ===================================================== */

    const getStrengthById =
        useCallback(
            (
                id
            ) => {

                if (
                    id === null ||
                    id === undefined
                ) {
                    return null;
                }


                return (
                    strengths.find(
                        (
                            item
                        ) =>
                            item.id ===
                            id
                    ) ||
                    null
                );
            },
            [
                strengths,
            ]
        );


    /* =====================================================
       GET BY CODE
    ===================================================== */

    const getStrengthByCode =
        useCallback(
            (
                code
            ) => {

                const normalizedCode =
                    String(
                        code ||
                        ""
                    )
                        .trim()
                        .toUpperCase();


                if (
                    !normalizedCode
                ) {
                    return null;
                }


                return (
                    strengths.find(
                        (
                            item
                        ) =>
                            String(
                                item.strengthCode ||
                                ""
                            )
                                .trim()
                                .toUpperCase() ===
                            normalizedCode
                    ) ||
                    null
                );
            },
            [
                strengths,
            ]
        );


    /* =====================================================
       GET UNIT BY ID
    ===================================================== */

    const getUnitById =
        useCallback(
            (
                id
            ) => {

                if (
                    id === null ||
                    id === undefined
                ) {
                    return null;
                }


                return (
                    units.find(
                        (
                            unit
                        ) =>
                            unit.id ===
                            id
                    ) ||
                    null
                );
            },
            [
                units,
            ]
        );


    /* =====================================================
       GET UNIT BY CODE
    ===================================================== */

    const getUnitByCode =
        useCallback(
            (
                code
            ) => {

                const normalizedCode =
                    String(
                        code ||
                        ""
                    )
                        .trim()
                        .toUpperCase();


                if (
                    !normalizedCode
                ) {
                    return null;
                }


                return (
                    units.find(
                        (
                            unit
                        ) =>
                            String(
                                unit.code ||
                                ""
                            )
                                .trim()
                                .toUpperCase() ===
                            normalizedCode
                    ) ||
                    null
                );
            },
            [
                units,
            ]
        );


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchStrengths =
        useCallback(
            (
                searchTerm
            ) => {

                setSearch(
                    searchTerm ||
                    ""
                );

            },
            []
        );


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    const clearSearch =
        useCallback(
            () => {

                setSearch(
                    ""
                );

            },
            []
        );


    /* =====================================================
       REFRESH
    ===================================================== */

    const refresh =
        useCallback(
            async () => {

                try {

                    setLoading(
                        true
                    );

                    setError(
                        null
                    );

                    /*
                     * Mock implementation.
                     *
                     * Later this function can call:
                     *
                     * drugStrengthService.getLookup()
                     */

                    await Promise.resolve();

                }
                catch (
                    caughtError
                ) {

                    setError(
                        caughtError?.message ||
                        "Unable to load drug strength lookup."
                    );

                }
                finally {

                    setLoading(
                        false
                    );
                }

            },
            []
        );


    /* =====================================================
       RETURN
    ===================================================== */

    return {

        /* -----------------------------
           Strengths
        ------------------------------ */

        strengths:
            filteredStrengths,

        strengthOptions,

        getStrengthById,

        getStrengthByCode,


        /* -----------------------------
           Units
        ------------------------------ */

        units:
            activeUnits,

        unitOptions,

        getUnitById,

        getUnitByCode,


        /* -----------------------------
           Classification
        ------------------------------ */

        strengthTypeOptions,


        /* -----------------------------
           Search
        ------------------------------ */

        search,

        setSearch:

            searchStrengths,

        searchStrengths,

        clearSearch,


        /* -----------------------------
           State
        ------------------------------ */

        loading,

        error,


        /* -----------------------------
           Actions
        ------------------------------ */

        refresh,

    };
};


export default useDrugStrengthLookup;