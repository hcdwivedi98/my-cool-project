import { useEffect, useState } from "react";

export default function useAsyncOptions(

    service,

    keyword

) {

    const [loading, setLoading] = useState(false);

    const [options, setOptions] = useState([]);

    useEffect(() => {

        if (!keyword || keyword.length < 2) {

            setOptions([]);

            return;

        }

        let active = true;

        async function load() {

            setLoading(true);

            try {

                const response = await service(keyword);

                if (!active) return;

                setOptions(response || []);

            }

            finally {

                if (active) {

                    setLoading(false);

                }

            }

        }

        load();

        return () => {

            active = false;

        };

    }, [

        keyword,

        service

    ]);

    return {

        loading,

        options

    };

}