import { useMemo } from "react";

import { shelfList } from "../mock/shelf.mock";

const centers = [
    { label: "Lucknow Main", value: 1 },
    { label: "Kanpur Branch", value: 2 },
];

const departments = [
    { label: "Pharmacy", value: 1 },
    { label: "Emergency", value: 2 },
];

const stores = [
    { label: "Central Medical Store", value: 1 },
    { label: "Emergency Pharmacy", value: 2 },
];

const subStores = [
    { label: "OPD Pharmacy", value: 1 },
    { label: "IPD Pharmacy", value: 2 },
    { label: "Emergency Counter", value: 3 },
];

const racks = [
    { label: "General Medicine Rack", value: 1 },
    { label: "Cold Storage Rack", value: 2 },
    { label: "Controlled Drug Rack", value: 5 },
];

export default function useShelfLookup() {
    const statistics = useMemo(() => {
        const total = shelfList.length;

        const active = shelfList.filter(
            (x) => x.status === "Active"
        ).length;

        const inactive = shelfList.filter(
            (x) => x.status === "Inactive"
        ).length;

        const full = shelfList.filter(
            (x) => x.occupancyStatus === "FULL"
        ).length;

        return {
            total,
            active,
            inactive,
            full,
        };
    }, []);

    return {
        centers,
        departments,
        stores,
        subStores,
        racks,
        statistics,
    };
}