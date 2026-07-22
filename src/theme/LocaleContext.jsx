// src/theme/LocaleContext.jsx

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import enUS from "antd/locale/en_US";
import hiIN from "antd/locale/hi_IN";

const STORAGE_KEY = "erp-locale";

const LOCALES = {

    ENGLISH: "en",

    HINDI: "hi",

};

const localeMap = {

    en: enUS,

    hi: hiIN,

};

const LocaleContext = createContext(null);

function LocaleProviderContext({ children }) {

    const [language, setLanguage] = useState(() => {

        return (
            localStorage.getItem(STORAGE_KEY) ||
            LOCALES.ENGLISH
        );

    });

    useEffect(() => {

        localStorage.setItem(
            STORAGE_KEY,
            language
        );

    }, [language]);

    const changeLanguage = (lang) => {

        if (
            localeMap[lang]
        ) {

            setLanguage(lang);

        }

    };

    const value = useMemo(() => ({

        language,

        locale:
            localeMap[language],

        changeLanguage,

        supportedLanguages: [

            {
                label: "English",
                value: LOCALES.ENGLISH,
            },

            {
                label: "हिन्दी",
                value: LOCALES.HINDI,
            },

        ],

    }), [language]);

    return (

        <LocaleContext.Provider value={value}>

            {children}

        </LocaleContext.Provider>

    );

}

function useLocale() {

    const context = useContext(
        LocaleContext
    );

    if (!context) {

        throw new Error(

            "useLocale must be used inside LocaleProviderContext."

        );

    }

    return context;

}

export {

    LOCALES,

    LocaleProviderContext,

    useLocale,

};

export default LocaleContext;