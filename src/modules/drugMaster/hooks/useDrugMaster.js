import {

    useCallback,

    useEffect,

    useState,

} from "react";

import drugService from "../services/drugService";
import mockDrugs from "../data/drug.mock";

function useDrugMaster() {

    const [

        loading,

        setLoading,

    ] = useState(false);

    const [

        saving,

        setSaving,

    ] = useState(false);

    const [drugs, setDrugs] = useState(mockDrugs);

    // const [

    //     drugs,

    //     setDrugs,

    // ] = useState([]);

    // const [

    //     total,

    //     setTotal,

    // ] = useState(0);


    const [

        lookups,

        setLookups,

    ] = useState({});

    const [

        pagination,

        setPagination,

    ] = useState({

        current: 1,

        pageSize: 20,

    });

    const [

        filters,

        setFilters,

    ] = useState({});

    const total = drugs.length;
    //------------------------------------------------------

    const loadLookups = useCallback(() => {

        setLookups({

            categories: [
                { label: "Tablet", value: 1 },
                { label: "Capsule", value: 2 },
                { label: "Injection", value: 3 },
            ],

            manufacturers: [
                { label: "Sun Pharma", value: 1 },
                { label: "Cipla", value: 2 },
                { label: "Dr. Reddy's", value: 3 },
            ],

        });

    }, []);

    //------------------------------------------------------

    // const loadGrid =

    //     useCallback(async () => {

    //         setLoading(true);

    //         try {

    //             const result =

    //                 await drugService.getPaged({

    //                     page:

    //                         pagination.current,

    //                     pageSize:

    //                         pagination.pageSize,

    //                     ...filters,

    //                 });

    //             setDrugs(result.items);

    //             setTotal(result.total);

    //         }

    //         finally {

    //             setLoading(false);

    //         }

    //     }, [

    //         pagination,

    //         filters,

    //     ]);

    //------------------------------------------------------


    //------------------------------------------------------
    useEffect(() => {

        loadLookups();

    }, [

        loadLookups,

    ]);

    //------------------------------------------------------

    // useEffect(() => {

    //     loadGrid();

    // }, [

    //     loadGrid,

    // ]);

    //------------------------------------------------------

    // async function save(values) {

    //     setSaving(true);

    //     try {

    //         await drugService.save(values);

    //         await loadGrid();

    //     }

    //     finally {

    //         setSaving(false);

    //     }

    // }

    //------------------------------------------------------

    // async function remove(id) {

    //     await drugService.delete(id);

    //     await loadGrid();

    // }

    //------------------------------------------------------

   

    //------------------------------------------------------
    const save = async (model) => {

        if (model.id) {

            setDrugs(prev =>

                prev.map(item =>

                    item.id === model.id

                        ? { ...item, ...model }

                        : item

                )

            );

        } else {

            setDrugs(prev => [

                {

                    ...model,

                    id: Date.now(),

                    isActive: true,

                },

                ...prev,

            ]);

        }

    };

    const remove = async (id) => {

        setDrugs(prev =>

            prev.filter(item => item.id !== id)

        );

    };
    //------------------------------------------------------

    const stats = {

        total: drugs.length,

        active: drugs.filter(x => x.isActive).length,

        inactive: drugs.filter(x => !x.isActive).length,

        lowStock: drugs.filter(x => x.currentStock <= 100).length,

        expiring: 8,

    };

    return {

    drugs,

    loading,

    saving,

    filters,

    setFilters,

    pagination,

    setPagination,

    total,

    lookups,

    save,

    remove,

    stats,

};


}

export default useDrugMaster;