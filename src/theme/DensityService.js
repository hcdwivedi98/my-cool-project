// =====================================================
// ERP Density Configuration
// =====================================================

export const DensityConfig = {

    compact: {

        key: "compact",

        tableSize: "small",

        inputSize: "small",

        buttonSize: "small",

        cardPadding: 16,

        drawerPadding: 16,

        modalPadding: 16,

        formSpacing: 12,

        rowHeight: 36,

        borderRadius: 6,

        fontSize: 12,

    },

    comfortable: {

        key: "comfortable",

        tableSize: "middle",

        inputSize: "middle",

        buttonSize: "middle",

        cardPadding: 24,

        drawerPadding: 24,

        modalPadding: 24,

        formSpacing: 16,

        rowHeight: 48,

        borderRadius: 8,

        fontSize: 13,

    },

    spacious: {

        key: "spacious",

        tableSize: "large",

        inputSize: "large",

        buttonSize: "large",

        cardPadding: 32,

        drawerPadding: 32,

        modalPadding: 32,

        formSpacing: 24,

        rowHeight: 60,

        borderRadius: 10,

        fontSize: 14,

    },

};

export function getDensityConfig(density) {

    return (

        DensityConfig[density] ||

        DensityConfig.comfortable

    );

}