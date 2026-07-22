import {
    useEffect,
    useState
} from "react";

export default function useColumnVisibility(
    key,
    columns
) {

    const [selected,
        setSelected] =
        useState([]);

    useEffect(() => {

        const saved =
            localStorage.getItem(key);

        if (saved) {

            setSelected(
                JSON.parse(saved)
            );

        } else {

            setSelected(
                columns.map(
                    c =>
                        c.key ||
                        c.dataIndex
                )
            );

        }

    }, []);

    useEffect(() => {

        if (
            selected.length
        ) {

            localStorage.setItem(
                key,
                JSON.stringify(selected)
            );

        }

    }, [selected]);

    return [
        selected,
        setSelected
    ];

}