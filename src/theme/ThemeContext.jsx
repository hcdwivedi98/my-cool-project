// src/theme/ThemeContext.jsx

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import ThemeService, {
    THEMES,
} from "./ThemeService";

const ThemeContext = createContext(null);

function ThemeProviderContext({ children }) {

    const [themeMode, setThemeMode] = useState(
        ThemeService.getTheme()
    );

    useEffect(() => {

        ThemeService.setTheme(themeMode);

    }, [themeMode]);

    const setTheme = (theme) => {

        if (
            theme === THEMES.LIGHT ||
            theme === THEMES.DARK
        ) {

            setThemeMode(theme);

        }

    };

    const toggleTheme = () => {

        setThemeMode((prev) =>
            prev === THEMES.LIGHT
                ? THEMES.DARK
                : THEMES.LIGHT
        );

    };

    const resetTheme = () => {

        const defaultTheme =
            ThemeService.resetTheme();

        setThemeMode(defaultTheme);

    };

    const value = useMemo(() => ({

        themeMode,

        isDark:
            themeMode === THEMES.DARK,

        isLight:
            themeMode === THEMES.LIGHT,

        setTheme,

        toggleTheme,

        resetTheme,

    }), [themeMode]);

    return (

        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    );

}

function useTheme() {

    const context = useContext(
        ThemeContext
    );

    if (!context) {

        throw new Error(
            "useTheme must be used inside ThemeProviderContext."
        );

    }

    return context;

}

export {

    ThemeProviderContext,

    useTheme,

};