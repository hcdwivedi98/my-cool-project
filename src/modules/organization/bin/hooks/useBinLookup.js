import { useMemo } from "react";

const useBinLookup = () => {
    const lookups = useMemo(() => {
        return {
            centers: [
                {
                    label: "Main Hospital",
                    value: 1,
                },
                {
                    label: "Branch Hospital",
                    value: 2,
                },
            ],

            departments: [
                {
                    label: "Pharmacy",
                    value: 1,
                },
                {
                    label: "Emergency",
                    value: 2,
                },
            ],

            stores: [
                {
                    label: "Main Pharmacy Store",
                    value: 1,
                },
                {
                    label: "Emergency Store",
                    value: 2,
                },
            ],

            subStores: [
                {
                    label: "Main Pharmacy Sub Store",
                    value: 1,
                },
                {
                    label: "Emergency Pharmacy",
                    value: 2,
                },
                {
                    label: "Emergency Sub Store",
                    value: 3,
                },
            ],

            racks: [
                {
                    label: "Rack A",
                    value: 1,
                },
                {
                    label: "Rack B",
                    value: 2,
                },
                {
                    label: "Rack C",
                    value: 3,
                },
            ],

            shelves: [
                {
                    label: "Shelf A-01",
                    value: 1,
                    rackId: 1,
                },
                {
                    label: "Shelf A-02",
                    value: 2,
                    rackId: 1,
                },
                {
                    label: "Shelf B-01",
                    value: 3,
                    rackId: 2,
                },
                {
                    label: "Shelf C-02",
                    value: 5,
                    rackId: 3,
                },
            ],

            approvers: [
                {
                    label: "Store Manager",
                    value: 1,
                },
                {
                    label: "Inventory Manager",
                    value: 2,
                },
                {
                    label: "Pharmacy Administrator",
                    value: 3,
                },
            ],
        };
    }, []);

    return lookups;
};

export default useBinLookup;