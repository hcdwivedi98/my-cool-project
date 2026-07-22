import {
    useState,
    useMemo,
} from "react";

import DensityContext from "./DensityContext";

import StorageService from "../core/services/StorageService";
import {
    getDensityConfig,
} from "./DensityService";

const STORAGE_KEY = "erp_density";

function DensityProvider({

    children,

}) {

    const [

        density,

        setDensityState,

    ] = useState(

        StorageService.get(

            STORAGE_KEY,

            "comfortable"

        )

    );

    function setDensity(value) {

        setDensityState(value);

        StorageService.set(

            STORAGE_KEY,

            value

        );

    }

    const value = useMemo(

    () => ({

        density,

        config: getDensityConfig(

            density

        ),

        setDensity,

    }),

    [density]

);

    return (

        <DensityContext.Provider

            value={value}

        >

            {children}

        </DensityContext.Provider>

    );

}

export default DensityProvider;