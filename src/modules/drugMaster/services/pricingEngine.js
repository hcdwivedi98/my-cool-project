const round = (value, precision = 2) =>

    Number(Number(value || 0).toFixed(precision));

export function calculateLandingCost({

    purchasePrice,

    freight = 0,

    insurance = 0,

    otherCharges = 0,

}) {

    return round(

        Number(purchasePrice) +

        Number(freight) +

        Number(insurance) +

        Number(otherCharges)

    );

}

export function calculateMargin({

    costPrice,

    salePrice,

}) {

    if (!costPrice) return 0;

    return round(

        ((salePrice - costPrice) /

            costPrice) *

            100

    );

}

export function calculateSalePrice({

    costPrice,

    margin,

}) {

    return round(

        Number(costPrice) *

            (1 + Number(margin) / 100)

    );

}

export function calculateMRP({

    salePrice,

    gstRate,

}) {

    return round(

        Number(salePrice) *

            (1 + Number(gstRate) / 100)

    );

}

export function calculateGSTAmount({
    amount,
    gstRate,
}) {

    return round(

        Number(amount) *

            Number(gstRate) /

            100

    );

}

export function calculatePTR({

    purchasePrice,

}) {

    return round(purchasePrice);

}

export function calculatePTS({

    ptr,

    schemeDiscount = 0,

}) {

    return round(

        ptr -

            schemeDiscount

    );

}

export function calculateNetAmount({

    amount,

    discount,

}) {

    return round(

        amount -

            amount *

                discount /

                100

    );

}

export function calculatePricing(values) {

    const landingCost =

        calculateLandingCost(values);

    const costPrice =

        landingCost;

    const marginPercentage =

        calculateMargin({

            costPrice,

            salePrice: values.salePrice,

        });

    const gstAmount =

        calculateGSTAmount({

            amount: values.salePrice,

            gstRate: values.gstRate,

        });

    return {

        ...values,

        landingCost,

        costPrice,

        marginPercentage,

        gstAmount,

    };

}