import { useMemo } from "react";

const useRackLookup = () => {

    return useMemo(() => ({

        centers: [
            { label: "Lucknow Main", value: 1 },
            { label: "Kanpur Branch", value: 2 }
        ],

        departments: [
            { label: "Pharmacy", value: 1 },
            { label: "Emergency", value: 2 },
            { label: "ICU", value: 3 }
        ],

        stores: [
            { label: "Main Pharmacy", value: 1 },
            { label: "Emergency Pharmacy", value: 2 }
        ],

        subStores: [
            { label: "General Medicine", value: 1 },
            { label: "OT Medicine", value: 2 }
        ],

        buildings: [
            { label: "Building A", value: 1 },
            { label: "Building B", value: 2 }
        ],

        floors: [
            { label: "Ground Floor", value: 1 },
            { label: "First Floor", value: 2 },
            { label: "Second Floor", value: 3 }
        ],

        rooms: [
            { label: "Room 101", value: 1 },
            { label: "Room 102", value: 2 }
        ],

        approvers: [
            {
                label: "Store Manager",
                value: "STORE_MANAGER"
            },
            {
                label: "Inventory Manager",
                value: "INVENTORY_MANAGER"
            },
            {
                label: "Pharmacy Head",
                value: "PHARMACY_HEAD"
            }
        ]

    }), []);

};

export default useRackLookup;