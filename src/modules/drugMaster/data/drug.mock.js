const drugs = [

    {
        id: 1,
        itemCode: "DRG000001",
        itemName: "Paracetamol 500 mg",
        genericName: "Paracetamol",
        categoryName: "Tablet",
        manufacturerName: "Sun Pharma",
        dosageFormName: "Tablet",
        strength: "500 mg",
        packSize: "10 x 10",
        currentStock: 1245,
        mrp: 35.00,
        purchaseRate: 24.50,
        sellingRate: 32.00,
        gst: 12,
        isActive: true,
    },

    {
        id: 2,
        itemCode: "DRG000002",
        itemName: "Amoxicillin 500 mg",
        genericName: "Amoxicillin",
        categoryName: "Capsule",
        manufacturerName: "Cipla",
        dosageFormName: "Capsule",
        strength: "500 mg",

        currentStock: 1245,
        reorderLevel: 200,
        expiryDays: 180,

        packSize: "10 x 10",
        currentStock: 860,
        mrp: 142,
        purchaseRate: 110,
        sellingRate: 135,
        gst: 12,
        isActive: true,
    },

    {
        id: 3,
        itemCode: "DRG000003",
        itemName: "Pantoprazole 40 mg",
        genericName: "Pantoprazole",
        categoryName: "Tablet",
        manufacturerName: "Dr. Reddy's",
        dosageFormName: "Tablet",
        strength: "40 mg",

        currentStock: 1245,
        reorderLevel: 200,
        expiryDays: 180,

        packSize: "10 x 15",
        currentStock: 520,
        mrp: 165,
        purchaseRate: 128,
        sellingRate: 158,
        gst: 12,
        isActive: true,
    },

    {
        id: 4,
        itemCode: "DRG000004",
        itemName: "Azithromycin 500 mg",
        genericName: "Azithromycin",
        categoryName: "Tablet",
        manufacturerName: "Abbott",
        dosageFormName: "Tablet",
        strength: "500 mg",

        currentStock: 1245,
        reorderLevel: 200,
        expiryDays: 180,

        packSize: "1 x 5",
        currentStock: 245,
        mrp: 118,
        purchaseRate: 90,
        sellingRate: 112,
        gst: 12,
        isActive: true,
    },

    {
        id: 5,
        itemCode: "DRG000005",
        itemName: "Diclofenac Injection",
        genericName: "Diclofenac",
        categoryName: "Injection",
        manufacturerName: "Zydus",
        dosageFormName: "Injection",
        strength: "75 mg",

        currentStock: 1245,
        reorderLevel: 200,
        expiryDays: 180,

        packSize: "1 Ampoule",
        currentStock: 96,
        mrp: 48,
        purchaseRate: 34,
        sellingRate: 44,
        gst: 12,
        isActive: false,
    },

];

export default drugs;