// src/modules/purchase-management/grn/services/grn.service.js

import {
    GRN_MOCK_DATA,
} from "../mock/grn.mock";


/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "";


/* =========================================================
   ENDPOINT
   ========================================================= */

const GRN_ENDPOINT =
    "/api/purchase/grn";


/* =========================================================
   SAFE RESPONSE
   ========================================================= */

const parseResponse = async (
    response
) => {

    if (
        !response
    ) {

        throw new Error(
            "No response received from server."
        );

    }


    let data =
        null;


    try {

        data =
            await response.json();

    }
    catch {

        data =
            null;

    }


    if (
        !response.ok
    ) {

        throw new Error(
            data?.message ||
            data?.error ||
            `GRN API request failed with status ${response.status}.`
        );

    }


    return data;

};


/* =========================================================
   REQUEST HELPER
   ========================================================= */

const request = async (
    path,
    options = {}
) => {

    const url =
        `${API_BASE_URL}${path}`;


    const response =
        await fetch(
            url,
            {

                ...options,

                headers: {

                    "Content-Type":
                        "application/json",

                    ...(options.headers ||
                        {}),

                },

            }
        );


    return parseResponse(
        response
    );

};


/* =========================================================
   NORMALIZE LIST RESPONSE
   ========================================================= */

const normalizeListResponse = (
    response
) => {

    if (
        Array.isArray(
            response
        )
    ) {

        return {

            data:
                response,

            total:
                response.length,

            page:
                1,

            pageSize:
                response.length,

        };

    }


    const data =
        Array.isArray(
            response?.data
        )
            ? response.data
            : Array.isArray(
                response?.items
            )
                ? response.items
                : [];


    return {

        data,

        total:
            Number(
                response?.total ??
                response?.totalCount ??
                data.length
            ),

        page:
            Number(
                response?.page ??
                1
            ),

        pageSize:
            Number(
                response?.pageSize ??
                data.length
            ),

    };

};


/* =========================================================
   MOCK FALLBACK
   ========================================================= */

const getMockList = (
    params = {}
) => {

    const {

        page =
            1,

        pageSize =
            10,

        search =
            "",

        status,

    } =
        params;


    let records =
        Array.isArray(
            GRN_MOCK_DATA
        )
            ? [
                ...GRN_MOCK_DATA,
            ]
            : [];


    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    const searchText =
        String(
            search ||
            ""
        )
            .trim()
            .toLowerCase();


    if (
        searchText
    ) {

        records =
            records.filter(
                item => {

                    const values = [

                        item?.grnNumber,

                        item?.purchaseOrderNumber,

                        item?.invoiceNumber,

                        item?.challanNumber,

                        item?.supplierName,

                        item?.supplierCode,

                        item?.storeName,

                    ];


                    return values.some(
                        value =>
                            String(
                                value ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    searchText
                                )
                    );

                }
            );

    }


    /* -----------------------------------------------------
       STATUS
    ----------------------------------------------------- */

    if (
        status
    ) {

        records =
            records.filter(
                item =>
                    String(
                        item?.status ||
                        ""
                    )
                        .toUpperCase() ===
                    String(
                        status
                    )
                        .toUpperCase()
            );

    }


    const total =
        records.length;


    const start =
        (
            Number(
                page
            ) -
            1
        ) *
        Number(
            pageSize
        );


    const end =
        start +
        Number(
            pageSize
        );


    return {

        data:
            records.slice(
                start,
                end
            ),

        total,

        page:
            Number(
                page
            ),

        pageSize:
            Number(
                pageSize
            ),

    };

};


/* =========================================================
   SERVICE
   ========================================================= */

const grnService = {


    /* =====================================================
       GET LIST
    ===================================================== */

    async getList(
        params = {}
    ) {

        const {

            page =
                1,

            pageSize =
                10,

            search =
                "",

            status,

        } =
            params;


        try {

            const response =
                await request(
                    GRN_ENDPOINT,
                    {

                        method:
                            "GET",

                        /*
                         * Send filters to backend.
                         */

                        /*
                         * Backend may ignore
                         * unsupported query params.
                         */

                        headers: {

                            Accept:
                                "application/json",

                        },

                    }
                );


            return normalizeListResponse(
                response
            );

        }
        catch (
            error
        ) {

            /*
             * Development fallback.
             */

            if (
                import.meta.env.DEV
            ) {

                console.warn(
                    "GRN API unavailable. Using mock data.",
                    error
                );


                return getMockList({

                    page,

                    pageSize,

                    search,

                    status,

                });

            }


            throw error;

        }

    },


    /* =====================================================
       GET BY ID
    ===================================================== */

    async getById(
        id
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        try {

            return await request(
                `${GRN_ENDPOINT}/${id}`,
                {

                    method:
                        "GET",

                }
            );

        }
        catch (
            error
        ) {

            if (
                import.meta.env.DEV
            ) {

                const record =
                    GRN_MOCK_DATA.find(
                        item =>
                            String(
                                item?.id
                            ) ===
                            String(
                                id
                            )
                    );


                if (
                    record
                ) {

                    return record;

                }

            }


            throw error;

        }

    },


    /* =====================================================
       CREATE
    ===================================================== */

    async create(
        payload
    ) {

        if (
            !payload
        ) {

            throw new Error(
                "GRN payload is required."
            );

        }


        return request(
            GRN_ENDPOINT,
            {

                method:
                    "POST",

                body:
                    JSON.stringify(
                        payload
                    ),

            }
        );

    },


    /* =====================================================
       UPDATE
    ===================================================== */

    async update(
        id,
        payload
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return request(
            `${GRN_ENDPOINT}/${id}`,
            {

                method:
                    "PUT",

                body:
                    JSON.stringify(
                        payload
                    ),

            }
        );

    },


    /* =====================================================
       SAVE DRAFT
    ===================================================== */

    async saveDraft(
        payload
    ) {

        if (
            !payload
        ) {

            throw new Error(
                "GRN payload is required."
            );

        }


        const id =
            payload?.id ||
            payload?.grnId;


        if (
            id
        ) {

            return this.update(
                id,
                {

                    ...payload,

                    action:
                        "SAVE",

                }
            );

        }


        return request(
            `${GRN_ENDPOINT}/draft`,
            {

                method:
                    "POST",

                body:
                    JSON.stringify({

                        ...payload,

                        action:
                            "SAVE",

                    }),

            }
        );

    },


    /* =====================================================
       SUBMIT
    ===================================================== */

    async submit(
        payload
    ) {

        if (
            !payload
        ) {

            throw new Error(
                "GRN payload is required."
            );

        }


        const id =
            payload?.id ||
            payload?.grnId;


        if (
            id
        ) {

            return request(
                `${GRN_ENDPOINT}/${id}/submit`,
                {

                    method:
                        "POST",

                    body:
                        JSON.stringify(
                            payload
                        ),

                }
            );

        }


        return request(
            `${GRN_ENDPOINT}/submit`,
            {

                method:
                    "POST",

                body:
                    JSON.stringify(
                        payload
                    ),

            }
        );

    },


    /* =====================================================
       DELETE
    ===================================================== */

    async remove(
        id
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return request(
            `${GRN_ENDPOINT}/${id}`,
            {

                method:
                    "DELETE",

            }
        );

    },


    /* =====================================================
       APPROVE
    ===================================================== */

    async approve(
        id,
        payload = {}
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return request(
            `${GRN_ENDPOINT}/${id}/approve`,
            {

                method:
                    "POST",

                body:
                    JSON.stringify(
                        payload
                    ),

            }
        );

    },


    /* =====================================================
       REJECT
    ===================================================== */

    async reject(
        id,
        payload = {}
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return request(
            `${GRN_ENDPOINT}/${id}/reject`,
            {

                method:
                    "POST",

                body:
                    JSON.stringify(
                        payload
                    ),

            }
        );

    },


    /* =====================================================
       POST TO INVENTORY
    ===================================================== */

    async postToInventory(
        id,
        payload = {}
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return request(
            `${GRN_ENDPOINT}/${id}/post-inventory`,
            {

                method:
                    "POST",

                body:
                    JSON.stringify(
                        payload
                    ),

            }
        );

    },


    /* =====================================================
       POST STOCK
       
       Alias for GRNPage / stock-posting workflow.
       Keeps postToInventory() as the actual API method.
    ===================================================== */

    async postStock(
        id,
        payload = {}
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return this.postToInventory(
            id,
            {

                ...payload,

                action:
                    "POST_STOCK",

            }
        );

    },


    /* =====================================================
       RETRY STOCK POSTING
    ===================================================== */

    async retryStockPosting(
        id,
        payload = {}
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return this.postToInventory(
            id,
            {

                ...payload,

                action:
                    "RETRY_POST_STOCK",

            }
        );

    },


    /* =====================================================
       GET STOCK POSTING STATUS
    ===================================================== */

    async getStockPostingStatus(
        id
    ) {

        if (
            !id
        ) {

            throw new Error(
                "GRN id is required."
            );

        }


        return request(
            `${GRN_ENDPOINT}/${id}/stock-posting-status`,
            {

                method:
                    "GET",

            }
        );

    },


};


/* =========================================================
   EXPORT
   ========================================================= */

export default grnService;