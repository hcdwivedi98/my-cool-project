// src/modules/pharmacy/drug-route/hooks/useDrugRouteLookup.js

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    activeDrugRouteList,
    drugRouteList,
} from "../mock/drugRoute.mock";

import {
    toDrugRouteLookupOptions,
} from "../utils/drugRoute.helper";


/*
 * =========================================================
 * HOOK
 * =========================================================
 *
 * Default behavior:
 *
 * useDrugRouteLookup()
 *
 * returns only Active routes.
 *
 *
 * Optional:
 *
 * useDrugRouteLookup({
 *     activeOnly: false
 * })
 *
 * returns Active + Inactive routes.
 */

const useDrugRouteLookup = ({
    activeOnly = true,

    includeInactive = false,

    autoLoad = true,

    initialValue = null,

    transform = null,

} = {}) => {

    /*
     * =====================================================
     * STATE
     * =====================================================
     */

    const [
        data,
        setData,
    ] = useState([]);


    const [
        loading,
        setLoading,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState(null);


    /*
     * =====================================================
     * LOAD
     * =====================================================
     */

    const load =
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
                     * -----------------------------------------
                     * MOCK DATA
                     * -----------------------------------------
                     *
                     * Later this section can be replaced with:
                     *
                     * dosageRouteService.getActive()
                     *
                     * without changing the consuming components.
                     */

                    const source =
                        activeOnly &&
                        !includeInactive
                            ? activeDrugRouteList
                            : drugRouteList;


                    const options =
                        toDrugRouteLookupOptions(
                            source,
                            {
                                activeOnly,

                                includeInactive,
                            }
                        );


                    const finalData =
                        typeof transform ===
                        "function"
                            ? transform(
                                options
                            )
                            : options;


                    setData(
                        finalData
                    );


                    return finalData;

                }
                catch (
                    caughtError
                ) {

                    setError(
                        caughtError
                    );

                    setData(
                        []
                    );


                    return [];

                }
                finally {

                    setLoading(
                        false
                    );
                }

            },
            [
                activeOnly,
                includeInactive,
                transform,
            ]
        );


    /*
     * =====================================================
     * INITIAL LOAD
     * =====================================================
     */

    useEffect(
        () => {

            if (
                autoLoad
            ) {

                load();
            }

        },
        [
            autoLoad,
            load,
        ]
    );


    /*
     * =====================================================
     * SELECTED OPTION
     * =====================================================
     */

    const selectedOption =
        useMemo(
            () => {

                if (
                    initialValue ===
                    null ||
                    initialValue ===
                    undefined
                ) {
                    return null;
                }


                return (
                    data.find(
                        (item) =>
                            String(
                                item.value
                            ) ===
                            String(
                                initialValue
                            )
                    ) ||
                    null
                );

            },
            [
                data,
                initialValue,
            ]
        );


    /*
     * =====================================================
     * FIND BY VALUE
     * =====================================================
     */

    const findByValue =
        useCallback(
            (
                value
            ) => {

                return (
                    data.find(
                        (item) =>
                            String(
                                item.value
                            ) ===
                            String(
                                value
                            )
                    ) ||
                    null
                );

            },
            [
                data,
            ]
        );


    /*
     * =====================================================
     * FIND BY CODE
     * =====================================================
     */

    const findByCode =
        useCallback(
            (
                code
            ) => {

                if (
                    !code
                ) {
                    return null;
                }


                const normalized =
                    String(
                        code
                    )
                        .trim()
                        .toUpperCase();


                return (
                    data.find(
                        (item) =>
                            String(
                                item.code ||
                                ""
                            )
                                .trim()
                                .toUpperCase() ===
                            normalized
                    ) ||
                    null
                );

            },
            [
                data,
            ]
        );


    /*
     * =====================================================
     * FIND BY LABEL
     * =====================================================
     */

    const findByLabel =
        useCallback(
            (
                label
            ) => {

                if (
                    !label
                ) {
                    return null;
                }


                const normalized =
                    String(
                        label
                    )
                        .trim()
                        .toLowerCase();


                return (
                    data.find(
                        (item) =>
                            String(
                                item.label ||
                                ""
                            )
                                .trim()
                                .toLowerCase() ===
                            normalized
                    ) ||
                    null
                );

            },
            [
                data,
            ]
        );


    /*
     * =====================================================
     * REFRESH
     * =====================================================
     */

    const refresh =
        useCallback(
            () =>
                load(),
            [
                load,
            ]
        );


    /*
     * =====================================================
     * RETURN
     * =====================================================
 */

    return {

        /*
         * -----------------------------------------------
         * OPTIONS
         * -----------------------------------------------
         */

        options:
            data,

        data,


        /*
         * -----------------------------------------------
         * STATE
         * -----------------------------------------------
         */

        loading,

        error,


        /*
         * -----------------------------------------------
         * SELECTED
         * -----------------------------------------------
         */

        selectedOption,


        /*
         * -----------------------------------------------
         * HELPERS
         * -----------------------------------------------
         */

        findByValue,

        findByCode,

        findByLabel,


        /*
         * -----------------------------------------------
         * REFRESH
         * -----------------------------------------------
         */

        refresh,

        reload:
            refresh,
    };
};


export default useDrugRouteLookup;