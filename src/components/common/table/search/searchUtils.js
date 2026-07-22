// =======================================================
// Pharmacy ERP
// Search Utility Functions
// =======================================================

/**
 * Normalize string
 */

export function normalizeText(value) {

    if (value === null || value === undefined) {

        return "";

    }

    return String(value)
        .trim()
        .toLowerCase();

}

/**
 * Highlight Search Text
 */

export function highlightText(text, keyword) {

    if (!keyword) {

        return text;

    }

    const regex = new RegExp(

        `(${keyword})`,

        "gi"

    );

    return String(text).replace(

        regex,

        "<mark>$1</mark>"

    );

}

/**
 * Build Search Suggestions
 */

export function buildSuggestions({

    keyword,

    dataSource,

    searchKeys,

    maxSuggestions = 10,

}) {

    if (!keyword) {

        return [];

    }

    const result = [];

    const unique = new Set();

    const search = normalizeText(keyword);

    dataSource.forEach(item => {

        searchKeys.forEach(key => {

            const value = item[key];

            const normalized =

                normalizeText(value);

            if (

                normalized.includes(search)

            ) {

                if (

                    !unique.has(value)

                ) {

                    unique.add(value);

                    result.push({

                        value,

                        label: value,

                        item,

                    });

                }

            }

        });

    });

    return result.slice(

        0,

        maxSuggestions

    );

}

/**
 * Filter Grid Rows
 */

export function filterRows({

    keyword,

    dataSource,

    searchKeys,

}) {

    if (!keyword) {

        return dataSource;

    }

    const search =

        normalizeText(keyword);

    return dataSource.filter(item =>

        searchKeys.some(key => {

            return normalizeText(

                item[key]

            ).includes(search);

        })

    );

}

/**
 * Barcode Match
 */

export function matchBarcode({

    barcode,

    dataSource,

    barcodeField = "barcode",

}) {

    return (

        dataSource.find(item =>

            item[barcodeField] === barcode

        ) || null

    );

}

/**
 * Ranking Algorithm
 */

export function rankSuggestions(

    suggestions,

    keyword

) {

    const search =

        normalizeText(keyword);

    return [...suggestions].sort(

        (a, b) => {

            const aStarts =

                normalizeText(

                    a.value

                ).startsWith(search);

            const bStarts =

                normalizeText(

                    b.value

                ).startsWith(search);

            if (

                aStarts &&

                !bStarts

            ) {

                return -1;

            }

            if (

                !aStarts &&

                bStarts

            ) {

                return 1;

            }

            return 0;

        }

    );

}