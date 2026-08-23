/* =========================================================
   USER MANAGEMENT MODULE
   ========================================================= */

import UserPage
    from "./pages/UserPage";

import UserForm
    from "./components/UserForm";

import UserDrawer
    from "./components/UserDrawer";

import ConfirmCloseModal
    from "./components/ConfirmCloseModal";

import userService
    from "./services/user.service";

import useUserLookup
    from "./hooks/useUserLookup";


/* =========================================================
   EXPORTS
   ========================================================= */

export {
    UserPage,

    UserForm,

    UserDrawer,

    ConfirmCloseModal,

    userService,

    useUserLookup,
};


/* =========================================================
   DEFAULT
   ========================================================= */

export default UserPage;