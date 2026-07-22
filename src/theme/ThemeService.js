// src/theme/ThemeService.js

const STORAGE_KEY = "erp-theme";

const THEMES = {

    LIGHT: "light",

    DARK: "dark",

};

const ThemeService = {

    getTheme() {

        return (
            localStorage.getItem(STORAGE_KEY) ||
            THEMES.LIGHT
        );

    },

    setTheme(theme) {

        if (
            theme !== THEMES.LIGHT &&
            theme !== THEMES.DARK
        ) {

            theme = THEMES.LIGHT;

        }

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        return theme;

    },

    toggleTheme() {

        const currentTheme =
            this.getTheme();

        const nextTheme =
            currentTheme === THEMES.LIGHT
                ? THEMES.DARK
                : THEMES.LIGHT;

        this.setTheme(nextTheme);

        return nextTheme;

    },

    resetTheme() {

        localStorage.removeItem(
            STORAGE_KEY
        );

        document.documentElement.setAttribute(
            "data-theme",
            THEMES.LIGHT
        );

        return THEMES.LIGHT;

    },

};

export {

    STORAGE_KEY,

    THEMES,

};

export default ThemeService;