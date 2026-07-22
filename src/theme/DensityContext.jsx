import {
    createContext,
    useContext,
} from "react";

import {

    getDensityConfig,

} from "./DensityService";

const DensityContext = createContext({

    density: "comfortable",

    config: getDensityConfig(

        "comfortable"

    ),

    setDensity: () => {},

});

export default DensityContext;

export const useDensity = () =>

    useContext(DensityContext);