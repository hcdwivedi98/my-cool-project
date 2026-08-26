import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../../core/auth/Login";

import Dashboard from "../../pages/dashboard/Dashboard";
import Stores from "../../pages/stores/Stores";
import Settings from "../../pages/settings/Settings";

import MainLayout from "../layouts/MainLayout/MainLayout";

// Feature Modules
//import DrugMaster from "../../modules/drugMaster";
import SupplierMaster from "../../modules/supplierMaster";
import SupplierItemMapping from "../../modules/supplierItemMapping";
import PurchaseRequisition from "../../modules/purchaseRequisition";
// Organization Modules
import CenterMasterPage from "../../modules/organization/center/pages/CenterMasterPage";
import DepartmentMasterPage from "../../modules/department/pages/DepartmentPage";
import StorePage from "../../modules/organization/store/pages/StorePage";
import SubStorePage from "../../modules/organization/sub-store/pages/SubStorePage";
import RackPage from "@/modules/organization/rack/pages/RackPage";
import ShelfPage from "@/modules/organization/shelf/pages/ShelfPage";
import { BinPage, } from "@/modules/organization/bin";
import { DrugPage, } from "@/modules/pharmacy/drug";
import { SupplierPage, } from "@/modules/pharmacy/supplier";
import ManufacturerPage from "@/modules/pharmacy/manufacturer/pages/ManufacturerPage";
import GenericPage from "@/modules/pharmacy/generic/pages/GenericPage";
import { UomPage, } from "@/modules/pharmacy/uom";
import { DrugCategoryPage, } from "@/modules/pharmacy/drug-category";
import DosageFormPage from "@/modules/pharmacy/dosage-form";
import DrugRoutePage from "../../modules/pharmacy/drug-route";
import { DrugStrengthPage, } from "@/modules/pharmacy/drug-strength";
import DrugUnitPage from "@/modules/pharmacy/drug-unit/pages/DrugUnitPage";
import UserPage from "@/modules/user-management/user";
import RolePage from "@/modules/user-management/role";
import { PermissionPage, } from "@/modules/user-management/permission";
import { PurchaseOrderPage, } from "@/modules/purchase-management/purchase-order";
import { GRNPage, } from "@/modules/purchase-management/grn";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes >

                {/* Login */}

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Application */}

                <Route element={<MainLayout />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    <Route
                        path="/centers"
                        element={<CenterMasterPage />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />


                    <Route
                        path="/suppliers"
                        element={<SupplierMaster />}
                    />

                    <Route
                        path="/supplier-item-mapping"
                        element={<SupplierItemMapping />}
                    />

                    <Route
                        path="/purchase-requisition"
                        element={<PurchaseRequisition />}
                    />

                    <Route
                        path="/departments"
                        element={<DepartmentMasterPage />}
                    />

                    <Route
                        path="/stores"
                        element={<StorePage />}
                    />

                    <Route
                        path="/sub-stores"
                        element={<SubStorePage />}
                    />

                    <Route
                        path="/rack-master"
                        element={<RackPage />}
                    />

                    <Route
                        path="/shelf-master"
                        element={<ShelfPage />}
                    />

                    <Route
                        path="/bins"
                        element={<BinPage />}
                    />

                    <Route
                        path="/DrugPage"
                        element={<DrugPage />}
                    />

                    <Route
                        path="/suppliers"
                        element={<SupplierPage />}
                    />

                    <Route
                        path="/manufacturers"
                        element={<ManufacturerPage />}
                    />

                    <Route
                        path="/generic"
                        element={<GenericPage />}
                    />

                    <Route
                        path="/uom"
                        element={<UomPage />}
                    />

                    <Route
                        path="/drug-category"
                        element={<DrugCategoryPage />}
                    />

                    <Route
                        path="/dosage-form"
                        element={<DosageFormPage />}
                    />

                    <Route
                        path="/drug-route"
                        element={
                            <DrugRoutePage />
                        }
                    />

                    <Route
                        path="/drug-strength"
                        element={
                            <DrugStrengthPage />
                        }
                    />

                    <Route
                        path="/drug-units"
                        element={
                            <DrugUnitPage />
                        }
                    />

                    <Route
                        path="/user-management/user"
                        element={<UserPage />}
                    />

                    <Route
                        path="/role"
                        element={<RolePage />}
                    />

                    <Route
                        path="/permission"
                        element={<PermissionPage />}
                    />

                    <Route
                        path="/purchase-order"
                        element={<PurchaseOrderPage />}
                    />

                    <Route
                        path="/grn"
                        element={<GRNPage />}               />
                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;