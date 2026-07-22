import React, { memo } from "react";

import { Tabs } from "antd";

import BasicInformationTab from "./tabs/BasicInformationTab";
import PackagingTab from "./tabs/PackagingTab";
import PricingTab from "./tabs/PricingTab";
import InventoryTab from "./tabs/InventoryTab";
import ClinicalTab from "./tabs/ClinicalTab";
import BarcodeTab from "./tabs/BarcodeTab";
import TaxTab from "./tabs/TaxTab";

function DrugForm({

    form,

    lookups,

}) {

    const items = [

        {

            key: "basic",

            label: "Basic Information",

            children: (

                <BasicInformationTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "packaging",

            label: "Packaging & UOM",

            children: (

                <PackagingTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "pricing",

            label: "Pricing",

            children: (

                <PricingTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "inventory",

            label: "Inventory",

            children: (

                <InventoryTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "clinical",

            label: "Clinical",

            children: (

                <ClinicalTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "barcode",

            label: "Barcode",

            children: (

                <BarcodeTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "tax",

            label: "Tax",

            children: (

                <TaxTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

    ];

    return (

        <Tabs

            destroyInactiveTabPane={false}

            animated

            items={items}

        />

    );

}

export default memo(DrugForm);