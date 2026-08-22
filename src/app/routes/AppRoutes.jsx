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
import DrugMaster from "../../modules/drugMaster";
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
                        path="/drug-master"
                        element={<DrugMaster />}
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
                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;