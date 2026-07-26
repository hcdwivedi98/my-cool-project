export const CENTER_LOOKUP = [

    {
        value: 1,
        label: "Lucknow Main Hospital"
    },

    {
        value: 2,
        label: "Kanpur Branch"
    }

];

export const DEPARTMENT_LOOKUP = [

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

];

export const STORE_TYPE_LOOKUP = [

    {
        value: "MAIN",
        label: "Main Store"
    },

    {
        value: "SUB",
        label: "Sub Store"
    },

    {
        value: "WAREHOUSE",
        label: "Warehouse"
    }

];

export const BUILDING_LOOKUP = [

    {
        value: 1,
        label: "Building A"
    },

    {
        value: 2,
        label: "Building B"
    }

];

export const FLOOR_LOOKUP = [
    {
        value: 1,
        label: "Ground Floor",
        buildingId: 1
    },
    {
        value: 2,
        label: "First Floor",
        buildingId: 1
    },
    {
        value: 3,
        label: "Second Floor",
        buildingId: 2
    }
];

export const WING_LOOKUP = [

    {
        value: 1,
        floorId: 1,
        label: "East Wing"
    },

    {
        value: 2,
        floorId: 1,
        label: "West Wing"
    }

];

export const ZONE_LOOKUP = [

    {
        value: 1,
        wingId: 1,
        label: "Zone A"
    }

];

export const ROOM_LOOKUP = [

    {
        value: 1,
        zoneId: 1,
        label: "Room 101"
    }

];

export const RACK_LOOKUP = [

    {
        value: 1,
        label: "Rack A"
    }

];

export const SHELF_LOOKUP = [

    {
        value: 1,
        rackId: 1,
        label: "Shelf 1"
    }

];

export const BIN_LOOKUP = [

    {
        value: 1,
        shelfId: 1,
        label: "Bin 01"
    }

];

export const ROLE_LOOKUP = [

    {
        value: 1,
        label: "Store Manager"
    },

    {
        value: 2,
        label: "Pharmacy Manager"
    }

];

export const PRINTER_LOOKUP = [

    {
        value: 1,
        label: "HP LaserJet"
    },

    {
        value: 2,
        label: "Zebra Barcode Printer"
    }

];