import { useEffect, useMemo, useState } from "react";

function useMedicineSearch(data = []) {

    //--------------------------------------------------
    // Search
    //--------------------------------------------------

    const [keyword, setKeyword] = useState("");

    const [debouncedKeyword, setDebouncedKeyword] = useState("");

    //--------------------------------------------------
    // Filters
    //--------------------------------------------------

    const [filters, setFilters] = useState({

        categoryId: null,

        manufacturerId: null,

        storeId: null,

        availableOnly: true,

    });

    //--------------------------------------------------
    // Debounce
    //--------------------------------------------------

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedKeyword(keyword);

        }, 300);

        return () => clearTimeout(timer);

    }, [keyword]);

    //--------------------------------------------------
    // Filter
    //--------------------------------------------------

    const medicines = useMemo(() => {

        const search = debouncedKeyword
            .trim()
            .toLowerCase();
            console.log("Keyword :", debouncedKeyword);
console.log("Search:", debouncedKeyword);

        return data.filter(item => {
console.log(item.itemName);
            const matchKeyword =

                !search ||

                item.itemName?.toLowerCase().includes(search) ||

                item.genericName?.toLowerCase().includes(search) ||

                item.itemCode?.toLowerCase().includes(search);

            const matchCategory =

                !filters.categoryId ||

                item.categoryId === filters.categoryId;

            const matchManufacturer =

                !filters.manufacturerId ||

                item.manufacturerId === filters.manufacturerId;

            const matchStore =

                !filters.storeId ||

                item.storeId === filters.storeId;

            const matchStock =

                !filters.availableOnly ||

                item.stock > 0;

            return (

                matchKeyword &&

                matchCategory &&

                matchManufacturer &&

                matchStore &&

                matchStock

            );

        });

    }, [data, debouncedKeyword, filters]);

    //--------------------------------------------------

    function resetFilters() {

        setKeyword("");

        setDebouncedKeyword("");

        setFilters({

            categoryId: null,

            manufacturerId: null,

            storeId: null,

            availableOnly: true,

        });

    }

    //--------------------------------------------------

    return {

        keyword,

        setKeyword,

        filters,

        setFilters,

        medicines,

        resetFilters,

    };

}

export default useMedicineSearch;