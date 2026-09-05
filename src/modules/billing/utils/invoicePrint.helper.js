
// src/modules/billing/utils/invoicePrint.helper.js


/* =========================================================
   PRINT INVOICE
   ========================================================= */

export const printInvoice = (
    invoiceElementId = "billing-invoice-print-area"
) => {

    const invoiceElement =
        document.getElementById(
            invoiceElementId
        );


    if (!invoiceElement) {

        console.error(
            `Invoice print element "${invoiceElementId}" was not found.`
        );

        return false;

    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    if (!printWindow) {

        console.error(
            "Unable to open print window."
        );

        return false;

    }


    const styles =
        Array.from(
            document.querySelectorAll(
                'link[rel="stylesheet"], style'
            )
        )
            .map(
                style => style.outerHTML
            )
            .join("\n");


    printWindow.document.open();


    printWindow.document.write(`
        <!DOCTYPE html>

        <html>

            <head>

                <meta
                    charset="UTF-8"
                />

                <title>
                    Invoice
                </title>

                ${styles}

                <style>

                    @page {
                        size: A4;
                        margin: 12mm;
                    }


                    html,
                    body {
                        margin: 0;
                        padding: 0;
                        background: #ffffff;
                    }


                    body {
                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                    }


                    #${invoiceElementId} {
                        width: 100%;
                    }


                    .ant-card {
                        border: none !important;
                        box-shadow: none !important;
                    }


                    .ant-card-body {
                        padding: 0 !important;
                    }


                    .ant-table {
                        font-size: 11px;
                    }


                    .ant-table-thead > tr > th {
                        background: #ffffff !important;
                        color: #000000 !important;
                        border-bottom:
                            1px solid #000000 !important;
                    }


                    .ant-table-tbody > tr > td {
                        border-bottom:
                            1px solid #d9d9d9 !important;
                    }


                    .invoice-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 24px;
                    }


                    .invoice-customer-section {
                        display: flex;
                        justify-content: space-between;
                        gap: 40px;
                    }


                    .billing-summary-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 6px;
                    }


                    .invoice-totals {
                        page-break-inside: avoid;
                    }


                    .invoice-items-table {
                        page-break-inside: auto;
                    }


                    .invoice-items-table tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }


                    .ant-tag {
                        background: transparent !important;
                        border-color: #d9d9d9 !important;
                        color: #000000 !important;
                    }


                    .ant-divider {
                        border-color: #d9d9d9 !important;
                    }


                    .no-print {
                        display: none !important;
                    }

                </style>

            </head>


            <body>

                <div
                    id="${invoiceElementId}"
                >
                    ${invoiceElement.innerHTML}
                </div>

            </body>

        </html>
    `);


    printWindow.document.close();


    printWindow.focus();


    setTimeout(() => {

        printWindow.print();

        printWindow.close();

    }, 500);


    return true;

};


/* =========================================================
   PRINT CURRENT PAGE AREA
   ========================================================= */

export const printInvoiceElement = (
    element
) => {

    if (!element) {

        return false;

    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    if (!printWindow) {

        return false;

    }


    const styles =
        Array.from(
            document.querySelectorAll(
                'link[rel="stylesheet"], style'
            )
        )
            .map(
                style => style.outerHTML
            )
            .join("\n");


    printWindow.document.open();


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

            <head>

                <meta charset="UTF-8" />

                <title>
                    Pharmacy Invoice
                </title>

                ${styles}

                <style>

                    @page {
                        size: A4;
                        margin: 12mm;
                    }


                    body {
                        margin: 0;
                        padding: 0;
                        background: #ffffff;
                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                    }


                    .ant-card {
                        border: none !important;
                        box-shadow: none !important;
                    }


                    .ant-card-body {
                        padding: 0 !important;
                    }


                    .no-print {
                        display: none !important;
                    }

                </style>

            </head>


            <body>

                ${element.outerHTML}

            </body>

        </html>

    `);


    printWindow.document.close();


    printWindow.focus();


    setTimeout(() => {

        printWindow.print();

        printWindow.close();

    }, 500);


    return true;

};

