import { useMemo } from "react";

export default function useTableSearch(
    data,
    keyword
) {

    return useMemo(() => {

        if (!keyword)
            return data;

        return data.filter(row =>

            JSON.stringify(row)
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                )

        );

    }, [data, keyword]);

}