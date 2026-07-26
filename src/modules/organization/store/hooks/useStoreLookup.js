import { useMemo } from "react";
import { Form } from "antd";

import {
    DEPARTMENT_LOOKUP,
    FLOOR_LOOKUP,
    WING_LOOKUP,
    ZONE_LOOKUP,
    ROOM_LOOKUP,
    SHELF_LOOKUP,
    BIN_LOOKUP
} from "../data/store.lookup";

const useStoreLookup = (form) => {

    const centerId = Form.useWatch("centerId", form);
    const buildingId = Form.useWatch("buildingId", form);
    const floorId = Form.useWatch("floorId", form);
    const wingId = Form.useWatch("wingId", form);
    const zoneId = Form.useWatch("zoneId", form);
    const rackId = Form.useWatch("rackId", form);
    const shelfId = Form.useWatch("shelfId", form);

    const departments = useMemo(() => {
        return DEPARTMENT_LOOKUP.filter(
            item => item.centerId === centerId
        );
    }, [centerId]);

    const floors = useMemo(() => {
        return FLOOR_LOOKUP.filter(
            item => item.buildingId === buildingId
        );
    }, [buildingId]);

    const wings = useMemo(() => {
        return WING_LOOKUP.filter(
            item => item.floorId === floorId
        );
    }, [floorId]);

    const zones = useMemo(() => {
        return ZONE_LOOKUP.filter(
            item => item.wingId === wingId
        );
    }, [wingId]);

    const rooms = useMemo(() => {
        return ROOM_LOOKUP.filter(
            item => item.zoneId === zoneId
        );
    }, [zoneId]);

    const shelves = useMemo(() => {
        return SHELF_LOOKUP.filter(
            item => item.rackId === rackId
        );
    }, [rackId]);

    const bins = useMemo(() => {
        return BIN_LOOKUP.filter(
            item => item.shelfId === shelfId
        );
    }, [shelfId]);

    return {
        departments,
        floors,
        wings,
        zones,
        rooms,
        shelves,
        bins
    };

};

export default useStoreLookup;