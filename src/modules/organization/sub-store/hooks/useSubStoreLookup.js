import { useMemo } from "react";

const useSubStoreLookup = () => {

    const centers = useMemo(() => [

        {
            value: 1,
            label: "Main Hospital"
        }

    ], []);

    const departments = useMemo(() => [

        {
            value: 1,
            centerId: 1,
            label: "Pharmacy"
        },
        {
            value: 2,
            centerId: 1,
            label: "Emergency"
        }

    ], []);

    const stores = useMemo(() => [

        {
            value: 1,
            departmentId: 1,
            label: "Central Store"
        },
        {
            value: 2,
            departmentId: 1,
            label: "OT Store"
        }

    ], []);

    const buildings = useMemo(() => [

        {
            value: 1,
            label: "Block A"
        },
        {
            value: 2,
            label: "Block B"
        }

    ], []);

    const floors = useMemo(() => [

        {
            value: 1,
            buildingId: 1,
            label: "Ground Floor"
        },
        {
            value: 2,
            buildingId: 1,
            label: "First Floor"
        }

    ], []);

    const rooms = useMemo(() => [

        {
            value: 101,
            floorId: 1,
            label: "Room 101"
        },
        {
            value: 202,
            floorId: 2,
            label: "Room 202"
        }

    ], []);

    return {

        centers,
        departments,
        stores,
        buildings,
        floors,
        rooms

    };

};

export default useSubStoreLookup;