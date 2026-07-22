import React from "react";

import {

    AutoComplete,

} from "antd";

import HighlightText from "./HighlightText";

function SearchSuggestions({

    suggestions = [],

    keyword,

}) {

    return suggestions.map(item => ({

        value: item.value,

        label: (

            <HighlightText

                text={item.label}

                keyword={keyword}

            />

        ),

    }));

}

export default React.memo(SearchSuggestions);