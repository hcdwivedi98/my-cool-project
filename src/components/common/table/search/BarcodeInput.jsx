import React, {

    useEffect,

    useRef,

} from "react";

function BarcodeInput({

    enabled = false,

    onScan,

    timeout = 100,

}) {

    const barcode = useRef("");

    const timer = useRef();

    useEffect(() => {

        if (!enabled) {

            return;

        }

        const handler = (e) => {

            if (

                timer.current

            ) {

                clearTimeout(

                    timer.current

                );

            }

            if (

                e.key === "Enter"

            ) {

                onScan?.(

                    barcode.current

                );

                barcode.current = "";

                return;

            }

            barcode.current += e.key;

            timer.current =

                setTimeout(() => {

                    barcode.current = "";

                }, timeout);

        };

        window.addEventListener(

            "keydown",

            handler

        );

        return () =>

            window.removeEventListener(

                "keydown",

                handler

            );

    }, [

        enabled,

        onScan,

        timeout,

    ]);

    return null;

}

export default BarcodeInput;