import React, { memo } from "react";

import {
    AppForm,
} from "../../../components/common/form";

import {
    AppTabs,
} from "../../../components/common/layout";

import BasicInformationTab from "./tabs/BasicInformationTab";
import PackagingTab from "./tabs/PackagingTab";
import InventoryTab from "./tabs/InventoryTab";
import PricingTab from "./tabs/PricingTab";
import ClinicalTab from "./tabs/ClinicalTab";
import TaxTab from "./tabs/TaxTab";
import BarcodeTab from "./tabs/BarcodeTab";

function DrugForm({

    form,

    loading = false,

    lookups = {},

}) {

    const items = [

        {
            key: "basic",
            label: "Basic Information",
            children: (
                <BasicInformationTab
                    lookups={lookups}
                />
            ),
        },

        {
            key: "packaging",
            label: "Packaging",
            children: (
                <PackagingTab
                    lookups={lookups}
                />
            ),
        },

        {
            key: "inventory",
            label: "Inventory",
            children: (
                <InventoryTab
                    lookups={lookups}
                />
            ),
        },

        {
            key: "pricing",
            label: "Pricing",
            children: (
                <PricingTab
                    lookups={lookups}
                />
            ),
        },

        {
            key: "clinical",
            label: "Clinical",
            children: (
                <ClinicalTab
                    lookups={lookups}
                />
            ),
        },

        {
            key: "tax",
            label: "Tax",
            children: (
                <TaxTab
                    lookups={lookups}
                />
            ),
        },

        {
            key: "barcode",
            label: "Barcode",
            children: (
                <BarcodeTab />
            ),
        },

    ];

    return (

        <AppForm

            form={form}

            layout="vertical"

            disabled={loading}

        >

            <AppTabs

                destroyInactiveTabPane={false}

                animated

                items={items}

            />

        </AppForm>

    );

}

export default memo(DrugForm);