import SearchHistoryService from "../../../services/SearchHistoryService";
import {
    useState,
    useEffect,
    useMemo,
} from "react";
import {
    buildSuggestions,
    rankSuggestions,
} from "./searchUtils";
export default function useTableSearch({

    value = "",

    onChange,

    onSearch,

    dataSource = [],

    searchKeys = [],

    debounce = 400,

    autoSearch = true,

    rememberHistory = true,

    maxHistory = 10,

}) {

    const [searchValue, setSearchValue] = useState(value);

    const [history, setHistory] = useState([]);

    useEffect(() => {

        setSearchValue(value);

    }, [value]);

    useEffect(() => {

    if (!autoSearch) {

        return;

    }

    const timer = setTimeout(() => {

        onSearch?.(searchValue);

        if (

            rememberHistory &&

            searchValue.trim()

        ) {

            saveHistory(searchValue);

        }

    }, debounce);

    return () => clearTimeout(timer);

}, [

    searchValue,

    debounce,

    autoSearch,

    rememberHistory,

    onSearch,

]);

    function handleChange(e) {

        const val =
            typeof e === "string"
                ? e
                : e.target.value;

        setSearchValue(val);

        onChange?.(val);

    }

    function handleSearch(value) {

        const keyword =

            typeof value === "string"

                ? value

                : searchValue;

        onSearch?.(keyword);

        if (

            rememberHistory &&

            keyword.trim()

        ) {

            saveHistory(keyword);

        }

    }

    function saveHistory(keyword) {

    SearchHistoryService.save(

        keyword,

        maxHistory

    );

    setHistory(

        SearchHistoryService.getHistory(

            maxHistory

        )

    );

}

    function loadHistory() {

    setHistory(

        SearchHistoryService.getHistory(

            maxHistory

        )

    );

}

    function clearHistory() {

    SearchHistoryService.clear();

    setHistory([]);

}

    function handleKeyDown(e) {

        if (

            e.key === "Escape"

        ) {

            setSearchValue("");

        }

    }

    const suggestions = useMemo(() => {

    const list = buildSuggestions({

        keyword: searchValue,

        dataSource,

        searchKeys,

        maxSuggestions: 10,

    });

    return rankSuggestions(

        list,

        searchValue

    );

}, [

    searchValue,

    dataSource,

    searchKeys,

]);

    return {

        searchValue,

        history,

        suggestions,

        handleChange,

        handleSearch,

        handleKeyDown,

        loadHistory,

        clearHistory,

    };

}